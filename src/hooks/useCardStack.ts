import { useState, useEffect, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

interface UseCardStackProps<T> {
    items: T[];
    initialIndex?: number;
    loop?: boolean;
    autoAdvance?: boolean;
    intervalMs?: number;
    pauseOnHover?: boolean;
    onChangeIndex?: (index: number, item: T) => void;
}

export function useCardStack<T>({
    items,
    initialIndex = 0,
    loop = true,
    autoAdvance = false,
    intervalMs = 2800,
    pauseOnHover = true,
    onChangeIndex,
}: UseCardStackProps<T>) {
    const reduceMotion = useReducedMotion();
    const len = items.length;

    const [active, setActive] = useState(() => {
        if (len <= 0) return 0;
        return ((initialIndex % len) + len) % len;
    });
    const [hovering, setHovering] = useState(false);

    // Helper to wrap index safely
    const wrap = useCallback((n: number) => {
        if (len <= 0) return 0;
        return ((n % len) + len) % len;
    }, [len]);

    // Keep active in bounds if items change
    useEffect(() => {
        setActive((a) => wrap(a));
    }, [len, wrap]);

    // Notify parent of index change
    useEffect(() => {
        if (!len) return;
        onChangeIndex?.(active, items[active]);
    }, [active, len, items, onChangeIndex]);

    const canGoPrev = loop || active > 0;
    const canGoNext = loop || active < len - 1;

    const prev = useCallback(() => {
        if (!len) return;
        if (!canGoPrev) return;
        setActive((a) => wrap(a - 1));
    }, [canGoPrev, len, wrap]);

    const next = useCallback(() => {
        if (!len) return;
        if (!canGoNext) return;
        setActive((a) => wrap(a + 1));
    }, [canGoNext, len, wrap]);

    // Keyboard navigation
    const onKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
    }, [prev, next]);

    // Auto-advance
    useEffect(() => {
        if (!autoAdvance) return;
        if (reduceMotion) return;
        if (!len) return;
        if (pauseOnHover && hovering) return;

        const id = window.setInterval(() => {
            if (loop || active < len - 1) next();
        }, Math.max(700, intervalMs));

        return () => window.clearInterval(id);
    }, [autoAdvance, intervalMs, hovering, pauseOnHover, reduceMotion, len, loop, active, next]);

    return {
        active,
        setActive,
        hovering,
        setHovering,
        prev,
        next,
        onKeyDown,
    };
}

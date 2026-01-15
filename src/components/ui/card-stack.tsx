"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCardStack } from "@/hooks/useCardStack";

export type CardStackItem = {
    id: string | number;
    title: string;
    description?: string;
    imageSrc?: string;
    href?: string;
    ctaLabel?: string;
    tag?: string;
};

export type CardStackProps<T extends CardStackItem> = {
    items: T[];

    /** Selected index on mount */
    initialIndex?: number;

    /** How many cards are visible around the active (odd recommended) */
    maxVisible?: number;

    /** Card sizing */
    cardWidth?: number;
    cardHeight?: number;

    /** How much cards overlap each other (0..0.8). Higher = more overlap */
    overlap?: number;

    /** Total fan angle (deg). Higher = wider arc */
    spreadDeg?: number;

    /** 3D / depth feel */
    perspectivePx?: number;
    depthPx?: number;
    tiltXDeg?: number;

    /** Active emphasis */
    activeLiftPx?: number;
    activeScale?: number;
    inactiveScale?: number;

    /** Motion */
    springStiffness?: number;
    springDamping?: number;

    /** Behavior */
    loop?: boolean;
    autoAdvance?: boolean;
    intervalMs?: number;
    pauseOnHover?: boolean;

    /** UI */
    showDots?: boolean;
    className?: string;

    /** Hooks */
    onChangeIndex?: (index: number, item: T) => void;

    /** Custom renderer (optional) */
    renderCard?: (item: T, state: { active: boolean }) => React.ReactNode;
};



/** Minimal signed offset from active index to i, with wrapping (for loop behavior). */
function signedOffset(i: number, active: number, len: number, loop: boolean) {
    const raw = i - active;
    if (!loop || len <= 1) return raw;

    // consider wrapped alternative
    const alt = raw > 0 ? raw - len : raw + len;
    return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

export function CardStack<T extends CardStackItem>({
    items,
    initialIndex = 0,
    maxVisible = 7,

    cardWidth = 520,
    cardHeight = 320,

    overlap = 0.48,
    spreadDeg = 48,

    perspectivePx = 1100,
    depthPx = 140,
    tiltXDeg = 12,

    activeLiftPx = 22,
    activeScale = 1.03,
    inactiveScale = 0.94,

    springStiffness = 280,
    springDamping = 28,

    loop = true,
    autoAdvance = false,
    intervalMs = 2800,
    pauseOnHover = true,

    showDots = true,
    className,

    onChangeIndex,
    renderCard,
}: CardStackProps<T>) {
    const {
        active,
        setActive,
        setHovering,
        prev,
        next,
        onKeyDown
    } = useCardStack({
        items,
        initialIndex,
        loop,
        autoAdvance,
        intervalMs,
        pauseOnHover,
        onChangeIndex
    });

    const reduceMotion = useReducedMotion();
    const len = items.length;

    // Responsive sizing
    const [responsiveWidth, setResponsiveWidth] = React.useState(cardWidth);
    const [responsiveHeight, setResponsiveHeight] = React.useState(cardHeight);

    React.useEffect(() => {
        const calculateSize = () => {
            const windowWidth = window.innerWidth;
            if (windowWidth < 480) {
                // Mobile: 90% of screen width, max 340px
                const width = Math.min(windowWidth * 0.88, 340);
                setResponsiveWidth(width);
                setResponsiveHeight(width * 0.65); // Maintain aspect ratio
            } else if (windowWidth < 768) {
                // Tablet: 80% of screen width, max 420px
                const width = Math.min(windowWidth * 0.8, 420);
                setResponsiveWidth(width);
                setResponsiveHeight(width * 0.62);
            } else {
                // Desktop: use provided defaults
                setResponsiveWidth(cardWidth);
                setResponsiveHeight(cardHeight);
            }
        };

        calculateSize();
        window.addEventListener('resize', calculateSize);
        return () => window.removeEventListener('resize', calculateSize);
    }, [cardWidth, cardHeight]);

    const maxOffset = Math.max(0, Math.floor(maxVisible / 2));

    const cardSpacing = Math.max(10, Math.round(responsiveWidth * (1 - overlap)));
    const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;

    if (!len) return null;

    const activeItem = items[active]!;

    return (
        <div
            className={cn("w-full", className)}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            {/* Stage */}
            <div
                className="relative w-full overflow-hidden"
                style={{ height: Math.max(300, responsiveHeight + 80) }}
                tabIndex={0}
                onKeyDown={onKeyDown}
            >
                {/* background wash / spotlight (unique feel) */}
                <div
                    className="pointer-events-none absolute inset-x-0 top-6 mx-auto h-48 w-[70%] rounded-full bg-orange-500/10 blur-3xl"
                    aria-hidden="true"
                />
                <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-40 w-[76%] rounded-full bg-pink-600/10 blur-3xl"
                    aria-hidden="true"
                />

                <div
                    className="absolute inset-0 flex items-end justify-center"
                    style={{
                        perspective: `${perspectivePx}px`,
                    }}
                >
                    <AnimatePresence initial={false}>
                        {items.map((item, i) => {
                            const off = signedOffset(i, active, len, loop);
                            const abs = Math.abs(off);
                            const visible = abs <= maxOffset;

                            // hide far-away cards cleanly
                            if (!visible) return null;

                            // fan geometry
                            const rotateZ = off * stepDeg;
                            const x = off * cardSpacing;
                            const y = abs * 10; // subtle arc-down feel
                            const z = -abs * depthPx;

                            const isActive = off === 0;

                            const scale = isActive ? activeScale : inactiveScale;
                            const lift = isActive ? -activeLiftPx : 0;

                            const rotateX = isActive ? 0 : tiltXDeg;

                            const zIndex = 100 - abs;

                            // drag only on the active card
                            const dragProps = isActive
                                ? {
                                    drag: "x" as const,
                                    dragConstraints: { left: 0, right: 0 },
                                    dragElastic: 0.18,
                                    onDragEnd: (
                                        _e: any,
                                        info: { offset: { x: number }; velocity: { x: number } },
                                    ) => {
                                        if (reduceMotion) return;
                                        const travel = info.offset.x;
                                        const v = info.velocity.x;
                                        const threshold = Math.min(160, responsiveWidth * 0.22);

                                        // swipe logic
                                        if (travel > threshold || v > 650) prev();
                                        else if (travel < -threshold || v < -650) next();
                                    },
                                }
                                : {};

                            return (
                                <motion.div
                                    key={item.id}
                                    className={cn(
                                        "absolute bottom-0 rounded-2xl border-4 border-black/10 dark:border-white/10 overflow-hidden shadow-xl",
                                        "will-change-transform select-none",
                                        isActive
                                            ? "cursor-grab active:cursor-grabbing"
                                            : "cursor-pointer",
                                    )}
                                    style={{
                                        width: responsiveWidth,
                                        height: responsiveHeight,
                                        zIndex,
                                        transformStyle: "preserve-3d",
                                    }}
                                    initial={
                                        reduceMotion
                                            ? false
                                            : {
                                                opacity: 0,
                                                y: y + 40,
                                                x,
                                                rotateZ,
                                                rotateX,
                                                scale,
                                            }
                                    }
                                    animate={{
                                        opacity: 1,
                                        x,
                                        y: y + lift,
                                        rotateZ,
                                        rotateX,
                                        // framer doesn't support translateZ directly in animate on all setups,
                                        // so we use a custom transform via style below.
                                        scale,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: springStiffness,
                                        damping: springDamping,
                                    }}
                                    // translateZ via style transform (kept stable w/ motion values above)
                                    // We apply translateZ by using a CSS transform in a child wrapper.
                                    onClick={() => setActive(i)}
                                    {...dragProps}
                                >
                                    <div
                                        className="h-full w-full"
                                        style={{
                                            transform: `translateZ(${z}px)`,
                                            transformStyle: "preserve-3d",
                                        }}
                                    >
                                        {renderCard ? (
                                            renderCard(item, { active: isActive })
                                        ) : (
                                            <DefaultFanCard item={item} active={isActive} />
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {/* Dots navigation centered at bottom */}
            {showDots ? (
                <div className="mt-6 flex items-center justify-center gap-3">
                    <div className="flex items-center gap-2">
                        {items.map((it, idx) => {
                            const on = idx === active;
                            return (
                                <button
                                    key={it.id}
                                    onClick={() => setActive(idx)}
                                    className={cn(
                                        "h-2 w-2 rounded-full transition",
                                        on
                                            ? "bg-foreground"
                                            : "bg-foreground/30 hover:bg-foreground/50",
                                    )}
                                    aria-label={`Go to ${it.title}`}
                                />
                            );
                        })}
                    </div>
                </div>
            ) : null}
        </div>
    );
}

function DefaultFanCard({ item }: { item: CardStackItem; active: boolean }) {
    return (
        <div className="relative h-full w-full">
            {/* image */}
            <div className="absolute inset-0">
                {item.imageSrc ? (
                    <img
                        src={item.imageSrc}
                        alt={item.title}
                        className="h-full w-full object-cover"
                        draggable={false}
                        loading="lazy"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-secondary text-sm text-muted-foreground">
                        No image
                    </div>
                )}
            </div>

            {/* subtle gradient overlay at bottom for text readability */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* content */}
            <div className="relative z-10 flex h-full flex-col justify-end p-5">
                <div className="truncate text-lg font-semibold text-white">
                    {item.title}
                </div>
                {item.description ? (
                    <div className="mt-1 line-clamp-2 text-sm text-white/80">
                        {item.description}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

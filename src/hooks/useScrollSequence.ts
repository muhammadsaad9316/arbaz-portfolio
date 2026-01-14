import { RefObject } from 'react';
import { useScroll, useTransform, MotionValue } from 'framer-motion';

interface UseScrollSequenceProps {
    containerRef: RefObject<HTMLElement | null>;
    totalFrames: number;
    offset?: any;
}

export default function useScrollSequence({ containerRef, totalFrames, offset = ['start start', 'end end'] }: UseScrollSequenceProps) {
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: offset,
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, totalFrames]);

    return { scrollYProgress, frameIndex };
}

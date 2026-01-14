'use client';

import { useRef } from 'react';
import Overlay from './Overlay';
import useImagePreloader from '@/hooks/useImagePreloader';
import useScrollSequence from '@/hooks/useScrollSequence';
import useCanvasFrame from '@/hooks/useCanvasFrame';
import { TOTAL_FRAMES, SCROLL_HEIGHT } from '@/lib/constants';

// Define props
interface ScrollyCanvasProps {
    overlayContent: any; // Using any for now to avoid importing type, but should be typed
}

export default function ScrollyCanvas({ overlayContent }: ScrollyCanvasProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // 1. Image Preloading
    const { images, isLoaded } = useImagePreloader();

    // 2. Scroll Logic
    const { scrollYProgress, frameIndex } = useScrollSequence({
        containerRef,
        totalFrames: TOTAL_FRAMES
    });

    // 3. Canvas Rendering
    useCanvasFrame({
        canvasRef,
        images,
        isLoaded,
        frameIndex
    });

    return (
        <div ref={containerRef} style={{ height: SCROLL_HEIGHT }} className="relative bg-[#121212]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="block w-full h-full"
                />
                <Overlay scrollYProgress={scrollYProgress} content={overlayContent} />
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center text-white/50 text-sm font-light">
                        Loading Experience...
                    </div>
                )}
            </div>
        </div>
    );
}

import { useEffect, RefObject } from 'react';
import { MotionValue } from 'framer-motion';

interface UseCanvasFrameProps {
    canvasRef: RefObject<HTMLCanvasElement | null>;
    images: HTMLImageElement[];
    isLoaded: boolean;
    frameIndex: MotionValue<number>;
}

export default function useCanvasFrame({ canvasRef, images, isLoaded, frameIndex }: UseCanvasFrameProps) {
    useEffect(() => {
        if (!isLoaded || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const handleResize = () => {
            // Set canvas logic to match window size 1:1 for now
            // In specialized cases, might want a specific aspect ratio, but here we fill screen
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Re-render immediately on resize to prevent blank flash
            render(frameIndex.get());
        };

        const render = (index: number) => {
            const imgIndex = Math.floor(index) - 1;
            const safeIndex = Math.max(0, Math.min(images.length - 1, imgIndex));
            const img = images[safeIndex];

            if (!img) return;

            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = img.width / img.height;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (imgRatio > canvasRatio) {
                drawHeight = canvas.height;
                drawWidth = img.width * (canvas.height / img.height);
                offsetX = (canvas.width - drawWidth) / 2;
                offsetY = 0;
            } else {
                drawWidth = canvas.width;
                drawHeight = img.height * (canvas.width / img.width);
                offsetX = 0;
                offsetY = (canvas.height - drawHeight) / 2;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        // Initial render
        render(frameIndex.get());

        const unsubscribe = frameIndex.on("change", (latest) => {
            render(latest);
        });

        return () => {
            window.removeEventListener('resize', handleResize);
            unsubscribe();
        };
    }, [isLoaded, frameIndex, images, canvasRef]);
}

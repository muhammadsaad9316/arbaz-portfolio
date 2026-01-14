import { useState, useEffect } from 'react';
import { IMAGE_SEQUENCE_PATH, MOBILE_IMAGE_SEQUENCE_PATH, IMAGE_SEQUENCE_EXT, TOTAL_FRAMES, MOBILE_BREAKPOINT } from '@/lib/constants';

export default function useImagePreloader() {
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [sequencePath, setSequencePath] = useState(IMAGE_SEQUENCE_PATH);
    const [initialCheckDone, setInitialCheckDone] = useState(false);

    useEffect(() => {
        // Detect mobile on mount to avoid hydration mismatch
        const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
        if (isMobile) {
            setSequencePath(MOBILE_IMAGE_SEQUENCE_PATH);
        }
        setInitialCheckDone(true);
    }, []);

    useEffect(() => {
        if (!initialCheckDone) return;

        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = new Array(TOTAL_FRAMES);

            // Re-construct first frame path based on determined sequencePath
            // Note: If sequencePath changes (e.g. to mobile), this effect re-runs.

            // STEP 1: Load first frame immediately
            const firstFrame = new Image();
            const firstFramePath = `${sequencePath}${String(1).padStart(6, '0')}${IMAGE_SEQUENCE_EXT}`;

            await new Promise<void>((resolve) => {
                firstFrame.onload = () => {
                    loadedImages[0] = firstFrame;
                    setImages([...loadedImages]); // Show first frame immediately
                    setIsLoaded(true); // Mark as loaded so canvas displays
                    resolve();
                };
                firstFrame.onerror = () => {
                    console.error('Failed to load first frame');
                    resolve();
                };
                firstFrame.src = firstFramePath;
            });

            // STEP 2: Load remaining frames in background
            const remainingPromises = [];
            for (let i = 2; i <= TOTAL_FRAMES; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    const formattedIndex = String(i).padStart(6, '0');
                    img.src = `${sequencePath}${formattedIndex}${IMAGE_SEQUENCE_EXT}`;
                    img.onload = () => {
                        loadedImages[i - 1] = img;
                        resolve();
                    };
                    img.onerror = () => {
                        console.error(`Failed to load frame ${i}`);
                        resolve();
                    };
                });
                remainingPromises.push(promise);
            }

            // Wait for all remaining frames
            await Promise.all(remainingPromises);
            setImages(loadedImages);
        };

        loadImages();
    }, [sequencePath, initialCheckDone]); // Re-run if path changes or check completes

    return { images, isLoaded };
}

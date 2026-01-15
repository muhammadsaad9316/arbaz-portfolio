'use client';

import { MotionValue, motion, useTransform } from 'framer-motion';

// Define interface for the content structure
// Ideally this should be imported from Prisma Client or a types file
interface OverlayContent {
    introTitle1: string;
    introTitle2: string;
    introRole: string;
    craftPrefix: string;
    craftHighlight: string;
    craftSuffix: string;
    visionPrefix: string;
    visionHighlight: string;
    visionSuffix: string;
}

interface OverlayProps {
    scrollYProgress: MotionValue<number>;
    content: OverlayContent;
}

export default function Overlay({ scrollYProgress, content }: OverlayProps) {
    // Section 1: 0% - 20%
    const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -100]);
    const blur1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [0, 0, 10]);
    const filter1 = useTransform(blur1, (value) => `blur(${value}px)`);

    // Section 2: 25% - 50%
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.45, 0.55], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.2, 0.55], [100, -100]);

    // Section 3: 55% - 80%
    const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.75, 0.85], [0, 1, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.5, 0.85], [100, -100]);

    return (
        <div className="absolute inset-0 z-10 pointer-events-none w-full h-full">
            {/* Section 1: Intro */}
            <motion.div
                style={{ opacity: opacity1, y: y1, filter: filter1 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-4"
            >
                <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white text-center mix-blend-difference">
                    {content.introTitle1}<br />{content.introTitle2}
                </h1>
                <p className="mt-4 text-base sm:text-xl md:text-2xl text-gray-300 font-light tracking-wide">
                    {content.introRole}
                </p>
            </motion.div>

            {/* Section 2: Craft */}
            <motion.div
                style={{ opacity: opacity2, y: y2 }}
                className="absolute inset-0 flex flex-col items-start justify-center px-6 sm:px-10 md:px-32 max-w-4xl"
            >
                <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white drop-shadow-lg">
                    {content.craftPrefix} <span className="text-orange-500">{content.craftHighlight}</span><br />
                    {content.craftSuffix}
                </h2>
            </motion.div>

            {/* Section 3: Vision */}
            <motion.div
                style={{ opacity: opacity3, y: y3 }}
                className="absolute inset-0 flex flex-col items-end justify-center px-6 sm:px-10 md:px-32 w-full"
            >
                <div className="text-right max-w-4xl">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white drop-shadow-lg">
                        {content.visionPrefix}<br />
                        <span className="text-pink-500">{content.visionHighlight}</span> {content.visionSuffix}
                    </h2>
                </div>
            </motion.div>
        </div>
    );
}

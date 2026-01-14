'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { slideInFromLeft, scaleIn } from '@/lib/animations';
// ... rest of imports

interface AboutProps {
    data: {
        heading: string;
        text: string;
        stats: any;
    } | null;
}

const ScrollRevealText = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
    const elementRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        let rafId: number;

        const handleScroll = () => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Start point: Element enters from bottom (rect.top = windowHeight)
            // End point: Element reaches vertical center (rect.top + rect.height/2 = windowHeight/2)

            const elementCenter = rect.top + rect.height / 2;
            const startPoint = windowHeight; // When top is at bottom
            const endPoint = windowHeight / 2; // When center is at center - actually user said "when it reaches the vertical center"

            // Adjust to users spec: 
            // 0% when enters bottom
            // 100% when reaches vertical center

            // Let's map rect.top.
            // When rect.top == windowHeight (just entering), progress should be 0.
            // When rect.top + height/2 == windowHeight/2 (center aligned), progress should be 100.

            // However, strictly adhering to "0% when enters bottom" means rect.top = windowHeight. 
            // But usually we want the text to be visible *before* it leaves the screen? No, reveals as it enters.

            // Range calculation
            // Distance to travel from bottom to center
            const travelDist = startPoint - endPoint;

            // Current progress
            // We want 0 at startPoint, 1 at endPoint.
            // rect.top decreases as we scroll down (element moves up).

            // Let's use a simplified approach based on top position
            // Trigger 0% at windowHeight
            // Trigger 100% at windowHeight / 2

            const currentPos = rect.top;

            // formula: progress = (start - current)/(start - end)
            // if current = start (windowHeight), progress = 0
            // if current = end (windowHeight/2), progress = 1

            let percentage = (windowHeight - currentPos) / (windowHeight / 2);

            // Clamp value
            percentage = Math.max(0, Math.min(1, percentage));

            element.style.backgroundSize = `${percentage * 100}% 100%`;
        };

        const onScroll = () => {
            // Use requestAnimationFrame for performance
            rafId = requestAnimationFrame(handleScroll);
        };

        window.addEventListener('scroll', onScroll);
        // Initial call to set state correctly on load
        handleScroll();

        return () => {
            window.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <span
            ref={elementRef}
            className={`${className} bg-no-repeat`}
            style={{
                color: 'rgba(255, 255, 255, 0.2)',
                backgroundImage: 'linear-gradient(#fff, #fff)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                backgroundSize: '0% 100%',
                display: 'inline', // Ensure bg size applies correctly to text flow
            }}
        >
            {children}
        </span>
    );
};

export default function About({ data }: AboutProps) {
    if (!data) return null;

    const stats = Array.isArray(data.stats) ? data.stats : [];

    return (
        <section id="about" className="relative z-20 bg-[#121212] py-32 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        variants={slideInFromLeft}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold bg-clip-text mb-8 leading-tight">
                            <ScrollRevealText>
                                {data.heading}
                            </ScrollRevealText>
                        </h2>
                        <p className="text-xl leading-relaxed mb-12">
                            <ScrollRevealText>
                                {data.text}
                            </ScrollRevealText>
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8">
                            {stats.map((stat: any, index: number) => (
                                <div key={index}>
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                                        {stat.value}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-white/50 uppercase tracking-wider">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        variants={scaleIn}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-[4/3] rounded-2xl border border-white/10 relative overflow-hidden group">
                            <Image
                                src="/about-image.png"
                                alt="About Me"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Overlay for aesthetic tint */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 pointer-events-none" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

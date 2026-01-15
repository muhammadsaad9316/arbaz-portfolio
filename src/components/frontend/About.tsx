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

const ScrollRevealText = ({ children, className = '', gradient }: { children: React.ReactNode; className?: string; gradient?: string }) => {
    const elementRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        let rafId: number;

        const handleScroll = () => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const elementCenter = rect.top + rect.height / 2;
            const startPoint = windowHeight;
            const currentPos = rect.top;

            let percentage = (windowHeight - currentPos) / (windowHeight / 2);

            percentage = Math.max(0, Math.min(1, percentage));

            element.style.backgroundSize = `${percentage * 100}% 100%`;
        };

        const onScroll = () => {
            rafId = requestAnimationFrame(handleScroll);
        };

        window.addEventListener('scroll', onScroll);
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
                backgroundImage: gradient || 'linear-gradient(#fff, #fff)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                backgroundSize: '0% 100%',
                display: 'inline',
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
                            <ScrollRevealText gradient="linear-gradient(to right, #F97316, #EC4899)">
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
                            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-indigo-500/20 pointer-events-none" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TimelineEntry {
    title: string;
    content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, [ref]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 50%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    const handleScrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10 relative" ref={containerRef}>
            <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
                <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl font-bold">
                    Changelog from my journey
                </h2>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
                    A timeline of my professional journey and milestones.
                </p>
            </div>

            <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
                {data.map((item, index) => (
                    <div key={index} id={`timeline-entry-${index}`} className="flex justify-start pt-10 md:pt-40 md:gap-10">
                        <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                            <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                                <motion.div
                                    className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2"
                                    whileInView={{ scale: 1.4, backgroundColor: "#a855f7", borderColor: "#9333ea" }}
                                    viewport={{ margin: "-100px" }}
                                    transition={{ duration: 0.4 }}
                                />
                            </div>
                            <motion.h3
                                className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500 cursor-pointer"
                                whileHover={{ scale: 1.05, x: 5, color: "#737373" }}
                                whileInView={{ color: "#a855f7", scale: 1.05, originX: 0 }}
                                viewport={{ margin: "-150px" }}
                                transition={{ duration: 0.3 }}
                                onClick={() => handleScrollTo(`timeline-entry-${index}`)}
                            >
                                {item.title}
                            </motion.h3>
                        </div>

                        <div className="relative pl-20 pr-4 md:pl-4 w-full">
                            <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                                {item.title}
                            </h3>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                {item.content}
                            </motion.div>
                        </div>
                    </div>
                ))}

                {/* End of Journey / Future Section */}
                <div className="flex justify-start pt-20 md:gap-10">
                    <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                        <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                            <motion.div
                                className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2"
                                whileInView={{ scale: 1.2, backgroundColor: "#10b981", borderColor: "#059669" }}
                                transition={{ duration: 0.4 }}
                            />
                        </div>
                    </div>
                    <div className="relative pl-20 pr-4 md:pl-4 w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col gap-6"
                        >
                            <div>
                                <h3 className="text-2xl font-bold text-neutral-500 dark:text-neutral-500 mb-2">What's Next?</h3>
                                <p className="text-neutral-700 dark:text-neutral-300 max-w-md">
                                    The journey continues. Stay tuned for more updates.
                                </p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full w-fit shadow-lg hover:shadow-xl transition-all text-sm font-bold"
                            >
                                🚀 Back to Start
                            </motion.button>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Beam */}
                <div style={{ height: height + "px" }} className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]">
                    <motion.div style={{ height: heightTransform, opacity: opacityTransform }} className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full" />
                </div>

                {/* Dashed Future Line */}
                <div className="absolute md:left-8 left-8 top-full -mt-24 w-[2px] h-48 border-l-2 border-dashed border-neutral-300 dark:border-neutral-700 [mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)] z-0" />
            </div>
        </div>
    );
};

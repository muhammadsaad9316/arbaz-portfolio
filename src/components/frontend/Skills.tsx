'use client';

import { motion } from 'framer-motion';

interface SkillsProps {
    data: {
        category: string;
        items: string[];
    }[];
}

export default function Skills({ data }: SkillsProps) {
    if (!data) return null;

    return (
        <section id="skills" className="relative z-20 bg-[#121212] py-32 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500 mb-20"
                >
                    Expertise
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {data.map((category, index) => (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300"
                        >
                            <h3 className="text-2xl font-bold text-white mb-6">
                                {category.category}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {category.items.map((item) => (
                                    <span
                                        key={item}
                                        className="px-4 py-2 bg-white/5 rounded-full text-sm text-white/80 border border-white/5 hover:border-pink-500/50 hover:text-white transition-colors"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

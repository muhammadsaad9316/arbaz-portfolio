"use client";

import { motion } from "framer-motion";
import { CardStack, CardStackItem } from "@/components/ui/card-stack";

interface ProjectsClientProps {
    items: CardStackItem[];
}

export default function ProjectsClient({ items }: ProjectsClientProps) {
    return (
        <>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500 mb-20 text-center"
            >
                Selected Works
            </motion.h2>

            <div className="flex items-center justify-center">
                <CardStack
                    items={items}
                    initialIndex={0}
                    autoAdvance
                    intervalMs={4000}
                    pauseOnHover
                    showDots
                />
            </div>
        </>
    );
}

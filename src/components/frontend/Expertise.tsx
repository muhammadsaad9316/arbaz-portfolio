"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { ExpertiseDBModel, transformExpertiseToItem } from "@/lib/transformers";

gsap.registerPlugin(ScrollTrigger);

interface ExpertiseProps {
    data: ExpertiseDBModel[];
}

export default function Expertise({ data }: ExpertiseProps) {
    const container = useRef(null);

    // Map DB data to UI format using transformer
    const expertiseItems = data.map(transformExpertiseToItem);


    useGSAP(
        () => {
            // Animate the Title with a masked slide-up effect
            const revealElements = gsap.utils.toArray(".reveal-text");

            revealElements.forEach((element: any) => {
                gsap.fromTo(
                    element,
                    { y: "100%" },
                    {
                        y: "0%",
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: container.current,
                            start: "top 75%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });

            // Stagger animation for list items
            gsap.fromTo(
                ".expertise-item",
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 60%",
                    },
                }
            );
        },
        { scope: container }
    );

    return (
        <section ref={container} className="bg-[#121212] text-white py-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Left Column - Sticky */}
                <div className="lg:sticky lg:top-32 self-start mb-12 lg:mb-0">
                    <div className="overflow-hidden mb-6">
                        <h2 className="reveal-text text-5xl md:text-7xl font-bold font-sans tracking-tight block bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
                            Expertise
                        </h2>
                    </div>
                </div>

                {/* Right Column - Scrollable List */}
                <div className="space-y-12">
                    {expertiseItems.map((item) => (
                        <div key={item.id} className="expertise-item group border-t border-white/10 pt-12">
                            <span className="block text-sm text-gray-500 mb-4 font-mono">
                                /{item.id}
                            </span>
                            <h3 className="text-3xl md:text-4xl font-bold mb-8 font-sans group-hover:text-gray-300 transition-colors">
                                {item.title}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {item.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 rounded-full border border-white/10 text-sm text-gray-400 hover:border-white/30 hover:text-white transition-colors cursor-default"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

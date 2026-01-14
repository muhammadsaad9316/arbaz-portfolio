'use client';

import { motion } from 'framer-motion';

import { Github, Linkedin, Twitter, Hexagon } from 'lucide-react';
import SocialLinks from './SocialLinks';
import { slideInFromLeft, fadeInUp, fadeIn } from '@/lib/animations';

interface ContactProps {
    data: {
        heading: string;
        text: string;
        email: string;
        socials: any;
    } | null;
}

export default function Contact({ data }: ContactProps) {
    if (!data) return null;
    const socials = Array.isArray(data.socials) ? data.socials : [];

    return (
        <section id="contact" className="relative z-20 bg-[#121212] min-h-screen flex flex-col justify-between p-6 md:p-12 overflow-hidden">
            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-[1920px] mx-auto">
                {/* Left Column - Outlined Text */}
                <div className="flex flex-col justify-center select-none cursor-default">
                    <motion.div
                        variants={slideInFromLeft}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="relative flex flex-col items-start leading-[0.8]"
                    >
                        <h2 className="text-[11vw] sm:text-[13vw] md:text-[10vw] font-[900] tracking-tighter"
                            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.9)', color: 'transparent' }}>
                            LET'S
                        </h2>
                        <h2 className="text-[11vw] sm:text-[13vw] md:text-[10vw] font-[900] tracking-tighter ml-[0.5em] sm:ml-[1em] md:ml-[1.5em]"
                            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.9)', color: 'transparent' }}>
                            CREATE
                        </h2>
                        <h2 className="text-[11vw] sm:text-[13vw] md:text-[10vw] font-[900] tracking-tighter"
                            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.9)', color: 'transparent' }}>
                            TOGETHER
                        </h2>
                    </motion.div>
                </div>

                {/* Right Column - Content */}
                <div className="flex flex-col justify-end pb-20 md:pb-0 md:justify-center items-start md:pl-24 relative z-10">
                    <motion.div
                        variants={fadeInUp}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="max-w-lg"
                    >
                        <div className="relative mb-16 pl-6 border-l-2 border-white/20">
                            <p className="text-white text-xl md:text-2xl font-light leading-relaxed tracking-wide">
                                I'm always open to new opportunities and collaborations. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                            </p>
                        </div>

                        <div className="md:ml-6">
                            <a
                                href={`mailto:${data.email}`}
                                className="relative group inline-block"
                            >
                                <div className="absolute -inset-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full blur-md opacity-25 group-hover:opacity-60 transition duration-500 will-change-transform" />
                                <button className="relative px-8 sm:px-10 py-4 sm:py-5 bg-[#121212] border border-white/10 rounded-full leading-none flex items-center gap-4 group-hover:bg-white group-hover:text-black transition-all duration-300 min-h-[48px]">
                                    <span className="text-lg sm:text-xl font-medium tracking-widest uppercase">Say Hello</span>
                                </button>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Footer Elements */}
            <div className="flex justify-between items-end w-full max-w-[1920px] mx-auto mt-auto pb-10 px-6 md:px-0">
                {/* Logo Area */}
                <motion.div
                    variants={fadeIn}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center">
                        <Hexagon className="w-6 h-6 md:w-8 md:h-8 text-black fill-black" />
                    </div>
                </motion.div>

                {/* Social Icons Component */}
                <motion.div
                    variants={fadeIn}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="flex md:mr-10"
                >
                    <SocialLinks items={socials} />
                </motion.div>
            </div>
        </section>
    );
}

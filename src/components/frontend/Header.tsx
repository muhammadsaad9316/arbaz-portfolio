'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '@/config/site';

export default function Header() {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleVisibility = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);

            // Always show navbar on mobile
            if (mobile) {
                setIsVisible(true);
                return;
            }

            // Desktop: Show navbar after scrolling past hero
            const aboutSection = document.getElementById('about');
            if (!aboutSection) return;

            const threshold = aboutSection.offsetTop - 100;
            setIsVisible(window.scrollY > threshold);
        };

        // Initial check
        handleVisibility();

        window.addEventListener('scroll', handleVisibility);
        window.addEventListener('resize', handleVisibility);

        return () => {
            window.removeEventListener('scroll', handleVisibility);
            window.removeEventListener('resize', handleVisibility);
        };
    }, []);

    // Close mobile menu on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobileMenuOpen]);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{
                y: isVisible ? 0 : -100,
                opacity: isVisible ? 1 : 0
            }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/90 backdrop-blur-md py-4 shadow-lg border-b border-white/5"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
                <a
                    href="#"
                    className="text-2xl font-bold text-white tracking-tighter hover:text-orange-500 transition-colors"
                    onClick={(e) => scrollToSection(e, '#')}
                >
                    ARBAZ
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.href)}
                            className="text-sm font-medium text-white/70 hover:text-orange-500 transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                {/* Mobile Hamburger Button */}
                <button
                    className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 z-50"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMobileMenuOpen}
                >
                    <motion.span
                        animate={{
                            rotate: isMobileMenuOpen ? 45 : 0,
                            y: isMobileMenuOpen ? 6 : 0,
                        }}
                        className="block w-6 h-0.5 bg-white origin-center"
                    />
                    <motion.span
                        animate={{
                            opacity: isMobileMenuOpen ? 0 : 1,
                            scaleX: isMobileMenuOpen ? 0 : 1,
                        }}
                        className="block w-6 h-0.5 bg-white"
                    />
                    <motion.span
                        animate={{
                            rotate: isMobileMenuOpen ? -45 : 0,
                            y: isMobileMenuOpen ? -6 : 0,
                        }}
                        className="block w-6 h-0.5 bg-white origin-center"
                    />
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.nav
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="md:hidden overflow-hidden bg-[#121212]/95 backdrop-blur-md border-t border-white/5"
                    >
                        <div className="px-6 py-6 flex flex-col gap-4">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-lg font-medium text-white/80 hover:text-orange-500 transition-colors py-2"
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

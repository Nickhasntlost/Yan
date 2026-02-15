"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
};

const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

interface HeroSectionProps {
    tag: string;
    title: string;
    subTitle: React.ReactNode;
    description: string;
    scrollText?: string;
    compact?: boolean;
    enableGradientHover?: boolean;
    autoRevealGradient?: boolean;
}

export default function HeroSection({
    tag,
    title,
    subTitle,
    description,
    scrollText = "SCROLL TO EXPLORE",
    compact = false,
    enableGradientHover = false,
    autoRevealGradient = false
}: HeroSectionProps) {
    const [isVisible, setIsVisible] = useState(true);

    // For auto-reveal, we want to animate from 0 to 100% after mount
    const [reveal, setReveal] = useState(false);

    useEffect(() => {
        if (autoRevealGradient) {
            // Small delay to ensure transition happens
            const revealTimer = setTimeout(() => setReveal(true), 100);

            // Hide after 2.5 seconds
            const hideTimer = setTimeout(() => setReveal(false), 2300);

            return () => {
                clearTimeout(revealTimer);
                clearTimeout(hideTimer);
            };
        }
    }, [autoRevealGradient]);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY < 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section className={`relative px-4 md:px-6 lg:px-15 max-w-[1400px] mx-auto flex flex-col justify-center ${compact
            ? "pt-6 md:pt-10 pb-16 md:pb-20 min-h-[60vh] md:h-[calc(100vh-128px)]"
            : "pt-20 md:pt-30 pb-32 md:pb-40 min-h-[70vh] md:min-h-[80vh]"
            }`}>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="max-w-5xl"
            >
                <motion.div variants={fadeInUp} className="mb-6 flex items-center gap-3">
                    <span className="h-[1px] w-8 md:w-12 bg-blue-600/50 block"></span>
                    <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-blue-600 dark:text-blue-400">
                        {tag}
                    </span>
                </motion.div>

                <div className="overflow-hidden">
                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.1] mb-6 md:mb-8 font-heading text-zinc-900 dark:text-white"
                    >
                        {title} <br />
                        {enableGradientHover ? (
                            <span className="relative inline-block cursor-default group">
                                <span className="text-gray-400 dark:text-gray-600 font-light italic">
                                    {subTitle}
                                </span>
                                <span
                                    className={`absolute left-0 top-0 h-full overflow-hidden transition-[width] duration-1000 ease-in-out whitespace-nowrap ${autoRevealGradient
                                        ? (reveal ? "w-full" : "w-0 group-hover:w-full")
                                        : "w-0 group-hover:w-full"
                                        }`}
                                    aria-hidden="true"
                                >
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#b91c1c] to-[#0369a1] font-light italic">
                                        {subTitle}
                                    </span>
                                </span>
                            </span>
                        ) : (
                            <span className="text-gray-400 dark:text-gray-600 font-light italic">
                                {subTitle}
                            </span>
                        )}
                    </motion.h1>
                </div>

                <motion.div variants={fadeInUp} className="max-w-2xl text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-600 dark:text-gray-300 font-sans">
                    {description}
                </motion.div>
            </motion.div>

            {/* Floating "Scroll Down" Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                transition={{ delay: isVisible ? 3 : 0, duration: 0.5 }}
                className={`absolute left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-4 text-[10px] md:text-xs font-bold tracking-widest text-gray-400 font-sans ${compact ? "bottom-4 md:bottom-8" : "bottom-16 md:bottom-25"
                    }`}
            >
                <div className="h-px w-8 md:w-12 bg-gray-300 dark:bg-gray-700"></div>
                <motion.span
                    animate={{ y: isVisible ? [0, 3, 0] : 0 }}
                    transition={{
                        delay: isVisible ? 3 : 0,
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    {scrollText}
                </motion.span>
                <div className="h-px w-8 md:w-12 bg-gray-300 dark:bg-gray-700"></div>
            </motion.div>
        </section>
    );
}

"use client";

import React from "react";
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
}

export default function HeroSection({
    tag,
    title,
    subTitle,
    description,
    scrollText = "SCROLL TO EXPLORE"
}: HeroSectionProps) {
    return (
        <section className="relative pt-38 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto min-h-[80vh] flex flex-col justify-center">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="max-w-5xl"
            >
                <motion.div variants={fadeInUp} className="mb-6 flex items-center gap-3">
                    <span className="h-[1px] w-12 bg-blue-600/50 block"></span>
                    <span className="text-sm font-bold tracking-[0.2em] uppercase text-blue-600 dark:text-blue-400">
                        {tag}
                    </span>
                </motion.div>

                <div className="overflow-hidden">
                    <motion.h1
                        variants={fadeInUp}
                        className="text-7xl md:text-8xl font-medium tracking-tighter leading-[1.1] mb-8 font-heading text-zinc-900 dark:text-white"
                    >
                        {title} <br />
                        <span className="text-gray-400 dark:text-gray-600 font-light italic">
                            {subTitle}
                        </span>
                    </motion.h1>
                </div>

                <motion.div variants={fadeInUp} className="max-w-2xl text-xl md:text-2xl leading-relaxed text-gray-600 dark:text-gray-300 font-sans">
                    {description}
                </motion.div>
            </motion.div>

            {/* Floating "Scroll Down" Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 left-6 md:left-12 flex items-center gap-4 text-xs font-bold tracking-widest text-gray-400 font-sans"
            >
                {scrollText}
                <div className="h-px w-12 bg-gray-300 dark:bg-gray-700"></div>
            </motion.div>
        </section>
    );
}

'use client';

import { motion } from 'framer-motion';

export default function Hero() {
    // Animation Variants
    const textReveal: any = {
        hidden: { y: 100, opacity: 0 },
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: i * 0.2,
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1], // Apple-style smooth easing
            },
        }),
    };

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { delay: 0.8, duration: 1 },
        },
    };

    return (
        <section className="relative z-10 flex flex-col justify-center min-h-[100vh] px-6 md:px-12 pointer-events-none">

            {/* Blue Glow Background */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none"></div>

            {/* Massive Headline */}
            <div className="overflow-hidden pb-4">
                <h1 className="text-[20vw] md:text-[7vw] leading-[1.1] font-normal tracking-tight text-black dark:text-white whitespace-nowrap">
                    <motion.div
                        custom={0}
                        initial="hidden"
                        animate="visible"
                        variants={textReveal}
                    >
                        Automating One Bot
                    </motion.div>
                </h1>
            </div>

            <div className="overflow-hidden pb-4">
                <h1 className="text-[20vw] md:text-[7vw] leading-[1.1] font-normal tracking-tight text-black dark:text-white">
                    <motion.div
                        custom={1}
                        initial="hidden"
                        animate="visible"
                        variants={textReveal}
                    >
                        At a Time.
                    </motion.div>
                </h1>
            </div>

            {/* Description Text (Bottom Right) */}
            <div className="flex justify-end mt-12 md:mt-24 pointer-events-auto">
                <motion.p
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="max-w-md text-lg md:text-xl leading-relaxed text-gray-800 dark:text-gray-400"
                >
                    Yantrika is a robotics production studio that brings your ideas to
                    life through autonomous precision and intelligent design. With our
                    talented team, we push the boundaries by solving complex engineering
                    challenges.
                </motion.p>
            </div>

        </section>
    );
}

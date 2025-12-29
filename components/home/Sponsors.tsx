'use client';

import { motion } from 'framer-motion';

const sponsors = ["TechCorp", "Innovate Labs", "Future Systems", "Robo Dynamics", "NVIDIA", "Boston Dynamics", "Arduino", "Raspberry Pi"];

export default function Sponsors() {
    return (
        <section className="py-20 border-y border-black/5 dark:border-white/5 overflow-hidden relative bg-transparent flex flex-col justify-center">
            
            {/* Small Header */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-400 bg-background px-4">
                    Supported By Industry Leaders
                </span>
            </div>

            {/* Gradient Fade Masks */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

            <div className="flex whitespace-nowrap mask-image:linear-gradient(to right, transparent, black 20%, black 80%, transparent)">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                    className="flex gap-20 md:gap-32 items-center pr-20 md:pr-32"
                >
                    {[...sponsors, ...sponsors, ...sponsors].map((s, i) => (
                        <h3 key={i} className="text-2xl md:text-4xl font-bold tracking-tight uppercase text-black/20 dark:text-white/10 hover:text-black/40 dark:hover:text-white/30 transition-colors cursor-default whitespace-nowrap font-sans">
                            {s}
                        </h3>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
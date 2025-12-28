'use client';

import { motion } from 'framer-motion';

const sponsors = ["TechCorp", "Innovate Labs", "Future Systems", "Robo Dynamics", "NVIDIA", "Boston Dynamics", "Arduino", "Raspberry Pi"];

export default function Sponsors() {
    return (
        <section className="py-12 border-y border-black/5 dark:border-white/5 overflow-hidden relative bg-transparent pointer-events-none select-none">

            {/* Gradient Fade Masks */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10"></div>

            <div className="flex whitespace-nowrap mask-image:linear-gradient(to right, transparent, black 10%, black 90%, transparent)">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                    className="flex gap-16 md:gap-24 items-center pr-16 md:pr-24"
                >
                    {[...sponsors, ...sponsors, ...sponsors].map((s, i) => (
                        <span key={i} className="text-lg md:text-xl font-medium tracking-[0.2em] uppercase text-black/30 dark:text-white/20 transition-colors">
                            {s}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
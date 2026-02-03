'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const testimonials = [
    {
        quote: "The intersection of hardware and software here is unmatched. It feels like a startup, not a club.",
        name: "Alex Johnson",
        role: "Club President"
    },
    {
        quote: "I learned more about embedded systems in three months here than I did in two years of classes.",
        name: "Samantha Lee",
        role: "Google Alumni"
    },
    {
        quote: "A true sanctuary for builders. If you want to build things that actually move, this is the place.",
        name: "David Chen",
        role: "Senior Engineer"
    }
];

export default function Testimonials() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <section ref={ref} className="py-16 md:py-24 lg:py-32 px-4 md:px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Centered Header */}
                <div className="text-center mb-12 md:mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="inline-block text-xs font-mono text-blue-600 dark:text-blue-400 mb-6 tracking-widest uppercase py-1 px-3 rounded-full border border-blue-500/10 bg-blue-500/5"
                    >
                        Community Feedback
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-light tracking-tight leading-[1.1] text-black dark:text-white mb-4 md:mb-6"
                    >
                        Voices from the <br className="hidden md:block" />
                        <span className="font-serif italic text-gray-400 dark:text-gray-500">Laboratory.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="max-w-2xl mx-auto text-base md:text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed"
                    >
                        Hear from the engineers, designers, and builders who have found their home in the chaos of creation.
                    </motion.p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 + (i * 0.1) }}
                            viewport={{ once: true }}
                            className="group relative flex flex-col justify-between p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-[2rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-blue-500/20 dark:hover:border-blue-400/20 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500"
                        >
                            {/* Gradient Overlay on Hover */}
                            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                {/* Large Quote Icon */}
                                <div className="mb-6 text-6xl font-serif text-blue-500/20 dark:text-blue-400/20 group-hover:text-blue-500/40 transition-colors duration-300">
                                    &ldquo;
                                </div>

                                {/* Quote */}
                                <p className="text-base md:text-lg lg:text-xl font-medium leading-relaxed text-gray-900 dark:text-gray-100 mb-6 md:mb-8">
                                    {t.quote}
                                </p>
                            </div>

                            {/* Author */}
                            <div className="relative z-10 flex items-center gap-4 pt-8 border-t border-black/5 dark:border-white/5 group-hover:border-blue-500/10 transition-colors duration-300">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[1px] shrink-0">
                                    <div className="w-full h-full rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center text-xs font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-purple-600">
                                        {t.name.charAt(0)}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-black dark:text-white uppercase tracking-wide">
                                        {t.name}
                                    </h4>
                                    <p className="text-xs text-blue-600 dark:text-blue-400 font-mono mt-0.5">
                                        {t.role}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
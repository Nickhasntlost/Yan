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
        <section ref={ref} className="py-32 px-6 md:px-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                
                {/* Sticky Header */}
                <div className="relative h-full">
                    <div className="sticky top-32">
                        <motion.span 
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="text-xs font-mono text-blue-600 dark:text-blue-400 mb-6 block tracking-widest uppercase"
                        >
                            // Community Feedback
                        </motion.span>
                        
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-4xl md:text-6xl font-light tracking-tight leading-[1.1] text-black dark:text-white mb-8"
                        >
                            Voices from the <br />
                            <span className="font-serif italic text-gray-400 dark:text-gray-500">Laboratory.</span>
                        </motion.h2>

                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="max-w-md text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed"
                        >
                            We don't just build robots; we build engineers. Hear from the people who have thrived in the chaos of creation.
                        </motion.p>
                    </div>
                </div>

                {/* Testimonial Cards */}
                <div className="space-y-6 md:space-y-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 + (i * 0.15), type: "spring", bounce: 0.2 }}
                            className="group relative p-8 md:p-12 rounded-3xl border border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-900/10"
                        >
                            {/* Decorative Quote Mark */}
                            <span className="absolute top-8 right-10 text-8xl font-serif text-black/5 dark:text-white/5 pointer-events-none group-hover:scale-110 group-hover:text-blue-500/10 transition-all duration-500 leading-none">
                                &rdquo;
                            </span>

                            {/* Quote Text */}
                            <p className="text-xl md:text-2xl font-serif leading-relaxed text-gray-900 dark:text-gray-100 mb-10 relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                                {t.quote}
                            </p>
                            
                            {/* Author Info */}
                            <div className="flex items-center gap-5 border-t border-black/5 dark:border-white/5 pt-8">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[1px]">
                                    <div className="w-full h-full rounded-full bg-gray-100 dark:bg-zinc-900 flex items-center justify-center text-sm font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-purple-600">
                                        {t.name.charAt(0)}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold tracking-wide text-black dark:text-white uppercase">
                                        {t.name}
                                    </span>
                                    <span className="text-xs font-mono text-blue-600 dark:text-blue-400 mt-1">
                                        {t.role}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
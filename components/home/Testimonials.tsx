'use client';

import { motion } from 'framer-motion';

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
    return (
        <section className="py-24 px-6 md:px-12 bg-transparent text-foreground">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                <div>
                    <h2 className="sticky top-32 text-3xl md:text-5xl font-light tracking-tight leading-[1.1] text-black dark:text-white">
                        Voices from the <br />
                        <span className="font-normal text-gray-400 dark:text-gray-500">Laboratory.</span>
                    </h2>
                </div>

                <div className="space-y-16">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className="border-l border-black/10 dark:border-white/10 pl-8"
                        >
                            <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-800 dark:text-gray-300 mb-6 italic">
                                "{t.quote}"
                            </p>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold uppercase tracking-widest text-black dark:text-white">
                                    {t.name}
                                </span>
                                <span className="text-xs font-mono text-gray-500 mt-1">
                                    {t.role}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
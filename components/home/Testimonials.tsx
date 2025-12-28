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
        <section className="py-32 px-6 md:px-12 bg-[#050505] text-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                    <h2 className="sticky top-32 text-4xl md:text-5xl font-light tracking-tight leading-tight">
                        Voices from the <br /> <span className="text-blue-500 font-bold">Laboratory.</span>
                    </h2>
                </div>
                
                <div className="space-y-20">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className="border-l border-white/20 pl-8"
                        >
                            <p className="text-2xl md:text-3xl font-light leading-relaxed text-gray-200 mb-8">"{t.quote}"</p>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold uppercase tracking-widest text-white">{t.name}</span>
                                <span className="text-sm font-mono text-blue-500 mt-1">{t.role}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
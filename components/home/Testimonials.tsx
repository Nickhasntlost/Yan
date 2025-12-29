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
        <section className="py-32 px-6 md:px-12 bg-transparent text-foreground relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                
                {/* Sticky Header */}
                <div className="relative">
                    <div className="sticky top-32">
                        <span className="text-xs font-mono text-blue-600 dark:text-blue-400 mb-4 block">
                            // COMMUNITY FEEDBACK
                        </span>
                        <h2 className="text-4xl md:text-6xl font-light tracking-tight leading-[1.1] text-black dark:text-white mb-8">
                            Voices from the <br />
                            <span className="font-serif italic text-gray-400 dark:text-gray-500">Laboratory.</span>
                        </h2>
                        <p className="max-w-md text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                            We don't just build robots; we build engineers. Here is what our alumni and members have to say about the chaos and creation.
                        </p>
                    </div>
                </div>

                {/* Testimonial Cards */}
                <div className="space-y-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="group relative p-8 md:p-10 rounded-2xl border border-black/5 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 hover:border-black/10 dark:hover:border-white/10 transition-colors duration-300"
                        >
                            {/* Decorative Quote Mark */}
                            <span className="absolute top-6 right-8 text-6xl font-serif text-black/5 dark:text-white/5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                                &rdquo;
                            </span>

                            <p className="text-lg md:text-xl font-light leading-relaxed text-gray-800 dark:text-gray-200 mb-8 relative z-10">
                                {t.quote}
                            </p>
                            
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-80" />
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold uppercase tracking-wider text-black dark:text-white">
                                        {t.name}
                                    </span>
                                    <span className="text-xs font-mono text-gray-500">
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
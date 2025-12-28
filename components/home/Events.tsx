'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const events = [
    { title: "RoboWars 2024", date: "03 / 15", type: "Combat" },
    { title: "Computer Vision", date: "04 / 02", type: "Workshop" },
    { title: "Tech Exhibition", date: "05 / 20", type: "Showcase" },
    { title: "Drone Racing", date: "06 / 12", type: "Competition" }
];

export default function Events() {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <section className="py-24 px-6 md:px-12 bg-transparent text-foreground">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-16 pb-6 border-b border-black/5 dark:border-white/10">
                    <h2 className="text-3xl md:text-4xl font-light tracking-tight text-black dark:text-white">
                        Upcoming <span className="text-gray-400 dark:text-gray-600">Events</span>
                    </h2>
                    <span className="hidden md:block text-xs font-mono tracking-widest text-gray-400 uppercase">
                        (Scroll to Explore)
                    </span>
                </div>

                <div className="flex flex-col">
                    {events.map((e, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            className="group relative flex flex-col md:flex-row justify-between items-center py-8 border-b border-black/5 dark:border-white/5 cursor-pointer transition-all hover:bg-black/5 dark:hover:bg-white/5 px-4 rounded-lg"
                        >
                            <span className="text-xs font-mono text-blue-600 dark:text-blue-400 mb-2 md:mb-0 md:w-1/4">
                                0{i + 1} &mdash; {e.type}
                            </span>

                            <h3 className="text-2xl md:text-3xl font-normal tracking-tight text-gray-800 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
                                {e.title}
                            </h3>

                            <span className="text-sm font-light text-gray-500 md:w-1/4 text-right mt-2 md:mt-0 font-mono">
                                {e.date}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
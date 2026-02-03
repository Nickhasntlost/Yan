'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react'; // Ensure you have lucide-react or use a simple SVG

const events = [
    { title: "RoboWars 2024", date: "03 / 15", type: "Combat" },
    { title: "Computer Vision", date: "04 / 02", type: "Workshop" },
    { title: "Tech Exhibition", date: "05 / 20", type: "Showcase" },
    { title: "Drone Racing", date: "06 / 12", type: "Competition" }
];

export default function Events() {
    const [hovered, setHovered] = useState<number | null>(null);

    // Only show the first 3 events on the home page
    const visibleEvents = events.slice(0, 3);

    return (
        <section className="py-24 px-6 md:px-12 bg-transparent text-foreground relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 pb-4 md:pb-6 border-b border-black/5 dark:border-white/10">
                    <h2 className="text-2xl md:text-3xl lg:text-5xl font-light tracking-tight text-black dark:text-white mb-2 md:mb-0">
                        Upcoming <span className="text-gray-400 dark:text-gray-600">Events</span>
                    </h2>
                    <span className="hidden md:block text-xs font-mono tracking-widest text-gray-400 uppercase">
                        (Sync Your Calendar)
                    </span>
                </div>

                <div className="flex flex-col">
                    {visibleEvents.map((e, i) => (
                        <Link href="/events" key={i} className="block group">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered(null)}
                                className="relative flex flex-col md:flex-row justify-between items-center py-10 border-b border-black/5 dark:border-white/5 transition-all duration-300 hover:px-4"
                            >
                                {/* Hover Background */}
                                <div className="absolute inset-0 bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg -z-10" />

                                <span className="text-xs font-mono text-blue-600 dark:text-blue-400 mb-2 md:mb-0 md:w-1/4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500/50"></span>
                                    0{i + 1} &mdash; {e.type}
                                </span>

                                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-gray-800 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white transition-colors duration-300 text-center md:text-left">
                                    {e.title}
                                </h3>

                                <div className="flex items-center justify-end gap-4 md:w-1/4 mt-2 md:mt-0">
                                    <span className="text-sm font-light text-gray-500 font-mono">
                                        {e.date}
                                    </span>
                                    {/* Arrow Icon that slides in */}
                                    <motion.span
                                        animate={{ x: hovered === i ? 0 : -10, opacity: hovered === i ? 1 : 0 }}
                                        className="hidden md:block text-black dark:text-white"
                                    >
                                        &rarr;
                                    </motion.span>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* View More Button */}
                <div className="mt-12 flex justify-center md:justify-end">
                    <Link href="/events">
                        <button className="group relative px-8 py-3 bg-transparent border border-black/10 dark:border-white/10 rounded-full overflow-hidden transition-all hover:border-black/30 dark:hover:border-white/30">
                            <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-black dark:bg-white transition-transform duration-300 ease-in-out" />
                            <span className="relative font-mono text-sm tracking-widest uppercase group-hover:text-white dark:group-hover:text-black transition-colors duration-300">
                                View Full Schedule
                            </span>
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
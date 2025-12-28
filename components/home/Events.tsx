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
        <section className="py-32 px-6 md:px-12 bg-[#0a0a0a] text-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-20 border-b border-white/10 pb-6">
                    <h2 className="text-4xl md:text-5xl font-light tracking-tight">Recent <span className="text-gray-500">Events</span></h2>
                    <span className="hidden md:block text-sm font-mono text-gray-500">(SCROLL TO EXPLORE)</span>
                </div>

                <div className="flex flex-col">
                    {events.map((e, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            className="group relative flex flex-col md:flex-row justify-between items-center py-12 border-b border-white/10 cursor-pointer transition-colors hover:bg-white/5 px-4"
                        >
                            <span className="text-sm font-mono text-blue-500 mb-2 md:mb-0 md:w-1/4">0{i + 1} &mdash; {e.type}</span>
                            
                            <h3 className={`text-4xl md:text-6xl font-medium tracking-tighter transition-all duration-500 ${hovered === i ? 'translate-x-4 text-white' : 'text-gray-400'}`}>
                                {e.title}
                            </h3>

                            <span className="text-lg font-light text-gray-500 md:w-1/4 text-right mt-2 md:mt-0">{e.date}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
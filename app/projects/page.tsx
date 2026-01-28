"use client";

import React, { useState } from "react";
import BackgroundShapes from "@/components/home/BackgroundShapes";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowRight, Cpu, Zap, Activity } from "lucide-react";
import Image from "next/image";
import HeroSection from "@/components/ui/HeroSection";

// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
};

const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

// --- DATA ---
const categories = ["All", "Combat", "AI/ML", "Utility", "Drones"];

const projects = [
    {
        id: 1,
        title: "IronClad X1",
        category: "Combat",
        image: "https://placehold.co/800x600/1a1a1a/FFF?text=IronClad+X1",
        desc: "A 60kg spinner bot designed for high-impact arena combat. Features titanium armor and a custom BLDC drive system.",
        stats: { speed: "20mph", weight: "60kg", weapon: "Spinner" }
    },
    {
        id: 2,
        title: "NeuroNav",
        category: "AI/ML",
        image: "https://placehold.co/800x600/1a1a1a/FFF?text=NeuroNav",
        desc: "Autonomous navigation system using SLAM and deep learning for obstacle avoidance in unknown environments.",
        stats: { stack: "PyTorch", sensor: "LiDAR", latency: "12ms" }
    },
    {
        id: 3,
        title: "SkyWarden",
        category: "Drones",
        image: "https://placehold.co/800x600/1a1a1a/FFF?text=SkyWarden",
        desc: "Long-endurance surveillance drone with thermal imaging capabilities and swarm coordination protocols.",
        stats: { flightTime: "45min", range: "5km", payload: "2kg" }
    },
    {
        id: 4,
        title: "AgriBot Mark II",
        category: "Utility",
        image: "https://placehold.co/800x600/1a1a1a/FFF?text=AgriBot",
        desc: "Automated planting and soil analysis rover powered by solar energy for sustainable precision agriculture.",
        stats: { battery: "Solar", efficiency: "98%", terrain: "All" }
    },
    {
        id: 5,
        title: "Valkyrie",
        category: "Combat",
        image: "https://placehold.co/800x600/1a1a1a/FFF?text=Valkyrie",
        desc: "Drum spinner combat robot with a low profile chassis and inverted driving capabilities.",
        stats: { speed: "15mph", weight: "30kg", weapon: "Drum" }
    },
    {
        id: 6,
        title: "GestureArm",
        category: "Utility",
        image: "https://placehold.co/800x600/1a1a1a/FFF?text=GestureArm",
        desc: "6-DOF robotic arm controlled via a wearable glove interface, mimicking human hand movements in real-time.",
        stats: { dof: "6", control: "Haptic", precision: "0.5mm" }
    }
];

// --- COMPONENTS ---

const FilterTabs = ({ active, setActive }: { active: string; setActive: (c: string) => void }) => {
    return (
        <div className="flex flex-wrap gap-2 mb-12 justify-center md:justify-start">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActive(cat)}
                    className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all border ${active === cat
                        ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-900/20"
                        : "bg-white/5 border-white/10 text-gray-500 hover:bg-white/10 hover:border-white/20 dark:text-gray-400"
                        }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
};

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="group relative bg-white/5 dark:bg-zinc-900/40 border border-gray-200 dark:border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm hover:border-blue-500/30 transition-colors"
        >
            {/* Image Area */}
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />

                {/* Category Badge */}
                <span className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold tracking-widest text-blue-400 uppercase">
                    {project.category}
                </span>
            </div>

            {/* Content Area */}
            <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                        {project.title}
                    </h3>
                    <motion.div
                        whileHover={{ x: 5 }}
                        className="p-2 rounded-full bg-white/5 text-gray-400 group-hover:text-blue-500 group-hover:bg-blue-500/10 transition-colors cursor-pointer"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </motion.div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                    {project.desc}
                </p>

                {/* Mini Stats (Dynamic Keys) */}
                <div className="flex gap-4 border-t border-gray-200 dark:border-white/5 pt-6">
                    {Object.entries(project.stats).map(([label, value], i) => (
                        <div key={i} className="flex flex-col">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</span>
                            <span className="text-sm font-semibold text-gray-800 dark:text-white capitalize">{value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default function Projects() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = activeCategory === "All"
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <main className="relative w-full min-h-screen bg-background text-foreground font-sans selection:bg-blue-500/30 overflow-hidden pt-38">
            <BackgroundShapes />

            {/* HERO SECTION */}
            <HeroSection
                tag="Our Portfolio"
                title="Engineering the"
                subTitle="Impossible."
                description="Explore our latest innovations, from destructive combat bots to life-saving autonomous drones."
            />

            {/* PROJECTS GRID */}
            <section className="relative pb-32 px-6 md:px-12 max-w-[1400px] mx-auto z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <FilterTabs active={activeCategory} setActive={setActiveCategory} />
                </motion.div>

                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </section>

            {/* LEARNING LAB SECTION */}
            <section className="relative pb-32 px-6 md:px-12 max-w-[1400px] mx-auto z-10">
                <div className="mb-16 border-t border-gray-200 dark:border-white/10 pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                    >
                        <div>
                            <span className="text-sm font-bold tracking-[0.25em] uppercase text-blue-600 dark:text-blue-500 mb-2 block">
                                The Learning Lab
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                                Experimental <span className="text-gray-400 font-serif italic font-light">Prototypes</span>
                            </h2>
                        </div>
                        <p className="max-w-md text-gray-500 dark:text-gray-400 leading-relaxed">
                            A playground for our unfinished ideas, research concepts, and initial prototypes where we learn by doing.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        {
                            title: "Robotic Arm Prototype",
                            desc: "6-axis manipulator designed for studying inverse kinematics and path planning algorithms. Built with custom 3D printed parts and high-torque servos.",
                            tags: ["C++", "Kinematics", "Servo Control"],
                            image: "https://placehold.co/800x600/1e293b/FFF?text=Robo+Arm"
                        },
                        {
                            title: "Line Follower Beta",
                            desc: "High-speed line tracking bot using PID control loop and custom IR sensor array. Optimized for sub-millisecond response times.",
                            tags: ["Embedded C", "PID", "PCB Design"],
                            image: "https://placehold.co/800x600/1e293b/FFF?text=Line+Follower"
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="group relative h-[400px] rounded-[2.5rem] overflow-hidden border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-zinc-900/50"
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                            <div className="absolute bottom-0 left-0 w-full p-10">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md text-white border border-white/10">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-gray-300 line-clamp-2 leading-relaxed">{item.desc}</p>
                            </div>

                            <button className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                                <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>

        </main>
    );
}

"use client";

import React, { useState } from "react";
import BackgroundShapes from "@/components/home/BackgroundShapes";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowRight, Cpu, Zap, Activity, X } from "lucide-react";
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
        title: "Line Follower",
        category: "Autonomous Robotics",
        image: "https://placehold.co/800x600/1a1a1a/FFF?text=Line+Follower",
        desc: "An autonomous mobile robot designed to follow a predefined path using infrared sensor arrays. Implements PID control for smooth and accurate line tracking, commonly used in robotics competitions and control-system experimentation.",
        stats: {
            controller: "PID",
            sensors: "IR Array",
            speed: "Adjustable",
            platform: "Differential Drive"
        }
    },
    {
        id: 2,
        title: "Maze Solver",
        category: "AI/Algorithms",
        image: "https://placehold.co/800x600/1a1a1a/FFF?text=Maze+Solver",
        desc: "An intelligent robot capable of navigating unknown mazes using algorithms such as Flood Fill, BFS, or DFS. Designed to learn optimal paths and reach targets efficiently through real-time decision making.",
        stats: {
            algorithm: "Flood Fill / BFS",
            sensors: "IR / Ultrasonic",
            learning: "Adaptive",
            application: "Autonomous Navigation"
        }
    },
    {
        id: 3,
        title: "Robosoccer",
        category: "Multi-Robot Systems",
        image: "https://placehold.co/800x600/1a1a1a/FFF?text=RoboSoccer",
        desc: "A team-based robotic system designed to play soccer autonomously. Focuses on coordination, real-time vision processing, ball tracking, and strategic movement among multiple robots.",
        stats: {
            vision: "Camera-based",
            control: "Wireless",
            teamSize: "Multi-Robot",
            strategy: "Cooperative AI"
        }
    },
    {
        id: 4,
        title: "RoboSumo",
        category: "Combat Robotics",
        image: "https://placehold.co/800x600/1a1a1a/FFF?text=RoboSumo",
        desc: "A compact combat robot designed to push opponents out of a sumo ring. Optimized for high torque, fast response, and opponent detection using edge and proximity sensors.",
        stats: {
            weightClass: "Mini / Micro",
            drive: "High Torque DC Motors",
            sensors: "IR / Edge Sensors",
            strategy: "Push & Evade"
        }
    },
    {
        id: 6,
        title: "GestureArm",
        category: "Human-Robot Interaction",
        image: "https://placehold.co/800x600/1a1a1a/FFF?text=GestureArm",
        desc: "A 6-DOF robotic arm controlled using hand gestures captured through a wearable glove or vision-based system. Designed to replicate human hand movements in real time for intuitive manipulation and teleoperation tasks.",
        stats: {
            dof: "6",
            control: "Gesture / Haptic",
            interface: "Glove / Vision",
            precision: "High"
        }
    }


];

const labProjects = [
    {
        id: "lab-1",
        title: "Rotrics DexArm",
        desc: "A multifunctional 4-axis desktop robotic arm kit designed for education, prototyping, automation, and creative projects. It supports interchangeable toolheads—like 3D printing, laser engraving, drawing/writing, suction gripper, and more—controlled via the all-in-one Rotrics Studio software for motion control, G-code generation, and visual programming. The arm provides high repeatability and flexibility for diverse tasks on Windows, Mac, or Linux platforms.",
        tags: ["C++", "Robotics", "Motion Control", "Rotrics Studio Software", "Modular Toolheads"],
        image: "https://placehold.co/800x600/1e293b/FFF?text=Rotrics+DexArm"
    },
    {
        id: "lab-2",
        title: "Yasaka",
        desc: "An advanced industrial robotic arm from Yasaka Robotics, engineered for precision automation in manufacturing applications such as material handling, assembly, welding, and palletizing. Built with high-precision servomotors and rigid reducers, this robot features a compact, flexible mechanical structure optimized for high reliability, cost-effective deployment, and seamless human-machine integration in factory-level automation workflows.",
        tags: ["Industrial Robotics", "Automation", "Servo Control", "Precision Engineering", "Manufacturing Systems"],
        image: "https://placehold.co/800x600/1e293b/FFF?text=Yasaka+Robot+Arm"
    },
    {
        id: "lab-3",
        title: "FireBird V",
        desc: "A robotic research and learning platform based on the ATmega2560 microcontroller, widely used in embedded systems and robotics education. FireBird V integrates multiple sensors (line sensors, IR range sensors, encoders, LCD, buzzer) and supports motion control via PWM, interrupts, and analog/digital interfacing, enabling experimentation with navigation, sensor integration, and control algorithms.",
        tags: ["Embedded C", "Microcontrollers", "Sensors", "PWM & Control", "Robotics Education"],
        image: "https://placehold.co/800x600/1e293b/FFF?text=FireBird+V"
    },
    {
        id: "lab-4",
        title: "Duckiebot",
        desc: "A minimal autonomy robotic platform from the Duckietown project for studying autonomous driving, perception, and navigation. Duckiebots use onboard computers (like Raspberry Pi or NVIDIA Jetson Nano), cameras, wheel encoders, and additional sensors to perceive and navigate modular road environments. The platform is popular in robotics research and AI education for tasks such as lane following, object detection, and decentralized decision-making.",
        tags: ["Python", "ROS", "Computer Vision", "Autonomous Systems", "Robot Navigation"],
        image: "https://placehold.co/800x600/1e293b/FFF?text=Duckiebot"
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

const ProjectCard = ({ project, onClick }: { project: typeof projects[0]; onClick: () => void }) => {
    return (
        <motion.div
            layoutId={`transport-card-${project.id}`}
            onClick={onClick}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="group relative bg-white/5 dark:bg-zinc-900/40 border border-gray-200 dark:border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm hover:border-blue-500/30 transition-colors cursor-pointer"
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
                        className="p-2 rounded-full bg-white/5 text-gray-400 group-hover:text-blue-500 group-hover:bg-blue-500/10 transition-colors"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </motion.div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
                    {project.desc}
                </p>

                {/* Mini Stats (Dynamic Keys) */}
                <div className="flex gap-4 border-t border-gray-200 dark:border-white/5 pt-6">
                    {Object.entries(project.stats).slice(0, 3).map(([label, value], i) => (
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
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [selectedLabId, setSelectedLabId] = useState<string | null>(null);

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
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onClick={() => setSelectedId(project.id)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </section>

            {/* PROJECT DETAIL OVERLAY */}
            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedId(null)}
                    >
                        <motion.div
                            layoutId={`transport-card-${selectedId}`}
                            className="relative w-full max-w-4xl bg-[#1a1a1a] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 hover:bg-white/10 text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 h-full max-h-[80vh] overflow-y-auto">
                                <div className="relative h-64 md:h-auto min-h-[300px]">
                                    <Image
                                        src={projects.find(p => p.id === selectedId)?.image || ""}
                                        alt="Project Detail"
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent md:bg-gradient-to-r" />
                                </div>

                                <div className="p-8 md:p-12 flex flex-col">
                                    <span className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-2">
                                        {projects.find(p => p.id === selectedId)?.category}
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                        {projects.find(p => p.id === selectedId)?.title}
                                    </h2>

                                    <p className="text-gray-400 leading-relaxed mb-8">
                                        {projects.find(p => p.id === selectedId)?.desc}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 mt-auto">
                                        {Object.entries(projects.find(p => p.id === selectedId)?.stats || {}).map(([key, value]) => (
                                            <div key={key} className="bg-white/5 p-4 rounded-xl border border-white/5">
                                                <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">{key}</div>
                                                <div className="text-white font-semibold">{value}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 pt-8 border-t border-white/10">
                                        <button className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-wide transition-all shadow-lg shadow-blue-900/20">
                                            View Full Case Study
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

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
                    {labProjects.map((item, i) => (
                        <motion.div
                            layoutId={`lab-card-${item.id}`}
                            onClick={() => setSelectedLabId(item.id)}
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="group relative h-[400px] rounded-[2.5rem] overflow-hidden border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-zinc-900/50 cursor-pointer"
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
                                <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-gray-300 line-clamp-2 leading-relaxed">{item.desc}</p>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md text-white border border-white/10">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                                <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* LEARNING LAB DETAIL OVERLAY */}
            <AnimatePresence>
                {selectedLabId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedLabId(null)}
                    >
                        <motion.div
                            layoutId={`lab-card-${selectedLabId}`}
                            className="relative w-full max-w-4xl bg-[#1a1a1a] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedLabId(null)}
                                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 hover:bg-white/10 text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 h-full max-h-[80vh] overflow-y-auto">
                                <div className="relative h-64 md:h-auto min-h-[300px]">
                                    <Image
                                        src={labProjects.find(p => p.id === selectedLabId)?.image || ""}
                                        alt="Lab Project Detail"
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent md:bg-gradient-to-r" />
                                </div>

                                <div className="p-8 md:p-12 flex flex-col">
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {labProjects.find(p => p.id === selectedLabId)?.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 text-blue-400 border border-blue-500/20">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                        {labProjects.find(p => p.id === selectedLabId)?.title}
                                    </h2>

                                    <p className="text-gray-400 leading-relaxed mb-8">
                                        {labProjects.find(p => p.id === selectedLabId)?.desc}
                                    </p>

                                    <div className="mt-auto pt-8 border-t border-white/10">
                                        <button className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-wide transition-all shadow-lg shadow-blue-900/20">
                                            View Documentation
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </main>
    );
}

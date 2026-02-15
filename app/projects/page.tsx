"use client";

import React, { useState, useEffect } from "react";
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


interface ProjectAttributes {
    _id: string;
    id?: number | string;
    title: string;
    category: string;
    image: string;
    desc: string;
    stats: Record<string, string>;
}

interface LabProjectAttributes {
    _id: string;
    id?: string;
    title: string;
    desc: string;
    tags: string[];
    image: string;
}

// Projects data is now fetched from the API


// Lab projects data is now fetched from the API
// --- COMPONENTS ---



const ProjectCard = ({ project, onClick }: { project: ProjectAttributes; onClick: () => void }) => {
    return (
        <motion.div
            layoutId={`transport-card-${project._id || project.id}`}
            onClick={onClick}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="group relative bg-white/5 dark:bg-zinc-900/40 border border-gray-200 dark:border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm hover:border-blue-500/30 transition-colors cursor-pointer"
        >
            {/* Image Area */}
            <div className="relative h-48 md:h-64 overflow-hidden">
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
            <div className="p-5 md:p-8">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
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
    const [projects, setProjects] = useState<ProjectAttributes[]>([]);
    const [labProjects, setLabProjects] = useState<LabProjectAttributes[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedId, setSelectedId] = useState<string | number | null>(null);
    const [selectedLabId, setSelectedLabId] = useState<string | null>(null);

    const [config, setConfig] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const [projectsRes, labProjectsRes, configRes] = await Promise.all([
                    fetch("/api/projects"),
                    fetch("/api/lab-projects"),
                    fetch("/api/site-config")
                ]);
                const projectsData = await projectsRes.json();
                const labProjectsData = await labProjectsRes.json();
                const configData = await configRes.json();

                setProjects(projectsData);
                setLabProjects(labProjectsData);
                setConfig(configData);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch data", error);
                setLoading(false);
            }
        }
        fetchData();
    }, []);



    if (loading) {
        return <div className="text-center py-40 text-white min-h-screen pt-38">Loading projects...</div>;
    }

    return (
        <main className="relative w-full min-h-screen bg-background text-foreground font-sans selection:bg-blue-500/30 overflow-hidden pt-38">
            <BackgroundShapes />

            {/* HERO SECTION */}
            <HeroSection
                tag={config?.projects?.hero?.tag || "Our Portfolio"}
                title={config?.projects?.hero?.title || "Engineering the"}
                subTitle={config?.projects?.hero?.subTitle || "Impossible."}
                description={config?.projects?.hero?.description || "Explore our latest innovations, from destructive combat bots to life-saving autonomous drones."}
                compact={true}
                enableGradientHover={true}
            />

            {/* PROJECTS GRID */}
            <section className="relative pb-16 md:pb-32 px-4 md:px-6 lg:px-12 max-w-[1400px] mx-auto z-10">


                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                    <AnimatePresence mode="popLayout">
                        {projects.map((project) => (
                            <ProjectCard
                                key={project._id || project.id}
                                project={project}
                                onClick={() => setSelectedId((project._id || project.id) ?? null)}
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
                        className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 lg:p-8 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedId(null)}
                    >
                        <motion.div
                            layoutId={`transport-card-${selectedId}`}
                            className="relative w-full max-w-4xl bg-[#1a1a1a] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 hover:bg-white/10 text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 h-full max-h-[80vh] overflow-y-auto">
                                <div className="relative h-48 md:h-64 lg:h-auto min-h-[200px] md:min-h-[300px]">
                                    <Image
                                        src={projects.find(p => (p._id || p.id) === selectedId)?.image || ""}
                                        alt="Project Detail"
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent md:bg-gradient-to-r" />
                                </div>

                                <div className="p-5 md:p-8 lg:p-12 flex flex-col">
                                    <span className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-2">
                                        {projects.find(p => (p._id || p.id) === selectedId)?.category}
                                    </span>
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">
                                        {projects.find(p => (p._id || p.id) === selectedId)?.title}
                                    </h2>

                                    <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-6 md:mb-8">
                                        {projects.find(p => (p._id || p.id) === selectedId)?.desc}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 mt-auto">
                                        {Object.entries(projects.find(p => (p._id || p.id) === selectedId)?.stats || {}).map(([key, value]) => (
                                            <div key={key} className="bg-white/5 p-3 md:p-4 rounded-xl border border-white/5">
                                                <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">{key}</div>
                                                <div className="text-white font-semibold">{value}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 pt-8 border-t border-white/10">
                                        <button className="w-full py-3 md:py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-wide transition-all shadow-lg shadow-blue-900/20 text-sm md:text-base">
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
            <section className="relative pb-16 md:pb-32 px-4 md:px-6 lg:px-12 max-w-[1400px] mx-auto z-10">
                <div className="mb-10 md:mb-16 border-t border-gray-200 dark:border-white/10 pt-12 md:pt-20">
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
                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                                Experimental <span className="text-gray-400 font-serif italic font-light">Prototypes</span>
                            </h2>
                        </div>
                        <p className="max-w-md text-gray-500 dark:text-gray-400 leading-relaxed">
                            A playground for our unfinished ideas, research concepts, and initial prototypes where we learn by doing.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-15">
                    {labProjects.map((item, i) => (
                        <motion.div
                            layoutId={`lab-card-${item._id || item.id}`}
                            onClick={() => setSelectedLabId((item._id || item.id) ?? null)}
                            key={item._id || item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="group relative h-[350px] rounded-[2.5rem] overflow-hidden border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-zinc-900/50 cursor-pointer"
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
                                        src={labProjects.find(p => (p._id || p.id) === selectedLabId)?.image || ""}
                                        alt="Lab Project Detail"
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent md:bg-gradient-to-r" />
                                </div>

                                <div className="p-8 md:p-12 flex flex-col">
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {labProjects.find(p => (p._id || p.id) === selectedLabId)?.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 text-blue-400 border border-blue-500/20">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                        {labProjects.find(p => (p._id || p.id) === selectedLabId)?.title}
                                    </h2>

                                    <p className="text-gray-400 leading-relaxed mb-8">
                                        {labProjects.find(p => (p._id || p.id) === selectedLabId)?.desc}
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

"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
    useSpring,
    useMotionValue,
    useMotionTemplate
} from "framer-motion";
import {
    Github,
    Linkedin,
    Mail,
    X,
    ArrowUpRight,
    Cpu,
    Globe
} from "lucide-react";
import BackgroundShapes from "@/components/home/BackgroundShapes";
import HeroSection from "@/components/ui/HeroSection";

// --- TYPE DEFINITION ---
interface TeamMember {
    _id?: string;
    id?: string;
    name: string;
    role: string;
    department: string;
    image: string;
    bio: string;
    socials: { linkedin?: string; github?: string; mail?: string };
    stats: { exp: string; projects: string; awards: string };
}

// --- 3D TILT CARD COMPONENT ---
const TiltCard = ({ children, onClick, layoutId, className }: any) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [5, -5]);
    const rotateY = useTransform(x, [-100, 100], [-5, 5]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct * 200);
        y.set(yPct * 200);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            layoutId={layoutId}
            onClick={onClick}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`relative cursor-pointer group ${className}`}
        >
            {children}
        </motion.div>
    );
};

// --- MAIN PAGE ---
export default function CoreTeamPage() {
    const [coreTeam, setCoreTeam] = useState<any[]>([]);
    const [config, setConfig] = useState<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    useEffect(() => {
        Promise.all([
            fetch("/api/core-team").then((r) => r.json()),
            fetch("/api/site-config").then((r) => r.json())
        ]).then(([teamData, configData]) => {
            setCoreTeam(teamData);
            setConfig(configData);
        });
    }, []);

    // Lock scroll when modal is open
    useEffect(() => {
        if (selectedMember) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "unset";
    }, [selectedMember]);

    return (
        <main ref={containerRef} className="relative w-full min-h-screen bg-background text-foreground selection:bg-blue-500/30 font-sans transition-colors duration-300 pt-32">
            <BackgroundShapes />

            {/* Cinematic Grain Overlay */}
            <div className="fixed inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none z-[1] mix-blend-overlay"
                style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}></div>

            {/* 1. HERO SECTION */}
            <HeroSection
                tag={config?.team?.hero?.tag || "WHO WE ARE"}
                title={config?.team?.hero?.title || "Core"}
                subTitle={config?.team?.hero?.subTitle || "Leadership"}
                description={config?.team?.hero?.description || "We are the engineers of the impossible. A collective of visionaries building the autonomous future, one line of code and one servo at a time."}
                scrollText="SCROLL TO EXPLORE"
                compact={true}
            />

            {/* 2. GALLERY GRID */}
            <section className="relative px-4 md:px-6 pb-20 md:pb-40 z-10 space-y-8 md:space-y-12"> {/* Added space-y-12 for separation */}

                {/* LEADERSHIP ROW (First 2 Members) */}
                <div className="max-w-[850px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
                    {coreTeam.slice(0, 2).map((member) => (
                        <TiltCard
                            key={member._id}
                            layoutId={`card-${member._id}`}
                            onClick={() => setSelectedMember(member)}
                            className="h-[350px] sm:h-[400px] md:h-[500px] perspective-1000"
                        >
                            <motion.div
                                layoutId={`image-container-${member._id}`}
                                className="absolute inset-0 bg-white dark:bg-[#0a0a0a] rounded-[2rem] overflow-hidden border border-zinc-200 dark:border-white/5 group-hover:border-zinc-300 dark:group-hover:border-white/20 transition-colors duration-500 shadow-xl dark:shadow-none"
                            >
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover opacity-90 dark:opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent dark:from-black dark:via-black/20 dark:to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />

                                {/* Floating Info */}
                                <div className="absolute bottom-0 left-0 w-full p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <motion.p layoutId={`role-${member._id}`} className="text-blue-600 dark:text-blue-400 font-mono text-xs uppercase tracking-widest mb-2">
                                        {member.role}
                                    </motion.p>
                                    <motion.h3 layoutId={`name-${member._id}`} className="text-xl md:text-[26px] font-bold text-zinc-900 dark:text-white mb-1 whitespace-nowrap tracking-tight">
                                        {member.name}
                                    </motion.h3>
                                    <div className="h-[1px] w-0 group-hover:w-full bg-zinc-900/30 dark:bg-white/30 transition-all duration-700 ease-out" />
                                </div>

                                {/* Top Right Icon */}
                                <div className="absolute top-6 right-6 w-12 h-12 rounded-full border border-black/10 dark:border-white/20 flex items-center justify-center bg-white/50 dark:bg-black/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                                    <ArrowUpRight className="w-5 h-5" />
                                </div>
                            </motion.div>
                        </TiltCard>
                    ))}
                </div>

                {/* MEMBERS GRID (Remaining Members) */}
                <div className="max-w-[1136px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
                    {coreTeam.slice(2).map((member) => (
                        <TiltCard
                            key={member._id}
                            layoutId={`card-${member._id}`}
                            onClick={() => setSelectedMember(member)}
                            className="h-[350px] sm:h-[400px] md:h-[500px] perspective-1000"
                        >
                            <motion.div
                                layoutId={`image-container-${member._id}`}
                                className="absolute inset-0 bg-white dark:bg-[#0a0a0a] rounded-[2rem] overflow-hidden border border-zinc-200 dark:border-white/5 group-hover:border-zinc-300 dark:group-hover:border-white/20 transition-colors duration-500 shadow-xl dark:shadow-none"
                            >
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover opacity-90 dark:opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent dark:from-black dark:via-black/20 dark:to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />

                                {/* Floating Info */}
                                <div className="absolute bottom-0 left-0 w-full p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <motion.p layoutId={`role-${member._id}`} className="text-blue-600 dark:text-blue-400 font-mono text-xs uppercase tracking-widest mb-2">
                                        {member.role}
                                    </motion.p>
                                    <motion.h3 layoutId={`name-${member._id}`} className="text-xl md:text-[26px] font-bold text-zinc-900 dark:text-white mb-1 whitespace-nowrap tracking-tight">
                                        {member.name}
                                    </motion.h3>
                                    <div className="h-[1px] w-0 group-hover:w-full bg-zinc-900/30 dark:bg-white/30 transition-all duration-700 ease-out" />
                                </div>

                                {/* Top Right Icon */}
                                <div className="absolute top-6 right-6 w-12 h-12 rounded-full border border-black/10 dark:border-white/20 flex items-center justify-center bg-white/50 dark:bg-black/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                                    <ArrowUpRight className="w-5 h-5" />
                                </div>
                            </motion.div>
                        </TiltCard>
                    ))}
                </div>
            </section>


            {/* 3. EXPANDED MODAL */}
            <AnimatePresence>
                {selectedMember && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedMember(null)}
                            className="fixed inset-0 bg-white/90 dark:bg-black/90 backdrop-blur-2xl z-50 cursor-pointer"
                        />

                        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 pointer-events-none">
                            <motion.div
                                layoutId={`card-${selectedMember._id}`}
                                className="w-full max-w-6xl h-[90vh] md:h-[85vh] bg-white dark:bg-[#0c0c0c] rounded-2xl md:rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-zinc-200 dark:border-white/10 pointer-events-auto relative"
                            >
                                {/* Close Button */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); setSelectedMember(null); }}
                                    className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-md border border-black/10 dark:border-white/10 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group"
                                >
                                    <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
                                </button>

                                {/* Left: Image Hero */}
                                <motion.div
                                    layoutId={`image-container-${selectedMember._id}`}
                                    className="w-full md:w-5/12 h-[40vh] md:h-full relative overflow-hidden"
                                >
                                    <Image
                                        src={selectedMember.image}
                                        alt={selectedMember.name}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white/80 via-transparent to-transparent dark:from-black/80 dark:via-transparent dark:to-transparent" />
                                </motion.div>

                                {/* Right: Content */}
                                <div className="w-full md:w-7/12 p-6 md:p-12 lg:p-20 overflow-y-auto bg-white dark:bg-[#0c0c0c] relative">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2, duration: 0.5 }}
                                    >
                                        <motion.span layoutId={`role-${selectedMember._id}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 font-mono text-xs uppercase tracking-widest mb-8">
                                            <Cpu className="w-3 h-3" />
                                            {selectedMember.role}
                                        </motion.span>

                                        <motion.h2 layoutId={`name-${selectedMember._id}`} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-2 md:mb-4 tracking-tight">
                                            {selectedMember.name}
                                        </motion.h2>

                                        <p className="text-xl md:text-2xl lg:text-4xl text-zinc-500 dark:text-white/40 font-light mb-6 md:mb-12">{selectedMember.department}</p>

                                        <div className="grid grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-12 border-y border-zinc-100 dark:border-white/5 py-6 md:py-10">
                                            <div>
                                                <div className="text-xl md:text-2xl lg:text-4xl font-light font-serif mb-1 text-zinc-900 dark:text-white">{selectedMember.stats?.exp || "01"}+</div>
                                                <div className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-white/40">Years Exp.</div>
                                            </div>
                                            <div>
                                                <div className="text-xl md:text-2xl lg:text-4xl font-light font-serif mb-1 text-zinc-900 dark:text-white">{selectedMember.stats?.projects || "05"}</div>
                                                <div className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-white/40">Projects</div>
                                            </div>
                                            <div>
                                                <div className="text-xl md:text-2xl lg:text-4xl font-light font-serif mb-1 text-zinc-900 dark:text-white">{selectedMember.stats?.awards || "02"}</div>
                                                <div className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-white/40">Awards</div>
                                            </div>
                                        </div>

                                        <motion.p className="text-base md:text-lg text-zinc-700 dark:text-white/80 leading-relaxed font-light mb-6 md:mb-12 max-w-xl">
                                            {selectedMember.bio}
                                        </motion.p>

                                        <div className="flex gap-4">
                                            {selectedMember.socials?.linkedin && (
                                                <a href={selectedMember.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                                                    <Linkedin className="w-5 h-5" />
                                                </a>
                                            )}
                                            {selectedMember.socials?.github && (
                                                <a href={selectedMember.socials.github} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                                    <Github className="w-5 h-5" />
                                                </a>
                                            )}
                                            {selectedMember.socials?.mail && (
                                                <a href={`mailto:${selectedMember.socials.mail}`} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                                    <Mail className="w-5 h-5" />
                                                </a>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>

            {/* 4. FOOTER CTA */}
            <section className="py-40 flex justify-center z-10 relative">
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center"
                    >
                        <Globe className="w-12 h-12 text-blue-500 mb-8 opacity-50" />
                        <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8">Ready to make an impact?</h3>
                        <a href="/contact" className="group relative inline-flex items-center gap-4 px-12 py-5 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-transform hover:scale-105">
                            <span className="relative z-10">Join the Team</span>
                            <ArrowUpRight className="w-5 h-5 relative z-10 transition-transform group-hover:rotate-45" />
                            <div className="absolute inset-0 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                        </a>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
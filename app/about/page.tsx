"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, Variants, useInView, useSpring, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import { ArrowRight, Globe, Zap, Users } from "lucide-react";
import BackgroundShapes from "@/components/home/BackgroundShapes";
import HeroSection from "@/components/ui/HeroSection";

// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
};

const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

// --- HELPER COMPONENTS ---

// 1. Text Reveal Component
const RevealText = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
        <motion.div
            variants={fadeInUp}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// 2. Parallax Image Component
const ParallaxImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

    return (
        <div ref={ref} className={`overflow-hidden rounded-2xl ${className}`}>
            <motion.div style={{ y, scale }} className="w-full h-full relative">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized // <--- FIXED: Allows external SVGs to load
                />
            </motion.div>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---

// --- DATA ---
const historyData = [
    {
        year: "2023",
        title: "Club Founded",
        desc: "Started with a single line follower bot and a dream to innovate.",
        image: "https://placehold.co/800x800/e5e5e5/333?text=2023+Club+Founded"
    },
    {
        year: "2024",
        title: "National Victory",
        desc: "First gold at RoboWars Nationals, putting us on the map.",
        image: "https://placehold.co/800x800/e5e5e5/333?text=2024+Victory"
    },
    {
        year: "2026",
        title: "Tech Expo Host",
        desc: "Organizing city-wide innovation summit for young robotics enthusiasts.",
        image: "https://placehold.co/800x800/e5e5e5/333?text=2026+Expo"
    },
];

// 3. Counter Component
const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20px" });
    const springValue = useSpring(0, { duration: 2000, bounce: 0 });
    const displayValue = useTransform(springValue, (current) => Math.round(current));

    useEffect(() => {
        if (isInView) {
            springValue.set(value);
        }
    }, [isInView, value, springValue]);

    return (
        <div ref={ref} className="text-4xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white flex items-baseline">
            <motion.span>{displayValue}</motion.span>
            <span>{suffix}</span>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---

export default function About() {
    const [activeHistory, setActiveHistory] = useState(0);
    const [config, setConfig] = useState<any>(null);

    useEffect(() => {
        fetch("/api/site-config")
            .then((res) => res.json())
            .then((data) => setConfig(data?.about || {}))
            .catch((err) => console.error(err));
    }, []);

    const hero = config?.hero || {
        tag: "Who We Are",
        title: "The Architects",
        subTitle: "of Autonomy.",
        description: "Yantrika is a robotics production studio bridging the gap between human creativity and mechanical precision. We don't just build bots; we engineer the future."
    };

    const mission = config?.mission || {
        title: "Automating the \nImpossible.",
        content: "At Yantrika, our mission is to demystify robotics. We believe in \"Automating One Bot At a Time,\" fostering a community where engineering meets imagination.\n\nFrom combat robotics to autonomous navigation, our multidisciplinary approach ensures that every member gains hands-on experience in the entire product lifecycle."
    };

    return (
        <main className="relative w-full bg-background text-foreground font-sans selection:bg-blue-500/30 overflow-hidden pt-32">

            {/* Background Elements */}
            <BackgroundShapes />

            {/* 1. HERO SECTION */}
            <HeroSection
                tag={hero.tag}
                title={hero.title}
                subTitle={hero.subTitle}
                description={hero.description}
                compact={true}
            />

            {/* 2. MISSION SECTION */}
            <section className="relative py-16 md:py-32 px-4 md:px-6 lg:px-12 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left: Text Content */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <RevealText>
                            <h2 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-4">01 — Our Mission</h2>
                            <h3 className="text-3xl md:text-4xl lg:text-6xl font-medium mb-6 md:mb-8 leading-tight whitespace-pre-line">
                                {mission.title}
                            </h3>
                        </RevealText>

                        <RevealText className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed space-y-6 whitespace-pre-line">
                            <p>
                                {mission.content}
                            </p>
                        </RevealText>

                        <RevealText className="mt-10">
                            <button className="group flex items-center gap-2 text-sm font-bold border-b border-black dark:border-white pb-1 hover:opacity-70 transition-opacity">
                                READ OUR MANIFESTO
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </RevealText>
                    </motion.div>

                    {/* Right: Parallax Image */}
                    <div className="h-[400px] md:h-[500px] lg:h-[600px] w-full relative">
                        {/* Blue Glow Behind Image */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[100px]" />

                        {/* Image Wrapper */}
                        <ParallaxImage
                            src="https://placehold.co/800x1000/1a1a1a/FFF?text=Robotic+Arm+Concept"
                            alt="Robotic Arm Concept"
                            className="w-full h-full shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                </div>
            </section>

            {/* 3. STATS SECTION */}
            <section className="relative z-10 -mt-10 md:-mt-20 px-4 md:px-6 lg:px-12 pointer-events-none">
                <div className="max-w-[1200px] mx-auto pointer-events-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-2 lg:grid-cols-4 bg-white dark:bg-[#111] rounded-2xl md:rounded-[2.5rem] shadow-2xl shadow-blue-900/10 dark:shadow-blue-900/5 overflow-hidden border border-gray-100 dark:border-gray-800"
                    >
                        {[
                            { label: "Active Members", value: 120, suffix: "+", icon: Users },
                            { label: "Projects Built", value: 45, suffix: "", icon: Zap },
                            { label: "Awards Won", value: 12, suffix: "", icon: Globe },
                            { label: "Years Running", value: 3, suffix: "", icon: ArrowRight },
                        ].map((stat, i) => (
                            <div key={i} className="relative p-6 md:p-10 lg:p-12 flex flex-col items-center justify-center text-center group border-r border-b lg:border-b-0 last:border-r-0 lg:last:border-r-0 border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors duration-500">
                                <div className="mb-4 md:mb-6 p-3 md:p-4 rounded-full bg-blue-50 dark:bg-blue-500/10 group-hover:scale-110 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 transition-all duration-300">
                                    <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <Counter value={stat.value} suffix={stat.suffix} />
                                <span className="text-xs font-bold tracking-widest text-gray-400 uppercase mt-2">{stat.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>




            <section className="relative py-16 md:py-32 px-4 md:px-6 lg:px-12 max-w-[1400px] mx-auto z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left: Dynamic Image Display */}
                    <div className="h-[350px] md:h-[400px] lg:h-[500px] w-full relative rounded-2xl overflow-hidden bg-gray-200 dark:bg-zinc-800 shadow-2xl order-2 lg:order-1">
                        {historyData.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{
                                    opacity: activeHistory === index ? 1 : 0,
                                    scale: activeHistory === index ? 1 : 1.1
                                }}
                                transition={{ duration: 0.6 }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Right: Hoverable List */}
                    <div className="flex flex-col justify-center pl-0 lg:pl-12 order-1 lg:order-2">
                        <span className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-8">01 — Timeline Data</span>
                        <div className="space-y-2">
                            {historyData.map((item, index) => (
                                <div
                                    key={index}
                                    onMouseEnter={() => setActiveHistory(index)}
                                    className={`group cursor-pointer p-8 rounded-xl transition-all duration-300 border border-transparent ${activeHistory === index ? "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 shadow-lg scale-105" : "hover:bg-gray-100 dark:hover:bg-zinc-900/50 opacity-50 hover:opacity-100"}`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-3xl font-bold">{item.year}</h3>
                                        <ArrowRight className={`w-5 h-5 transition-transform ${activeHistory === index ? "opacity-100 -rotate-45 text-blue-600" : "opacity-0"}`} />
                                    </div>
                                    <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">{item.title}</h4>
                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. FACULTY MENTOR CARD */}
            <section className="py-12 md:py-20 px-4 md:px-6 lg:px-12 max-w-[1200px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative bg-white dark:bg-[#111] rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-16 overflow-hidden border border-gray-100 dark:border-gray-800 shadow-2xl"
                >
                    {/* Internal Blue Glow */}
                    <div className="absolute top-[-50%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                        <div className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 flex-shrink-0 relative rounded-full overflow-hidden border-4 border-gray-50 dark:border-gray-800 shadow-lg">
                            <Image
                                src="https://placehold.co/400x400/2563eb/white?text=Faculty"
                                alt="Ms. Shaista Khan"
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>

                        <div className="text-center md:text-left">
                            <h2 className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-3">
                                Faculty Mentor
                            </h2>

                            <h3 className="text-2xl md:text-3xl lg:text-5xl font-medium mb-4 md:mb-6">
                                Ms. Shaista Khan
                            </h3>

                            <p className="text-base md:text-lg lg:text-xl text-gray-500 italic mb-4 md:mb-6">
                                "Engineering education is about nurturing curiosity, discipline, and the confidence to solve real-world problems."
                            </p>

                            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mx-auto md:mx-0">
                                Ms. Shaista Khan is a faculty member in the Department of Electronics and Telecommunication Engineering at VCET.
                                She mentors students in electronics, communication systems, and applied engineering projects, emphasizing strong
                                fundamentals, practical implementation, and responsible innovation.
                            </p>
                        </div>

                    </div>
                </motion.div>
            </section>

            {/* 6. BOTTOM SPACER */}
            <div className="h-32"></div>

        </main>
    );
}
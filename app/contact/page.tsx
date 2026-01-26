"use client";

import React from "react";
import BackgroundShapes from "@/components/home/BackgroundShapes";
import { motion, Variants } from "framer-motion";
import { Mail, MapPin, Phone, Send, ArrowRight } from "lucide-react";
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

// --- COMPONENTS ---

const ContactInput = ({ label, type = "text", placeholder, textarea = false }: any) => {
    return (
        <div className="mb-5 last:mb-0">
            {/* ALIGNMENT FIX: Removed ml-1 to align label flush with input border */}
            <label className="block text-[11px] font-bold tracking-[0.15em] text-gray-400 uppercase mb-2">
                {label}
            </label>
            {textarea ? (
                <textarea
                    rows={5}
                    placeholder={placeholder}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4 text-base text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
                />
            ) : (
                <input
                    type={type}
                    placeholder={placeholder}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4 text-base text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
            )}
        </div>
    );
};

const ContactInfoItem = ({ icon: Icon, title, content, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay, duration: 0.6 }}
        // ALIGNMENT FIX: Reduced padding slightly to keep it tight, added min-height
        className="flex items-center gap-6 p-6 rounded-2xl bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:bg-white dark:hover:bg-white/10 transition-all group shadow-sm hover:shadow-md"
    >
        <div className="flex-shrink-0 p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Icon className="w-5 h-5" />
        </div>
        <div>
            <h4 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">{title}</h4>
            <p className="text-lg font-medium text-gray-900 dark:text-white leading-none">{content}</p>
        </div>
    </motion.div>
);

export default function Contact() {
    return (
        <main className="relative w-full min-h-screen bg-background text-foreground font-sans selection:bg-blue-500/30 overflow-hidden">
            <BackgroundShapes />

            {/* HERO SECTION */}
            <HeroSection
                tag="Get In Touch"
                title="Let's Build the"
                subTitle="Future Together."
                description="Whether you're looking to collaborate, join the club, or just want to talk robotics — our channels are open."
            />

            {/* MAIN CONTENT SPLIT */}
            <section className="relative pb-32 px-6 md:px-12 max-w-[1400px] mx-auto z-10">
                {/* ALIGNMENT FIX: items-start allows independent heights, gap-24 is the 'pro' spacing */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* LEFT: FORM CONTAINER */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-white/80 dark:bg-zinc-900/50 backdrop-blur-2xl border border-gray-200 dark:border-white/5 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
                    >
                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

                        <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-bold mb-8">Send a Message</h3>

                            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                    <ContactInput label="First Name" placeholder="Jane" />
                                    <ContactInput label="Last Name" placeholder="Doe" />
                                </div>
                                <ContactInput label="Email" type="email" placeholder="jane@example.com" />
                                <ContactInput label="Subject" placeholder="Project Inquiry" />
                                <ContactInput label="Message" textarea placeholder="Tell us about your project..." />

                                <div className="pt-6">
                                    <button className="w-full bg-[#111] dark:bg-white text-white dark:text-black font-bold tracking-widest uppercase py-4 rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 group shadow-lg">
                                        Send Message
                                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>

                    {/* RIGHT: INFO & MAP */}
                    {/* ALIGNMENT FIX: Removed padding-top so Top of Form aligns with Top of Info */}
                    <div className="flex flex-col h-full justify-between gap-8">

                        {/* INFO CARDS STACK */}
                        <div className="space-y-4">
                            <ContactInfoItem
                                icon={Mail}
                                title="Email Us"
                                content="hello@yantrika.robotics"
                                delay={0.1}
                            />
                            <ContactInfoItem
                                icon={Phone}
                                title="Call Us"
                                content="+91 98765 43210"
                                delay={0.2}
                            />
                            <ContactInfoItem
                                icon={MapPin}
                                title="Visit HQ"
                                content="Innovation Hub, Block C"
                                delay={0.3}
                            />
                        </div>

                        {/* MAP PREVIEW */}
                        {/* ALIGNMENT FIX: Increased height to visually balance the tall form on the left */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="h-[450px] w-full rounded-[2rem] bg-gray-200 dark:bg-zinc-800 relative overflow-hidden group border border-gray-200 dark:border-zinc-700 shadow-lg"
                        >
                            <div className="absolute inset-0 bg-[url('https://placehold.co/1200x800/18181b/3f3f46?text=Map+Location')] bg-cover bg-center opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"></div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-8">
                                <div className="flex items-center gap-3 text-xs font-bold text-white tracking-widest">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    OPEN IN GOOGLE MAPS <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </section>
        </main>
    );
}
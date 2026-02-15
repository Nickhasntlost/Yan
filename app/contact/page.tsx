"use client";

import React, { useState } from "react";
import BackgroundShapes from "@/components/home/BackgroundShapes";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Send, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import HeroSection from "@/components/ui/HeroSection";

/* ---------------- ANIMATIONS ---------------- */

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

/* ---------------- INPUT COMPONENT ---------------- */

const ContactInput = ({
    label,
    type = "text",
    placeholder,
    textarea = false,
    value,
    onChange,
}: any) => {
    return (
        <div className="mb-5 last:mb-0">
            <label className="block text-[11px] font-bold tracking-[0.15em] text-gray-400 uppercase mb-2">
                {label}
            </label>

            {textarea ? (
                <textarea
                    rows={5}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4 text-base text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
                />
            ) : (
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4 text-base text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
            )}
        </div>
    );
};

/* ---------------- INFO CARD ---------------- */

const ContactInfoItem = ({ icon: Icon, title, content, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay, duration: 0.6 }}
        className="flex items-center gap-6 p-6 rounded-2xl bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/5 shadow-sm"
    >
        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Icon className="w-5 h-5" />
        </div>
        <div>
            <h4 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">
                {title}
            </h4>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
                {content}
            </p>
        </div>
    </motion.div>
);

/* ---------------- MAIN PAGE ---------------- */

export default function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: "" });

    const [config, setConfig] = useState<any>(null);

    React.useEffect(() => {
        fetch("/api/site-config")
            .then((res) => res.json())
            .then((data) => setConfig(data?.contact || {}))
            .catch((err) => console.error(err));
    }, []);

    const hero = config?.hero || {
        tag: "Get In Touch",
        title: "Let's Build the",
        subTitle: "Future Together.",
        description: "Whether you're looking to collaborate, join the club, or just want to talk robotics — our channels are open."
    };

    const info = config?.info || {
        email: "yantrika@vcet.edu.in",
        phone: "+91 87678 31635",
        address: "Innovation Lab, VCET"
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: null, message: "" });

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            if (res.ok) {
                setStatus({ type: 'success', message: "Message sent successfully!" });
                setName("");
                setEmail("");
                setMessage("");
                // Auto dismiss after 5 seconds
                setTimeout(() => setStatus({ type: null, message: "" }), 5000);
            } else {
                setStatus({ type: 'error', message: "Failed to send message." });
            }
        } catch (error) {
            setStatus({ type: 'error', message: "Something went wrong." });
        }

        setLoading(false);
    };

    return (
        <main className="relative w-full min-h-screen bg-background text-foreground font-sans selection:bg-blue-500/30 overflow-hidden pt-32">
            <BackgroundShapes />

            {/* HERO SECTION */}
            <HeroSection
                tag={hero.tag}
                title={hero.title}
                subTitle={hero.subTitle}
                description={hero.description}
                compact={true}
            />

            {/* MAIN CONTENT SPLIT */}
            <section className="relative pb-16 md:pb-32 px-4 md:px-6 lg:px-12 max-w-[1400px] mx-auto z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* LEFT: FORM CONTAINER */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-white/80 dark:bg-zinc-900/50 backdrop-blur-2xl border border-gray-200 dark:border-white/5 rounded-2xl md:rounded-[2rem] p-6 md:p-8 lg:p-12 shadow-2xl relative overflow-hidden"
                    >
                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

                        <div className="relative z-10">
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8">Send a Message</h3>

                            <form onSubmit={handleSubmit} className="space-y-2">
                                <ContactInput
                                    label="Name"
                                    placeholder="Jane Doe"
                                    value={name}
                                    onChange={(e: any) => setName(e.target.value)}
                                />

                                <ContactInput
                                    label="Email"
                                    type="email"
                                    placeholder="jane@example.com"
                                    value={email}
                                    onChange={(e: any) => setEmail(e.target.value)}
                                />

                                <ContactInput
                                    label="Message"
                                    textarea
                                    placeholder="Tell us about your project..."
                                    value={message}
                                    onChange={(e: any) => setMessage(e.target.value)}
                                />

                                <div className="pt-6">
                                    <button
                                        disabled={loading}
                                        className="w-full bg-[#111] dark:bg-white text-white dark:text-black font-bold tracking-widest uppercase py-4 rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 group shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? "Sending..." : "Send Message"}
                                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>

                    {/* RIGHT: INFO & MAP */}
                    <div className="flex flex-col h-full justify-between gap-8">

                        {/* INFO CARDS STACK */}
                        <div className="space-y-4">
                            <ContactInfoItem
                                icon={Mail}
                                title="Email Us"
                                content={info.email}
                                delay={0.1}
                            />
                            <ContactInfoItem
                                icon={Phone}
                                title="Call Us"
                                content={info.phone}
                                delay={0.2}
                            />
                            <ContactInfoItem
                                icon={MapPin}
                                title="Visit Us"
                                content={info.address}
                                delay={0.3}
                            />
                        </div>

                        {/* MAP PREVIEW */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="h-[300px] md:h-[400px] lg:h-[450px] w-full rounded-2xl md:rounded-[2rem] bg-gray-200 dark:bg-zinc-800 relative overflow-hidden group border border-gray-200 dark:border-zinc-700 shadow-lg"
                        >
                            <iframe
                                title="VCET Map"
                                src="https://maps.google.com/maps?q=Vidyavardhini's%20College%20of%20Engineering%20and%20Technology&t=&z=17&ie=UTF8&iwloc=&output=embed"
                                className="absolute inset-0 w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100"
                                frameBorder="0"
                                scrolling="no"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-8 pointer-events-none">
                                <a
                                    href="https://www.google.com/maps/place/Vidyavardhini's+College+of+Engineering+and+Technology/@19.3838696,72.8287336,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7aec0a4b41bef:0xbd1a4ca919d6a613!8m2!3d19.3838696!4d72.8287336!16zL20vMGNscjgy?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-xs font-bold text-white tracking-widest pointer-events-auto hover:text-blue-400 transition-colors"
                                >
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    OPEN IN GOOGLE MAPS <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                </a>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </section>

            {/* TOAST NOTIFICATION */}
            <AnimatePresence>
                {status.type && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border ${status.type === 'success'
                            ? "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400"
                            : "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400"
                            }`}
                    >
                        <div className={`p-2 rounded-full ${status.type === 'success' ? "bg-green-500/20" : "bg-red-500/20"}`}>
                            {status.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                        </div>
                        <div>
                            <h4 className="font-bold text-sm uppercase tracking-wider">{status.type === 'success' ? "Success" : "Error"}</h4>
                            <p className="text-sm font-medium opacity-90">{status.message}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}


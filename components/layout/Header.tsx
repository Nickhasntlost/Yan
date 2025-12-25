'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';
import MenuLink from './MenuLink';

// --- Data ---
const navLinks = [
    { title: "HOME", href: "#home" },
    { title: "ABOUT US", href: "#about" },
    { title: "PROJECTS", href: "#projects" },
    { title: "CONTACT", href: "#contact" },
];

// --- Main Component ---
export default function Header() {
    const [isOpen, setIsOpen] = useState(false); // Menu is closed by default now, unlike FloatingMenu
    const [activeLink, setActiveLink] = useState("HOME");
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-8 bg-transparent pointer-events-none text-[#050505] font-sans">

            {/* Logo */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="text-2xl font-semibold tracking-[-0.02em] uppercase pointer-events-auto"
            >
                Yantrika
            </motion.div>

            {/* Nav Actions */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="flex gap-3 pointer-events-auto"
            >
                {/* Squiggle Button */}
                <MagneticButton className="w-11 h-11 bg-[rgba(255,255,255,0.5)] backdrop-blur-md rounded-full flex items-center justify-center text-black">
                    <svg width="16" height="12" viewBox="0 0 20 10" className="stroke-current fill-none stroke-[1.5] stroke-linecap-round">
                        <path d="M1 9 C 5 9, 5 1, 10 1 C 15 1, 15 9, 19 9" />
                    </svg>
                </MagneticButton>

                {/* CTA */}
                <MagneticButton className="h-11 px-6 bg-[#1F2125] text-white rounded-full flex items-center justify-center text-xs font-bold tracking-wider">
                    LET'S TALK
                </MagneticButton>

                {/* Menu Toggle */}
                <MagneticButton
                    onClick={() => setIsOpen(!isOpen)}
                    className="h-11 px-5 bg-[rgba(255,255,255,0.5)] backdrop-blur-md rounded-full flex items-center justify-center gap-2 text-xs font-bold tracking-wider text-black relative"
                >
                    {isOpen ? 'CLOSE' : 'MENU'}
                    <div className="flex gap-[2px]">
                        <span className="w-[3px] h-[3px] bg-current rounded-full"></span>
                        <span className="w-[3px] h-[3px] bg-current rounded-full"></span>
                    </div>
                </MagneticButton>
            </motion.div>

            {/* --- Menu Overlay --- */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: -20, transformOrigin: "top right" }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-24 right-6 md:right-12 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
                    >
                        <div className="p-8 flex flex-col gap-1">
                            {navLinks.map((link, i) => (
                                <MenuLink
                                    key={link.title}
                                    title={link.title}
                                    href={link.href}
                                    index={i}
                                    isActive={activeLink === link.title}
                                    isHovered={hoveredLink === link.title}
                                    hasAnyHover={hoveredLink !== null}
                                    onHover={(state: boolean) => setHoveredLink(state ? link.title : null)}
                                    onClick={() => { setActiveLink(link.title); setIsOpen(false); }}
                                />
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                            className="px-8 pb-6 text-gray-400 text-[10px] tracking-widest uppercase flex justify-between mt-auto"
                        >
                            <span>© Yantrika</span>
                            <span>Vcet</span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}

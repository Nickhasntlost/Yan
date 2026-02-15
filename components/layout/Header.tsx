'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';
import MenuLink from './MenuLink';
import { useTheme } from '../ThemeProvider';

// --- Data ---
const navLinks = [
    { title: "HOME", href: "/#home" },
    { title: "ABOUT US", href: "/about" },
    { title: "PROJECTS", href: "/projects" },
    { title: "CORE TEAM", href: "/team" },
    { title: "CONTACT", href: "/contact" },
];

// --- Main Component ---
export default function Header() {
    const [isOpen, setIsOpen] = useState(false); // Menu is closed by default now, unlike FloatingMenu
    const [activeLink, setActiveLink] = useState("HOME");
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const { theme, toggleTheme } = useTheme();
    const [showLogo, setShowLogo] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        if (pathname === '/about') {
            setActiveLink("ABOUT US");
        } else if (pathname === '/team') {
            setActiveLink("CORE TEAM");
        } else if (pathname === '/projects') {
            setActiveLink("PROJECTS");
        } else if (pathname === '/contact') {
            setActiveLink("CONTACT");
        } else if (pathname === '/') {
            setActiveLink("HOME");
        }
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => {
            setShowLogo(window.scrollY < 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (pathname && pathname.startsWith('/admin')) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-8 bg-transparent pointer-events-none text-[#050505] font-sans">

            {/* Logo */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: showLogo ? 1 : 0, y: showLogo ? 0 : -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto flex items-center gap-2 md:gap-4"
            >
                <img src="/Yan.png" alt="Yantrika Logo" className="h-8 w-auto md:h-12 lg:h-18" />
                <span className="text-xl md:text-2xl lg:text-4xl font-semibold tracking-[-0.02em] uppercase text-[#050505] dark:text-white">
                    YANTRIKA
                </span>
            </motion.div>

            {/* Nav Actions */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="flex gap-3 pointer-events-auto"
            >
                {/* Theme Toggle */}
                <MagneticButton className="w-16 h-8 bg-[rgba(255,255,255,0.5)] dark:bg-[rgba(255,255,255,0.1)] backdrop-blur-md rounded-full flex items-center justify-start px-1 relative cursor-pointer" onClick={toggleTheme}>
                    <motion.div
                        className="w-6 h-6 bg-[#1F2125] dark:bg-white rounded-full"
                        animate={{ x: theme === 'dark' ? 32 : 0 }}
                        transition={{ type: "spring", stiffness: 700, damping: 30 }}
                    />
                </MagneticButton>

                {/* CTA - Hidden on small screens */}
                <MagneticButton className="hidden md:flex h-11 px-6 bg-[#1F2125] text-white rounded-full items-center justify-center text-xs font-bold tracking-wider">
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
                        className="absolute top-20 md:top-24 right-4 md:right-10 w-[calc(100%-2rem)] md:w-80 bg-white dark:bg-[#050505] border border-gray-100 dark:border-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
                    >
                        <div className="p-4 flex flex-col gap-1">
                            {navLinks.map((link, i) => (
                                <MenuLink
                                    key={link.title}
                                    title={link.title}
                                    href={link.href}
                                    index={i}
                                    isActive={activeLink === link.title}
                                    isHovered={hoveredLink === link.title}
                                    hasAnyHover={hoveredLink !== null}
                                    hasDot={activeLink === link.title}
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

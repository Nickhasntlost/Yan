'use client';

import { useState, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

    // Split text for animation
    const headingText = "We help brands create digital experiences that connect with their audience";

    return (
        <div className="relative w-full h-screen flex flex-col justify-between overflow-hidden text-[#050505] font-sans">

            {/* --- Header Grid --- */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] px-20 py-12 items-start gap-8 lg:gap-0">

                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="text-4xl font-semibold tracking-[-0.02em] uppercase"
                >
                    Yantrika
                </motion.div>

                {/* Hero Text */}
                <div className="text-[2.2rem] leading-[1.2] font-normal max-w-[600px] text-[#111]">
                    {headingText.split(" ").map((word, i) => (
                        <span key={i} className="inline-block overflow-hidden align-bottom">
                            <motion.span
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{
                                    duration: 1.2,
                                    ease: [0.16, 1, 0.3, 1],
                                    delay: 0.1 + (i * 0.03)
                                }}
                                className="inline-block"
                            >
                                {word}&nbsp;
                            </motion.span>
                        </span>
                    ))}
                </div>

                {/* Nav Actions */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                    className="flex justify-end gap-3 absolute top-10 right-12 lg:static lg:top-auto lg:right-auto"
                >
                    {/* Squiggle Button */}
                    <MagneticButton className="w-11 h-11 bg-[#E0E2E8] rounded-full flex items-center justify-center text-black">
                        <svg width="16" height="12" viewBox="0 0 20 10" className="stroke-current fill-none stroke-[1.5] stroke-linecap-round">
                            <path d="M1 9 C 5 9, 5 1, 10 1 C 15 1, 15 9, 19 9" />
                        </svg>
                    </MagneticButton>

                    {/* CTA */}
                    <MagneticButton className="h-11 px-6 bg-[#1F2125] text-white rounded-full flex items-center justify-center text-xs font-bold tracking-wider">
                        LET'S TALK <span className="ml-1 text-[#555]">•</span>
                    </MagneticButton>

                    {/* Menu Toggle */}
                    <MagneticButton
                        onClick={() => setIsOpen(!isOpen)}
                        className="h-11 px-5 bg-[#E0E2E8] rounded-full flex items-center justify-center gap-2 text-xs font-bold tracking-wider text-black z-[60] relative"
                    >
                        {isOpen ? 'CLOSE' : 'MENU'}
                        <div className="flex gap-[2px]">
                            <span className="w-[3px] h-[3px] bg-current rounded-full"></span>
                            <span className="w-[3px] h-[3px] bg-current rounded-full"></span>
                        </div>
                    </MagneticButton>
                </motion.div>
            </div>



            {/* --- Using the existing Menu Overlay Logic --- */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: -20, transformOrigin: "top right" }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-28 right-20 w-80 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
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

// --- Subcomponents ---

function MagneticButton({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();

        const x = clientX - left - width / 2;
        const y = clientY - top - height / 2;

        setPosition({ x: x * 0.3, y: y * 0.3 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.button
            className={className}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.button>
    );
}

function MenuLink({ title, href, index, isActive, isHovered, hasAnyHover, onHover, onClick }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + (index * 0.05), duration: 0.4, ease: "easeOut" }}
            className="group relative flex items-center justify-between cursor-pointer w-full"
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            onClick={onClick}
        >
            <a href={href} className="relative block overflow-hidden py-2">
                <motion.span
                    className="block text-3xl font-medium tracking-tight text-black transition-all duration-300"
                    animate={{
                        opacity: hasAnyHover ? (isHovered ? 1 : 0.4) : (isActive ? 1 : 0.8),
                        x: isHovered ? 10 : 0
                    }}
                >
                    {title}
                </motion.span>
            </a>

            <motion.div
                animate={{
                    scale: isActive ? 1 : 0,
                    opacity: isActive ? 1 : 0
                }}
                className="w-2 h-2 bg-black rounded-full"
            />
        </motion.div>
    );
}

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from './ThemeProvider';
import MenuLink from './layout/MenuLink';

interface MenuOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuItems = [
    { title: 'Home', href: '/' },
    { title: 'Work', href: '/work' },
    { title: 'About', href: '/about' },
    { title: 'Contact', href: '/contact' }
];

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const { theme, toggleTheme } = useTheme();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
                    />

                    {/* Menu Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-[#f5f3f0] dark:bg-gray-950 z-[70] shadow-2xl p-6 md:p-8 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-8 md:mb-12">
                            <span className="text-sm font-medium text-gray-400">NAVIGATION</span>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={toggleTheme}
                                    className="flex items-center justify-center w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors relative"
                                    aria-label="Toggle theme"
                                >
                                    <div
                                        className={`absolute left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`}
                                    ></div>
                                </button>
                                <button
                                    onClick={onClose}
                                    className="group p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
                                >
                                    <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5 rotate-45 group-hover:rotate-[-45deg] transition-transform duration-300">
                                        <span className="w-full h-0.5 bg-black dark:bg-white"></span>
                                        <span className="w-full h-0.5 bg-black dark:bg-white absolute rotate-90"></span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Links */}
                        <div className="flex-1 flex flex-col justify-center gap-4">
                            {menuItems.map((item, index) => (
                                <MenuLink
                                    key={item.title}
                                    index={index}
                                    title={item.title}
                                    href={item.href}
                                    onClick={onClose}
                                    isHovered={hoveredIndex === index}
                                    hasAnyHover={hoveredIndex !== null}
                                    onHover={(isHovering: boolean) => setHoveredIndex(isHovering ? index : null)}
                                />
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="mt-auto pt-8 border-t border-gray-200 dark:border-gray-800">
                            <div className="flex flex-col gap-2">
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Get in touch</span>
                                <a href="mailto:hello@yan.com" className="text-lg font-medium text-gray-900 dark:text-white hover:opacity-70 transition-opacity">
                                    hello@yan.com
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

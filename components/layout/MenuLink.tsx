'use client';

import { motion } from 'framer-motion';

export default function MenuLink({ title, href, index, isActive, isHovered, hasAnyHover, hasDot, isHighlighted, onHover, onClick }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 + (index * 0.05), duration: 0.3, ease: "easeOut" }}
            className={`group relative flex items-center justify-between cursor-pointer w-full rounded-full px-6 py-3 transition-colors duration-200 ${isHovered ? 'bg-[#EBEAFE] dark:bg-[#1A1A2E]' : 'hover:bg-gray-50 dark:hover:bg-white/5'}`}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            onClick={onClick}
        >
            <a href={href} className="relative block flex-1">
                <span
                    className={`w-full text-sm font-medium tracking-wide transition-all duration-300 flex items-center gap-2 ${isHovered ? 'text-black dark:text-white' : 'text-black dark:text-white'}`}
                >
                    {title}
                    {hasDot && (
                        <span className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full ml-auto"></span>
                    )}
                </span>
            </a>

            {isHovered && (
                <span className="text-black dark:text-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            )}
        </motion.div>
    );
}

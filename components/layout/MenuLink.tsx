'use client';

import { motion } from 'framer-motion';

export default function MenuLink({ title, href, index, isActive, isHovered, hasAnyHover, onHover, onClick }: any) {
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

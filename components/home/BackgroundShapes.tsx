'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function BackgroundShapes() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const { left, top } = containerRef.current.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;
            containerRef.current.style.setProperty('--x', `${x}px`);
            containerRef.current.style.setProperty('--y', `${y}px`);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            <div
                ref={containerRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:right-auto md:left-[13%] md:top-[1%] md:-translate-y-0 w-[70vw] md:w-[1000px] h-[70vw] md:h-[800px] z-0 pointer-events-none select-none"
                style={{
                    maskImage: 'radial-gradient(300px circle at var(--x, -10000px) var(--y, -10000px), black 0%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(300px circle at var(--x, -10000px) var(--y, -10000px), black 0%, transparent 80%)'
                } as React.CSSProperties}
            >
                <Image
                    src="/Yan.png"
                    alt="Background"
                    fill
                    className="object-contain"
                    priority
                />
            </div>
            {/* Floating Blue Shape */}
            <motion.div
                animate={{
                    rotate: [-15, -10],
                    translateY: [0, 30],
                    translateX: [0, 20],
                }}
                transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 8,
                    ease: "easeInOut",
                }}
                className="absolute top-[210px] left-[0px] w-[35vw] h-[25vw] rounded-[50%_30%_60%_40%] bg-gradient-to-br from-[#2A3FFF] to-[#5E6EFF] blur-[60px] opacity-50 z-0 pointer-events-none"
            />

            {/* Secondary Shape (Tail) */}
            <div className="absolute top-[40%] left-[10%] w-[15vw] h-[5vw] rounded-full bg-[#2A3FFF] blur-[40px] opacity-60 -rotate-12 z-0 pointer-events-none" />
        </>
    );
}

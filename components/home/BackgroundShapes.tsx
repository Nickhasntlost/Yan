'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function BackgroundShapes() {
    return (
        <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:right-auto md:left-[13%] md:top-[3%] md:-translate-y-0 w-[70vw] md:w-[1000px] h-[70vw] md:h-[800px] z-0 pointer-events-none select-none">
                <Image
                    src="/Yan.png"
                    alt="Background"
                    fill
                    className="object-contain opacity-10"
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

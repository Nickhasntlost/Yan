'use client';

import { motion } from 'framer-motion';

export default function BackgroundShapes() {
    return (
        <>
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
                className="absolute top-[250px] left-[0px] w-[35vw] h-[25vw] rounded-[50%_30%_60%_40%] bg-gradient-to-br from-[#2A3FFF] to-[#5E6EFF] blur-[60px] opacity-70 z-0 pointer-events-none"
            />

            {/* Secondary Shape (Tail) */}
            <div className="absolute top-[40%] left-[10%] w-[15vw] h-[5vw] rounded-full bg-[#2A3FFF] blur-[40px] opacity-60 -rotate-12 z-0 pointer-events-none" />
        </>
    );
}

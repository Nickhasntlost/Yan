"use client";

import React from "react";
import { motion } from "framer-motion";
import BackgroundShapes from "@/components/home/BackgroundShapes";
import { SmokeyFluidCursor } from "react-smokey-fluid-cursor";

export default function About() {
    return (
        <main className="relative min-h-screen w-full overflow-hidden bg-background text-foreground font-sans selection:bg-[#2A3FFF] selection:text-white pt-32 transition-colors duration-300">

            {/* --- FLUID CURSOR EFFECT --- */}
            {/* <div className="fixed inset-0 z-50 pointer-events-none">
                <SmokeyFluidCursor
                    config={{
                        simResolution: 128,
                        dyeResolution: 512,
                        densityDissipation: 0.98,
                        velocityDissipation: 0.99,
                        curl: 10,
                        splatRadius: 0.2,
                        colorUpdateSpeed: 2
                    }}
                />
            </div> */}

            {/* --- BACKGROUND SHAPES --- */}
            <BackgroundShapes />

            {/* --- CONTENT --- */}
            <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mt-10"
                >
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                        About Us
                    </h1>
                    <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                        <p>
                            Welcome to Yantrika, the Robotics Club where innovation meets passion.
                            We are a community of creators, engineers, and dreamers dedicated to
                            pushing the boundaries of technology.
                        </p>
                        <p className="mt-4">
                            Our mission is to foster a collaborative environment where students can learn,
                            build, and grow together. Through workshops, competitions, and hands-on projects,
                            we empower the next generation of roboticists.
                        </p>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}

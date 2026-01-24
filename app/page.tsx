"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import BackgroundShapes from "@/components/home/BackgroundShapes";
import Hero from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";
import Sponsors from "@/components/home/Sponsors";
import Events from "@/components/home/Events";
import WaterSplash from "@/components/ui/WaterSplash";
import { SmokeyFluidCursor } from "react-smokey-fluid-cursor";


export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background text-foreground font-sans selection:bg-[#2A3FFF] selection:text-white pt-32 transition-colors duration-300">

      {/* --- FLUID CURSOR EFFECT --- */}
      {/* Z-index ensures it sits on top or behind as needed. Pointer-events-none lets you click through it. */}
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

      {/* Add the Splash Effect here */}
      {/* <WaterSplash /> */}

      
      

      {/* --- 1. ABSTRACT BACKGROUND SHAPES --- */}
      <BackgroundShapes />


      {/* --- 2. HERO CONTENT --- */}
      <Hero />

      <Sponsors />
      <Events />
      <Testimonials />
    </main>
  );
}
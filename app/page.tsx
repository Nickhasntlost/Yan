"use client";

import React from "react";
import { motion } from "framer-motion";
import BackgroundShapes from "@/components/home/BackgroundShapes";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background text-foreground font-sans selection:bg-[#2A3FFF] selection:text-white pt-32 transition-colors duration-300">

      {/* --- 1. ABSTRACT BACKGROUND SHAPES --- */}
      <BackgroundShapes />



      {/* --- 2. HERO CONTENT --- */}
      <Hero />
    </main>
  );
}

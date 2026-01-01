"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import BackgroundShapes from "@/components/home/BackgroundShapes";
import Hero from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";
import Sponsors from "@/components/home/Sponsors";
import Events from "@/components/home/Events";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background text-foreground font-sans selection:bg-[#2A3FFF] selection:text-white pt-32 transition-colors duration-300">

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
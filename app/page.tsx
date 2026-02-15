"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import BackgroundShapes from "@/components/home/BackgroundShapes";
import HeroSection from "@/components/ui/HeroSection";
import Testimonials from "@/components/home/Testimonials";
import Sponsors from "@/components/home/Sponsors";
import Events from "@/components/home/Events";
import WaterSplash from "@/components/ui/WaterSplash";
import { SmokeyFluidCursor } from "react-smokey-fluid-cursor";


export default function Home() {
  const [heroConfig, setHeroConfig] = React.useState({
    tag: "ROBOTICS CLUB",
    title: "Automating One Bot",
    subTitle: "At a Time.",
    description: "Empowering students to explore, build, and innovate with Robotics.",
    scrollText: "SCROLL TO EXPLORE"
  });
  const [fullConfig, setFullConfig] = React.useState<any>({});

  React.useEffect(() => {
    fetch("/api/site-config")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setFullConfig(data);
          if (data.home && data.home.hero) {
            setHeroConfig(data.home.hero);
          }
        }
      })
      .catch((err) => console.error("Failed to fetch site config:", err));
  }, []);

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
      <HeroSection
        tag={heroConfig.tag}
        title={heroConfig.title}
        subTitle={heroConfig.subTitle}
        description={heroConfig.description}
        scrollText={heroConfig.scrollText}
        enableGradientHover={true}
        autoRevealGradient={true}
      />

      <Sponsors sponsors={fullConfig.home?.sponsors} />
      <Events events={fullConfig.home?.events} />
      <Testimonials testimonials={fullConfig.home?.testimonials} />
    </main>
  );
}
"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Terminal, Radio } from "lucide-react";
import { siteContent } from "@/config/content";
import { HeroFallback } from "@/components/hero/HeroFallback";

const DynamicSculpture = dynamic(
  () => import("@/components/sculpture/GlassSculpture").then((mod) => mod.GlassSculpture),
  {
    ssr: false,
    loading: () => <HeroFallback />,
  }
);

export function Hero() {
  const { hero } = siteContent;
  const [timeString, setTimeString] = React.useState<string>("");

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " IST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[96vh] flex flex-col justify-between pt-28 pb-16 px-4 sm:px-8 lg:px-12 overflow-hidden">
      {/* Top Architectural Metadata Strip */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono tracking-wider text-[var(--text-tertiary)] uppercase border-b border-[var(--glass-border)] pb-4 mb-6"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>PURVANCHAL, INDIA · 26.85° N, 80.95° E</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <span>PRIMARY HUB: <Link href="https://mrps.in" target="_blank" className="text-[var(--text-primary)] hover:text-[var(--accent-champagne)] transition-colors underline underline-offset-4">MRPS.IN</Link></span>
          <span>SYS CLOCK: {timeString || "LIVE IST"}</span>
        </div>
      </motion.div>

      {/* Central Focal Showcase */}
      <div className="max-w-6xl mx-auto w-full my-auto flex flex-col items-center text-center relative z-10 py-6">
        {/* Full Name & Identity with High-Contrast Swiss Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl lg:text-9xl font-light tracking-[-0.04em] text-[var(--text-primary)] leading-[0.92] mb-3 uppercase"
        >
          {hero.name}
        </motion.h1>

        {/* Motto / Philosophy in High-Craft Editorial Serif */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-3xl lg:text-4xl font-serif italic text-[var(--accent-champagne)] tracking-tight mb-4 max-w-2xl"
        >
          &ldquo;{hero.motto}&rdquo;
        </motion.p>

        {/* Signature 3D Optical Refraction Centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl mx-auto my-1 relative"
        >
          <DynamicSculpture />
        </motion.div>

        {/* Supporting Editorial Statement (Max 65ch measure as per Impeccable) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mx-auto flex flex-col items-center mt-4"
        >
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-normal mb-8 text-balance">
            {hero.supportingText}
          </p>

          {/* Tactile Actions & Direct Backlink to mrps.in */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={hero.cta.primaryHref}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[var(--text-primary)] text-[var(--canvas)] text-xs uppercase tracking-widest font-semibold transition-all hover:opacity-90 hover:scale-105 active:scale-95 shadow-md"
            >
              <span>{hero.cta.primary}</span>
              <ArrowDownRight className="w-4 h-4 text-[var(--accent-champagne)]" />
            </Link>

            <Link
              href={hero.cta.secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full liquid-glass-pill text-xs uppercase tracking-widest font-medium text-[var(--text-primary)] transition-all hover:scale-105 active:scale-95 shadow-xs"
            >
              <Terminal className="w-3.5 h-3.5 text-[var(--accent-champagne)]" />
              <span>{hero.cta.secondary}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="max-w-7xl mx-auto w-full flex items-center justify-between text-[11px] font-mono text-[var(--text-tertiary)] pt-4 border-t border-[var(--glass-border)]"
      >
        <div className="flex items-center gap-2">
          <Radio className="w-3 h-3 text-[var(--accent-champagne)]" />
          <span>AUTONOMOUS SYSTEMS · OPTICAL INTERFACES</span>
        </div>
        <div className="flex items-center gap-1 uppercase tracking-widest">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDownRight className="w-3 h-3 text-[var(--accent-champagne)]" />
        </div>
      </motion.div>
    </section>
  );
}

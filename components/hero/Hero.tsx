"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Terminal, Radio } from "lucide-react";
import { siteContent } from "@/config/content";
import { HeroFallback } from "@/components/hero/HeroFallback";
import { LiveClock } from "@/components/time/LiveClock";

const DynamicSculpture = dynamic(
  () => import("@/components/sculpture/GlassSculpture").then((mod) => mod.GlassSculpture),
  {
    ssr: false,
    loading: () => <HeroFallback />,
  }
);

export function Hero() {
  const { hero } = siteContent;

  return (
    <section className="relative min-h-[96vh] 2xl:min-h-[92vh] flex flex-col justify-between pt-28 pb-16 px-4 sm:px-8 lg:px-12 2xl:px-16 4xl:px-24 overflow-hidden">
      {/* Top Architectural Metadata Strip */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1856px] 4xl:max-w-[2240px] mx-auto w-full flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[11px] 2xl:text-xs font-mono tracking-wider text-[var(--text-tertiary)] uppercase border-b border-[var(--glass-border)] pb-4 mb-6"
      >
        {/* Live Network & Edge Telemetry */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full liquid-glass-pill text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] 2xl:text-xs uppercase font-semibold">EDGE ONLINE</span>
          </span>
        </div>

        {/* Hub & Clock */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <span className="text-[var(--text-tertiary)]">PRIMARY HUB:</span>
            <Link
              href="https://mrps.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-primary)] hover:text-[var(--accent-champagne)] transition-colors underline underline-offset-4"
            >
              MRPS.IN
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[var(--text-tertiary)] hidden sm:inline">SYS CLOCK:</span>
            <LiveClock mode="full" fallback="LIVE IST" className="text-[var(--text-primary)]" />
          </div>
        </div>
      </motion.div>

      {/* Central Focal Showcase */}
      <div className="max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[2000px] mx-auto w-full my-auto flex flex-col items-center text-center relative z-10 py-6 2xl:py-10">
        {/* Full Name & Identity with High-Contrast Swiss Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl xs:text-5xl sm:text-7xl lg:text-9xl 2xl:text-[10rem] 3xl:text-[12rem] 4xl:text-[14rem] font-light tracking-[-0.04em] text-[var(--text-primary)] leading-[0.92] mb-3 uppercase"
        >
          {hero.name}
        </motion.h1>

        {/* Motto / Philosophy in High-Craft Editorial Serif */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl 3xl:text-6xl font-serif italic text-[var(--accent-champagne)] tracking-tight mb-3 sm:mb-4 max-w-2xl 2xl:max-w-4xl 3xl:max-w-5xl"
        >
          &ldquo;{hero.motto}&rdquo;
        </motion.p>

        {/* Signature 3D Optical Refraction Centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-3xl 2xl:max-w-4xl 3xl:max-w-5xl 4xl:max-w-6xl mx-auto my-1 relative"
        >
          <DynamicSculpture />
        </motion.div>

        {/* Supporting Editorial Statement (Max 65ch measure as per Impeccable) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl mx-auto flex flex-col items-center mt-4 2xl:mt-6"
        >
          <p className="text-base sm:text-lg 2xl:text-xl text-[var(--text-secondary)] leading-relaxed font-normal mb-8 text-balance">
            {hero.supportingText}
          </p>

          {/* Tactile Actions & Direct Backlink to mrps.in */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              href={hero.cta.primaryHref}
              className="inline-flex items-center justify-center gap-2.5 px-8 2xl:px-10 py-3.5 2xl:py-4 rounded-full bg-[var(--text-primary)] text-[var(--canvas)] text-xs 2xl:text-sm uppercase tracking-widest font-semibold transition-all hover:opacity-90 hover:scale-105 active:scale-95 shadow-md min-h-[44px]"
            >
              <span>{hero.cta.primary}</span>
              <ArrowDownRight className="w-4 h-4 text-[var(--accent-champagne)]" />
            </Link>

            <Link
              href={hero.cta.secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 2xl:px-10 py-3.5 2xl:py-4 rounded-full liquid-glass-pill text-xs 2xl:text-sm uppercase tracking-widest font-medium text-[var(--text-primary)] transition-all hover:scale-105 active:scale-95 shadow-xs min-h-[44px]"
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
        className="max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1856px] 4xl:max-w-[2240px] mx-auto w-full flex items-center justify-between text-[11px] 2xl:text-xs font-mono text-[var(--text-tertiary)] pt-4 border-t border-[var(--glass-border)]"
      >
        <div className="flex items-center gap-2">
          <Radio className="w-3 h-3 text-[var(--accent-champagne)]" />
          <span>HARDWARE · OPEN CODE · PHOTOGRAPHY</span>
        </div>
        <div className="flex items-center gap-1 uppercase tracking-widest">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDownRight className="w-3 h-3 text-[var(--accent-champagne)]" />
        </div>
      </motion.div>
    </section>
  );
}

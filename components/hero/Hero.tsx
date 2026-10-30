"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { siteContent } from "@/config/content";
import { HeroFallback } from "@/components/hero/HeroFallback";
import {
  spring,
  revealVariants,
  staggerContainer,
} from "@/components/animations/transitions";

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
    <section className="relative min-h-[94vh] flex flex-col justify-center items-center pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient background illumination */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] rounded-full bg-gradient-to-b from-[var(--accent-champagne)]/20 via-[var(--accent-silver)]/15 to-transparent blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
        {/* Left Column: Typographic & Editorial Introduction */}
        <motion.div
          variants={staggerContainer}
          initial={false}
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start z-10"
        >
          {/* Eyebrow badge */}
          <motion.div variants={revealVariants} className="mb-4 sm:mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-translucent text-[11px] font-medium tracking-widest uppercase text-[var(--text-secondary)] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-champagne)]" />
              <span>{hero.metaLabel}</span>
            </span>
          </motion.div>

          {/* Name & Headline */}
          <motion.h1
            variants={revealVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.06] mb-3 sm:mb-4"
          >
            {hero.name}
          </motion.h1>

          <motion.h2
            variants={revealVariants}
            className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[var(--text-secondary)] tracking-tight leading-snug mb-6"
          >
            {hero.headline}
          </motion.h2>

          {/* Supporting Intro Text */}
          <motion.p
            variants={revealVariants}
            className="text-base sm:text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed mb-8 sm:mb-10 font-normal"
          >
            {hero.supportingText}
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            variants={revealVariants}
            className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto"
          >
            <Link
              href={hero.cta.primaryHref}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--text-primary)] text-[var(--canvas)] text-xs sm:text-sm font-semibold tracking-wide transition-all hover:scale-[1.03] active:scale-[0.98] shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-champagne)]"
            >
              <span>{hero.cta.primary}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href={hero.cta.secondaryHref}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full glass-translucent text-[var(--text-primary)] text-xs sm:text-sm font-medium tracking-wide transition-all hover:bg-[var(--glass-hover-bg)] hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-champagne)]"
            >
              <span>{hero.cta.secondary}</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Column: Signature 3D Optical Glass Sculpture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-5 flex items-center justify-center"
        >
          <DynamicSculpture />
        </motion.div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1.5 text-[10px] uppercase tracking-widest text-[var(--text-tertiary)]"
      >
        <span>Scroll to enter</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-1 h-3 rounded-full bg-[var(--text-tertiary)]"
        />
      </motion.div>
    </section>
  );
}

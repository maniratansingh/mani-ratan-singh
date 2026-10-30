"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDownRight, Compass } from "lucide-react";
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

  return (
    <section className="relative min-h-[96vh] flex flex-col justify-between pt-28 pb-12 px-4 sm:px-8 lg:px-12 overflow-hidden">
      {/* Subtle architectural grid lines & ambient light */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-b from-[var(--accent-champagne)]/20 via-[var(--accent-silver)]/15 to-transparent blur-[160px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Top Editorial Index Bar */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-[var(--text-tertiary)] border-b border-[var(--glass-frosted-border)] pb-4">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-champagne)]" />
          <span>PORTFOLIO & DIGITAL ARCHIVES</span>
        </span>
        <span className="hidden sm:inline">28.6139° N, 77.2090° E</span>
        <span>EDITION 2025</span>
      </div>

      {/* Main Hero Showcase */}
      <div className="max-w-7xl mx-auto w-full my-auto py-8 sm:py-12 flex flex-col items-center text-center relative z-10">
        {/* Name Title - High Luxury Editorial Typography */}
        <h1 className="text-4xl sm:text-7xl lg:text-8xl font-light tracking-[-0.04em] text-[var(--text-primary)] leading-[0.98] mb-4 uppercase">
          Mani Ratan Singh
        </h1>

        <p className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-[var(--accent-champagne)] tracking-normal mb-8">
          &ldquo;{hero.headline}&rdquo;
        </p>

        {/* Central Bespoke 3D Glass Sculpture */}
        <div className="w-full max-w-2xl mx-auto my-2 relative">
          <DynamicSculpture />
        </div>

        {/* Supporting Editorial Statement */}
        <div className="max-w-xl mx-auto flex flex-col items-center mt-4">
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-normal mb-8">
            {hero.supportingText}
          </p>

          {/* Minimalist Tactile Action Links */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/work"
              className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full glass-translucent text-xs uppercase tracking-widest text-[var(--text-primary)] hover:border-[var(--accent-champagne)] transition-all shadow-xs"
            >
              <span>Selected Works</span>
              <ArrowDownRight className="w-3.5 h-3.5 text-[var(--accent-champagne)] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </Link>

            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-[var(--accent-silver)]" />
              <span>Explore My World</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Coordinates & Status */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-[var(--text-tertiary)] border-t border-[var(--glass-frosted-border)] pt-4">
        <span>CRAFTED WITH OPTICAL REFRACTION</span>
        <span className="hidden sm:inline">SCROLL TO DISCOVER</span>
        <span>INDEX [ 01 / 05 ]</span>
      </div>
    </section>
  );
}

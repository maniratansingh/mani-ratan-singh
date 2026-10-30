"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Compass, Sparkles } from "lucide-react";
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
      {/* Editorial Header Status Line */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-[var(--text-tertiary)] pb-6 border-b border-[var(--glass-border)]">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-champagne)] animate-pulse" />
          <span>PORTFOLIO & DIGITAL ARCHIVES</span>
        </span>
        <span className="hidden sm:inline">28.6139° N, 77.2090° E</span>
        <span>EDITION 2025</span>
      </div>

      {/* Main Hero Showcase */}
      <div className="max-w-7xl mx-auto w-full my-auto py-8 sm:py-12 flex flex-col items-center text-center relative z-10">
        {/* Floating Liquid Glass Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass-pill text-[11px] font-semibold tracking-widest uppercase text-[var(--text-secondary)] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-champagne)]" />
            <span>Liquid Glass Optical Experience</span>
          </span>
        </div>

        {/* Name Title - High Luxury Editorial Typography */}
        <h1 className="text-4xl sm:text-7xl lg:text-8xl font-light tracking-[-0.03em] text-[var(--text-primary)] leading-[0.98] mb-3 uppercase">
          Mani Ratan Singh
        </h1>

        <p className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-[var(--accent-champagne)] tracking-normal mb-6">
          &ldquo;{hero.headline}&rdquo;
        </p>

        {/* Central Bespoke 3D Glass Sculpture */}
        <div className="w-full max-w-3xl mx-auto my-2 relative">
          <DynamicSculpture />
        </div>

        {/* Supporting Editorial Statement */}
        <div className="max-w-xl mx-auto flex flex-col items-center mt-2">
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-normal mb-8">
            {hero.supportingText}
          </p>

          {/* Minimalist Tactile Action Links */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[var(--text-primary)] text-[var(--canvas)] text-xs uppercase tracking-widest font-semibold shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <span>Selected Works</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full liquid-glass-pill text-xs uppercase tracking-widest font-medium text-[var(--text-primary)] transition-all hover:scale-105 active:scale-95"
            >
              <Compass className="w-3.5 h-3.5 text-[var(--accent-champagne)]" />
              <span>Explore My World</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Coordinates & Status */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-[var(--text-tertiary)] pt-6 border-t border-[var(--glass-border)]">
        <span>CRAFTED WITH OPTICAL REFRACTION</span>
        <span className="hidden sm:inline">SCROLL TO DISCOVER</span>
        <span>INDEX [ 01 / 05 ]</span>
      </div>
    </section>
  );
}

"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Terminal } from "lucide-react";
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
    <section className="relative min-h-[96vh] flex flex-col justify-between pt-32 pb-16 px-4 sm:px-8 lg:px-12 overflow-hidden">
      {/* Central Focal Showcase */}
      <div className="max-w-6xl mx-auto w-full my-auto flex flex-col items-center text-center relative z-10">
        {/* Full Name & Identity */}
        <h1 className="text-5xl sm:text-7xl lg:text-9xl font-light tracking-[-0.04em] text-[var(--text-primary)] leading-[0.95] mb-2 uppercase">
          {hero.name}
        </h1>

        {/* Motto / Philosophy */}
        <p className="text-2xl sm:text-3xl lg:text-4xl font-serif italic text-[var(--accent-champagne)] tracking-tight mb-6 max-w-2xl">
          &ldquo;{hero.motto}&rdquo;
        </p>

        {/* Signature 3D Optical Refraction Centerpiece */}
        <div className="w-full max-w-2xl mx-auto my-2 relative">
          <DynamicSculpture />
        </div>

        {/* Supporting Editorial Statement (Max 65ch measure as per Impeccable) */}
        <div className="max-w-xl mx-auto flex flex-col items-center mt-6">
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-normal mb-8">
            {hero.supportingText}
          </p>

          {/* Tactile Actions & Direct Backlink to mrps.in */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={hero.cta.primaryHref}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--text-primary)] text-[var(--canvas)] text-xs uppercase tracking-widest font-semibold transition-transform hover:scale-105 active:scale-95 shadow-lg"
            >
              <span>{hero.cta.primary}</span>
              <ArrowDownRight className="w-4 h-4 text-[var(--accent-champagne)]" />
            </Link>

            <Link
              href={hero.cta.secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full liquid-glass-pill text-xs uppercase tracking-widest font-medium text-[var(--text-primary)] transition-all hover:scale-105 active:scale-95 shadow-xs"
            >
              <Terminal className="w-3.5 h-3.5 text-[var(--accent-champagne)]" />
              <span>{hero.cta.secondary}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

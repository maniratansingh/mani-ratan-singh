"use client";

import * as React from "react";
import Link from "next/link";
import { Camera, ArrowUpRight, Aperture, Compass } from "lucide-react";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
import { siteContent } from "@/config/content";
import { InteractiveGlassCard } from "@/components/glass/InteractiveGlassCard";

export function PhotographySection() {
  const { photography } = siteContent;

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-24 sm:py-32">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-[var(--glass-border)]">
        <div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-[-0.03em] text-[var(--text-primary)] uppercase leading-[0.98] mb-4">
            {photography.title}
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-lg leading-relaxed">
            {photography.subtitle}
          </p>
        </div>

        <Link
          href={photography.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full liquid-glass-pill text-xs uppercase tracking-widest font-medium text-[var(--text-primary)] hover:scale-105 transition-transform"
        >
          <InstagramIcon className="w-4 h-4 text-[var(--accent-champagne)]" />
          <span>{photography.instagramHandle}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Photography Statement & Atmosphere */}
      <InteractiveGlassCard className="p-8 sm:p-14 mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="w-12 h-12 rounded-2xl liquid-glass-pill flex items-center justify-center text-[var(--accent-champagne)] shadow-sm">
              <Camera className="w-6 h-6" />
            </div>

            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-serif italic text-[var(--text-primary)] leading-snug">
              &ldquo;{photography.statement}&rdquo;
            </blockquote>

            <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-xl">
              Beyond code and hardware circuits, photography is my medium for slowing down. Long exposures reveal how light carves geometry through darkness—turning everyday transit into quiet, reflective optical studies.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest text-[var(--accent-silver)] block mb-1">
              Photographic Focus
            </span>
            {photography.themes.map((theme, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl liquid-glass-surface flex items-center gap-3 text-xs text-[var(--text-secondary)]"
              >
                <Aperture className="w-4 h-4 text-[var(--accent-champagne)] shrink-0" />
                <span>{theme}</span>
              </div>
            ))}
          </div>
        </div>
      </InteractiveGlassCard>
    </section>
  );
}

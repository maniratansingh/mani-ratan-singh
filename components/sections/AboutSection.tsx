"use client";

import * as React from "react";
import Link from "next/link";
import { siteContent } from "@/config/content";
import { ArrowUpRight } from "lucide-react";

export function AboutSection({ isStandalone = false }: { isStandalone?: boolean }) {
  const { about } = siteContent;

  return (
    <section
      id="about"
      className={`relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 ${
        isStandalone ? "pt-36 pb-24" : "py-24 sm:py-32"
      }`}
    >
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-[var(--glass-border)]">
        <div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-[-0.03em] text-[var(--text-primary)] uppercase leading-[0.95] mb-4">
            About & Ethos
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-lg leading-relaxed">
            Bridging digital architecture, tactile electronics, and sensory interface design.
          </p>
        </div>
        <div className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
          <span>IDENTITY MANIFESTO · 01</span>
        </div>
      </div>

      {/* Main Narrative Spread */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Living Parameters Spec Sheet (Architectural Table) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="p-8 sm:p-10 liquid-glass-surface">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--glass-border)] mb-6">
              <span className="text-xs uppercase tracking-widest font-mono text-[var(--text-tertiary)]">
                SPECIFICATION SHEET
              </span>
              <span className="text-xs font-mono text-[var(--accent-champagne)]">
                MRPS.IN / NODE-01
              </span>
            </div>

            <div className="flex flex-col divide-y divide-[var(--glass-border)] text-sm">
              <div className="py-3.5 flex items-center justify-between">
                <span className="text-[var(--text-tertiary)]">Name</span>
                <span className="font-medium text-[var(--text-primary)]">Mani Ratan Pratap Singh</span>
              </div>
              <div className="py-3.5 flex items-center justify-between">
                <span className="text-[var(--text-tertiary)]">Location</span>
                <span className="font-medium text-[var(--text-primary)]">Purvanchal, India</span>
              </div>
              <div className="py-3.5 flex items-center justify-between">
                <span className="text-[var(--text-tertiary)]">Disciplines</span>
                <span className="font-medium text-[var(--text-primary)]">Systems, Hardware & Glass UI</span>
              </div>
              <div className="py-3.5 flex items-center justify-between">
                <span className="text-[var(--text-tertiary)]">Hardware Stack</span>
                <span className="font-medium text-[var(--text-primary)]">RP2040 · ESP32 · Apple Silicon</span>
              </div>
              <div className="py-3.5 flex items-center justify-between">
                <span className="text-[var(--text-tertiary)]">Homelab Node</span>
                <span className="font-medium text-[var(--text-primary)]">TrueNAS · 10GbE SFP+ · Jellyfin</span>
              </div>
              <div className="py-3.5 flex items-center justify-between">
                <span className="text-[var(--text-tertiary)]">Photography</span>
                <span className="font-medium text-[var(--text-primary)]">24mm Prime · Long Exposure</span>
              </div>
              <div className="py-3.5 flex items-center justify-between">
                <span className="text-[var(--text-tertiary)]">Primary Workbench</span>
                <Link
                  href="https://mrps.in"
                  target="_blank"
                  className="font-medium text-[var(--accent-champagne)] hover:underline flex items-center gap-1"
                >
                  <span>mrps.in</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="p-6 border border-[var(--glass-border)] rounded-2xl bg-[var(--surface-muted)]/30">
            <span className="text-xs uppercase tracking-widest text-[var(--accent-champagne)] block mb-2 font-mono">
              ENGINEERING NOTE
            </span>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              While <strong>maniratansingh.com</strong> acts as the public portfolio and visual salon, all raw hardware schematics, kernel benchmarks, and homelab dispatches reside on the engineering workbench at <Link href="https://mrps.in" target="_blank" className="text-[var(--text-primary)] underline">mrps.in</Link>.
            </p>
          </div>
        </div>

        {/* Right Column: Statement & Three Philosophical Pillars */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          {/* Statement Quote */}
          <blockquote className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-[var(--text-primary)] leading-[1.12] pl-6 border-l-2 border-[var(--accent-champagne)] py-1">
            &ldquo;{about.quote}&rdquo;
          </blockquote>

          {/* Narrative Paragraphs */}
          <div className="flex flex-col gap-6 text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed max-w-2xl">
            {about.storyParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Foundational Principles (Architectural List, Not Generic Equal Cards) */}
          <div className="mt-4 pt-8 border-t border-[var(--glass-border)] flex flex-col gap-6">
            <span className="text-xs uppercase tracking-widest font-mono text-[var(--text-tertiary)]">
              FOUNDATIONAL PILLARS
            </span>

            <div className="flex flex-col divide-y divide-[var(--glass-border)]">
              {about.principles.map((principle) => (
                <div key={principle.number} className="py-6 group">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-sm font-mono text-[var(--accent-champagne)]">
                      {principle.number}
                    </span>
                    <h3 className="text-2xl font-light text-[var(--text-primary)] uppercase tracking-tight group-hover:text-[var(--accent-champagne)] transition-colors">
                      {principle.title}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed pl-8 max-w-xl">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

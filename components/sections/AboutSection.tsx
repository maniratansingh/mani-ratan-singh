"use client";

import * as React from "react";
import { siteContent } from "@/config/content";
import { InteractiveGlassCard } from "@/components/glass/InteractiveGlassCard";

export function AboutSection({ isStandalone = false }: { isStandalone?: boolean }) {
  const { about } = siteContent;

  return (
    <section
      id="about"
      className={`relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 ${
        isStandalone ? "pt-32 pb-24" : "py-28 sm:py-36"
      }`}
    >
      {/* Editorial Category Header */}
      <div className="flex items-center justify-between border-b border-[var(--glass-border)] pb-4 mb-16 text-xs font-mono tracking-widest uppercase text-[var(--text-tertiary)]">
        <span className="text-[var(--accent-champagne)]">01 / BIOGRAPHY & ETHOS</span>
        <span>MANI RATAN SINGH</span>
        <span>INDEX [ 02 / 05 ]</span>
      </div>

      {/* Main Asymmetrical Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Metrics & Identity Parameters */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[var(--text-primary)] uppercase leading-[1.05] mb-4">
              Tactile <br />
              <span className="font-serif italic text-[var(--accent-champagne)] normal-case">
                Materiality.
              </span>
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Bridging digital architecture, tactile electronics, and sensory interface design.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {about.stats.map((stat, idx) => (
              <InteractiveGlassCard
                key={idx}
                tilt={false}
                className="p-5 flex items-center justify-between"
              >
                <span className="font-mono text-xs text-[var(--text-tertiary)] uppercase tracking-wider">
                  {stat.label}
                </span>
                <span className="font-medium text-sm text-[var(--text-primary)]">
                  {stat.value}
                </span>
              </InteractiveGlassCard>
            ))}
          </div>
        </div>

        {/* Right Column: Editorial Narrative & Principles */}
        <div className="lg:col-span-8 flex flex-col gap-12">
          {/* Statement Quote in Specular Glass */}
          <InteractiveGlassCard className="p-8 sm:p-12">
            <blockquote className="text-2xl sm:text-3xl font-serif italic text-[var(--text-primary)] leading-snug">
              &ldquo;{about.quote}&rdquo;
            </blockquote>
          </InteractiveGlassCard>

          {/* Narrative Paragraphs in Glass Slab */}
          <InteractiveGlassCard tilt={false} className="p-8 sm:p-12 flex flex-col gap-6 text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed">
            {about.storyParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </InteractiveGlassCard>

          {/* 3 Core Principles as Architectural Liquid Glass Slabs */}
          <div className="flex flex-col gap-4 mt-2">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--accent-silver)] mb-2">
              Foundational Pillars
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {about.principles.map((principle) => (
                <InteractiveGlassCard
                  key={principle.number}
                  className="p-6 sm:p-8 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                    <span className="text-xs font-mono text-[var(--accent-champagne)]">
                      [ {principle.number} ]
                    </span>
                    <h4 className="text-lg sm:text-xl font-medium text-[var(--text-primary)] sm:text-left flex-1 sm:ml-6 group-hover:text-[var(--accent-champagne)] transition-colors">
                      {principle.title}
                    </h4>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed sm:ml-10">
                    {principle.description}
                  </p>
                </InteractiveGlassCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

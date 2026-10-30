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
        isStandalone ? "pt-36 pb-24" : "py-28 sm:py-36"
      }`}
    >
      {/* Editorial Header - No kickers */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-[var(--glass-border)]">
        <div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-[-0.03em] text-[var(--text-primary)] uppercase leading-[0.98] mb-4">
            About & Ethos
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-lg leading-relaxed">
            Bridging digital architecture, tactile electronics, and sensory interface design.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Live Identity Parameters */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <InteractiveGlassCard tilt={false} className="p-8">
            <h3 className="text-xl font-light text-[var(--text-primary)] uppercase tracking-tight mb-6">
              Core Parameters
            </h3>
            <div className="flex flex-col divide-y divide-[var(--glass-border)]">
              {about.stats.map((stat, idx) => (
                <div key={idx} className="py-3.5 flex items-center justify-between text-sm">
                  <span className="text-[var(--text-tertiary)]">{stat.label}</span>
                  <span className="font-medium text-[var(--text-primary)]">{stat.value}</span>
                </div>
              ))}
            </div>
          </InteractiveGlassCard>
        </div>

        {/* Right Column: Narrative & Manifesto */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          {/* Statement Quote */}
          <blockquote className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-[var(--text-primary)] leading-[1.15] border-l-2 border-[var(--accent-champagne)] pl-6 sm:pl-10 py-2">
            &ldquo;{about.quote}&rdquo;
          </blockquote>

          {/* Narrative Paragraphs (Max 65ch measure) */}
          <div className="flex flex-col gap-6 text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed max-w-2xl">
            {about.storyParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* 3 Core Philosophical Pillars */}
          <div className="mt-6 flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-widest text-[var(--accent-silver)] mb-2">
              Foundational Principles
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {about.principles.map((principle) => (
                <InteractiveGlassCard
                  key={principle.number}
                  className="p-8 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-3">
                    <span className="text-xs font-mono text-[var(--accent-champagne)]">
                      {principle.number}
                    </span>
                    <h4 className="text-xl font-light text-[var(--text-primary)] uppercase tracking-tight flex-1 group-hover:text-[var(--accent-champagne)] transition-colors">
                      {principle.title}
                    </h4>
                  </div>
                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed sm:ml-8">
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

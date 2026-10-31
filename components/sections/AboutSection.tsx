"use client";

import * as React from "react";
import { siteContent } from "@/config/content";

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
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        {/* Statement Quote */}
        <blockquote className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-[var(--text-primary)] leading-[1.15] pl-6 border-l-2 border-[var(--accent-champagne)] py-1">
          &ldquo;{about.quote}&rdquo;
        </blockquote>

        {/* Narrative Paragraphs */}
        <div className="flex flex-col gap-6 text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed">
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
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed pl-8 max-w-2xl">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

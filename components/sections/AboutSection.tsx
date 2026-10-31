"use client";

import * as React from "react";
import Image from "next/image";
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Author Portrait Plate */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="relative w-full aspect-[4/5] min-h-[380px] sm:min-h-[460px] rounded-3xl overflow-hidden editorial-frame shadow-2xl">
            <Image
              src="https://avatars.githubusercontent.com/u/85608407?v=4"
              alt="Mani Ratan Pratap Singh"
              fill
              priority
              loading="eager"
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
            />
            {/* Top Glass Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider liquid-glass-pill text-[var(--text-primary)]">
                Mani Ratan Singh
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-tertiary)] px-2">
            <span>PORTRAIT ARCHIVE</span>
            <span>PURVANCHAL · IN</span>
          </div>
        </div>

        {/* Right Column: Statement, Story & Foundational Pillars */}
        <div className="lg:col-span-7 flex flex-col gap-10">
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

          {/* Foundational Principles */}
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

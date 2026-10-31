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
        {/* Left Column: Author Circular Portrait Medallion */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center gap-6 py-2">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[340px] lg:h-[340px] rounded-full p-2.5 liquid-glass-pill shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
            <div className="relative w-full h-full rounded-full overflow-hidden border border-[var(--glass-border)] bg-black/20">
              <Image
                src="https://avatars.githubusercontent.com/u/85608407?v=4"
                alt="Mani Ratan Pratap Singh"
                fill
                priority
                loading="eager"
                sizes="(max-width: 1024px) 320px, 340px"
                className="object-cover object-center"
              />
            </div>
            {/* Monograph Tag Centered on Bottom Rim */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
              <span className="px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest liquid-glass-pill text-[var(--text-primary)] shadow-md border border-[var(--glass-border)]">
                Mani Ratan Singh
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between w-full max-w-[340px] text-xs font-mono text-[var(--text-tertiary)] px-2 mt-2">
            <span>PORTRAIT ARCHIVE</span>
            <span>PURVANCHAL · IN</span>
          </div>
        </div>

        {/* Right Column: Statement & Story */}
        <div className="lg:col-span-7 flex flex-col gap-8 justify-center">
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
        </div>
      </div>
    </section>
  );
}

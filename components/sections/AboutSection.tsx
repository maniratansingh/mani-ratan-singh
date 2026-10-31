"use client";

import * as React from "react";
import Image from "next/image";
import { siteContent } from "@/config/content";

export function AboutSection({ isStandalone = false }: { isStandalone?: boolean }) {
  const { about } = siteContent;

  return (
    <section
      id="about"
      className={`relative max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1856px] 4xl:max-w-[2240px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 4xl:px-24 ${
        isStandalone ? "pt-36 pb-24" : "py-20 sm:py-28 lg:py-32 2xl:py-40"
      }`}
    >
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-[var(--glass-border)]">
        <div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-light tracking-[-0.03em] text-[var(--text-primary)] uppercase leading-[0.95] mb-4">
            About & Ethos
          </h2>
          <p className="text-base sm:text-lg 2xl:text-xl text-[var(--text-secondary)] max-w-lg 2xl:max-w-2xl leading-relaxed">
            Bridging digital architecture, tactile electronics, and sensory interface design.
          </p>
        </div>
        <div className="text-xs 2xl:text-sm font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
          <span>IDENTITY MANIFESTO · 01</span>
        </div>
      </div>

      {/* Main Narrative Spread */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 2xl:gap-24 items-start">
        {/* Left Column: Author Square Monograph Plate */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="relative w-full aspect-square min-h-[320px] sm:min-h-[400px] 2xl:min-h-[500px] 3xl:min-h-[600px] rounded-3xl overflow-hidden editorial-frame shadow-2xl bg-black/30">
            <Image
              src="/author.png"
              alt="Mani Ratan Pratap Singh"
              fill
              priority
              loading="eager"
              sizes="(max-width: 1024px) 100vw, (max-width: 2560px) 40vw, 800px"
              className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
            />
            {/* Top Glass Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3.5 py-1 rounded-full text-[10px] 2xl:text-xs font-mono uppercase tracking-wider liquid-glass-pill text-[var(--text-primary)]">
                Mani Ratan Singh
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs 2xl:text-sm font-mono text-[var(--text-tertiary)] px-2">
            <span>PORTRAIT ARCHIVE</span>
            <span>INDIA</span>
          </div>
        </div>

        {/* Right Column: Statement & Story */}
        <div className="lg:col-span-7 flex flex-col gap-8 justify-center">
          {/* Statement Quote */}
          <blockquote className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-serif italic text-[var(--text-primary)] leading-[1.15] pl-6 2xl:pl-8 border-l-2 border-[var(--accent-champagne)] py-1">
            &ldquo;{about.quote}&rdquo;
          </blockquote>

          {/* Narrative Paragraphs */}
          <div className="flex flex-col gap-6 text-base sm:text-lg 2xl:text-xl text-[var(--text-secondary)] font-normal leading-relaxed max-w-[62ch]">
            {about.storyParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

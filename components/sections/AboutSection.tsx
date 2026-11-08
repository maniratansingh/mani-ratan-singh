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
            {about.title}
          </h2>
          <p className="text-base sm:text-lg 2xl:text-xl text-[var(--text-secondary)] max-w-lg 2xl:max-w-2xl leading-relaxed">
            {about.subtitle}
          </p>
        </div>
        <div className="text-xs 2xl:text-sm font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
          <span>A CONTINUOUS LEARNING JOURNEY</span>
        </div>
      </div>

      {/* Main Narrative Spread */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 2xl:gap-24 items-start">
        {/* Left Column: Author Square Monograph Plate */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="relative w-full aspect-square min-h-[260px] sm:min-h-[380px] 2xl:min-h-[500px] 3xl:min-h-[600px] rounded-3xl overflow-hidden editorial-frame shadow-2xl bg-black/30">
            <Image
              src="/author-640.webp"
              alt="Mani Ratan Pratap Singh"
              fill
              loading="lazy"
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
            <span>STUDENT &amp; TINKERER</span>
            <span>AYODHYA · UTTAR PRADESH</span>
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

          {/* Humble Learning Focus Strip */}
          {about.learningFocus && (
            <div className="pt-6 border-t border-[var(--glass-border)]">
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] block mb-3">
                Current Areas of Learning &amp; Curiosity
              </span>
              <div className="flex flex-wrap gap-2">
                {about.learningFocus.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-full text-xs font-mono bg-white/[0.04] dark:bg-white/[0.06] border border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

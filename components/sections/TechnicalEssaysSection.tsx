"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Terminal } from "lucide-react";
import { siteContent } from "@/config/content";

export function TechnicalEssaysSection() {
  const { essays } = siteContent;

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-24 sm:py-32">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-[var(--glass-border)]">
        <div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-[-0.03em] text-[var(--text-primary)] uppercase leading-[0.95] mb-4">
            Dispatches from the Lab
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-lg leading-relaxed">
            Technical essays, hardware benchmarks, and architectural notes published directly on{" "}
            <Link
              href="https://mrps.in/blog/"
              target="_blank"
              className="text-[var(--accent-champagne)] underline underline-offset-4 hover:opacity-80"
            >
              mrps.in
            </Link>
            .
          </p>
        </div>

        <Link
          href="https://mrps.in/blog/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full liquid-glass-pill text-xs uppercase tracking-widest font-medium text-[var(--text-primary)] hover:scale-105 transition-transform"
        >
          <Terminal className="w-4 h-4 text-[var(--accent-champagne)]" />
          <span>All Dispatches on mrps.in</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Editorial Journal Index (Table of Contents Style) */}
      <div className="flex flex-col divide-y divide-[var(--glass-border)] border-y border-[var(--glass-border)]">
        {essays.map((essay, idx) => (
          <Link
            key={essay.slug}
            href={essay.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group py-8 sm:py-10 flex flex-col md:flex-row md:items-baseline justify-between gap-6 transition-colors hover:bg-black/[0.015] dark:hover:bg-white/[0.015] px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-xl"
          >
            {/* Left: Index & Meta */}
            <div className="md:w-1/4 flex flex-col gap-1 text-xs font-mono text-[var(--text-tertiary)]">
              <span className="text-[var(--accent-champagne)] font-medium">
                DISPATCH [{String(idx + 1).padStart(2, "0")}]
              </span>
              <span>{essay.date}</span>
              <span className="uppercase tracking-wider opacity-75">{essay.category}</span>
            </div>

            {/* Middle: Title & Excerpt */}
            <div className="md:w-3/5 flex flex-col gap-2">
              <h3 className="text-xl sm:text-2xl font-light text-[var(--text-primary)] uppercase tracking-tight group-hover:text-[var(--accent-champagne)] transition-colors leading-snug">
                {essay.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                {essay.excerpt}
              </p>
            </div>

            {/* Right: Direct Arrow to mrps.in */}
            <div className="md:w-auto flex items-center gap-2 text-xs font-mono text-[var(--accent-champagne)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
              <span className="hidden sm:inline">mrps.in</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

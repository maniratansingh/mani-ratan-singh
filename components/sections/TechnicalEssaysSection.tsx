"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Terminal, BookOpen } from "lucide-react";
import { siteContent } from "@/config/content";
import { InteractiveGlassCard } from "@/components/glass/InteractiveGlassCard";

export function TechnicalEssaysSection() {
  const { essays } = siteContent;

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-24 sm:py-32">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-[var(--glass-border)]">
        <div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-[-0.03em] text-[var(--text-primary)] uppercase leading-[0.98] mb-4">
            Dispatches from the Lab
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-lg leading-relaxed">
            Technical essays, hardware benchmarks, and architectural notes published directly on <Link href="https://mrps.in/blog/" target="_blank" className="text-[var(--accent-champagne)] underline underline-offset-4 hover:opacity-80">mrps.in</Link>.
          </p>
        </div>

        <Link
          href="https://mrps.in/blog/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full liquid-glass-pill text-xs uppercase tracking-widest font-medium text-[var(--text-primary)] hover:scale-105 transition-transform"
        >
          <Terminal className="w-4 h-4 text-[var(--accent-champagne)]" />
          <span>All Posts on mrps.in</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Essays Grid with Direct Backlinks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {essays.map((essay) => (
          <Link
            key={essay.slug}
            href={essay.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <InteractiveGlassCard className="p-8 sm:p-10 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 text-xs text-[var(--text-tertiary)] mb-4">
                  <span className="px-3 py-1 rounded-full liquid-glass-pill text-[var(--accent-champagne)] uppercase font-medium">
                    {essay.category}
                  </span>
                  <span>{essay.date}</span>
                </div>

                <h3 className="text-2xl font-light text-[var(--text-primary)] uppercase tracking-tight mb-3 group-hover:text-[var(--accent-champagne)] transition-colors leading-snug">
                  {essay.title}
                </h3>

                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-6">
                  {essay.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--glass-border)] flex items-center justify-between text-xs font-mono text-[var(--accent-champagne)]">
                <span>Read Full Essay on mrps.in</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </InteractiveGlassCard>
          </Link>
        ))}
      </div>
    </section>
  );
}

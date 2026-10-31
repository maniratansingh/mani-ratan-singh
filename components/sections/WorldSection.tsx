"use client";

import * as React from "react";
import { Compass, Cpu, Layers, Disc3 } from "lucide-react";
import { siteContent } from "@/config/content";

const realmIcons = [Layers, Cpu, Disc3, Compass];

export function WorldSection({ isStandalone = false }: { isStandalone?: boolean }) {
  const { world } = siteContent;

  return (
    <section
      id="explore"
      className={`relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 ${
        isStandalone ? "pt-36 pb-24" : "py-24 sm:py-32"
      }`}
    >
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-[var(--glass-border)]">
        <div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-[-0.03em] text-[var(--text-primary)] uppercase leading-[0.95] mb-4">
            My World
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-lg leading-relaxed">
            {world.intro}
          </p>
        </div>
        <div className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
          <span>CREATIVE REALMS · 03</span>
        </div>
      </div>

      {/* 4 Creative & Technological Realms (Architectural Editorial Spreads) */}
      <div className="mb-16 border-y border-[var(--glass-border)] divide-y divide-[var(--glass-border)]">
        {world.realms.map((item, idx) => {
          const Icon = realmIcons[idx % realmIcons.length];
          return (
            <div
              key={item.title}
              className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline group transition-colors hover:bg-black/[0.015] dark:hover:bg-white/[0.015] px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-xl"
            >
              <div className="lg:col-span-3 flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--accent-champagne)]">
                  [{String(idx + 1).padStart(2, "0")}]
                </span>
                <span className="text-xs uppercase tracking-widest font-mono text-[var(--text-tertiary)]">
                  {item.realm}
                </span>
              </div>

              <div className="lg:col-span-4">
                <h3 className="text-2xl sm:text-3xl font-light text-[var(--text-primary)] uppercase tracking-tight group-hover:text-[var(--accent-champagne)] transition-colors">
                  {item.title}
                </h3>
              </div>

              <div className="lg:col-span-4">
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="lg:col-span-1 flex lg:justify-end">
                <span className="text-xs font-mono text-[var(--text-tertiary)] border border-[var(--glass-border)] px-2.5 py-1 rounded-full whitespace-nowrap">
                  {item.tag}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

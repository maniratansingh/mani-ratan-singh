"use client";

import * as React from "react";
import { Compass, Cpu, Layers, Disc3, Sparkles } from "lucide-react";
import { siteContent } from "@/config/content";
import { InteractiveGlassCard } from "@/components/glass/InteractiveGlassCard";
import { SensoryAudioVisualizer } from "@/components/sections/SensoryAudioVisualizer";

const realmIcons = [Layers, Cpu, Disc3, Compass];

export function WorldSection({ isStandalone = false }: { isStandalone?: boolean }) {
  const { world } = siteContent;

  return (
    <section
      id="explore"
      className={`relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 ${
        isStandalone ? "pt-36 pb-24" : "py-28 sm:py-36"
      }`}
    >
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-[var(--glass-border)]">
        <div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-[-0.03em] text-[var(--text-primary)] uppercase leading-[0.98] mb-4">
            My World
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-lg leading-relaxed">
            {world.intro}
          </p>
        </div>
      </div>

      {/* Procedural Audio & WebGL Caustics Laboratory (Interactive Focal Artifact) */}
      <div className="mb-14">
        <SensoryAudioVisualizer />
      </div>

      {/* 4 Creative & Technological Realms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
        {world.realms.map((item, idx) => {
          const Icon = realmIcons[idx % realmIcons.length];
          return (
            <InteractiveGlassCard
              key={item.title}
              className="p-8 sm:p-10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl liquid-glass-pill flex items-center justify-center text-[var(--accent-champagne)] shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-black/[0.03] dark:bg-white/[0.03] text-[var(--text-secondary)] border border-[var(--glass-border)]">
                    {item.tag}
                  </span>
                </div>

                <span className="text-xs uppercase tracking-widest text-[var(--accent-silver)] block mb-1">
                  {item.realm}
                </span>
                <h3 className="text-2xl font-light text-[var(--text-primary)] uppercase tracking-tight mb-3 group-hover:text-[var(--accent-champagne)] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </InteractiveGlassCard>
          );
        })}
      </div>

      {/* Active Obsessions & Curiosities */}
      <div className="p-8 sm:p-12 liquid-glass-surface flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[var(--accent-champagne)]" />
          <h3 className="text-xs uppercase tracking-widest text-[var(--text-tertiary)]">
            Active Mechanical & Typographic Inquiries
          </h3>
        </div>

        <div className="flex flex-wrap gap-3">
          {world.curiosities.map((curiosity, idx) => (
            <div
              key={idx}
              className="px-4 py-2.5 rounded-full liquid-glass-pill text-xs sm:text-sm text-[var(--text-secondary)] transition-all hover:text-[var(--text-primary)] hover:scale-105"
            >
              {curiosity}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

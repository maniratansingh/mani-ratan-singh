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
        isStandalone ? "pt-32 pb-24" : "py-28 sm:py-36"
      }`}
    >
      {/* Editorial Header */}
      <div className="flex items-center justify-between border-b border-[var(--glass-border)] pb-4 mb-16 text-xs font-mono tracking-widest uppercase text-[var(--text-tertiary)]">
        <span className="text-[var(--accent-champagne)]">02 / CURIOSITIES & EXPERIMENTS</span>
        <span>INDEX [ 03 / 05 ]</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h2 className="text-3xl sm:text-6xl font-light tracking-tight text-[var(--text-primary)] uppercase leading-[1.02] mb-3">
            My <br />
            <span className="font-serif italic text-[var(--accent-champagne)] normal-case">
              World.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-md">
            {world.intro}
          </p>
        </div>
      </div>

      {/* 4 Creative & Technological Realms with Cursor Specular Glass */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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
                  <span className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-[var(--surface-muted)] text-[var(--text-secondary)] border border-[var(--glass-border)]">
                    {item.tag}
                  </span>
                </div>

                <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[var(--accent-silver)] block mb-1">
                  {item.realm}
                </span>
                <h3 className="text-2xl font-medium text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent-champagne)] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </InteractiveGlassCard>
          );
        })}
      </div>

      {/* Procedural Audio & WebGL Caustics Laboratory */}
      <div className="mb-12">
        <SensoryAudioVisualizer />
      </div>

      {/* Curiosities Grid */}
      <div className="liquid-glass-surface p-8 sm:p-10 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[var(--accent-champagne)]" />
          <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)]">
            Active Mechanical & Typographic Obsessions
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

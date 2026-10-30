"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Compass, Cpu, Layers, Disc3, Sparkles } from "lucide-react";
import { siteContent } from "@/config/content";
import { GlassCard } from "@/components/glass/GlassCard";
import { GlassPill } from "@/components/glass/GlassPill";
import {
  revealVariants,
  staggerContainer,
} from "@/components/animations/transitions";

const realmIcons = [Layers, Cpu, Disc3, Compass];

export function WorldSection({ isStandalone = false }: { isStandalone?: boolean }) {
  const { world } = siteContent;

  return (
    <section
      id="explore"
      className={`relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${
        isStandalone ? "pt-32 pb-24" : "py-24 sm:py-32"
      }`}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="flex flex-col gap-16"
      >
        {/* Section Header */}
        <motion.div variants={revealVariants} className="max-w-2xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-[var(--accent-champagne)] mb-2 block">
            02 — {world.title}
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            {world.subtitle}
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            {world.intro}
          </p>
        </motion.div>

        {/* 4 Creative & Technological Realms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {world.realms.map((item, idx) => {
            const Icon = realmIcons[idx % realmIcons.length];
            return (
              <motion.div key={item.title} variants={revealVariants}>
                <GlassCard variant="frosted" interactive className="h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl glass-translucent flex items-center justify-center text-[var(--accent-champagne)]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-[var(--surface-muted)] text-[var(--text-secondary)] border border-[var(--glass-frosted-border)]">
                        {item.tag}
                      </span>
                    </div>

                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--accent-silver)] block mb-1">
                      {item.realm}
                    </span>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Curiosities Grid */}
        <motion.div variants={revealVariants} className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--accent-champagne)]" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
              Current Micro-Curiosities & Obsessions
            </h3>
          </div>

          <div className="flex flex-wrap gap-3">
            {world.curiosities.map((curiosity, idx) => (
              <div
                key={idx}
                className="px-4 py-2.5 rounded-full glass-translucent text-xs sm:text-sm text-[var(--text-secondary)] border border-[var(--glass-translucent-border)] shadow-xs transition-colors hover:text-[var(--text-primary)] hover:border-[var(--glass-hover-border)]"
              >
                {curiosity}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { siteContent } from "@/config/content";
import { GlassCard } from "@/components/glass/GlassCard";
import {
  revealVariants,
  staggerContainer,
} from "@/components/animations/transitions";

export function AboutSection({ isStandalone = false }: { isStandalone?: boolean }) {
  const { about } = siteContent;

  return (
    <section
      id="about"
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
            01 — {about.title}
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            {about.subtitle}
          </h2>
          <p className="text-lg sm:text-xl italic text-[var(--text-secondary)] font-serif border-l-2 border-[var(--accent-champagne)] pl-4 py-1">
            &ldquo;{about.quote}&rdquo;
          </p>
        </motion.div>

        {/* Narrative & Story */}
        <motion.div
          variants={revealVariants}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
        >
          <div className="md:col-span-8 flex flex-col gap-6 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            {about.storyParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Quick Metrics / Focus Badges */}
          <div className="md:col-span-4 grid grid-cols-1 gap-4">
            {about.stats.map((stat, idx) => (
              <GlassCard key={idx} variant="frosted" className="p-5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)] block mb-1">
                  {stat.label}
                </span>
                <span className="text-lg font-semibold text-[var(--text-primary)]">
                  {stat.value}
                </span>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        {/* 3 Core Philosophical Pillars */}
        <motion.div variants={revealVariants} className="flex flex-col gap-6">
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
            Guiding Philosophy
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {about.principles.map((principle) => (
              <GlassCard
                key={principle.number}
                variant="frosted"
                interactive
                className="flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[var(--accent-champagne)] mb-3 block">
                    {principle.number}
                  </span>
                  <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                    {principle.title}
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

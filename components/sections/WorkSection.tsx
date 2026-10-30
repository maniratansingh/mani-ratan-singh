"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Layers, Terminal, Sparkles, Cpu, Activity, Filter } from "lucide-react";
import { siteContent, ProjectItem } from "@/config/content";
import { InteractiveGlassCard } from "@/components/glass/InteractiveGlassCard";
import { ProjectModal } from "@/components/sections/ProjectModal";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function WorkSection({ isStandalone = false }: { isStandalone?: boolean }) {
  const { projects } = siteContent;
  const [filter, setFilter] = React.useState<string>("All");
  const [selectedProject, setSelectedProject] = React.useState<ProjectItem | null>(null);

  // Jellyfin Interactive Theme Switcher state
  const [jellyfinTheme, setJellyfinTheme] = React.useState<"glass" | "obsidian" | "champagne">("glass");

  const categories = ["All", "Web & Design", "Embedded Systems", "Community & Health", "Open Source"];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  const leadProject = projects.find((p) => p.id === "jellyfin-liquid-glass");
  const hospitalProject = projects.find((p) => p.id === "purvanchal-hospitals");
  const musicProject = projects.find((p) => p.id === "aesthetic-music-player");

  return (
    <section
      id="work"
      className={`relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 ${
        isStandalone ? "pt-36 pb-24" : "py-24 sm:py-32"
      }`}
    >
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 pb-8 border-b border-[var(--glass-border)]">
        <div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-[-0.03em] text-[var(--text-primary)] uppercase leading-[0.95] mb-4">
            Selected Works
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-lg leading-relaxed">
            Curated software systems, embedded hardware builds, and tactile interface environments.
          </p>
        </div>

        {/* Category Filter Pills (All UI Elements Back) */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                filter === cat
                  ? "bg-[var(--text-primary)] text-[var(--canvas)] font-semibold shadow-xs"
                  : "liquid-glass-pill text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* LEAD EXHIBIT 01: Jellyfin Liquid Glass Theme with Interactive Preview (Shown when All or Web & Design) */}
      {(filter === "All" || filter === "Web & Design") && leadProject && (
        <article className="mb-16">
          <InteractiveGlassCard className="p-8 sm:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Context & Ethos */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs font-mono text-[var(--text-tertiary)] mb-4">
                    <span className="px-3 py-1 rounded-full liquid-glass-pill text-[var(--accent-champagne)] font-medium uppercase tracking-wider">
                      {leadProject.category}
                    </span>
                    <span>{leadProject.year}</span>
                    <span className="text-emerald-500 font-medium flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Live Open Source
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-5xl font-light text-[var(--text-primary)] uppercase tracking-tight mb-2">
                    {leadProject.title}
                  </h3>
                  <h4 className="text-lg sm:text-xl font-serif italic text-[var(--accent-champagne)] mb-6">
                    {leadProject.subtitle}
                  </h4>

                  <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-6 max-w-xl">
                    {leadProject.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {leadProject.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full text-xs font-mono bg-black/[0.04] dark:bg-white/[0.04] text-[var(--text-secondary)] border border-[var(--glass-border)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  {leadProject.github && (
                    <Link
                      href={leadProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--text-primary)] text-[var(--canvas)] text-xs uppercase tracking-widest font-semibold hover:opacity-90 hover:scale-105 transition-all shadow-md"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>View GitHub Repository</span>
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={() => setSelectedProject(leadProject)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full liquid-glass-pill text-xs uppercase tracking-widest font-medium text-[var(--text-primary)] hover:scale-105 transition-transform cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-[var(--accent-champagne)]" />
                    <span>Architecture Specifications</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Live Interactive Glass Simulation Console */}
              <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl border border-[var(--glass-border)] bg-[var(--surface-muted)]/40 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest font-mono text-[var(--text-tertiary)]">
                    LIVE THEME RENDERER
                  </span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setJellyfinTheme("glass")}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                        jellyfinTheme === "glass"
                          ? "bg-[var(--text-primary)] text-[var(--canvas)] font-bold"
                          : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      Frost
                    </button>
                    <button
                      type="button"
                      onClick={() => setJellyfinTheme("obsidian")}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                        jellyfinTheme === "obsidian"
                          ? "bg-[var(--text-primary)] text-[var(--canvas)] font-bold"
                          : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      Obsidian
                    </button>
                    <button
                      type="button"
                      onClick={() => setJellyfinTheme("champagne")}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                        jellyfinTheme === "champagne"
                          ? "bg-[var(--text-primary)] text-[var(--canvas)] font-bold"
                          : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      Gold
                    </button>
                  </div>
                </div>

                {/* Simulated Jellyfin Media Glass Card with Dual Crescent Rim */}
                <div
                  className={`p-6 rounded-xl transition-all duration-500 border ${
                    jellyfinTheme === "glass"
                      ? "bg-white/80 dark:bg-white/10 border-white/80 shadow-lg text-[var(--text-primary)]"
                      : jellyfinTheme === "obsidian"
                      ? "bg-black/90 border-neutral-700 shadow-2xl text-white"
                      : "bg-[#F5EFE6]/90 dark:bg-[#252018]/90 border-[var(--accent-champagne)] shadow-xl text-[var(--text-primary)]"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-4 opacity-75">
                    <span>JELLYFIN SERVER</span>
                    <span>1080p · HEVC 10-BIT</span>
                  </div>
                  <div className="h-28 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center border border-black/10 dark:border-white/10 mb-4">
                    <div className="flex flex-col items-center text-center p-3">
                      <Sparkles className="w-6 h-6 text-[var(--accent-champagne)] mb-1" />
                      <span className="text-xs font-medium uppercase tracking-wider">
                        Dual Crescent Rim
                      </span>
                      <span className="text-[10px] font-mono opacity-70">
                        `inset 1.5px 0.75px ... inset -1.5px`
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="h-2 w-3/4 bg-current opacity-20 rounded" />
                    <div className="h-2 w-1/2 bg-current opacity-10 rounded" />
                  </div>
                </div>

                <div className="text-[11px] font-mono text-[var(--text-tertiary)] space-y-1">
                  <p>• Zero external font requests for 100% homelab autonomy</p>
                  <p>• Respects prefers-reduced-motion OS constraints</p>
                </div>
              </div>
            </div>
          </InteractiveGlassCard>
        </article>
      )}

      {/* EXHIBIT 02: Healthcare Infrastructure & Audio Lab (When All or matching category) */}
      {(filter === "All" || filter === "Community & Health" || filter === "Web & Design") && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          {/* Healthcare Digital Infrastructure */}
          {(filter === "All" || filter === "Community & Health") && hospitalProject && (
            <article className={`${filter === "All" ? "lg:col-span-7" : "lg:col-span-12"}`}>
              <InteractiveGlassCard className="p-8 sm:p-12 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs font-mono text-[var(--text-tertiary)] mb-4">
                    <span className="px-3 py-1 rounded-full liquid-glass-pill text-emerald-600 dark:text-emerald-400 font-medium uppercase tracking-wider">
                      Public Health
                    </span>
                    <span>Eastern UP, India</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-light text-[var(--text-primary)] uppercase tracking-tight mb-2">
                    {hospitalProject.title}
                  </h3>
                  <h4 className="text-base font-serif italic text-[var(--accent-champagne)] mb-5">
                    {hospitalProject.subtitle}
                  </h4>

                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-6">
                    {hospitalProject.description}
                  </p>

                  {/* Real Hospital Deployments List */}
                  <div className="p-4 rounded-xl border border-[var(--glass-border)] bg-[var(--surface-muted)]/30 mb-6">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] block mb-3">
                      ACTIVE REGIONAL HOSPITAL DEPLOYMENTS:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-medium text-[var(--text-primary)]">
                      <div className="p-2 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-[var(--glass-border)]">
                        Ayodhya Phaco Center
                      </div>
                      <div className="p-2 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-[var(--glass-border)]">
                        Sunbeam Eye Hospital
                      </div>
                      <div className="p-2 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-[var(--glass-border)]">
                        Sant Kabir Eye Hospital
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--glass-border)] flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                    • Sub-400ms load on rural 3G cellular
                  </span>
                  {hospitalProject.link && (
                    <Link
                      href={hospitalProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--accent-champagne)] hover:underline"
                    >
                      <span>Read Case Study on mrps.in</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </InteractiveGlassCard>
            </article>
          )}

          {/* Audio Lab Vinyl Player */}
          {(filter === "All" || filter === "Web & Design") && musicProject && (
            <article className={`${filter === "All" ? "lg:col-span-5" : "lg:col-span-12"}`}>
              <InteractiveGlassCard className="p-8 sm:p-12 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs font-mono text-[var(--text-tertiary)] mb-4">
                    <span className="px-3 py-1 rounded-full liquid-glass-pill text-[var(--accent-champagne)] font-medium uppercase tracking-wider">
                      Audio & Shaders
                    </span>
                    <span>Interactive</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-light text-[var(--text-primary)] uppercase tracking-tight mb-2">
                    {musicProject.title}
                  </h3>
                  <h4 className="text-base font-serif italic text-[var(--accent-champagne)] mb-5">
                    {musicProject.subtitle}
                  </h4>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                    {musicProject.description}
                  </p>

                  <div className="p-4 rounded-xl border border-[var(--glass-border)] flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border border-[var(--accent-champagne)] flex items-center justify-center animate-spin" style={{ animationDuration: "6s" }}>
                        <div className="w-3 h-3 rounded-full bg-[var(--accent-champagne)]" />
                      </div>
                      <div className="text-xs">
                        <span className="font-mono block text-[var(--text-primary)]">33⅓ RPM Turntable</span>
                        <span className="text-[var(--text-tertiary)]">Procedural Audio Caustics</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--glass-border)] flex items-center justify-between">
                  {musicProject.github && (
                    <Link
                      href={musicProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-primary)] hover:underline"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </Link>
                  )}
                  {musicProject.link && (
                    <Link
                      href={musicProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--accent-champagne)] hover:underline"
                    >
                      <span>Launch Player</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </InteractiveGlassCard>
            </article>
          )}
        </div>
      )}

      {/* EXHIBIT 03: Embedded Hardware & Systems Workbench Ledger */}
      <div>
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--glass-border)]">
          <span className="text-xs uppercase tracking-widest font-mono text-[var(--text-tertiary)]">
            HARDWARE SCHEMATICS & BENCHMARKS LEDGER
          </span>
          <span className="text-xs font-mono text-[var(--accent-champagne)]">
            C++ · PYTHON · KOTLIN
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProjects
            .filter((p) => !["jellyfin-liquid-glass", "purvanchal-hospitals", "aesthetic-music-player"].includes(p.id) || filter !== "All")
            .map((p) => (
              <InteractiveGlassCard
                key={p.id}
                onClick={() => setSelectedProject(p)}
                className="p-6 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--text-tertiary)] mb-3">
                    <span className="text-[var(--accent-champagne)] font-medium uppercase">
                      {p.category}
                    </span>
                    <span>{p.year}</span>
                  </div>

                  <h4 className="text-xl font-light text-[var(--text-primary)] uppercase tracking-tight mb-2 group-hover:text-[var(--accent-champagne)] transition-colors">
                    {p.title}
                  </h4>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                    {p.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.technologies.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/[0.04] dark:bg-white/[0.04] text-[var(--text-tertiary)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--glass-border)] flex items-center justify-between text-xs font-mono text-[var(--accent-champagne)]">
                  <span>View Architecture Specs</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </InteractiveGlassCard>
            ))}
        </div>
      </div>

      {/* Selected Project Full Architecture Drawer */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

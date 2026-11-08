"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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

  const categories = ["All", "Web & Design", "Embedded Systems", "Community & Health", "Open Source"];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  const hospitalProject = projects.find((p) => p.id === "purvanchal-hospitals");
  const musicProject = projects.find((p) => p.id === "aesthetic-music-player");

  return (
    <section
      id="work"
      className={`relative max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1856px] 4xl:max-w-[2240px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 4xl:px-24 ${
        isStandalone ? "pt-36 pb-24" : "py-20 sm:py-28 lg:py-32 2xl:py-40"
      }`}
    >
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 pb-8 border-b border-[var(--glass-border)]">
        <div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-light tracking-[-0.03em] text-[var(--text-primary)] uppercase leading-[0.95] mb-4">
            Selected Works
          </h2>
          <p className="text-base sm:text-lg 2xl:text-xl text-[var(--text-secondary)] max-w-lg 2xl:max-w-2xl leading-relaxed">
            Curated software systems, embedded hardware builds, and tactile interface environments.
          </p>
        </div>

        {/* Category Filter Pills (All UI Elements Back) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none sm:flex-wrap -mx-4 px-4 sm:mx-0 sm:px-0 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={`min-h-[38px] px-4.5 py-2 rounded-full text-xs font-mono transition-all cursor-pointer inline-flex items-center justify-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-champagne)] ${
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

      {/* EXHIBIT 01: Healthcare Infrastructure & Audio Lab (When All or matching category) */}
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

                <div className="pt-4 border-t border-[var(--glass-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
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

      {/* EXHIBIT 02: Systems & Architecture Ledger */}
      <div>
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--glass-border)]">
          <span className="text-xs uppercase tracking-widest font-mono text-[var(--text-tertiary)]">
            ENGINEERING & SYSTEMS ARCHITECTURE LEDGER
          </span>
          <span className="text-xs font-mono text-[var(--accent-champagne)]">
            OPEN SOURCE · HARDWARE · EMBEDDED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 3xl:grid-cols-4 gap-6 2xl:gap-8">
          {filteredProjects
            // The two featured projects above already have dedicated exhibits;
            // never repeat them in the ledger, regardless of the active filter.
            .filter((p) => !["purvanchal-hospitals", "aesthetic-music-player"].includes(p.id))
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

"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { siteContent, ProjectItem } from "@/config/content";
import { InteractiveGlassCard } from "@/components/glass/InteractiveGlassCard";
import { ProjectModal } from "@/components/sections/ProjectModal";

function GithubIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
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

  const categories = ["All", "Web & Design", "Embedded Systems", "Applied AI"];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  const leadProject = projects.find((p) => p.id === "jellyfin-liquid-glass");
  const secondaryProjects = filteredProjects.filter((p) => p.id !== "jellyfin-liquid-glass");

  return (
    <section
      id="work"
      className={`relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 ${
        isStandalone ? "pt-36 pb-24" : "py-28 sm:py-36"
      }`}
    >
      {/* Editorial Header - No fake kickers */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-[var(--glass-border)]">
        <div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-[-0.03em] text-[var(--text-primary)] uppercase leading-[0.98] mb-4">
            Selected Works
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-lg leading-relaxed">
            Curated software systems, embedded hardware builds, and tactile interface environments.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
                filter === cat
                  ? "bg-[var(--text-primary)] text-[var(--canvas)] font-semibold shadow-sm"
                  : "liquid-glass-pill text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetrical Showcase: Lead Artifact First (When Filter is All or Web & Design) */}
      {(filter === "All" || filter === "Web & Design") && leadProject && (
        <div className="mb-12">
          <InteractiveGlassCard
            onClick={() => setSelectedProject(leadProject)}
            className="p-8 sm:p-14"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-[var(--text-tertiary)] mb-4">
                    <span className="px-3 py-1 rounded-full liquid-glass-pill text-[var(--accent-champagne)] font-medium uppercase tracking-wider">
                      {leadProject.category}
                    </span>
                    <span>{leadProject.year}</span>
                    <span className="text-emerald-500 font-medium">• Live Theme</span>
                  </div>

                  <h3 className="text-3xl sm:text-5xl font-light text-[var(--text-primary)] uppercase tracking-tight mb-2 group-hover:text-[var(--accent-champagne)] transition-colors">
                    {leadProject.title}
                  </h3>
                  <h4 className="text-base sm:text-lg font-serif italic text-[var(--accent-champagne)] mb-6">
                    {leadProject.subtitle}
                  </h4>

                  <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-6 max-w-xl">
                    {leadProject.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {leadProject.technologies.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-lg text-xs bg-black/[0.04] dark:bg-white/[0.04] text-[var(--text-tertiary)]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {leadProject.github && (
                    <Link
                      href={leadProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full liquid-glass-pill text-xs font-semibold text-[var(--text-primary)] hover:scale-105 transition-transform"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>View Source</span>
                    </Link>
                  )}

                  <div className="flex items-center gap-1.5 text-xs text-[var(--accent-champagne)] group-hover:translate-x-1 transition-transform">
                    <BookOpen className="w-4 h-4" />
                    <span>Read Architecture Specs</span>
                  </div>
                </div>
              </div>

              {/* Visual Artifact Representation */}
              <div className="lg:col-span-5 p-8 rounded-2xl liquid-glass-surface flex flex-col gap-4">
                <span className="text-xs uppercase tracking-widest text-[var(--accent-silver)] block">
                  Design Specifications
                </span>
                <div className="flex flex-col gap-3 text-xs text-[var(--text-secondary)]">
                  {leadProject.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-champagne)] shrink-0 mt-1.5" />
                      <span className="leading-relaxed">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </InteractiveGlassCard>
        </div>
      )}

      {/* Grid for Remaining Curated Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {secondaryProjects.map((project) => (
          <InteractiveGlassCard
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-4 text-xs text-[var(--text-tertiary)] mb-4">
                <span className="px-2.5 py-0.5 rounded-full liquid-glass-pill text-[var(--accent-champagne)] uppercase font-medium">
                  {project.category}
                </span>
                <span>{project.year}</span>
              </div>

              <h3 className="text-2xl font-light text-[var(--text-primary)] uppercase tracking-tight mb-1 group-hover:text-[var(--accent-champagne)] transition-colors">
                {project.title}
              </h3>
              <h4 className="text-xs font-serif italic text-[var(--accent-champagne)] mb-4">
                {project.subtitle}
              </h4>

              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                {project.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--glass-border)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                {project.link && (
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--text-primary)] text-[var(--canvas)] text-xs font-semibold hover:scale-105 transition-transform"
                  >
                    <span>Launch</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                )}
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full liquid-glass-pill text-xs font-medium text-[var(--text-primary)] hover:scale-105 transition-transform"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </Link>
                )}
              </div>

              <span className="text-xs font-serif italic text-[var(--accent-champagne)]">
                Specs →
              </span>
            </div>
          </InteractiveGlassCard>
        ))}
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

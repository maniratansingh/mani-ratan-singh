"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, BookOpen } from "lucide-react";
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

  return (
    <section
      id="work"
      className={`relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 ${
        isStandalone ? "pt-32 pb-24" : "py-28 sm:py-36"
      }`}
    >
      {/* Editorial Header */}
      <div className="flex items-center justify-between border-b border-[var(--glass-border)] pb-4 mb-16 text-xs font-mono tracking-widest uppercase text-[var(--text-tertiary)]">
        <span className="text-[var(--accent-champagne)]">03 / CURATED ARCHIVES</span>
        <span>INDEX [ 04 / 05 ]</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h2 className="text-3xl sm:text-6xl font-light tracking-tight text-[var(--text-primary)] uppercase leading-[1.02] mb-3">
            Selected <br />
            <span className="font-serif italic text-[var(--accent-champagne)] normal-case">
              Artifacts.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-md">
            Click any artifact to open architectural specifications and engineering case studies.
          </p>
        </div>

        {/* Minimal Category Tabs as Liquid Glass Pills */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
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

      {/* Floating 3D Interactive Liquid Glass Project Cards with Cursor Specular Light */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <InteractiveGlassCard
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="p-8 sm:p-10 flex flex-col justify-between"
          >
            <div>
              {/* Year & Category Pill */}
              <div className="flex items-center justify-between gap-4 text-xs font-mono text-[var(--text-tertiary)] mb-6">
                <span className="px-3 py-1 rounded-full liquid-glass-pill text-[var(--accent-champagne)] uppercase font-semibold">
                  {project.category}
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{project.year}</span>
                </span>
              </div>

              {/* Title & Description */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-2xl font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-champagne)] transition-colors">
                  {project.title}
                </h3>
                {project.featured && (
                  <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[var(--accent-champagne)]/20 text-[var(--accent-champagne)] border border-[var(--accent-champagne)]/30">
                    Featured
                  </span>
                )}
              </div>

              <h4 className="text-sm font-serif italic text-[var(--accent-champagne)] mb-4">
                {project.subtitle}
              </h4>

              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Bullet Highlights */}
              <div className="flex flex-col gap-2 mb-6 text-xs text-[var(--text-secondary)]">
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-champagne)] shrink-0 mt-1.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {/* Tech Chips */}
              <div className="flex flex-wrap gap-2 mb-6 pt-4 border-t border-[var(--glass-border)]">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[var(--surface-muted)] text-[var(--text-tertiary)]"
                  >
                    #{tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons & Case Study trigger */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-3">
                  {project.link && (
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--text-primary)] text-[var(--canvas)] text-xs font-semibold tracking-wide transition-transform hover:scale-105"
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
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full liquid-glass-pill text-[var(--text-primary)] text-xs font-medium tracking-wide transition-all hover:scale-105"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Source</span>
                    </Link>
                  )}
                </div>

                <div className="flex items-center gap-1 text-[11px] font-mono text-[var(--accent-champagne)] group-hover:translate-x-1 transition-transform">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Specs</span>
                </div>
              </div>
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

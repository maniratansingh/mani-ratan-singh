"use client";

import * as React from "react";
import Link from "next/link";
import { X, ArrowUpRight, CheckCircle2, Layers, Cpu, ShieldCheck } from "lucide-react";
import { ProjectItem } from "@/config/content";

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

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop with optical blur */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Glass Modal Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative w-full max-w-2xl 2xl:max-w-4xl 3xl:max-w-5xl max-h-[90vh] overflow-y-auto liquid-glass-surface p-6 sm:p-10 2xl:p-14 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full liquid-glass-pill flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
          aria-label="Close Case Study"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Category & Year */}
        <div className="flex items-center gap-3 text-xs font-mono text-[var(--text-tertiary)] mb-4">
          <span className="px-3 py-1 rounded-full liquid-glass-pill text-[var(--accent-champagne)] uppercase font-semibold">
            {project.category}
          </span>
          <span>•</span>
          <span>{project.year}</span>
          <span>•</span>
          <span className="text-emerald-500 font-medium">{project.status}</span>
        </div>

        {/* Title & Subtitle */}
        <h2 id="project-modal-title" className="text-3xl sm:text-4xl font-light text-[var(--text-primary)] uppercase tracking-tight mb-2">
          {project.title}
        </h2>
        <h3 className="text-base font-serif italic text-[var(--accent-champagne)] mb-6">
          {project.subtitle}
        </h3>

        {/* Description */}
        <div className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-8 border-b border-[var(--glass-border)] pb-6">
          <p>{project.description}</p>
        </div>

        {/* Architecture & Engineering Highlights */}
        <div className="mb-8">
          <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--accent-silver)] mb-4 flex items-center gap-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Architecture & Execution Highlights</span>
          </h4>
          <div className="grid grid-cols-1 gap-3">
            {project.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-[var(--glass-border)] text-xs text-[var(--text-secondary)]"
              >
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-champagne)] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-8">
          <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--accent-silver)] mb-3 flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Core Substrates & Technologies</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono px-3 py-1 rounded-lg liquid-glass-pill text-[var(--text-secondary)]"
              >
                #{tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between gap-4 pt-6 border-t border-[var(--glass-border)]">
          <div className="flex items-center gap-3">
            {project.link && (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--text-primary)] text-[var(--canvas)] text-xs font-semibold tracking-wide transition-transform hover:scale-105 active:scale-95"
              >
                <span>Launch Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            )}

            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full liquid-glass-pill text-[var(--text-primary)] text-xs font-medium tracking-wide transition-all hover:scale-105"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Repository</span>
              </Link>
            )}
          </div>

          <span className="text-[11px] font-mono text-[var(--text-tertiary)] hidden sm:inline">
            Press [ESC] to close
          </span>
        </div>
      </div>
    </div>
  );
}

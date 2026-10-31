"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  Copy,
  Check,
  Lock,
  Terminal,
  Camera,
  Clock,
  MapPin,
  BookOpen,
  Radio,
} from "lucide-react";
import { siteContent } from "@/config/content";
import { siteConfig } from "@/config/site";
import { InteractiveGlassCard } from "@/components/glass/InteractiveGlassCard";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
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
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

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

interface EndpointDirectoryItem {
  id: string;
  name: string;
  handle: string;
  url: string;
  category: string;
  role: string;
  description: string;
  specs: string[];
  ctaLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
  isPrivate?: boolean;
}

export function ConnectSection({ isStandalone = false }: { isStandalone?: boolean }) {
  const { connect } = siteContent;
  const [copied, setCopied] = React.useState(false);

  // Live IST Clock
  const [currentTime, setCurrentTime] = React.useState("");
  React.useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }) + " IST"
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(connect.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Comprehensive Expanded Digital Presence & Endpoints Directory
  const digitalEndpoints: EndpointDirectoryItem[] = [
    {
      id: "technical-lab",
      name: "The Technical Lab & Workbench",
      handle: "mrps.in",
      url: "https://mrps.in",
      category: "Primary Engineering Hub",
      role: "Engineering Workbench & Open Homelab",
      description:
        "The primary open engineering hub hosting homelab telemetry, C++ hardware write-ups, benchmarking reports, and open-source releases with ultra-fast edge loading.",
      specs: ["10GbE SFP+ Edge", "Zero Telemetry", "C++ Firmware", "Apple Silicon Clusters"],
      ctaLabel: "Launch Workbench",
      icon: Terminal,
      highlight: true,
    },
    {
      id: "github-repos",
      name: "Open Source Codebases & Firmware",
      handle: "@maniratansingh",
      url: "https://github.com/maniratansingh",
      category: "Code & Architecture",
      role: "Public Git Repositories",
      description:
        "Public source code for Jellyfin Liquid Glass, RP2040 mechanical macropad firmware, offline Android image compressors, WebGL shader experiments, and system tools.",
      specs: ["GPL / MIT Open Source", "CSS Architecture", "Embedded C++", "Next.js / WebGL"],
      ctaLabel: "Explore GitHub",
      icon: GithubIcon,
    },
    {
      id: "instagram-salon",
      name: "Visual Salon & Storytelling",
      handle: "@maniratanpratapsingh",
      url: "https://www.instagram.com/maniratanpratapsingh/",
      category: "Photography & Art",
      role: "Visual Archive & Stories",
      description:
        "Visual storytelling through nocturnal long exposures, architectural geometry, urban light streaks at blue hour, and monochrome atmospheric contrast.",
      specs: ["24mm Prime", "Long Exposures", "Geometric Architecture", "Purvanchal Stories"],
      ctaLabel: "View Visual Salon",
      icon: InstagramIcon,
    },
    {
      id: "photography-archive",
      name: "Full-Fidelity Photographic Archive",
      handle: "mrps.in/photos",
      url: "https://mrps.in/photos/",
      category: "Fine Art Photography",
      role: "High-Resolution Darkroom",
      description:
        "Dedicated uncompressed gallery cataloging full-resolution photographic plates with comprehensive EXIF camera metadata, lens metrics, and print inquiries.",
      specs: ["Uncompressed Optical", "EXIF Data Sheets", "Travertine & Mist", "Print Requests"],
      ctaLabel: "Open Photo Archive",
      icon: Camera,
    },
    {
      id: "dispatches-blog",
      name: "Dispatches from the Lab",
      handle: "mrps.in/blog",
      url: "https://mrps.in/blog/",
      category: "Technical Essays",
      role: "System Benchmark Reports",
      description:
        "Technical write-ups and dispatches: 37.7 Gbps Thunderbolt 4 Mac AI clustering, rural eye hospital platforms in Purvanchal, GPS clocks, and semantic web architecture.",
      specs: ["Thunderbolt 4 Benchmarks", "Hospital Systems", "GPS Satellites", "Markdown Notes"],
      ctaLabel: "Read Dispatches",
      icon: BookOpen,
    },
    {
      id: "node-vault",
      name: "Private Homelab Node Vault",
      handle: "vault.mrps.in / Protected",
      url: "/vault",
      category: "Restricted Infrastructure",
      role: "Internal Subdomain Gateway",
      description:
        "Password-gated doorway into private infrastructure subdomains: Jellyfin Media Server (4K HEVC 10-bit), TrueNAS ZFS storage arrays, and local AI clusters.",
      specs: ["Passcode Authenticated", "ZFS Storage", "Local LLM Inference", "Encrypted Subnets"],
      ctaLabel: "Unlock Vault",
      icon: Lock,
      isPrivate: true,
    },
  ];

  return (
    <section
      id="connect"
      className={`relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 ${
        isStandalone ? "pt-36 pb-24" : "py-20 sm:py-28 lg:py-32"
      }`}
    >
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-[var(--glass-border)]">
        <div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-[-0.03em] text-[var(--text-primary)] uppercase leading-[0.98] mb-4">
            Connect
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed">
            Direct communication, open-source repositories, engineering workbench dispatches, and infrastructure endpoints.
          </p>
        </div>

        {/* Live Studio Status Pill */}
        <div className="flex flex-col sm:items-end gap-1.5 text-xs font-mono">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full liquid-glass-pill text-emerald-400 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="uppercase tracking-wider font-semibold">STATUS: ACCEPTING INQUIRIES</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-[var(--text-tertiary)] px-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[var(--accent-champagne)]" />
              <span>PURVANCHAL · IN</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[var(--accent-champagne)]" />
              <span>{currentTime || "IST"}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Direct Inquiries Glass Slab */}
      <InteractiveGlassCard className="p-6 sm:p-10 md:p-12 mb-16">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="flex items-center gap-5 sm:gap-6">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-[var(--glass-border)] shadow-xl shrink-0 editorial-frame bg-black/20">
              <Image
                src="/author.png"
                alt="Mani Ratan Singh"
                fill
                priority
                loading="eager"
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-[var(--accent-champagne)] block mb-1.5 font-mono">
                Direct Communication Line
              </span>
              <span className="text-xl sm:text-3xl lg:text-4xl font-light text-[var(--text-primary)] tracking-tight block select-all break-all sm:break-normal font-mono">
                {connect.email}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <a
              href={`mailto:${connect.email}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[var(--text-primary)] text-[var(--canvas)] text-xs uppercase tracking-widest font-semibold transition-transform hover:scale-105 active:scale-95 shadow-md"
            >
              <Mail className="w-4 h-4" />
              <span>Send Direct Email</span>
            </a>

            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full liquid-glass-pill text-[var(--text-primary)] text-xs uppercase tracking-widest font-medium transition-all hover:scale-105 cursor-pointer"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[var(--text-secondary)]" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>
        </div>
      </InteractiveGlassCard>

      {/* =========================================================
          EXPANDED CANONICAL DIGITAL PRESENCE & ENDPOINTS DIRECTORY
          ========================================================= */}
      <div className="mb-20">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 mb-8 border-b border-[var(--glass-border)]">
          <div>
            <span className="text-xs uppercase tracking-widest font-mono text-[var(--text-tertiary)] block mb-1">
              CANONICAL DIGITAL PRESENCE & NETWORK ENDPOINTS
            </span>
            <h3 className="text-2xl sm:text-3xl font-light text-[var(--text-primary)] uppercase tracking-tight">
              Global Platform Directory
            </h3>
          </div>
          <span className="text-xs font-mono text-[var(--accent-champagne)] flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span>06 ACTIVE ENDPOINTS</span>
          </span>
        </div>

        {/* Rich Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {digitalEndpoints.map((endpoint) => {
            const Icon = endpoint.icon;

            return (
              <InteractiveGlassCard
                key={endpoint.id}
                className={`p-6 sm:p-7 flex flex-col justify-between h-full group transition-all duration-300 ${
                  endpoint.highlight
                    ? "ring-1 ring-[var(--accent-champagne)]/30"
                    : ""
                }`}
              >
                <div>
                  {/* Category & Status */}
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--text-tertiary)] mb-4">
                    <span className="text-[10px] uppercase tracking-wider text-[var(--accent-champagne)] font-medium">
                      {endpoint.category}
                    </span>
                    {endpoint.isPrivate ? (
                      <span className="flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                        <Lock className="w-2.5 h-2.5" />
                        <span>AUTH REQ</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>ONLINE</span>
                      </span>
                    )}
                  </div>

                  {/* Header Title with Custom Icon */}
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className="w-9 h-9 rounded-xl liquid-glass-pill flex items-center justify-center text-[var(--accent-champagne)] shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-light text-[var(--text-primary)] uppercase tracking-tight group-hover:text-[var(--accent-champagne)] transition-colors leading-snug">
                        {endpoint.name}
                      </h4>
                      <span className="text-xs font-mono text-[var(--accent-champagne)] block mt-0.5">
                        {endpoint.handle}
                      </span>
                    </div>
                  </div>

                  {/* Role / Subtitle */}
                  <span className="text-[11px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider block mb-3">
                    {endpoint.role}
                  </span>

                  {/* Detailed Description */}
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
                    {endpoint.description}
                  </p>

                  {/* Architectural Specs / Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {endpoint.specs.map((spec) => (
                      <span
                        key={spec}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/[0.04] dark:bg-white/[0.04] text-[var(--text-tertiary)] border border-[var(--glass-border)]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-4 border-t border-[var(--glass-border)] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase">
                    DESTINATION
                  </span>
                  <Link
                    href={endpoint.url}
                    target={endpoint.url.startsWith("http") ? "_blank" : undefined}
                    rel={endpoint.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full liquid-glass-pill text-xs font-mono text-[var(--accent-champagne)] group-hover:scale-105 transition-transform"
                  >
                    <span>{endpoint.ctaLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </InteractiveGlassCard>
            );
          })}
        </div>
      </div>

      {/* Footer Colophon */}
      <div className="pt-10 border-t border-[var(--glass-border)] flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[var(--text-tertiary)]">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-champagne)]" />
          <span>{siteConfig.name} — Personal Digital Presence</span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <span>{new Date().getFullYear()}</span>
          <span>•</span>
          <Link
            href="https://mrps.in"
            target="_blank"
            className="hover:text-[var(--text-primary)] transition-colors text-[var(--accent-champagne)]"
          >
            Primary Hub: mrps.in
          </Link>
          <span>•</span>
          <Link
            href="/vault"
            className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5 text-[var(--text-secondary)]"
          >
            <Lock className="w-3 h-3 text-[var(--accent-champagne)]" />
            <span>Node Vault</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

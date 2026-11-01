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

  const copyEmail = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(connect.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        window.location.href = `mailto:${connect.email}`;
      }
    } catch {
      window.location.href = `mailto:${connect.email}`;
    }
  };

  const endpoints = [
    {
      name: "Technical Lab",
      handle: "mrps.in",
      url: "https://mrps.in",
      icon: Terminal,
    },
    {
      name: "GitHub",
      handle: "@maniratansingh",
      url: "https://github.com/maniratansingh",
      icon: GithubIcon,
    },
    {
      name: "Instagram",
      handle: "@maniratanpratapsingh",
      url: "https://www.instagram.com/maniratanpratapsingh/",
      icon: InstagramIcon,
    },
    {
      name: "Photo Archive",
      handle: "mrps.in/photos",
      url: "https://mrps.in/photos/",
      icon: Camera,
    },
    {
      name: "Dispatches",
      handle: "mrps.in/blog",
      url: "https://mrps.in/blog/",
      icon: BookOpen,
    },
    {
      name: "Node Vault",
      handle: "/vault",
      url: "/vault",
      icon: Lock,
    },
  ];

  return (
    <section
      id="connect"
      className={`relative max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1856px] 4xl:max-w-[2240px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 4xl:px-24 ${
        isStandalone ? "pt-36 pb-24" : "py-20 sm:py-28 lg:py-32 2xl:py-40"
      }`}
    >
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-[var(--glass-border)]">
        <div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-light tracking-[-0.03em] text-[var(--text-primary)] uppercase leading-[0.98] mb-4">
            Connect
          </h2>
          <p className="text-base sm:text-lg 2xl:text-xl text-[var(--text-secondary)] max-w-xl 2xl:max-w-2xl leading-relaxed">
            Direct communication, open-source repositories, engineering workbench dispatches, and infrastructure endpoints.
          </p>
        </div>

        {/* Live Studio Status Pill */}
        <div className="flex flex-col sm:items-end gap-1.5 text-xs 2xl:text-sm font-mono">
          <div className="flex items-center gap-2 px-3 2xl:px-4 py-1.5 rounded-full liquid-glass-pill text-emerald-400 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="uppercase tracking-wider font-semibold">STATUS: ACCEPTING INQUIRIES</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] 2xl:text-xs text-[var(--text-tertiary)] px-1">
            <Clock className="w-3 h-3 text-[var(--accent-champagne)]" />
            <span>{currentTime || "IST"}</span>
          </div>
        </div>
      </div>

      {/* Direct Inquiries Glass Slab */}
      <InteractiveGlassCard className="p-6 sm:p-10 md:p-12 2xl:p-16 mb-16 2xl:mb-24">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="flex items-center gap-5 sm:gap-6 2xl:gap-8">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 2xl:w-24 2xl:h-24 rounded-2xl 2xl:rounded-3xl overflow-hidden border border-[var(--glass-border)] shadow-xl shrink-0 editorial-frame bg-black/20">
              <Image
                src="/author.png"
                alt="Mani Ratan Singh"
                fill
                priority
                loading="eager"
                sizes="(max-width: 1536px) 80px, 96px"
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-xs 2xl:text-sm uppercase tracking-widest text-[var(--accent-champagne)] block mb-1.5 font-mono">
                Direct Communication Line
              </span>
              <span className="text-xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-light text-[var(--text-primary)] tracking-tight block select-all break-all sm:break-normal font-mono">
                {connect.email}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <a
              href={`mailto:${connect.email}`}
              className="inline-flex items-center justify-center gap-2 px-8 2xl:px-10 py-3.5 2xl:py-4 rounded-full bg-[var(--text-primary)] text-[var(--canvas)] text-xs 2xl:text-sm uppercase tracking-widest font-semibold transition-transform hover:scale-105 active:scale-95 shadow-md"
            >
              <Mail className="w-4 h-4" />
              <span>Send Direct Email</span>
            </a>

            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center justify-center gap-2 px-6 2xl:px-8 py-3.5 2xl:py-4 rounded-full liquid-glass-pill text-[var(--text-primary)] text-xs 2xl:text-sm uppercase tracking-widest font-medium transition-all hover:scale-105 cursor-pointer"
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

      {/* Endpoints Directory */}
      <div className="mb-16 2xl:mb-24">
        <div className="flex items-center justify-between pb-3 mb-6 2xl:mb-8 border-b border-[var(--glass-border)]">
          <span className="text-xs 2xl:text-sm uppercase tracking-widest font-mono text-[var(--text-tertiary)]">
            Endpoints
          </span>
          <span className="text-xs 2xl:text-sm font-mono text-[var(--accent-champagne)]">Online Directory</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 2xl:gap-6">
          {endpoints.map((item) => {
            const Icon = item.icon;
            const isExternal = item.url.startsWith("http");
            return (
              <Link
                key={item.name}
                href={item.url}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="group block"
              >
                <InteractiveGlassCard className="p-4 sm:p-5 h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 rounded-lg liquid-glass-pill flex items-center justify-center text-[var(--accent-champagne)] group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-tertiary)] group-hover:text-[var(--accent-champagne)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[var(--text-tertiary)] block mb-0.5 group-hover:text-[var(--accent-champagne)] transition-colors">
                      {item.name}
                    </span>
                    <span className="text-xs font-mono font-medium text-[var(--text-primary)] truncate block">
                      {item.handle}
                    </span>
                  </div>
                </InteractiveGlassCard>
              </Link>
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
          <span suppressHydrationWarning>{new Date().getFullYear()}</span>
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

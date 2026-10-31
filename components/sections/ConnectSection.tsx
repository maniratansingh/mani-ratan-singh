"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Copy, Check } from "lucide-react";
import { siteContent } from "@/config/content";
import { siteConfig } from "@/config/site";
import { InteractiveGlassCard } from "@/components/glass/InteractiveGlassCard";

export function ConnectSection({ isStandalone = false }: { isStandalone?: boolean }) {
  const { connect } = siteContent;
  const [copied, setCopied] = React.useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(connect.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="connect"
      className={`relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 ${
        isStandalone ? "pt-36 pb-24" : "py-28 sm:py-36"
      }`}
    >
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-[var(--glass-border)]">
        <div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-[-0.03em] text-[var(--text-primary)] uppercase leading-[0.98] mb-4">
            Connect
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-lg leading-relaxed">
            {connect.description}
          </p>
        </div>
      </div>

      {/* Direct Inquiries Glass Slab */}
      <InteractiveGlassCard className="p-6 sm:p-10 md:p-14 mb-14">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-[var(--accent-champagne)] block mb-3 font-mono">
              Direct Communication
            </span>
            <span className="text-2xl sm:text-4xl lg:text-5xl font-light text-[var(--text-primary)] tracking-tight block select-all break-all sm:break-normal">
              {connect.email}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <a
              href={`mailto:${connect.email}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[var(--text-primary)] text-[var(--canvas)] text-xs uppercase tracking-widest font-semibold transition-transform hover:scale-105 active:scale-95 shadow-md"
            >
              <Mail className="w-4 h-4" />
              <span>Send Message</span>
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
                  <span>Copied</span>
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

      {/* Social / Profiles Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-24">
        {connect.socials.map((social) => (
          <Link
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <InteractiveGlassCard className="p-6 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-champagne)] transition-colors">
                  {social.name}
                </span>
                <ArrowUpRight className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-[var(--accent-champagne)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <span className="text-xs font-mono text-[var(--accent-champagne)]">
                {social.handle}
              </span>
            </InteractiveGlassCard>
          </Link>
        ))}
      </div>

      {/* Footer Colophon */}
      <div className="pt-10 border-t border-[var(--glass-border)] flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[var(--text-tertiary)]">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-champagne)]" />
          <span>{siteConfig.name} — Personal Digital Presence</span>
        </div>

        <div className="flex items-center gap-6">
          <span>{new Date().getFullYear()}</span>
          <span>•</span>
          <Link href="https://mrps.in" target="_blank" className="hover:text-[var(--text-primary)] transition-colors text-[var(--accent-champagne)]">
            Primary Hub: mrps.in
          </Link>
        </div>
      </div>
    </section>
  );
}

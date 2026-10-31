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
  Send,
  Terminal,
  Cpu,
  Layers,
  Camera,
  Clock,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { siteContent } from "@/config/content";
import { siteConfig } from "@/config/site";
import { InteractiveGlassCard } from "@/components/glass/InteractiveGlassCard";
import { motion } from "framer-motion";

export function ConnectSection({ isStandalone = false }: { isStandalone?: boolean }) {
  const { connect } = siteContent;
  const [copied, setCopied] = React.useState(false);

  // Form State
  const [senderName, setSenderName] = React.useState("");
  const [senderContact, setSenderContact] = React.useState("");
  const [selectedTopic, setSelectedTopic] = React.useState("Hardware & Microcontrollers");
  const [message, setMessage] = React.useState("");

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

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[${selectedTopic}] Inquiry from ${senderName || "Visitor"}`);
    const bodyContent = `Name: ${senderName || "Not provided"}\nContact: ${senderContact || "Not provided"}\nTopic: ${selectedTopic}\n\nMessage:\n${message}`;
    const body = encodeURIComponent(bodyContent);
    window.location.href = `mailto:${connect.email}?subject=${subject}&body=${body}`;
  };

  const topics = [
    "Hardware & Microcontrollers",
    "Liquid Glass & Optical UI",
    "Hospital & Public Systems",
    "Photography & Prints",
    "General Inquiry",
  ];

  const inquiryDomains = [
    {
      id: "01",
      title: "Tactile Hardware & Microcontrollers",
      icon: Cpu,
      description:
        "Prototyping RP2040 custom controllers, ESP32 telemetry displays, satellite GPS timekeepers, and low-latency C++ firmware.",
      tag: "Embedded Systems",
    },
    {
      id: "02",
      title: "Liquid Glass & Optical UI Design",
      icon: Layers,
      description:
        "Architecting physical glassmorphic design systems, Three.js spatial simulations, and high-performance WebGL shaders.",
      tag: "Design Engineering",
    },
    {
      id: "03",
      title: "Community & Public Infrastructure",
      icon: Terminal,
      description:
        "Building accessible, ultra-fast healthcare platforms and regional hospital appointment portals across Purvanchal.",
      tag: "Public Health",
    },
    {
      id: "04",
      title: "Visual Arts & Long Exposures",
      icon: Camera,
      description:
        "Inquiries regarding fine-art prints, 24mm nocturnal architectural geometry, long-exposure light trails, and visual curation.",
      tag: "Photography",
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
            Open for engineering collaborations, tactile hardware inquiries, optical interface architecture, and thoughtful dialogue.
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
      <InteractiveGlassCard className="p-6 sm:p-10 md:p-12 mb-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="flex items-center gap-5 sm:gap-6">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-[var(--glass-border)] shadow-xl shrink-0 editorial-frame bg-black/20">
              <Image
                src="/author.png"
                alt="Mani Ratan Singh"
                fill
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

      {/* Two Column Grid: Interactive Dispatch Composer & Collaboration Domains */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
        {/* Left Column: Direct In-Page Dispatch Composer */}
        <div className="lg:col-span-6">
          <InteractiveGlassCard className="p-6 sm:p-8 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--glass-border)]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[var(--accent-champagne)]" />
                  <span className="text-xs uppercase tracking-widest font-mono text-[var(--text-tertiary)]">
                    Direct Dispatch Composer
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">P2P ENCRYPTED</span>
              </div>

              <p className="text-xs text-[var(--text-secondary)] mb-6 leading-relaxed">
                Compose a message directly. Clicking dispatch opens your native email client with all fields prefilled—100% private with zero cloud telemetry.
              </p>

              <form onSubmit={handleDispatch} className="flex flex-col gap-4">
                {/* Topic Selector Chips */}
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] block mb-2">
                    Inquiry Topic
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {topics.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTopic(t)}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-mono transition-all cursor-pointer ${
                          selectedTopic === t
                            ? "bg-[var(--text-primary)] text-[var(--canvas)] font-semibold shadow-xs"
                            : "liquid-glass-pill text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] block mb-1.5">
                      Your Name / Handle
                    </label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Alex Vance"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/20 dark:bg-black/35 border border-[var(--glass-border)] text-xs font-mono text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent-champagne)] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] block mb-1.5">
                      Your Email / Link
                    </label>
                    <input
                      type="text"
                      value={senderContact}
                      onChange={(e) => setSenderContact(e.target.value)}
                      placeholder="e.g. alex@studio.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/20 dark:bg-black/35 border border-[var(--glass-border)] text-xs font-mono text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent-champagne)] transition-colors"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="pt-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] block mb-1.5">
                    Message Dispatch
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share project details, hardware specifications, or thoughts..."
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/20 dark:bg-black/35 border border-[var(--glass-border)] text-xs font-mono text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent-champagne)] transition-colors resize-none leading-relaxed"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[var(--text-primary)] text-[var(--canvas)] text-xs font-mono uppercase tracking-wider font-semibold transition-transform hover:scale-[1.01] active:scale-[0.98] shadow-md cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch via Email Client</span>
                </button>
              </form>
            </div>
          </InteractiveGlassCard>
        </div>

        {/* Right Column: Collaboration & Inquiry Domains */}
        <div className="lg:col-span-6 flex flex-col gap-3.5">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--glass-border)]">
            <span className="text-xs uppercase tracking-widest font-mono text-[var(--text-tertiary)]">
              Primary Inquiry & Collaboration Domains
            </span>
            <span className="text-[10px] font-mono text-[var(--accent-champagne)]">01 — 04</span>
          </div>

          {inquiryDomains.map((domain) => {
            const Icon = domain.icon;
            return (
              <InteractiveGlassCard key={domain.id} className="p-5 flex flex-col justify-between group">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[var(--accent-champagne)]">
                      [{domain.id}]
                    </span>
                    <h3 className="text-base sm:text-lg font-light text-[var(--text-primary)] uppercase tracking-tight group-hover:text-[var(--accent-champagne)] transition-colors">
                      {domain.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--text-tertiary)] px-2.5 py-0.5 rounded-full border border-[var(--glass-border)] shrink-0">
                    {domain.tag}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed pl-7">
                  {domain.description}
                </p>
              </InteractiveGlassCard>
            );
          })}
        </div>
      </div>

      {/* Social / Profiles Grid */}
      <div className="mb-16">
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-[var(--glass-border)]">
          <span className="text-xs uppercase tracking-widest font-mono text-[var(--text-tertiary)]">
            Canonical Digital Presence & Endpoints
          </span>
          <span className="text-xs font-mono text-[var(--accent-champagne)]">ONLINE DIRECTORY</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
      </div>

      {/* Studio Telemetry & Response Cadence Card */}
      <div className="p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--surface-muted)]/20 mb-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[var(--accent-champagne)] shrink-0" />
          <div className="text-xs">
            <span className="font-semibold text-[var(--text-primary)] block">
              Response Cadence & Privacy
            </span>
            <span className="text-[var(--text-secondary)]">
              Typical turnaround is within 24–48 hours for engineering inquiries and creative collaborations.
            </span>
          </div>
        </div>

        <Link
          href="/vault"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass-pill text-xs font-mono text-[var(--accent-champagne)] hover:scale-105 transition-transform shrink-0"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Access Private Node Vault</span>
          <ArrowUpRight className="w-3 h-3" />
        </Link>
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

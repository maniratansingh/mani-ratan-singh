"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Copy, Check } from "lucide-react";
import { siteContent } from "@/config/content";
import { siteConfig } from "@/config/site";
import { GlassCard } from "@/components/glass/GlassCard";
import {
  revealVariants,
  staggerContainer,
  snappySpring,
} from "@/components/animations/transitions";

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
      className={`relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${
        isStandalone ? "pt-32 pb-24" : "py-24 sm:py-32"
      }`}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px" }}
        className="flex flex-col gap-16"
      >
        {/* Section Header */}
        <motion.div variants={revealVariants} className="max-w-2xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-[var(--accent-champagne)] mb-2 block">
            04 — {connect.title}
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            {connect.subtitle}
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            {connect.description}
          </p>
        </motion.div>

        {/* Interactive Direct Communication Glass Card */}
        <motion.div variants={revealVariants}>
          <GlassCard
            variant="translucent"
            className="p-8 sm:p-12 relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 z-10 relative">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent-champagne)] block mb-2">
                  Direct Inquiries & Conversations
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] font-mono block">
                  {connect.email}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${connect.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--text-primary)] text-[var(--canvas)] text-xs sm:text-sm font-semibold tracking-wide transition-transform hover:scale-[1.03] active:scale-[0.98] shadow-md"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Email</span>
                </a>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={snappySpring}
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass-translucent text-[var(--text-primary)] text-xs sm:text-sm font-medium tracking-wide transition-colors hover:bg-[var(--glass-hover-bg)] cursor-pointer"
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
                </motion.button>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Social / Profiles Grid */}
        <motion.div variants={revealVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {connect.socials.map((social) => (
            <Link
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <GlassCard
                variant="frosted"
                interactive
                className="p-5 flex flex-col justify-between h-full group-hover:border-[var(--glass-hover-border)]"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[var(--text-primary)]">
                    {social.name}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <span className="text-xs font-mono text-[var(--accent-champagne)]">
                  {social.handle}
                </span>
              </GlassCard>
            </Link>
          ))}
        </motion.div>

        {/* Luxury Closing Statement & Footer */}
        <motion.div
          variants={revealVariants}
          className="pt-12 border-t border-[var(--glass-frosted-border)] flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[var(--text-tertiary)]"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-champagne)]" />
            <span>{connect.closingNote}</span>
          </div>

          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} {siteConfig.name}</span>
            <span>•</span>
            <Link href="https://mrps.in" target="_blank" className="hover:text-[var(--text-primary)] transition-colors">
              mrps.in
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

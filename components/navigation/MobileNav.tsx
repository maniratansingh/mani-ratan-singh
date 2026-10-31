"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Terminal, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { snappySpring } from "@/components/animations/transitions";

function GithubIcon({ className = "w-3 h-3" }: { className?: string }) {
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

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();

  // Ensure portal only mounts on the client
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Close automatically on route change
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle escape key and body scroll lock
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen]);

  return (
    <div className="md:hidden flex items-center">
      {/* Trigger Button inside Navbar Capsule */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={snappySpring}
        onClick={() => setIsOpen(!isOpen)}
        className="w-9 h-9 rounded-full liquid-glass-pill flex items-center justify-center text-[var(--text-primary)] focus-visible:outline-none cursor-pointer"
        aria-label={isOpen ? "Close Navigation Sidebar" : "Open Navigation Sidebar"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </motion.button>

      {/* Render Backdrop & Drawer directly into document.body to escape transformed navbar containing blocks */}
      {mounted &&
        createPortal(
          <AnimatePresence mode="wait">
            {isOpen && (
              <div className="fixed inset-0 z-[9999] pointer-events-auto">
                {/* Backdrop Scrim with optical blur */}
                <motion.div
                  key="mobile-nav-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
                  aria-hidden="true"
                />

                {/* Mobile Sidebar Slide-Over Drawer */}
                <motion.aside
                  key="mobile-nav-drawer"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Mobile Navigation Drawer"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="fixed top-0 right-0 bottom-0 w-[310px] sm:w-[350px] max-w-[85vw] h-full h-[100dvh] bg-[#0c0d12]/95 dark:bg-[#0c0d12]/95 light:bg-[#fbfbfa]/95 backdrop-blur-2xl border-l border-[var(--glass-border)] shadow-[0_0_60px_rgba(0,0,0,0.7)] flex flex-col justify-between p-6 sm:p-7 overflow-y-auto"
                >
                  {/* Top Specular Glint Accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--glass-border-hover)] to-transparent pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Header: Portrait + Name + Dismiss */}
                  <div className="flex items-center justify-between pb-5 border-b border-[var(--glass-border)]">
                    <div className="flex items-center gap-3">
                      <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[var(--glass-border)] ring-2 ring-white/10 shadow-sm shrink-0 bg-black/30">
                        <Image
                          src="https://avatars.githubusercontent.com/u/85608407?v=4"
                          alt="Mani Ratan Singh"
                          fill
                          sizes="44px"
                          loading="eager"
                          priority
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] block">
                          {siteConfig.displayName}
                        </span>
                        <span className="text-[10px] font-mono text-[var(--accent-champagne)] flex items-center gap-1.5 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {siteConfig.location}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="w-9 h-9 rounded-full liquid-glass-pill flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--glass-border-hover)] transition-colors cursor-pointer"
                      aria-label="Close navigation sidebar"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Main Navigation List */}
                  <div className="flex flex-col gap-1.5 py-6 my-auto">
                    <div className="flex items-center justify-between px-3 mb-2">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[var(--text-tertiary)]">
                        Exploration Index
                      </span>
                      <span className="text-[10px] font-mono text-[var(--text-tertiary)] opacity-60">
                        01 — 06
                      </span>
                    </div>

                    {siteConfig.navItems.map((item, idx) => {
                      const isActive =
                        pathname === item.href ||
                        (item.href !== "/" &&
                          !item.href.startsWith("/#") &&
                          pathname.startsWith(item.href));

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between group ${
                            isActive
                              ? "bg-[var(--text-primary)] text-[var(--canvas)] font-semibold shadow-md"
                              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/[0.05]"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`text-[10px] font-mono ${
                                isActive ? "opacity-70" : "opacity-40 group-hover:opacity-80"
                              }`}
                            >
                              0{idx + 1}
                            </span>
                            <span className="tracking-wide">{item.label}</span>
                          </div>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-champagne)]" />
                          )}
                        </Link>
                      );
                    })}

                    {/* Direct Homelab Terminal Link */}
                    <div className="pt-2">
                      <Link
                        href="https://mrps.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-3 rounded-xl text-xs font-mono text-[var(--accent-champagne)] transition-all flex items-center justify-between border border-[var(--glass-border)] bg-black/20 hover:bg-black/40 hover:border-[var(--glass-border-hover)]"
                      >
                        <div className="flex items-center gap-2.5">
                          <Terminal className="w-4 h-4 text-emerald-400" />
                          <span className="tracking-wide">mrps.in (Homelab)</span>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                      </Link>
                    </div>
                  </div>

                  {/* Sidebar Footer with Direct Email & Status */}
                  <div className="pt-5 border-t border-[var(--glass-border)] flex flex-col gap-3.5">
                    {/* Direct Email Tap Target */}
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[var(--text-tertiary)] uppercase text-[10px] tracking-wider">
                        Direct Line
                      </span>
                      <a
                        href={siteConfig.links.email}
                        className="text-[var(--accent-champagne)] hover:underline flex items-center gap-1.5 font-medium transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 shrink-0" />
                        <span>email@mrps.in</span>
                      </a>
                    </div>

                    {/* Homelab Node Status & GitHub Link */}
                    <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-tertiary)] pt-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="tracking-widest uppercase">NODE-01 ONLINE</span>
                      </div>
                      <a
                        href={siteConfig.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1"
                        aria-label="GitHub profile"
                      >
                        <GithubIcon className="w-3 h-3" />
                        <span>GitHub</span>
                      </a>
                    </div>
                  </div>
                </motion.aside>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}

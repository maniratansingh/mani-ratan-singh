"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Terminal } from "lucide-react";
import { siteConfig } from "@/config/site";
import { snappySpring } from "@/components/animations/transitions";

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden flex items-center">
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={snappySpring}
        onClick={() => setIsOpen(!isOpen)}
        className="w-9 h-9 rounded-full liquid-glass-pill flex items-center justify-center text-[var(--text-primary)] focus-visible:outline-none cursor-pointer"
        aria-label={isOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              aria-hidden="true"
            />

            {/* Glass Mobile Menu Card */}
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.96 }}
              transition={snappySpring}
              className="fixed top-20 left-4 right-4 z-50 p-6 rounded-3xl liquid-glass-surface shadow-2xl pointer-events-auto max-w-sm mx-auto"
            >
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[var(--text-tertiary)] px-3 mb-1">
                  Navigation
                </span>
                {siteConfig.navItems.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                        isActive
                          ? "bg-[var(--text-primary)] text-[var(--canvas)] font-semibold shadow-xs"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-champagne)]" />
                      )}
                    </Link>
                  );
                })}

                {/* Direct mrps.in Link */}
                <Link
                  href="https://mrps.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-mono text-[var(--accent-champagne)] transition-all flex items-center justify-between border border-[var(--glass-border)] mt-2"
                >
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    <span>mrps.in (Homelab)</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--glass-border)] flex items-center justify-between text-xs font-mono text-[var(--text-tertiary)] px-2">
                <span>{siteConfig.author}</span>
                <span>{siteConfig.initials}</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

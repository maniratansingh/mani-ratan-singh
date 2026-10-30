"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
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
        className="w-9 h-9 rounded-full glass-translucent flex items-center justify-center text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-champagne)] cursor-pointer"
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
              className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40"
              aria-hidden="true"
            />

            {/* Glass Mobile Menu Card */}
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.96 }}
              transition={snappySpring}
              className="fixed top-20 left-4 right-4 z-50 p-6 rounded-3xl glass-translucent glass-reflection shadow-2xl border border-[var(--glass-translucent-border)] pointer-events-auto max-w-sm mx-auto"
            >
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-tertiary)] px-3 mb-1">
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
                      className={`px-4 py-3 rounded-2xl text-sm font-medium transition-all flex items-center justify-between ${
                        isActive
                          ? "bg-[var(--glass-hover-bg)] text-[var(--text-primary)] font-semibold shadow-xs"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-frosted-bg)]"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-champagne)]" />
                      )}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--glass-frosted-border)] flex items-center justify-between text-xs text-[var(--text-tertiary)] px-2">
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

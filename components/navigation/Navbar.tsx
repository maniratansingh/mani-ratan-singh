"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { MobileNav } from "@/components/navigation/MobileNav";
import { snappySpring } from "@/components/animations/transitions";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>("home");

  React.useEffect(() => {
    const sectionIds = ["connect", "work", "photography", "about"];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      if (pathname !== "/") {
        return;
      }

      if (scrollY < 260) {
        setActiveSection("home");
        return;
      }

      // Check which section is in view from bottom up
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 320) {
            setActiveSection(id);
            return;
          }
        }
      }
      setActiveSection("home");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === "/" && href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
    } else if (pathname === "/" && href === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={snappySpring}
        className={`pointer-events-auto flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 rounded-full liquid-glass-pill transition-all duration-300 ${
          scrolled ? "shadow-xl" : "shadow-sm"
        }`}
        aria-label="Main Navigation"
      >
        {/* Monogram / Brandmark with Micro-Portrait */}
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="group relative pl-1 pr-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase text-[var(--text-primary)] hover:opacity-85 transition-opacity focus-visible:outline-none flex items-center gap-2 cursor-pointer"
          aria-label="Mani Ratan Singh Home"
        >
          <div className="relative w-6 h-6 rounded-full overflow-hidden border border-[var(--glass-border)] shadow-xs shrink-0">
            <Image
              src="/author.png"
              alt="Mani Ratan Singh"
              fill
              sizes="24px"
              className="object-cover"
            />
          </div>
          <span>{siteConfig.initials}</span>
        </Link>

        {/* Divider */}
        <div className="h-4 w-[1px] bg-[var(--glass-border)] mx-1" aria-hidden="true" />

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {siteConfig.navItems.map((item) => {
            const isItemActive = (() => {
              if (pathname === "/") {
                if (item.href === "/" && activeSection === "home") return true;
                if (item.href === "/#about" && activeSection === "about") return true;
                if (item.href === "/#photography" && activeSection === "photography") return true;
                if (item.href === "/#work" && activeSection === "work") return true;
                if (item.href === "/#connect" && activeSection === "connect") return true;
                return false;
              }
              return pathname === item.href;
            })();

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors focus-visible:outline-none cursor-pointer ${
                  isItemActive
                    ? "text-[var(--text-primary)] font-semibold"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {isItemActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full bg-black/[0.05] dark:bg-white/[0.1] border border-[var(--glass-border)] -z-10 shadow-xs"
                    transition={snappySpring}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* External Homelab Node Link */}
        <Link
          href="https://mrps.in"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono text-[var(--text-tertiary)] hover:text-[var(--accent-champagne)] border border-[var(--glass-border)] transition-colors ml-1"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>mrps.in</span>
          <ArrowUpRight className="w-3 h-3" />
        </Link>

        {/* Theme Toggle & Mobile Menu */}
        <div className="flex items-center gap-1.5 pl-1">
          <ThemeToggle />
          <MobileNav />
        </div>
      </motion.nav>
    </header>
  );
}

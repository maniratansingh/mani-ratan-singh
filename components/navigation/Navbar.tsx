"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { MobileNav } from "@/components/navigation/MobileNav";
import { snappySpring } from "@/components/animations/transitions";

const SECTION_IDS = ["about", "photography", "work", "connect"] as const;

/** Standalone routes that represent a section of the home page. */
const STANDALONE_SECTION: Record<string, string> = {
  "/about": "/#about",
  "/work": "/#work",
  "/connect": "/#connect",
};

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>("home");
  const sectionTops = React.useRef<Record<string, number>>({});

  React.useEffect(() => {
    const measure = () => {
      const tops: Record<string, number> = {};
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) tops[id] = el.getBoundingClientRect().top + window.scrollY;
      }
      sectionTops.current = tops;
    };

    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      if (pathname !== "/") return;

      if (scrollY < 260) {
        setActiveSection("home");
        return;
      }

      // Sections are in document order; the last one whose top has passed
      // the reading line is the active section.
      let active = "home";
      for (const id of SECTION_IDS) {
        const top = sectionTops.current[id];
        if (top !== undefined && top - 320 <= scrollY) active = id;
      }
      setActiveSection(active);
    };

    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    measure();
    update();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", measure);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // Let the browser handle modified clicks (new tab, new window, download).
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    if (pathname === "/" && href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
        router.replace(href, { scroll: false });
      }
    } else if (pathname === "/" && href === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      router.replace("/", { scroll: false });
    }
  };

  const standaloneActive = STANDALONE_SECTION[pathname];

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
          className="group relative pl-1 pr-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase text-[var(--text-primary)] hover:opacity-85 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-champagne)] flex items-center gap-2 cursor-pointer"
          aria-label="MRPS — Mani Ratan Singh, Home"
        >
          <div className="relative w-6 h-6 rounded-full overflow-hidden border border-[var(--glass-border)] shadow-xs shrink-0">
            <Image
              src="/author-128.webp"
              alt=""
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
              return item.href === standaloneActive || pathname === item.href;
            })();

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                aria-current={isItemActive ? "page" : undefined}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-champagne)] ${
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

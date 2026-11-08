"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { snappySpring } from "@/components/animations/transitions";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="w-9 h-9 rounded-full liquid-glass-pill flex items-center justify-center opacity-60"
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      transition={snappySpring}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-9 h-9 rounded-full liquid-glass-pill flex items-center justify-center text-[var(--text-primary)] cursor-pointer before:absolute before:-inset-1.5 before:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-champagne)]"
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <motion.div
        key={isDark ? "dark" : "light"}
        initial={{ rotate: -45, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 45, opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-[var(--accent-champagne)]" />
        ) : (
          <Moon className="w-4 h-4 text-[var(--text-primary)]" />
        )}
      </motion.div>
    </motion.button>
  );
}

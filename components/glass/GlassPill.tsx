"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { snappySpring } from "@/components/animations/transitions";

interface GlassPillProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
}

export function GlassPill({
  children,
  interactive = false,
  className = "",
  onClick,
  ...props
}: GlassPillProps) {
  const interactiveProps = interactive
    ? {
        whileHover: { scale: 1.03 },
        whileTap: { scale: 0.97 },
        transition: snappySpring,
        role: "button",
        tabIndex: 0,
        onClick,
        onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.();
          }
        },
      }
    : {};

  return (
    <motion.div
      className={`glass-translucent glass-pill inline-flex items-center px-4 py-1.5 text-xs font-medium tracking-wide uppercase text-[var(--text-secondary)] ${className}`}
      {...interactiveProps}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function GlassBadge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wider uppercase bg-[var(--surface-muted)] text-[var(--text-secondary)] border border-[var(--glass-frosted-border)] ${className}`}
    >
      {children}
    </span>
  );
}

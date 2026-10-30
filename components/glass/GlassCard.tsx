"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { snappySpring } from "@/components/animations/transitions";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  variant?: "frosted" | "translucent";
  interactive?: boolean;
  className?: string;
}

export function GlassCard({
  children,
  variant = "frosted",
  interactive = false,
  className = "",
  ...props
}: GlassCardProps) {
  const baseClass =
    variant === "translucent"
      ? "glass-translucent rounded-2xl p-6 sm:p-8"
      : "glass-frosted rounded-2xl p-6 sm:p-8";

  const interactiveMotion = interactive
    ? {
        whileHover: { y: -3, transition: snappySpring },
        whileTap: { y: 0, scale: 0.99 },
      }
    : {};

  return (
    <motion.div
      className={`${baseClass} glass-reflection ${className}`}
      {...interactiveMotion}
      {...props}
    >
      {children}
    </motion.div>
  );
}

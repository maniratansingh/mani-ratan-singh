"use client";

import * as React from "react";
import { motion } from "framer-motion";

export function HeroFallback() {
  return (
    <div
      className="relative w-full h-[360px] sm:h-[460px] lg:h-[540px] flex items-center justify-center pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Ambient background glow */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[var(--accent-champagne)]/20 via-[var(--accent-silver)]/25 to-transparent blur-3xl opacity-70" />

      {/* Layered Glass Rings & Core */}
      <motion.div
        animate={{
          rotate: [0, 360],
          y: [-6, 6, -6],
        }}
        transition={{
          rotate: { duration: 40, ease: "linear", repeat: Infinity },
          y: { duration: 6, ease: "easeInOut", repeat: Infinity },
        }}
        className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center"
      >
        {/* Outer Refractive Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-white/60 dark:border-white/20 glass-translucent shadow-2xl opacity-80 backdrop-blur-md" />

        {/* Secondary Elliptical Ring */}
        <div className="absolute inset-6 rounded-[45%] border border-white/80 dark:border-white/30 rotate-45 glass-frosted shadow-inner opacity-75 backdrop-blur-lg" />

        {/* Luminous Core */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-white via-[var(--accent-champagne)]/60 to-[var(--accent-silver)]/40 shadow-xl border border-white/90 backdrop-blur-xl flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-white/80 blur-xs" />
        </div>
      </motion.div>
    </div>
  );
}

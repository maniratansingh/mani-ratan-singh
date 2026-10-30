"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface InteractiveGlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  tilt?: boolean;
}

export function InteractiveGlassCard({
  children,
  className = "",
  onClick,
  tilt = true,
}: InteractiveGlassCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  // Mouse coordinate motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for 3D tilt
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Calculate tilt rotations
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-6, 6]);

  // Spotlight position inside card
  const [spotlightPos, setSpotlightPos] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX: tilt ? rotateX : 0,
        rotateY: tilt ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className={`liquid-glass-surface group relative overflow-hidden transition-all duration-300 ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      {/* Dynamic Specular Light Spotlight with Chromatic Dispersion (Tracks Cursor) */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(520px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255, 255, 255, 0.28) 0%, rgba(0, 240, 255, 0.12) 30%, rgba(255, 0, 127, 0.05) 55%, transparent 75%)`,
        }}
        aria-hidden="true"
      />

      {/* Reactive Crystal Edge Refraction (Rim Specular Tracker) */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          padding: "1.2px",
          background: `radial-gradient(360px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255, 255, 255, 0.7) 0%, rgba(0, 240, 255, 0.35) 40%, transparent 75%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
        }}
        aria-hidden="true"
      />

      {/* Internal Content (Pushed slightly forward in 3D space) */}
      <div style={{ transform: "translateZ(20px)" }} className="relative z-20">
        {children}
      </div>
    </motion.div>
  );
}

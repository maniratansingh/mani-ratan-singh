"use client";

import * as React from "react";

export function AmbientAtmosphere() {
  const [mousePos, setMousePos] = React.useState({ x: -1000, y: -1000 });

  React.useEffect(() => {
    let animationId: number;
    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const update = () => {
      // Smooth lerp for fluid optical response
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setMousePos({ x: currentX, y: currentY });
      animationId = requestAnimationFrame(update);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    animationId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-20 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Dynamic Cursor Light Caustic (Gently illuminates behind glass) */}
      <div
        className="fixed w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] opacity-35 dark:opacity-20 pointer-events-none transition-opacity duration-500"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          background:
            "radial-gradient(circle at center, rgba(184, 147, 85, 0.45) 0%, rgba(107, 124, 147, 0.25) 45%, transparent 75%)",
        }}
      />

      {/* 1. Primary Luminous Champagne Optical Orb (Top-Right / Hero backdrop) */}
      <div
        className="absolute -top-[10%] right-[2%] w-[650px] h-[650px] sm:w-[950px] sm:h-[950px] rounded-full blur-[140px] opacity-45 dark:opacity-25 transition-all duration-1000"
        style={{
          background:
            "radial-gradient(circle at center, rgba(184, 147, 85, 0.35) 0%, rgba(244, 237, 224, 0.5) 45%, transparent 70%)",
        }}
      />

      {/* 2. Cool Titanium & Opal Caustic Orb (Mid-Left / Behind Narrative & Works) */}
      <div
        className="absolute top-[35%] -left-[10%] w-[550px] h-[550px] sm:w-[850px] sm:h-[850px] rounded-full blur-[150px] opacity-40 dark:opacity-20 transition-all duration-1000"
        style={{
          background:
            "radial-gradient(circle at center, rgba(107, 124, 147, 0.3) 0%, rgba(228, 235, 242, 0.4) 45%, transparent 70%)",
        }}
      />

      {/* 3. Warm Amber Horizon Glow (Lower-Right / Photography & Lab) */}
      <div
        className="absolute top-[70%] right-[10%] w-[500px] h-[500px] sm:w-[750px] sm:h-[750px] rounded-full blur-[140px] opacity-35 dark:opacity-15 transition-all duration-1000"
        style={{
          background:
            "radial-gradient(circle at center, rgba(184, 147, 85, 0.3) 0%, transparent 65%)",
        }}
      />
    </div>
  );
}

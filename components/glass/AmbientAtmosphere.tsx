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
      // Smooth lerp for liquid optical motion
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
      {/* Dynamic Cursor Light Caustic (Shines behind all glass surfaces) */}
      <div
        className="fixed w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] opacity-40 dark:opacity-20 pointer-events-none transition-opacity duration-500"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          background:
            "radial-gradient(circle at center, rgba(200, 185, 157, 0.5) 0%, rgba(168, 178, 193, 0.35) 45%, transparent 75%)",
        }}
      />

      {/* 1. Primary Luminous Champagne Optical Orb (Top-Right / Hero backdrop) */}
      <div
        className="absolute -top-[10%] right-[5%] w-[650px] h-[650px] sm:w-[900px] sm:h-[900px] rounded-full blur-[130px] opacity-75 dark:opacity-35 transition-all duration-1000"
        style={{
          background:
            "radial-gradient(circle at center, rgba(200, 185, 157, 0.45) 0%, rgba(235, 228, 216, 0.25) 50%, transparent 75%)",
        }}
      />

      {/* 2. Frosted Silver & Opal Orb (Mid-Left / Behind About & Narrative) */}
      <div
        className="absolute top-[35%] -left-[10%] w-[550px] h-[550px] sm:w-[800px] sm:h-[800px] rounded-full blur-[140px] opacity-70 dark:opacity-30 transition-all duration-1000"
        style={{
          background:
            "radial-gradient(circle at center, rgba(168, 178, 193, 0.4) 0%, rgba(223, 229, 237, 0.2) 50%, transparent 75%)",
        }}
      />

      {/* 3. Prismatic Warm Dawn Orb (Lower-Right / Behind Selected Work) */}
      <div
        className="absolute top-[65%] right-[2%] w-[600px] h-[600px] sm:w-[850px] sm:h-[850px] rounded-full blur-[150px] opacity-65 dark:opacity-25 transition-all duration-1000"
        style={{
          background:
            "radial-gradient(circle at center, rgba(216, 195, 165, 0.4) 0%, rgba(195, 210, 225, 0.2) 55%, transparent 80%)",
        }}
      />

      {/* 4. Deep Horizon Glow (Bottom / Connect Section) */}
      <div
        className="absolute -bottom-[15%] left-[15%] w-[700px] h-[600px] rounded-full blur-[160px] opacity-55 dark:opacity-20 transition-all duration-1000"
        style={{
          background:
            "radial-gradient(circle at center, rgba(230, 220, 205, 0.45) 0%, rgba(175, 185, 200, 0.2) 60%, transparent 80%)",
        }}
      />

      {/* 5. Delicate Micro-Noise Texture for Physical Glass Grain Diffusion */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

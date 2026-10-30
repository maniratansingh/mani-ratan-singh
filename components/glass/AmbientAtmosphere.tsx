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
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Dynamic Cursor Light Caustic (Tracks mouse in glowing electric azure) */}
      <div
        className="fixed w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px] opacity-40 dark:opacity-30 pointer-events-none transition-opacity duration-500"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          background:
            "radial-gradient(circle at center, rgba(0, 145, 255, 0.45) 0%, rgba(30, 90, 220, 0.25) 45%, transparent 70%)",
        }}
      />

      {/* 2. Top-Left Luminous Oceanic Orb */}
      <div
        className="absolute -top-[10%] left-[10%] w-[750px] h-[750px] sm:w-[900px] sm:h-[900px] rounded-full blur-[140px] opacity-45 dark:opacity-40"
        style={{
          background:
            "radial-gradient(circle at center, rgba(30, 90, 220, 0.55) 0%, rgba(13, 49, 138, 0.35) 45%, transparent 70%)",
        }}
      />

      {/* 3. Mid-Right Electric Azure Light Ribbon */}
      <div
        className="absolute top-[35%] -right-[5%] w-[650px] h-[650px] sm:w-[800px] sm:h-[800px] rounded-full blur-[150px] opacity-35 dark:opacity-30"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0, 145, 255, 0.4) 0%, rgba(10, 36, 102, 0.2) 50%, transparent 70%)",
        }}
      />

      {/* 4. Bottom Deep Abyss Glow */}
      <div
        className="absolute bottom-[-10%] left-[30%] w-[700px] h-[700px] rounded-full blur-[150px] opacity-35 dark:opacity-25"
        style={{
          background:
            "radial-gradient(circle at center, rgba(30, 90, 220, 0.4) 0%, transparent 65%)",
        }}
      />
    </div>
  );
}

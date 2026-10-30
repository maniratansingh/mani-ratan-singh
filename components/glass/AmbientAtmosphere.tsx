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
      {/* Dynamic Cursor Light Caustic (Gently illuminates behind glass) */}
      <div
        className="fixed w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] opacity-25 pointer-events-none transition-opacity duration-500"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          background:
            "radial-gradient(circle at center, rgba(0, 145, 255, 0.4) 0%, rgba(52, 58, 76, 0.25) 50%, transparent 70%)",
        }}
      />

      {/* Top Ambient Radial Glow */}
      <div
        className="absolute -top-[10%] left-[20%] w-[700px] h-[700px] rounded-full blur-[140px] opacity-35"
        style={{
          background:
            "radial-gradient(circle at center, rgba(52, 58, 76, 0.6) 0%, rgba(30, 90, 220, 0.2) 50%, transparent 70%)",
        }}
      />
    </div>
  );
}

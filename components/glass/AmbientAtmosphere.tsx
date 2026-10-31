"use client";

import * as React from "react";

export function AmbientAtmosphere() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let animationId: number = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isRunning = false;

    const update = () => {
      // Smooth lerp for fluid physical parallax
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      if (containerRef.current) {
        containerRef.current.style.setProperty("--mouse-x", currentX.toFixed(4));
        containerRef.current.style.setProperty("--mouse-y", currentY.toFixed(4));
      }

      const delta = Math.abs(targetX - currentX) + Math.abs(targetY - currentY);
      if (delta > 0.0002) {
        animationId = requestAnimationFrame(update);
      } else {
        isRunning = false;
        animationId = 0;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      // Normalize to -1 to 1 based on window viewport
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;

      if (!isRunning) {
        isRunning = true;
        animationId = requestAnimationFrame(update);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="vibrant-plasma pointer-events-none select-none"
      aria-hidden="true"
    >
      <div className="plasma-blob blob-1" />
      <div className="plasma-blob blob-2" />
      <div className="plasma-blob blob-3" />
      <div className="plasma-blob blob-4" />
    </div>
  );
}

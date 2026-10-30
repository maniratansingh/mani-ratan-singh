"use client";

import * as React from "react";

export function AmbientAtmosphere() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let animationId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      // Normalize to -1 to 1 based on window viewport
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const update = () => {
      // Smooth lerp for fluid physical parallax
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      if (containerRef.current) {
        containerRef.current.style.setProperty("--mouse-x", currentX.toFixed(4));
        containerRef.current.style.setProperty("--mouse-y", currentY.toFixed(4));
      }

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

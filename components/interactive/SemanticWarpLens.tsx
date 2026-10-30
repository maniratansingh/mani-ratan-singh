"use client";

import * as React from "react";
import { Sparkles, Compass, Radio } from "lucide-react";

interface SemanticWarpLensProps {
  className?: string;
  defaultPattern?: string;
  title?: string;
  subtitle?: string;
}

interface Node {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  disp: number;
  mouseDist: number;
  char: string;
}

const letterPresets = [
  {
    label: "Story & Identity",
    pattern:
      "I-AM-MANI-RATAN-PRATAP-SINGH-TECH-GENERALIST-PHOTOGRAPHER-AND-BUILDER-BASED-IN-INDIA-MY-SIMPLICITY-IS-MY-IDENTITY-MRPS-PURVANCHAL-MRPS.IN-",
  },
  {
    label: "Philosophy",
    pattern:
      "MY-SIMPLICITY-IS-MY-IDENTITY-TACTILE-MATERIALITY-PURPOSEFUL-SIMPLICITY-SYSTEMIC-AUTONOMY-QUIET-RELIABILITY-LONG-EXPOSURE-OPTICAL-CRAFT-",
  },
  {
    label: "Hardware & Homelab",
    pattern:
      "RP2040-MACROPAD-NEO-6M-GPS-CLOCK-TRUENAS-ZFS-10GBE-SFP-JELLYFIN-LIQUID-GLASS-KOTLIN-IMAGE-COMPRESSOR-APPLE-SILICON-AI-CLUSTER-",
  },
];

export function SemanticWarpLens({
  className = "",
  defaultPattern,
  title = "Semantic Identity Lens",
  subtitle = "Interactive gravity-warp text dynamics · Drag or hover to bend the linguistic matrix",
}: SemanticWarpLensProps) {
  const [activePresetIndex, setActivePresetIndex] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const activePattern = defaultPattern || letterPresets[activePresetIndex].pattern;

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cols = 0;
    let rows = 0;
    let nodes: Node[] = [];

    const spacingX = 14;
    const spacingY = 22;

    const springK = 0.082;
    const friction = 0.81;
    const radius = 120;
    const rSq = radius * radius;

    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    let animationId: number;

    const initNodes = () => {
      const width = canvas.width;
      const height = canvas.height;

      cols = Math.ceil(width / spacingX) + 1;
      rows = Math.ceil(height / spacingY) + 1;
      nodes = [];

      const offsetX = (width - (cols - 1) * spacingX) / 2;
      const offsetY = (height - (rows - 1) * spacingY) / 2;

      let charIdx = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = offsetX + c * spacingX;
          const oy = offsetY + r * spacingY;
          const char = activePattern.charAt(charIdx % activePattern.length);
          charIdx++;

          nodes.push({
            x: ox,
            y: oy,
            ox,
            oy,
            vx: 0,
            vy: 0,
            disp: 0,
            mouseDist: 99999,
            char,
          });
        }
      }
    };

    const handleResize = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        initNodes();
      }
    };

    handleResize();

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      targetMouseX = -1000;
      targetMouseY = -1000;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        targetMouseX = touch.clientX - rect.left;
        targetMouseY = touch.clientY - rect.top;
      }
    };

    const onTouchEnd = () => {
      targetMouseX = -1000;
      targetMouseY = -1000;
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("touchstart", onTouchMove, { passive: true });
    canvas.addEventListener("touchend", onTouchEnd);
    canvas.addEventListener("touchcancel", onTouchEnd);

    window.addEventListener("resize", handleResize);

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const update = () => {
      if (targetMouseX === -1000) {
        mouseX = -1000;
        mouseY = -1000;
      } else {
        if (mouseX === -1000) {
          mouseX = targetMouseX;
          mouseY = targetMouseY;
        } else {
          mouseX += (targetMouseX - mouseX) * 0.16;
          mouseY += (targetMouseY - mouseY) * 0.16;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        let tx = node.ox;
        let ty = node.oy;
        let dist = 99999;

        if (mouseX !== -1000) {
          const dx = node.ox - mouseX;
          const dy = node.oy - mouseY;
          const distSq = dx * dx + dy * dy;

          if (distSq < rSq) {
            dist = Math.sqrt(distSq) || 0.001;
            const t = dist / radius;
            const pull = (1.0 - t) * (1.0 - t) * 0.65;

            // Warp towards cursor
            let rx = -dx * pull;
            let ry = -dy * pull;

            // Inside absolute center: gravity spiral swirl
            if (dist < 40) {
              const swirl = (1.0 - dist / 40) * 0.5;
              const cosS = Math.cos(swirl);
              const sinS = Math.sin(swirl);
              const rxNew = rx * cosS - ry * sinS;
              const ryNew = rx * sinS + ry * cosS;
              rx = rxNew;
              ry = ryNew;
            }

            tx = node.ox + rx;
            ty = node.oy + ry;
          }
        }

        const ax = (tx - node.x) * springK;
        const ay = (ty - node.y) * springK;

        node.vx = (node.vx + ax) * friction;
        node.vy = (node.vy + ay) * friction;

        node.x += node.vx;
        node.y += node.vy;

        node.disp = Math.hypot(node.x - node.ox, node.y - node.oy);
        node.mouseDist = dist;
      }
    };

    const draw = () => {
      const isDark =
        document.documentElement.classList.contains("dark") ||
        document.documentElement.getAttribute("data-theme") === "dark" ||
        !document.documentElement.classList.contains("light");

      ctx.fillStyle = isDark ? "#08090b" : "#F8F8F5";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (mouseX !== -1000) {
        ctx.beginPath();
        const glow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, radius * 1.5);
        if (isDark) {
          glow.addColorStop(0, "rgba(200, 185, 157, 0.16)");
          glow.addColorStop(0.5, "rgba(0, 145, 255, 0.06)");
          glow.addColorStop(1, "rgba(0, 0, 0, 0)");
        } else {
          glow.addColorStop(0, "rgba(184, 147, 85, 0.2)");
          glow.addColorStop(0.5, "rgba(0, 113, 227, 0.08)");
          glow.addColorStop(1, "rgba(248, 248, 245, 0)");
        }
        ctx.fillStyle = glow;
        ctx.arc(mouseX, mouseY, radius * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const normalFont = 'bold 12px "SF Mono", "JetBrains Mono", monospace';
      const warpedFont = 'bold 14px "SF Mono", "JetBrains Mono", monospace';

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (node.disp < 0.1 && (mouseX === -1000 || node.mouseDist > radius)) {
          ctx.font = normalFont;
          ctx.fillStyle = isDark ? "rgba(148, 163, 184, 0.24)" : "rgba(100, 110, 125, 0.35)";
          ctx.fillText(node.char, node.ox, node.oy);
        } else {
          const dist = node.mouseDist;

          if (dist < radius) {
            const t = 1.0 - dist / radius;

            ctx.save();
            ctx.translate(node.x, node.y);

            const angle = (node.vx + node.vy) * 0.035;
            ctx.rotate(angle);

            const scale = 1.0 + t * 0.55;
            ctx.scale(scale, scale);

            if (dist < 35) {
              ctx.fillStyle = isDark ? "#ffffff" : "#08080A";
              ctx.shadowColor = isDark ? "#DFC085" : "#B89355";
              ctx.shadowBlur = 10;
              ctx.font = warpedFont;
            } else if (dist < 75) {
              ctx.fillStyle = isDark ? "rgba(223, 192, 133, 0.95)" : "rgba(184, 147, 85, 0.95)";
              ctx.shadowBlur = 0;
              ctx.font = warpedFont;
            } else {
              ctx.fillStyle = isDark ? "rgba(0, 145, 255, 0.85)" : "rgba(0, 113, 227, 0.85)";
              ctx.shadowBlur = 0;
              ctx.font = normalFont;
            }

            ctx.fillText(node.char, 0, 0);
            ctx.restore();
          } else {
            ctx.font = normalFont;
            const snapProgress = Math.min(node.disp / 30, 1.0);
            const r = Math.floor(148 + snapProgress * (56 - 148));
            const g = Math.floor(163 + snapProgress * (189 - 163));
            const b = Math.floor(184 + snapProgress * (248 - 184));
            const alpha = 0.25 + snapProgress * 0.3;

            ctx.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
            ctx.fillText(node.char, node.x, node.y);
          }
        }
      }
    };

    const render = () => {
      if (!canvas.isConnected) {
        return;
      }

      update();
      draw();
      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchstart", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      canvas.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
    };
  }, [activePattern]);

  return (
    <div className={`liquid-glass-surface p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden ${className}`}>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 z-10">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-[var(--accent-champagne)]" />
          <h3 className="text-sm font-mono uppercase tracking-widest text-[var(--text-primary)]">
            {title}
          </h3>
        </div>

        {/* Preset Switcher Pills */}
        {!defaultPattern && (
          <div className="flex flex-wrap items-center gap-1.5">
            {letterPresets.map((preset, idx) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => setActivePresetIndex(idx)}
                className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer ${
                  activePresetIndex === idx
                    ? "bg-[var(--text-primary)] text-[var(--canvas)] font-semibold shadow-xs"
                    : "liquid-glass-pill text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Semantic Warp Lens Canvas Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[260px] sm:h-[320px] rounded-xl overflow-hidden border border-[var(--glass-border)] my-1 cursor-crosshair select-none touch-none"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
          aria-label="Interactive semantic text warp lens canvas"
        />
      </div>

      {/* Footer Spec Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-[var(--glass-border)] text-xs font-mono text-[var(--text-tertiary)] z-10">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-champagne)] animate-ping" />
          <span>LINGUISTIC MATRIX: MANI RATAN PRATAP SINGH (MRPS)</span>
        </div>
        <div className="text-[11px] flex items-center gap-1">
          <Radio className="w-3 h-3 text-[var(--accent-champagne)]" />
          <span>60 FPS KINETIC GRAVITY SWIRL</span>
        </div>
      </div>
    </div>
  );
}

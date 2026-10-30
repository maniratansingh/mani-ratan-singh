"use client";

import * as React from "react";
import { Play, Pause, Volume2, Sparkles, RefreshCw } from "lucide-react";

export function SensoryAudioVisualizer() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [frequency, setFrequency] = React.useState(2.2);
  const [mode, setMode] = React.useState<"fluid" | "particles">("fluid");

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      animationId = requestAnimationFrame(render);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      ctx.clearRect(0, 0, w, h);

      time += isPlaying ? 0.045 : 0.012;

      if (mode === "fluid") {
        // Multi-layered chromatic fluid sine waves with refraction glow
        const layers = [
          { color: "rgba(200, 185, 157, 0.45)", speed: 1.0, freq: frequency * 0.8, amp: 28 },
          { color: "rgba(168, 178, 193, 0.35)", speed: 0.7, freq: frequency * 1.2, amp: 38 },
          { color: "rgba(255, 255, 255, 0.65)", speed: 1.4, freq: frequency * 1.5, amp: 20 },
        ];

        layers.forEach((layer) => {
          ctx.beginPath();
          ctx.strokeStyle = layer.color;
          ctx.lineWidth = 2.5;

          for (let x = 0; x < w; x += 4) {
            const y =
              h / 2 +
              Math.sin(x * 0.008 * layer.freq + time * layer.speed) * layer.amp * (isPlaying ? 1.4 : 0.7) +
              Math.cos(x * 0.015 + time * 0.5) * 12;

            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        });
      } else {
        // Ambient glass particles floating in audio field
        const count = 35;
        for (let i = 0; i < count; i++) {
          const x = (w / count) * i;
          const y =
            h / 2 +
            Math.sin(i * 0.4 + time * 1.5) * (isPlaying ? 45 : 20);
          const radius = 2 + Math.abs(Math.sin(time + i)) * (isPlaying ? 4 : 2);

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = i % 2 === 0 ? "rgba(200, 185, 157, 0.7)" : "rgba(168, 178, 193, 0.7)";
          ctx.shadowBlur = 10;
          ctx.shadowColor = "rgba(200, 185, 157, 0.5)";
          ctx.fill();
        }
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [isPlaying, frequency, mode]);

  return (
    <div className="liquid-glass-surface p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-4 mb-4 z-10">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-[var(--accent-champagne)]" />
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)]">
            Procedural Audio Caustics Laboratory
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMode(mode === "fluid" ? "particles" : "fluid")}
            className="px-2.5 py-1 rounded-full liquid-glass-pill text-[11px] font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{mode === "fluid" ? "Fluid Waves" : "Quantum Particles"}</span>
          </button>
        </div>
      </div>

      {/* Interactive Canvas */}
      <div className="relative w-full h-36 rounded-xl overflow-hidden bg-black/[0.03] dark:bg-white/[0.02] border border-[var(--glass-border)] my-2">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-3 border-t border-[var(--glass-border)] text-xs z-10">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--text-primary)] text-[var(--canvas)] text-xs font-semibold tracking-wide transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? "Suspend Sine Field" : "Oscillate Field"}</span>
          </button>

          <span className="text-[11px] font-mono text-[var(--text-tertiary)]">
            {isPlaying ? "ACTIVE HARMONIC MODULATION" : "IDLE CAUSTIC FLUID"}
          </span>
        </div>

        {/* Frequency Slider */}
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
          <span>Freq:</span>
          <input
            type="range"
            min="1"
            max="4"
            step="0.2"
            value={frequency}
            onChange={(e) => setFrequency(parseFloat(e.target.value))}
            className="w-24 accent-[var(--accent-champagne)] cursor-pointer"
          />
          <span className="w-8 text-right">{frequency}Hz</span>
        </div>
      </div>
    </div>
  );
}

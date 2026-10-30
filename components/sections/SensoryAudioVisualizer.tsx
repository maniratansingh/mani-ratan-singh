"use client";

import * as React from "react";
import { Play, Pause, Volume2, Sparkles, RefreshCw } from "lucide-react";

export function SensoryAudioVisualizer() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [frequency, setFrequency] = React.useState(2.2);
  const [mode, setMode] = React.useState<"fluid" | "particles">("fluid");

  // Web Audio API Synth Refs
  const audioCtxRef = React.useRef<AudioContext | null>(null);
  const oscRef = React.useRef<OscillatorNode | null>(null);
  const gainRef = React.useRef<GainNode | null>(null);

  // Initialize and toggle audio synthesis
  const toggleAudio = () => {
    if (!isPlaying) {
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContextClass();
        }
        if (audioCtxRef.current.state === "suspended") {
          audioCtxRef.current.resume();
        }

        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Warm pentatonic sine harmonic (A2 ~ 110Hz scaled by frequency)
        osc.type = "sine";
        osc.frequency.setValueAtTime(110 * (frequency / 2), ctx.currentTime);

        // Gentle, soft luxury volume envelope (non-intrusive ambient chime)
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        oscRef.current = osc;
        gainRef.current = gain;
        setIsPlaying(true);
      } catch (e) {
        console.warn("Audio Context init blocked:", e);
        setIsPlaying(true);
      }
    } else {
      // Gentle fade out
      if (gainRef.current && audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        try {
          gainRef.current.gain.setValueAtTime(gainRef.current.gain.value, ctx.currentTime);
          gainRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
          setTimeout(() => {
            oscRef.current?.stop();
            oscRef.current?.disconnect();
            gainRef.current?.disconnect();
          }, 350);
        } catch {
          oscRef.current?.stop();
        }
      }
      setIsPlaying(false);
    }
  };

  // Adjust oscillator pitch dynamically when slider changes
  React.useEffect(() => {
    if (oscRef.current && audioCtxRef.current && isPlaying) {
      try {
        oscRef.current.frequency.setTargetAtTime(
          110 * (frequency / 2),
          audioCtxRef.current.currentTime,
          0.1
        );
      } catch {
        // ignore
      }
    }
  }, [frequency, isPlaying]);

  // Clean up audio on unmount
  React.useEffect(() => {
    return () => {
      try {
        oscRef.current?.stop();
        oscRef.current?.disconnect();
        audioCtxRef.current?.close();
      } catch {
        // ignore
      }
    };
  }, []);

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
          { color: "rgba(184, 147, 85, 0.55)", speed: 1.0, freq: frequency * 0.8, amp: 26 },
          { color: "rgba(107, 124, 147, 0.4)", speed: 0.7, freq: frequency * 1.2, amp: 36 },
          { color: "rgba(255, 255, 255, 0.7)", speed: 1.4, freq: frequency * 1.5, amp: 18 },
        ];

        layers.forEach((layer) => {
          ctx.beginPath();
          ctx.strokeStyle = layer.color;
          ctx.lineWidth = 2.2;

          for (let x = 0; x < w; x += 4) {
            const y =
              h / 2 +
              Math.sin(x * 0.008 * layer.freq + time * layer.speed) * layer.amp * (isPlaying ? 1.4 : 0.7) +
              Math.cos(x * 0.015 + time * 0.5) * 10;

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
          ctx.fillStyle = i % 2 === 0 ? "rgba(184, 147, 85, 0.75)" : "rgba(107, 124, 147, 0.75)";
          ctx.shadowBlur = 10;
          ctx.shadowColor = "rgba(184, 147, 85, 0.5)";
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
            className="px-3 py-1 rounded-full liquid-glass-pill text-[11px] font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer flex items-center gap-1.5"
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
            onClick={toggleAudio}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--text-primary)] text-[var(--canvas)] text-xs font-semibold tracking-wide transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[var(--accent-champagne)]" />}
            <span>{isPlaying ? "Suspend Sine Field" : "Oscillate Audio Field"}</span>
          </button>

          <span className="text-[11px] font-mono text-[var(--text-tertiary)]">
            {isPlaying ? "ACTIVE HARMONIC TONE (110Hz)" : "IDLE CAUSTIC FLUID"}
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
          <span className="w-8 text-right font-medium text-[var(--text-primary)]">{frequency}Hz</span>
        </div>
      </div>
    </div>
  );
}

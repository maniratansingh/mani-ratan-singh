"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Camera, Maximize2, X, Sliders, ChevronLeft, ChevronRight } from "lucide-react";
import { siteContent } from "@/config/content";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface PhotoPlate {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  location: string;
  exif: {
    lens: string;
    aperture: string;
    shutter: string;
    iso: string;
  };
  aspectRatio: string;
}

const photoPlates: PhotoPlate[] = [
  {
    id: "transit",
    src: "/photography/long-exposure-transit.jpg",
    title: "Nocturnal Transit & Fluid Geometry",
    subtitle: "Multi-tier highway overpass light streaks at twilight blue hour",
    location: "National Highway Flyover · India",
    exif: {
      lens: "24mm Prime",
      aperture: "f/11",
      shutter: "25.0s",
      iso: "ISO 100",
    },
    aspectRatio: "aspect-[16/10]",
  },
  {
    id: "architecture",
    src: "/photography/architectural-geometry.jpg",
    title: "Monolithic Shadow & Travertine",
    subtitle: "Brutalist concrete planes cut by sharp late afternoon sun",
    location: "Civic Architecture Complex · India",
    exif: {
      lens: "35mm F1.4",
      aperture: "f/8.0",
      shutter: "1/250s",
      iso: "ISO 100",
    },
    aspectRatio: "aspect-[16/10]",
  },
  {
    id: "astronomy",
    src: "/photography/night-astrophotography.jpg",
    title: "Celestial Star Vortex & Horizon",
    subtitle: "Concentric star trails rotating around the northern celestial pole",
    location: "Purvanchal Dark Sky · India",
    exif: {
      lens: "14mm Ultra-Wide",
      aperture: "f/2.8",
      shutter: "180 × 20s",
      iso: "ISO 800",
    },
    aspectRatio: "aspect-[16/10]",
  },
  {
    id: "ganges",
    src: "/photography/ganges-mist-monochrome.jpg",
    title: "Serene Waters & Dawn Mist",
    subtitle: "Fine-art monochrome long exposure of morning river silence",
    location: "Sacred River Banks · India",
    exif: {
      lens: "50mm Prime",
      aperture: "f/16",
      shutter: "45.0s",
      iso: "ISO 50",
    },
    aspectRatio: "aspect-[16/10]",
  },
];

export function PhotographySection() {
  const { photography } = siteContent;
  const [activePhoto, setActivePhoto] = React.useState<PhotoPlate | null>(null);
  const [mounted, setMounted] = React.useState(false);
  const lightboxRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const openPhoto = React.useCallback((plate: PhotoPlate) => {
    setActivePhoto(plate);
    if (typeof window !== "undefined") {
      window.history.pushState({ photoModal: plate.id }, "");
    }
  }, []);

  const closePhoto = React.useCallback((fromPopState = false) => {
    setActivePhoto(null);
    if (!fromPopState && typeof window !== "undefined") {
      if (window.history.state?.photoModal) {
        window.history.back();
      }
    }
  }, []);

  const navigateToPhoto = React.useCallback((newPlate: PhotoPlate) => {
    setActivePhoto(newPlate);
    if (typeof window !== "undefined") {
      window.history.replaceState({ photoModal: newPlate.id }, "");
    }
  }, []);

  // Listen to native browser Back button & mobile back gesture
  React.useEffect(() => {
    const handlePopState = () => {
      if (activePhoto) {
        closePhoto(true);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [activePhoto, closePhoto]);

  // Handle keyboard events (Escape, Left, Right, Focus Trap) and body scroll lock
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePhoto();
        return;
      }
      
      if (e.key === "Tab" && lightboxRef.current) {
        const focusable = lightboxRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
        return;
      }

      if (e.key === "ArrowRight") {
        if (activePhoto) {
          const currentIndex = photoPlates.findIndex((p) => p.id === activePhoto.id);
          const nextIndex = (currentIndex + 1) % photoPlates.length;
          navigateToPhoto(photoPlates[nextIndex]);
        }
      } else if (e.key === "ArrowLeft") {
        if (activePhoto) {
          const currentIndex = photoPlates.findIndex((p) => p.id === activePhoto.id);
          const prevIndex = (currentIndex - 1 + photoPlates.length) % photoPlates.length;
          navigateToPhoto(photoPlates[prevIndex]);
        }
      }
    };
    if (activePhoto) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [activePhoto, closePhoto, navigateToPhoto]);

  return (
    <section id="photography" className="relative max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1856px] 4xl:max-w-[2240px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 4xl:px-24 py-20 sm:py-28 lg:py-32 2xl:py-40">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-[var(--glass-border)]">
        <div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-light tracking-[-0.03em] text-[var(--text-primary)] uppercase leading-[0.95] mb-4">
            {photography.title}
          </h2>
          <p className="text-base sm:text-lg 2xl:text-xl text-[var(--text-secondary)] max-w-lg 2xl:max-w-2xl leading-relaxed">
            {photography.subtitle}
          </p>
        </div>

        <Link
          href={photography.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 2xl:px-8 py-2.5 2xl:py-3 rounded-full liquid-glass-pill text-xs 2xl:text-sm uppercase tracking-widest font-medium text-[var(--text-primary)] hover:scale-105 transition-transform"
        >
          <InstagramIcon className="w-4 h-4 text-[var(--accent-champagne)]" />
          <span>{photography.instagramHandle}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Monograph Statement Spread */}
      <div className="mb-16 pb-12 border-b border-[var(--glass-border)]">
        <blockquote className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-serif italic text-[var(--text-primary)] leading-snug max-w-4xl 2xl:max-w-5xl">
          &ldquo;{photography.statement}&rdquo;
        </blockquote>
      </div>

      {/* Photography Monograph Gallery (High-Fidelity Plates) */}
      <div className="grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-4 gap-10 lg:gap-14 2xl:gap-16">
        {photoPlates.map((plate) => (
          <article
            key={plate.id}
            tabIndex={0}
            role="button"
            aria-label={`View ${plate.title} photograph in full lightbox`}
            onClick={() => openPhoto(plate)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openPhoto(plate);
              }
            }}
            className="group cursor-pointer flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-champagne)] rounded-2xl transition-all"
          >
            {/* Image Container with Luxury Editorial Frame */}
            <div className="relative w-full aspect-[16/10] min-h-[220px] sm:min-h-[280px] lg:min-h-[320px] 2xl:min-h-[380px] overflow-hidden rounded-2xl editorial-frame mb-5 bg-neutral-900/40">
              <Image
                src={plate.src}
                alt={plate.title}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1536px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Top Glass Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider liquid-glass-pill text-[var(--text-primary)]">
                  {plate.location}
                </span>
              </div>

              {/* View Overlay Button */}
              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="w-9 h-9 rounded-full liquid-glass-pill flex items-center justify-center text-[var(--text-primary)] shadow-md">
                  <Maximize2 className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Title & Metadata Strip */}
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-xl sm:text-2xl font-light text-[var(--text-primary)] uppercase tracking-tight group-hover:text-[var(--accent-champagne)] transition-colors">
                  {plate.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {plate.subtitle}
              </p>

              {/* EXIF Metadata Strip */}
              <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] font-mono text-[var(--text-tertiary)] pt-2 border-t border-[var(--glass-border)]">
                <span className="text-[var(--accent-champagne)] font-medium">{plate.exif.lens}</span>
                <span>•</span>
                <span>{plate.exif.aperture}</span>
                <span>•</span>
                <span>{plate.exif.shutter}</span>
                <span>•</span>
                <span>{plate.exif.iso}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Lightbox Modal rendered directly into document.body to escape section containing block */}
      {mounted &&
        activePhoto &&
        createPortal(
          <div
            ref={lightboxRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-photo-title"
            className="fixed inset-0 z-[99999] w-screen h-screen h-[100dvh] flex flex-col justify-between p-3 sm:p-6 lg:p-8 bg-black/95 backdrop-blur-3xl animate-fade-in select-none overflow-hidden"
            onClick={() => closePhoto()}
          >
            {/* Top Bar: Explicit Back Button, Plate Counter & Close Button */}
            <div
              className="flex items-center justify-between gap-3 sm:gap-4 z-40 max-w-7xl mx-auto w-full px-1"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left: Prominent "Back to Gallery" Button */}
              <button
                type="button"
                onClick={() => closePhoto()}
                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 border border-white/30 text-white transition-all text-xs sm:text-sm font-semibold cursor-pointer shadow-2xl group focus:outline-none focus:ring-2 focus:ring-[var(--accent-champagne)]"
                aria-label="Back to photography gallery"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--accent-champagne)] transition-transform group-hover:-translate-x-1" />
                <span>Back to Gallery</span>
              </button>

              {/* Center: Plate Indicator & Title */}
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/25 text-[11px] sm:text-xs font-mono tracking-widest text-[var(--accent-champagne)] shadow-md">
                  PLATE {String(photoPlates.findIndex((p) => p.id === activePhoto.id) + 1).padStart(2, "0")} / {String(photoPlates.length).padStart(2, "0")}
                </span>
                <span className="hidden md:inline text-xs sm:text-sm text-neutral-300 font-light truncate max-w-xs lg:max-w-md">
                  {activePhoto.title}
                </span>
              </div>

              {/* Right: Quick Close / ESC Pill */}
              <button
                type="button"
                onClick={() => closePhoto()}
                className="flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/25 text-white transition-all text-xs tracking-wider font-mono cursor-pointer shadow-lg"
                aria-label="Close photo preview (Esc)"
              >
                <span className="hidden sm:inline text-neutral-400 text-[11px]">ESC</span>
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Center Stage: Image and Flanked Prev/Next Buttons */}
            <div
              className="relative flex-1 w-full flex items-center justify-center min-h-0 my-2 sm:my-4"
              onClick={(e) => {
                // Click outside the photo closes the modal
                if (e.target === e.currentTarget) closePhoto();
              }}
            >
              {/* Previous Photo Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = photoPlates.findIndex((p) => p.id === activePhoto.id);
                  const prevIndex = (currentIndex - 1 + photoPlates.length) % photoPlates.length;
                  navigateToPhoto(photoPlates[prevIndex]);
                }}
                className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 2xl:w-16 2xl:h-16 rounded-full bg-neutral-900/90 hover:bg-black active:scale-95 border border-white/30 hover:border-white/70 text-white shadow-2xl backdrop-blur-xl flex items-center justify-center transition-all cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[var(--accent-champagne)]"
                aria-label="Previous photograph"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:-translate-x-0.5" />
              </button>

              {/* Next Photo Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = photoPlates.findIndex((p) => p.id === activePhoto.id);
                  const nextIndex = (currentIndex + 1) % photoPlates.length;
                  navigateToPhoto(photoPlates[nextIndex]);
                }}
                className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 2xl:w-16 2xl:h-16 rounded-full bg-neutral-900/90 hover:bg-black active:scale-95 border border-white/30 hover:border-white/70 text-white shadow-2xl backdrop-blur-xl flex items-center justify-center transition-all cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[var(--accent-champagne)]"
                aria-label="Next photograph"
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:translate-x-0.5" />
              </button>

              {/* Central Photo */}
              <div
                className="relative w-full h-full max-w-5xl 2xl:max-w-7xl 3xl:max-w-[1920px] max-h-[66vh] sm:max-h-[72vh] 2xl:max-h-[78vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                  sizes="(max-width: 1024px) 100vw, (max-width: 2560px) 90vw, 1920px"
                />
              </div>
            </div>

            {/* Bottom Bar: EXIF Metadata & Context */}
            <div
              className="max-w-4xl 2xl:max-w-5xl mx-auto w-full px-4 sm:px-6 py-3 rounded-2xl bg-neutral-900/90 border border-white/20 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xl z-40"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <h4 id="lightbox-photo-title" className="text-sm sm:text-base font-medium tracking-tight text-white">
                  {activePhoto.title}
                </h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {activePhoto.location} · {activePhoto.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[var(--accent-champagne)] pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">{activePhoto.exif.lens}</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">{activePhoto.exif.aperture}</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">{activePhoto.exif.shutter}</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">{activePhoto.exif.iso}</span>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}

"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera, Maximize2, X, Sliders, ChevronLeft, ChevronRight } from "lucide-react";
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

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePhoto(null);
      } else if (e.key === "ArrowRight") {
        if (activePhoto) {
          const currentIndex = photoPlates.findIndex((p) => p.id === activePhoto.id);
          const nextIndex = (currentIndex + 1) % photoPlates.length;
          setActivePhoto(photoPlates[nextIndex]);
        }
      } else if (e.key === "ArrowLeft") {
        if (activePhoto) {
          const currentIndex = photoPlates.findIndex((p) => p.id === activePhoto.id);
          const prevIndex = (currentIndex - 1 + photoPlates.length) % photoPlates.length;
          setActivePhoto(photoPlates[prevIndex]);
        }
      }
    };
    if (activePhoto) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePhoto]);

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
            onClick={() => setActivePhoto(plate)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActivePhoto(plate);
              }
            }}
            className="group cursor-pointer flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-champagne)] rounded-2xl transition-all"
          >
            {/* Image Container with Luxury Editorial Frame */}
            <div className={`relative w-full ${plate.aspectRatio} overflow-hidden rounded-2xl editorial-frame mb-5`}>
              <Image
                src={plate.src}
                alt={plate.title}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
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

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-photo-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-xl animate-fade-in"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-5xl 2xl:max-w-7xl 3xl:max-w-[1800px] 4xl:max-w-[2400px] w-full max-h-[92vh] flex flex-col liquid-glass-surface overflow-hidden bg-neutral-900 border border-white/20 p-2 sm:p-4 2xl:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full liquid-glass-pill flex items-center justify-center text-white hover:scale-105 transition-transform"
              aria-label="Close image modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Previous & Next Navigation Buttons */}
            <button
              type="button"
              onClick={() => {
                const currentIndex = photoPlates.findIndex((p) => p.id === activePhoto.id);
                const prevIndex = (currentIndex - 1 + photoPlates.length) % photoPlates.length;
                setActivePhoto(photoPlates[prevIndex]);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full liquid-glass-pill flex items-center justify-center text-white hover:scale-105 transition-transform shadow-lg cursor-pointer"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => {
                const currentIndex = photoPlates.findIndex((p) => p.id === activePhoto.id);
                const nextIndex = (currentIndex + 1) % photoPlates.length;
                setActivePhoto(photoPlates[nextIndex]);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full liquid-glass-pill flex items-center justify-center text-white hover:scale-105 transition-transform shadow-lg cursor-pointer"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-xl overflow-hidden mb-4">
              <Image
                src={activePhoto.src}
                alt={activePhoto.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Modal Caption */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 py-2 text-white">
              <div>
                <h4 id="lightbox-photo-title" className="text-xl font-light uppercase tracking-tight text-white mb-1">
                  {activePhoto.title}
                </h4>
                <p className="text-xs text-neutral-400">
                  {activePhoto.location} · {activePhoto.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-[var(--accent-champagne)]">
                <span>{activePhoto.exif.lens}</span>
                <span>{activePhoto.exif.aperture}</span>
                <span>{activePhoto.exif.shutter}</span>
                <span>{activePhoto.exif.iso}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

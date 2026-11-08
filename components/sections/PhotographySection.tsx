"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Camera, Maximize2, X, Sliders, ChevronLeft, ChevronRight } from "lucide-react";
import { siteContent } from "@/config/content";
import { featuredPhotos, gallerySrcSet, type GalleryPhoto } from "@/config/gallery";
import { useDialogA11y } from "@/components/a11y/useDialogA11y";

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

export function PhotographySection() {
  const { photography } = siteContent;
  const [activePhoto, setActivePhoto] = React.useState<GalleryPhoto | null>(null);
  const [mounted, setMounted] = React.useState(false);
  const lightboxRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const openPhoto = React.useCallback((plate: GalleryPhoto) => {
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

  const navigateToPhoto = React.useCallback((newPlate: GalleryPhoto) => {
    setActivePhoto(newPlate);
    if (typeof window !== "undefined") {
      window.history.replaceState({ photoModal: newPlate.id }, "");
    }
  }, []);

  // Touch swipe gesture handlers for intuitive mobile navigation
  const touchStartRef = React.useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || !activePhoto) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    // Horizontal swipe threshold 45px
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 45) {
      const currentIndex = featuredPhotos.findIndex((p) => p.id === activePhoto.id);
      if (deltaX < 0) {
        // Swipe left -> Next
        const nextIndex = (currentIndex + 1) % featuredPhotos.length;
        navigateToPhoto(featuredPhotos[nextIndex]);
      } else {
        // Swipe right -> Prev
        const prevIndex = (currentIndex - 1 + featuredPhotos.length) % featuredPhotos.length;
        navigateToPhoto(featuredPhotos[prevIndex]);
      }
    } else if (deltaY > 80 && Math.abs(deltaX) < 60) {
      // Swipe down -> dismiss
      closePhoto();
    }
  };

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

  // Arrow-key navigation for the lightbox. Escape, focus trap, scroll lock and
  // focus restoration are handled by the shared dialog hook below.
  React.useEffect(() => {
    if (!activePhoto) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        const currentIndex = featuredPhotos.findIndex((p) => p.id === activePhoto.id);
        const nextIndex = (currentIndex + 1) % featuredPhotos.length;
        navigateToPhoto(featuredPhotos[nextIndex]);
      } else if (e.key === "ArrowLeft") {
        const currentIndex = featuredPhotos.findIndex((p) => p.id === activePhoto.id);
        const prevIndex = (currentIndex - 1 + featuredPhotos.length) % featuredPhotos.length;
        navigateToPhoto(featuredPhotos[prevIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhoto, navigateToPhoto]);

  useDialogA11y({
    open: Boolean(mounted && activePhoto),
    onClose: closePhoto,
    containerRef: lightboxRef,
  });

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

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-6 2xl:px-8 py-2.5 2xl:py-3 rounded-full bg-[var(--text-primary)] text-[var(--canvas)] text-xs 2xl:text-sm uppercase tracking-widest font-semibold hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-champagne)]"
          >
            <Camera className="w-4 h-4" />
            <span>Browse Full Gallery</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href={photography.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 2xl:px-8 py-2.5 2xl:py-3 rounded-full liquid-glass-pill text-xs 2xl:text-sm uppercase tracking-widest font-medium text-[var(--text-primary)] hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-champagne)]"
          >
            <InstagramIcon className="w-4 h-4 text-[var(--accent-champagne)]" />
            <span>{photography.instagramHandle}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Monograph Statement Spread */}
      <div className="mb-16 pb-12 border-b border-[var(--glass-border)]">
        <blockquote className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-serif italic text-[var(--text-primary)] leading-snug max-w-4xl 2xl:max-w-5xl">
          &ldquo;{photography.statement}&rdquo;
        </blockquote>
      </div>

      {/* Photography Monograph Gallery (High-Fidelity Plates) */}
      <div className="grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-4 gap-10 lg:gap-14 2xl:gap-16">
        {featuredPhotos.map((plate) => (
          <article
            key={plate.id}
            tabIndex={0}
            role="button"
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
              <img
                src={plate.src}
                srcSet={gallerySrcSet(plate.src)}
                sizes="(max-width: 768px) 100vw, (max-width: 1920px) 50vw, 25vw"
                alt={plate.title}
                width={1264}
                height={848}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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
              {plate.exif && (
                <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] font-mono text-[var(--text-tertiary)] pt-2 border-t border-[var(--glass-border)]">
                  <span className="text-[var(--accent-champagne)] font-medium">{plate.exif.lens}</span>
                  <span>•</span>
                  <span>{plate.exif.aperture}</span>
                  <span>•</span>
                  <span>{plate.exif.shutter}</span>
                  <span>•</span>
                  <span>{plate.exif.iso}</span>
                </div>
              )}
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
            tabIndex={-1}
            className="fixed inset-0 z-[99999] w-screen h-screen h-[100dvh] flex flex-col justify-between p-3 sm:p-6 lg:p-8 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-black/95 backdrop-blur-3xl animate-fade-in select-none overflow-hidden"
            onClick={() => closePhoto()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Bar: Explicit Back Button, Plate Counter & Close Button */}
            <div
              className="flex items-center justify-between gap-2 sm:gap-4 z-40 max-w-7xl mx-auto w-full px-1"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left: Prominent "Back to Gallery" Button */}
              <button
                type="button"
                onClick={() => closePhoto()}
                className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 border border-white/30 text-white transition-all text-xs sm:text-sm font-semibold cursor-pointer shadow-2xl group focus:outline-none focus:ring-2 focus:ring-[var(--accent-champagne)] shrink-0 min-h-[40px]"
                aria-label="Back to photography gallery"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--accent-champagne)] transition-transform group-hover:-translate-x-1" />
                <span className="hidden xs:inline">Back to Gallery</span>
                <span className="xs:hidden">Back</span>
              </button>

              {/* Center: Plate Indicator & Title */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/10 border border-white/25 text-[10px] sm:text-xs font-mono tracking-widest text-[var(--accent-champagne)] shadow-md">
                  PLATE {String(featuredPhotos.findIndex((p) => p.id === activePhoto.id) + 1).padStart(2, "0")} / {String(featuredPhotos.length).padStart(2, "0")}
                </span>
                <span className="hidden md:inline text-xs sm:text-sm text-neutral-300 font-light truncate max-w-xs lg:max-w-md">
                  {activePhoto.title}
                </span>
              </div>

              {/* Right: Quick Close / ESC Pill */}
              <button
                type="button"
                onClick={() => closePhoto()}
                className="relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/25 text-white transition-all text-xs tracking-wider font-mono cursor-pointer shadow-lg shrink-0 min-h-[40px] before:absolute before:-inset-2 before:content-['']"
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
                  const currentIndex = featuredPhotos.findIndex((p) => p.id === activePhoto.id);
                  const prevIndex = (currentIndex - 1 + featuredPhotos.length) % featuredPhotos.length;
                  navigateToPhoto(featuredPhotos[prevIndex]);
                }}
                className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-14 sm:h-14 2xl:w-16 2xl:h-16 rounded-full bg-neutral-900/90 hover:bg-black active:scale-95 border border-white/30 hover:border-white/70 text-white shadow-2xl backdrop-blur-xl flex items-center justify-center transition-all cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[var(--accent-champagne)]"
                aria-label="Previous photograph"
              >
                <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7 transition-transform group-hover:-translate-x-0.5" />
              </button>

              {/* Next Photo Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = featuredPhotos.findIndex((p) => p.id === activePhoto.id);
                  const nextIndex = (currentIndex + 1) % featuredPhotos.length;
                  navigateToPhoto(featuredPhotos[nextIndex]);
                }}
                className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-14 sm:h-14 2xl:w-16 2xl:h-16 rounded-full bg-neutral-900/90 hover:bg-black active:scale-95 border border-white/30 hover:border-white/70 text-white shadow-2xl backdrop-blur-xl flex items-center justify-center transition-all cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[var(--accent-champagne)]"
                aria-label="Next photograph"
              >
                <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 transition-transform group-hover:translate-x-0.5" />
              </button>

              {/* Central Photo */}
              <div
                className="relative w-full h-full max-w-5xl 2xl:max-w-7xl 3xl:max-w-[1920px] max-h-[66vh] sm:max-h-[72vh] 2xl:max-h-[78vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={activePhoto.src}
                  srcSet={gallerySrcSet(activePhoto.src)}
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  alt={activePhoto.title}
                  width={1264}
                  height={848}
                  decoding="async"
                  className="max-w-full max-h-full w-auto h-auto object-contain drop-shadow-2xl"
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

              {activePhoto.exif && (
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[var(--accent-champagne)] pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">{activePhoto.exif.lens}</span>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">{activePhoto.exif.aperture}</span>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">{activePhoto.exif.shutter}</span>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">{activePhoto.exif.iso}</span>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}

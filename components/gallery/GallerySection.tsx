"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";
import {
  galleryPhotos,
  gallerySrcSet,
  galleryCollections,
  type GalleryPhoto,
} from "@/config/gallery";
import { siteContent } from "@/config/content";
import { useDialogA11y } from "@/components/a11y/useDialogA11y";

const GRID_SIZES =
  "(max-width: 479px) 100vw, (max-width: 1023px) 50vw, (max-width: 1919px) 33vw, 25vw";

export function GallerySection() {
  const { photography } = siteContent;
  const [activeTag, setActiveTag] = React.useState("All");
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [mounted, setMounted] = React.useState(false);
  const lightboxRef = React.useRef<HTMLDivElement>(null);
  const touchStart = React.useRef<{ x: number; y: number } | null>(null);
  const isOpenRef = React.useRef(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    isOpenRef.current = activeIndex !== null;
  }, [activeIndex]);

  const photos = React.useMemo(
    () =>
      activeTag === "All"
        ? galleryPhotos
        : galleryPhotos.filter((photo) => photo.tags.includes(activeTag)),
    [activeTag]
  );

  const activePhoto: GalleryPhoto | null =
    activeIndex === null ? null : photos[activeIndex] ?? null;

  const closePhoto = React.useCallback((fromPopState = false) => {
    setActiveIndex(null);
    if (
      !fromPopState &&
      typeof window !== "undefined" &&
      window.history.state?.galleryPhoto
    ) {
      window.history.back();
    }
  }, []);

  const openPhoto = React.useCallback(
    (index: number) => {
      const photo = photos[index];
      if (!photo) return;
      setActiveIndex(index);
      if (typeof window !== "undefined") {
        window.history.pushState({ galleryPhoto: photo.id }, "");
      }
    },
    [photos]
  );

  const stepPhoto = React.useCallback(
    (delta: number) => {
      if (activeIndex === null || photos.length === 0) return;
      const next = (activeIndex + delta + photos.length) % photos.length;
      setActiveIndex(next);
      if (typeof window !== "undefined") {
        window.history.replaceState({ galleryPhoto: photos[next].id }, "");
      }
    },
    [activeIndex, photos]
  );

  // Browser Back closes the lightbox instead of leaving the gallery.
  React.useEffect(() => {
    const handlePopState = () => {
      if (isOpenRef.current) setActiveIndex(null);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Arrow keys move between photographs. Escape and the focus trap live in
  // the shared dialog hook.
  React.useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        stepPhoto(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        stepPhoto(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, stepPhoto]);

  // Warm the neighbouring full-size images so next/previous feels instant.
  React.useEffect(() => {
    if (activeIndex === null || photos.length < 2) return;

    [-1, 1].forEach((delta) => {
      const neighbour = photos[(activeIndex + delta + photos.length) % photos.length];
      if (!neighbour) return;
      const image = new window.Image();
      image.src = neighbour.src;
    });
  }, [activeIndex, photos]);

  useDialogA11y({
    open: mounted && activePhoto !== null,
    onClose: closePhoto,
    containerRef: lightboxRef,
  });

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      stepPhoto(deltaX < 0 ? 1 : -1);
    }
  };

  const chooseTag = (tag: string) => {
    setActiveTag(tag);
    setActiveIndex(null);
  };

  return (
    <section className="relative w-full min-w-0 max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1856px] 4xl:max-w-[2240px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 4xl:px-24 pt-32 sm:pt-40 pb-24 sm:pb-32">
      {/* Breadcrumb & archive count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-10 pb-4 border-b border-[var(--glass-border)]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-champagne)]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO PORTFOLIO</span>
        </Link>
        <span className="text-xs font-mono text-[var(--accent-champagne)] flex items-center gap-2">
          <Camera className="w-3.5 h-3.5" />
          <span>
            PUBLIC ARCHIVE · {String(galleryPhotos.length).padStart(2, "0")} PLATES
          </span>
        </span>
      </div>

      {/* Editorial header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 pb-8 border-b border-[var(--glass-border)]">
        <div className="max-w-3xl">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[var(--accent-champagne)] block mb-3">
            Photographic Monograph
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-light tracking-[-0.03em] text-[var(--text-primary)] uppercase leading-[0.95] mb-4">
            Gallery
          </h1>
          <p className="text-base sm:text-lg 2xl:text-xl text-[var(--text-secondary)] leading-relaxed">
            A public collection of long exposures, architecture, and quiet observations
            after dark. Select any plate to view it full-screen.
          </p>
        </div>

        <Link
          href={photography.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 px-6 2xl:px-8 py-2.5 2xl:py-3 rounded-full liquid-glass-pill text-xs 2xl:text-sm uppercase tracking-widest font-medium text-[var(--text-primary)] hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-champagne)]"
        >
          <span>{photography.instagramHandle}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Filters + count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div
          className="flex min-w-0 flex-wrap items-center gap-1.5"
          aria-label="Filter photographs by collection"
          role="group"
        >
          {galleryCollections.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => chooseTag(tag)}
              aria-pressed={activeTag === tag}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer shrink-0 min-h-[38px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-champagne)] ${
                activeTag === tag
                  ? "bg-[var(--text-primary)] text-[var(--canvas)] font-semibold shadow-xs"
                  : "liquid-glass-pill text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-tertiary)] shrink-0 sm:text-right">
          {String(photos.length).padStart(2, "0")}{" "}
          {photos.length === 1 ? "photograph" : "photographs"}
        </span>
      </div>

      {/* Photo grid — a consistent 4:3 matte keeps rows aligned and browsing
          predictable; the lightbox shows the full, uncropped frame. */}
      {photos.length > 0 ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-5 2xl:gap-6">
          {photos.map((photo, index) => (
            <figure key={photo.id}>
              <button
                type="button"
                onClick={() => openPhoto(index)}
                aria-label={`View ${photo.title} full-screen`}
                className="group relative block w-full aspect-[4/3] overflow-hidden rounded-2xl editorial-frame bg-black/20 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-champagne)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <img
                  src={photo.src}
                  srcSet={gallerySrcSet(photo.src)}
                  sizes={GRID_SIZES}
                  width={photo.width}
                  height={photo.height}
                  alt={photo.alt}
                  loading={index < 3 ? "eager" : "lazy"}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />

                <span
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                  aria-hidden="true"
                />
                <span className="pointer-events-none absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white opacity-100 backdrop-blur-md transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                  <Maximize2 className="h-4 w-4" />
                </span>
              </button>

              <figcaption className="mt-3">
                <h2 className="text-sm sm:text-base font-light text-[var(--text-primary)] tracking-tight">
                  {photo.title}
                </h2>
                <p className="mt-1 text-[11px] font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
                  {photo.location} · {photo.year}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 py-24 rounded-2xl border border-dashed border-[var(--glass-border)] text-center">
          <Camera className="w-8 h-8 text-[var(--text-tertiary)]" />
          <p className="text-sm text-[var(--text-primary)] font-medium">
            New photographs are being developed.
          </p>
          <button
            type="button"
            onClick={() => chooseTag("All")}
            className="text-xs font-mono text-[var(--accent-champagne)] underline underline-offset-4 cursor-pointer rounded-full px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-champagne)]"
          >
            Show all photographs
          </button>
        </div>
      )}

      {/* Footer note */}
      <div className="mt-14 pt-8 border-t border-[var(--glass-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] font-mono uppercase tracking-widest text-[var(--text-tertiary)]">
        <span>New plates are added as they are developed.</span>
        <Link
          href="/#work"
          className="text-[var(--accent-champagne)] hover:text-[var(--text-primary)] transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-champagne)]"
        >
          Explore the engineering work →
        </Link>
      </div>

      {/* Full-screen viewer */}
      {mounted &&
        activePhoto &&
        activeIndex !== null &&
        createPortal(
          <div
            ref={lightboxRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-lightbox-title"
            tabIndex={-1}
            className="fixed inset-0 z-[99999] w-screen h-screen h-[100dvh] flex flex-col justify-between p-3 sm:p-6 lg:p-8 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-black/95 backdrop-blur-3xl animate-fade-in select-none overflow-hidden"
            onClick={() => closePhoto()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <p className="sr-only" aria-live="polite">
              Photograph {activeIndex + 1} of {photos.length}: {activePhoto.title}
            </p>

            {/* Top bar */}
            <div
              className="flex items-center justify-between gap-2 sm:gap-4 z-40 max-w-7xl mx-auto w-full px-1"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => closePhoto()}
                className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 border border-white/30 text-white transition-all text-xs sm:text-sm font-semibold cursor-pointer shadow-2xl group focus:outline-none focus:ring-2 focus:ring-[var(--accent-champagne)] shrink-0 min-h-[44px]"
                aria-label="Back to gallery"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--accent-champagne)] transition-transform group-hover:-translate-x-1" />
                <span className="hidden xs:inline">Back to Gallery</span>
                <span className="xs:hidden">Back</span>
              </button>

              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/10 border border-white/25 text-[10px] sm:text-xs font-mono tracking-widest text-[var(--accent-champagne)] shadow-md">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(photos.length).padStart(2, "0")}
                </span>
                <span className="hidden md:inline text-xs sm:text-sm text-neutral-300 font-light truncate max-w-xs lg:max-w-md">
                  {activePhoto.title}
                </span>
              </div>

              <button
                type="button"
                onClick={() => closePhoto()}
                className="relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/25 text-white transition-all text-xs tracking-wider font-mono cursor-pointer shadow-lg shrink-0 min-h-[44px] before:absolute before:-inset-2 before:content-[''] focus:outline-none focus:ring-2 focus:ring-[var(--accent-champagne)]"
                aria-label="Close photo viewer (Esc)"
              >
                <span className="hidden sm:inline text-neutral-400 text-[11px]">ESC</span>
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Center stage */}
            <div
              className="relative flex-1 w-full flex items-center justify-center min-h-0 my-2 sm:my-4"
              onClick={(event) => {
                if (event.target === event.currentTarget) closePhoto();
              }}
            >
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  stepPhoto(-1);
                }}
                className="absolute left-1 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 2xl:w-16 2xl:h-16 rounded-full bg-neutral-900/90 hover:bg-black active:scale-95 border border-white/30 hover:border-white/70 text-white shadow-2xl backdrop-blur-xl flex items-center justify-center transition-all cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[var(--accent-champagne)]"
                aria-label="Previous photograph"
              >
                <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7 transition-transform group-hover:-translate-x-0.5" />
              </button>

              <div
                className="relative w-full h-full max-w-5xl 2xl:max-w-7xl 3xl:max-w-[1920px] max-h-[62dvh] sm:max-h-[70dvh] 2xl:max-h-[76dvh] flex items-center justify-center"
                onClick={(event) => event.stopPropagation()}
              >
                <img
                  src={activePhoto.src}
                  srcSet={gallerySrcSet(activePhoto.src)}
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  width={activePhoto.width}
                  height={activePhoto.height}
                  alt={activePhoto.alt}
                  decoding="async"
                  className="max-w-full max-h-full w-auto h-auto object-contain drop-shadow-2xl"
                />
              </div>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  stepPhoto(1);
                }}
                className="absolute right-1 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 2xl:w-16 2xl:h-16 rounded-full bg-neutral-900/90 hover:bg-black active:scale-95 border border-white/30 hover:border-white/70 text-white shadow-2xl backdrop-blur-xl flex items-center justify-center transition-all cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[var(--accent-champagne)]"
                aria-label="Next photograph"
              >
                <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Bottom caption */}
            <div
              className="max-w-4xl 2xl:max-w-5xl mx-auto w-full px-4 sm:px-6 py-3 rounded-2xl bg-neutral-900/90 border border-white/20 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xl z-40"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="min-w-0">
                <h2
                  id="gallery-lightbox-title"
                  className="text-sm sm:text-base font-medium tracking-tight text-white"
                >
                  {activePhoto.title}
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {activePhoto.location} · {activePhoto.year}
                </p>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                  {activePhoto.subtitle}
                </p>
              </div>

              {activePhoto.exif && (
                <dl className="flex flex-wrap items-center gap-2 text-xs font-mono text-[var(--accent-champagne)] pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10 shrink-0">
                  <div className="px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    {activePhoto.exif.lens}
                  </div>
                  <div className="px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    {activePhoto.exif.aperture}
                  </div>
                  <div className="px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    {activePhoto.exif.shutter}
                  </div>
                  <div className="px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    {activePhoto.exif.iso}
                  </div>
                </dl>
              )}
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}

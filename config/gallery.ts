/**
 * =========================================================================
 * PUBLIC PHOTO GALLERY
 * =========================================================================
 *
 * HOW TO ADD A PHOTO
 * 1. Export a high-resolution master and place two WebP files in
 *    `public/photography/`:
 *      my-photo-1280.webp   (1280px wide)
 *      my-photo-640.webp    (640px wide)
 * 2. Add an entry to `galleryPhotos` below. `src` must point at the 1280
 *    master; the gallery derives the 640 variant automatically.
 * 3. Set `featured: true` if the photo should also appear on the home page.
 *
 * Example export (cwebp):
 *   cwebp -q 80 source.jpg -resize 1280 0 -o public/photography/my-photo-1280.webp
 *   cwebp -q 80 source.jpg -resize 640 0  -o public/photography/my-photo-640.webp
 *
 * Keep `width`/`height` accurate: they reserve layout space and prevent
 * cumulative layout shift while images load.
 */

export interface GalleryExif {
  lens: string;
  aperture: string;
  shutter: string;
  iso: string;
}

export interface GalleryPhoto {
  id: string;
  /** Path to the 1280px WebP master. */
  src: string;
  width: number;
  height: number;
  title: string;
  subtitle: string;
  /** Descriptive alt text for screen readers and search engines. */
  alt: string;
  location: string;
  year: string;
  tags: string[];
  /** Also show this photo in the home-page photography section. */
  featured?: boolean;
  exif?: GalleryExif;
}

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: "transit",
    src: "/photography/long-exposure-transit-1280.webp",
    width: 1264,
    height: 848,
    title: "Nocturnal Transit & Fluid Geometry",
    subtitle: "Multi-tier highway overpass light streaks at twilight blue hour",
    alt: "Long-exposure light trails sweeping through a multi-tier highway flyover at blue hour",
    location: "National Highway Flyover · India",
    year: "2025",
    tags: ["Long Exposure", "Night", "Urban"],
    featured: true,
    exif: {
      lens: "24mm Prime",
      aperture: "f/11",
      shutter: "25.0s",
      iso: "ISO 100",
    },
  },
  {
    id: "architecture",
    src: "/photography/architectural-geometry-1280.webp",
    width: 1264,
    height: 848,
    title: "Monolithic Shadow & Travertine",
    subtitle: "Brutalist concrete planes cut by sharp late afternoon sun",
    alt: "Brutalist concrete facade with hard geometric shadows in late afternoon light",
    location: "Civic Architecture Complex · India",
    year: "2025",
    tags: ["Architecture", "Minimal"],
    featured: true,
    exif: {
      lens: "35mm F1.4",
      aperture: "f/8.0",
      shutter: "1/250s",
      iso: "ISO 100",
    },
  },
  {
    id: "astronomy",
    src: "/photography/night-astrophotography-1280.webp",
    width: 1264,
    height: 848,
    title: "Celestial Star Vortex & Horizon",
    subtitle: "Concentric star trails rotating around the northern celestial pole",
    alt: "Concentric star trails circling the northern celestial pole above a dark horizon",
    location: "Ayodhya · Uttar Pradesh, India",
    year: "2026",
    tags: ["Night", "Astrophotography"],
    featured: true,
    exif: {
      lens: "14mm Ultra-Wide",
      aperture: "f/2.8",
      shutter: "180 × 20s",
      iso: "ISO 800",
    },
  },
  {
    id: "ganges",
    src: "/photography/ganges-mist-monochrome-1280.webp",
    width: 1264,
    height: 848,
    title: "Serene Waters & Dawn Mist",
    subtitle: "Fine-art monochrome long exposure of morning river silence",
    alt: "Monochrome long exposure of a calm river disappearing into dawn mist",
    location: "Sacred River Banks · India",
    year: "2025",
    tags: ["Monochrome", "Landscape", "Long Exposure"],
    featured: true,
    exif: {
      lens: "50mm Prime",
      aperture: "f/16",
      shutter: "45.0s",
      iso: "ISO 50",
    },
  },
];

/** Photos shown in the home-page photography section. */
export const featuredPhotos = galleryPhotos.filter((photo) => photo.featured);

/** Curated filter chips. Photos match when their tags include one of these. */
export const galleryCollections = [
  "All",
  "Long Exposure",
  "Architecture",
  "Night",
  "Monochrome",
  "Landscape",
];

/**
 * Responsive WebP sources for a gallery master. New photos only need the
 * 1280 file checked in; the helper maps it to the 640 companion.
 */
export function gallerySrcSet(src: string) {
  const base = src.replace(/-1280\.webp$/, "");
  return `${base}-640.webp 640w, ${base}-1280.webp 1280w`;
}

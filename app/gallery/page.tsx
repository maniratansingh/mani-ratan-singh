import type { Metadata } from "next";
import { GallerySection } from "@/components/gallery/GallerySection";
import { galleryPhotos } from "@/config/gallery";
import { siteConfig } from "@/config/site";

const description =
  "A growing public photographic gallery by Mani Ratan Singh — long exposures, architecture, night skies, and quiet observations after dark.";

export const metadata: Metadata = {
  title: "Gallery",
  description,
  alternates: { canonical: "/gallery" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/gallery",
    title: "Gallery | Mani Ratan Singh",
    description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Mani Ratan Singh — photographic gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | Mani Ratan Singh",
    description,
    creator: "@maniratansingh",
    images: ["/og.jpg"],
  },
};

export default function GalleryPage() {
  const galleryJsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Gallery — Mani Ratan Singh",
    description,
    url: `${siteConfig.url}/gallery`,
    image: galleryPhotos.map((photo) => `${siteConfig.url}${photo.src}`),
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryJsonLd) }}
      />
      <GallerySection />
    </>
  );
}

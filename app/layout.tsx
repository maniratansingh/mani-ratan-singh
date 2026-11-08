import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { projects } from "@/config/projects";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Navbar } from "@/components/navigation/Navbar";
import { AmbientAtmosphere } from "@/components/glass/AmbientAtmosphere";

export const viewport: Viewport = {
  themeColor: "#0b0b0e",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Mani Ratan Singh",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Mani Ratan Singh",
    "MRPS",
    "Creative Technologist",
    "Liquid Glass",
    "Design Engineering",
    "Three.js",
    "WebGL",
    "Next.js",
    "Luxury Editorial",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Mani Ratan Singh — Systems Builder, Creative Technologist & Photographer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@maniratansingh",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: siteConfig.name,
        alternateName: ["Mani Ratan Singh", "MRPS", "maniratanpratapsingh"],
        url: siteConfig.url,
        image: `${siteConfig.url}/author-640.webp`,
        email: "email@mrps.in",
        jobTitle: "Systems Builder, Creative Technologist & Photographer",
        description: siteConfig.description,
        address: {
          "@type": "PostalAddress",
          addressRegion: "Purvanchal",
          addressCountry: "IN",
        },
        sameAs: [
          siteConfig.links.techLab,
          siteConfig.links.instagram,
          siteConfig.links.github,
        ],
        knowsAbout: [
          "Liquid Glass Design Engineering",
          "Apple Silicon AI Clusters & Distributed Computing",
          "RP2040 & ESP32 Microcontrollers",
          "Regional Public Healthcare Digital Infrastructure",
          "Jellyfin Media Server Architecture",
          "WebGL & Procedural Shaders",
          "C++ and Embedded Systems",
          "Nocturnal Long-Exposure Photography",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.title,
        description: siteConfig.description,
        publisher: { "@id": `${siteConfig.url}/#person` },
      },
      {
        "@type": "ItemList",
        "@id": `${siteConfig.url}/#projects`,
        name: "Selected Works & Systems by Mani Ratan Singh",
        itemListElement: projects.map((p, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": "SoftwareSourceCode",
            name: p.title,
            description: p.description,
            programmingLanguage: p.technologies,
            codeRepository: p.github,
            url: p.link || siteConfig.url,
          },
        })),
      },
    ],
  };

  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen selection:bg-[var(--accent-champagne)] selection:text-black relative overflow-x-hidden">
        <ThemeProvider>
          <AmbientAtmosphere />
          <Navbar />
          <main className="relative z-10 flex flex-col">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

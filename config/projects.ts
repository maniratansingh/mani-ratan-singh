/**
 * =========================================================================
 * MANI RATAN SINGH — PROJECTS & ARCHITECTURE DIRECTORY
 * =========================================================================
 * 
 * HOW TO ADD A NEW PROJECT:
 * 1. Duplicate the template below and paste it into the `projects` array.
 * 2. Fill in the fields:
 *    - `id`: Unique kebab-case slug (e.g., "my-new-app")
 *    - `title`: Main title of the project
 *    - `subtitle`: One-line italicized subtitle/summary
 *    - `category`: "Web & Design" | "Embedded Systems" | "Applied AI" | "Open Source" | "Community & Health"
 *    - `year`: Year of creation (e.g., "2026")
 *    - `description`: Detailed paragraph about the project
 *    - `highlights`: 2-4 key features or technical accomplishments
 *    - `technologies`: Array of tech stack tags (e.g., ["C++", "Next.js", "RP2040"])
 *    - `featured`: Set to `true` to spotlight at the top of Selected Works
 *    - `status`: "Live" | "Active" | "Archived"
 *    - `link`: Optional external or live URL
 *    - `github`: Optional GitHub repository URL
 * 3. Save this file — it instantly appears across the entire site!
 */

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Web & Design" | "Embedded Systems" | "Applied AI" | "Open Source" | "Community & Health";
  year: string;
  description: string;
  highlights: string[];
  technologies: string[];
  link?: string;
  github?: string;
  featured: boolean;
  status: "Live" | "Active" | "Archived";
}

export const projects: ProjectItem[] = [
  {
    id: "jellyfin-liquid-glass",
    title: "Jellyfin Liquid Glass",
    subtitle: "Apple-inspired optical UI theme for Jellyfin Media Server",
    category: "Web & Design",
    year: "2025",
    description:
      "A ground-up custom UI theme for the Jellyfin web client inspired by Apple's Liquid Glass design language. Replaces rigid layout bars with multi-tiered frosted glass floating controls, object-like posters with subtle edge illumination, and zero external network fonts.",
    highlights: [
      "Multi-layered glass weights (thick dialogs vs. light floating pills)",
      "Zero external HTTP requests for pure privacy and instantaneous rendering",
      "Full respect for native OS accessibility (reduced motion & contrast)",
    ],
    technologies: ["CSS Architecture", "Glassmorphism", "Jellyfin Web", "Fluid Layouts"],
    github: "https://github.com/maniratansingh/jellyfin-liquid-glass",
    featured: true,
    status: "Live",
  },
  {
    id: "mrps-hub",
    title: "mrps.in — The Technical Lab",
    subtitle: "Personal engineering workbench & digital logbook",
    category: "Web & Design",
    year: "2025",
    description:
      "The primary open engineering hub hosting homelab telemetry, C++ hardware write-ups, benchmarking reports, and open-source releases with ultra-fast edge loading.",
    highlights: [
      "Sub-second response times with zero client-side tracking or script bloat",
      "Home to real-world hardware write-ups and technical guides",
      "Direct bridge connecting raw software systems to hardware prototypes",
    ],
    technologies: ["Edge Infrastructure", "Minimal Web", "IBM Plex", "Static Architecture"],
    link: "https://mrps.in",
    featured: true,
    status: "Live",
  },
  {
    id: "aesthetic-music-player",
    title: "MRPS Music — Web Vinyl Player",
    subtitle: "Glassmorphic Web Audio player with procedural WebGL shaders",
    category: "Web & Design",
    year: "2026",
    description:
      "A sensory web audio experience featuring an interactive vinyl turntable simulation, procedural WebGL background shaders, and realistic needle-drop physics.",
    highlights: [
      "Real-time procedural ambient shaders reacting to audio frequency",
      "Interactive vinyl rotation and physics-driven tactile playback",
      "Frosted glass floating playback HUD",
    ],
    technologies: ["WebGL 2.0", "Web Audio API", "Three.js", "GLSL Shaders"],
    link: "https://mrps.in/projects/aesthetic-music-player/",
    github: "https://github.com/maniratansingh/aesthetic-music-player",
    featured: true,
    status: "Live",
  },
  {
    id: "purvanchal-hospitals",
    title: "Purvanchal Eye Hospitals Web System",
    subtitle: "Public healthcare digital infrastructure for regional medical centers",
    category: "Community & Health",
    year: "2026",
    description:
      "Designed and deployed fast, accessible websites for real hospitals in Eastern Uttar Pradesh, including Ayodhya Phaco Center, Sunbeam Eye Hospital, and Sant Kabir Eye Hospital.",
    highlights: [
      "Sub-second load times on rural 3G/4G cellular connections",
      "Zero unnecessary frameworks; pure semantic HTML and accessible CSS",
      "Provides vital patient appointment and ophthalmology service directions",
    ],
    technologies: ["Semantic HTML", "Accessible CSS", "Mobile-First", "Public Health"],
    link: "https://mrps.in/blog/2026-07-18-building-websites-for-purvanchal-eye-hospitals/",
    featured: true,
    status: "Live",
  },
  {
    id: "gpsclock",
    title: "High-Precision GPS Clock",
    subtitle: "Satellite-synchronized hardware timekeeper with OLED telemetry",
    category: "Embedded Systems",
    year: "2026",
    description:
      "An autonomous, satellite-synchronized hardware timekeeper powered by a u-blox Neo-6M GPS receiver, MAX7219 matrix display, and SSD1306 OLED telemetry interface.",
    highlights: [
      "Sub-millisecond UTC time accuracy synchronized via satellite constellation",
      "Real-time satellite fix status, latitude/longitude, and altitude telemetry",
      "Custom firmware with non-blocking microcontroller loop architecture",
    ],
    technologies: ["C++", "Neo-6M GPS", "MAX7219", "SSD1306 OLED"],
    link: "https://mrps.in/projects/gpsclock/",
    featured: false,
    status: "Active",
  },
  {
    id: "image-compressor-mrps",
    title: "Offline Image Compressor for Android",
    subtitle: "Privacy-first mobile image optimization tool written in Kotlin",
    category: "Open Source",
    year: "2026",
    description:
      "A clean, offline Android utility designed to compress high-resolution photos directly on-device without cloud uploads or background trackers.",
    highlights: [
      "100% offline operation with zero telemetry or network permissions",
      "Granular control over dimensions, quality, and compression algorithms",
      "Built natively in Kotlin with Android Jetpack",
    ],
    technologies: ["Kotlin", "Android SDK", "Jetpack", "Image Processing"],
    link: "https://mrps.in/projects/image-compressor-mrps/",
    featured: false,
    status: "Live",
  },
  {
    id: "rp2040-oled-macropad",
    title: "RP2040 OLED Macropad",
    subtitle: "Custom hardware controller with embedded real-time telemetry",
    category: "Embedded Systems",
    year: "2024",
    description:
      "A bespoke physical input macropad powered by the Raspberry Pi RP2040 microcontroller with hot-swappable mechanical switches, rotary encoder, and monochrome OLED screen.",
    highlights: [
      "Custom firmware with sub-millisecond key debouncing",
      "Dynamic display showing active media states and system metrics",
      "Custom CNC/weighted brass enclosure",
    ],
    technologies: ["RP2040", "C++", "CircuitPython", "Embedded I2C"],
    link: "https://mrps.in/projects/rp2040-oled-macropad/",
    github: "https://github.com/maniratansingh/rp2040-oled-macropad",
    featured: false,
    status: "Active",
  },
];

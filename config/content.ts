export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Web & Design" | "Embedded Systems" | "Applied AI" | "Open Source";
  year: string;
  description: string;
  highlights: string[];
  technologies: string[];
  link?: string;
  github?: string;
  featured: boolean;
  status: "Live" | "Active" | "Archived";
}

export interface InterestItem {
  title: string;
  realm: string;
  description: string;
  tag: string;
}

export const siteContent = {
  hero: {
    name: "Mani Ratan Singh",
    monogram: "MRS.",
    headline: "A little world of my own.",
    supportingText:
      "Exploring technology, creativity and everything that makes the digital world interesting.",
    cta: {
      primary: "Explore My World",
      primaryHref: "/explore",
      secondary: "Selected Work",
      secondaryHref: "/work",
    },
    metaLabel: "Crafted with Optical Depth & Restrained Motion",
  },

  about: {
    title: "About",
    subtitle: "Behind the craft",
    quote: "The best digital artifacts don't just solve problems—they evoke a sense of quiet wonder.",
    storyParagraphs: [
      "I am Mani Ratan Singh—a technologist, designer, and maker obsessed with the tactile nature of digital interfaces. I bridge the intersection where software architecture meets nuanced editorial aesthetics.",
      "Rather than treating engineering and design as separate disciplines, I view them as two sides of the same coin. Whether writing GLSL refraction shaders, designing custom tactile hardware controllers with embedded microcontrollers, or tuning responsive spring physics in CSS and TypeScript, my focus is always on sensory fidelity.",
      "This space is not a resume or corporate portfolio. It is an intentional sanctuary where creative experiments, mechanical curiosities, and personal philosophy converge.",
    ],
    principles: [
      {
        number: "01",
        title: "Tactile Digital Materiality",
        description:
          "Software shouldn't feel flat. Light, refraction, subtle mass, and friction create human connection.",
      },
      {
        number: "02",
        title: "Restraint Over Noise",
        description:
          "True luxury is found in whitespace, typographic rhythm, and motion that whispers rather than screams.",
      },
      {
        number: "03",
        title: "Hardware-Software Harmony",
        description:
          "From embedded RP2040 micro-controllers to modern browser WebGL engines, the finest systems honor both physical and virtual substrates.",
      },
    ],
    stats: [
      { label: "Focus", value: "Creative Engineering" },
      { label: "Design Language", value: "Liquid Glass" },
      { label: "Signature Hub", value: "mrps.in" },
      { label: "Location", value: "India" },
    ],
  },

  world: {
    title: "My World",
    subtitle: "Curiosities, Experiments & Explorations",
    intro:
      "A glimpse into the subjects, tools, and ideas that capture my imagination—spanning optical rendering, tactile electronics, sound design, and code.",
    realms: [
      {
        title: "Optical Physics & Shaders",
        realm: "Graphics",
        description:
          "Simulating realistic glass refraction, chromatic aberration, Fresnel transmission, and ambient occlusion in real-time WebGL engines.",
        tag: "Three.js / GLSL",
      },
      {
        title: "Custom Embedded Hardware",
        realm: "Electronics",
        description:
          "Prototyping RP2040-driven macropads, ESP32 IoT connected desk displays, rotary encoders, and bespoke tactile input devices.",
        tag: "C++ / MicroPython",
      },
      {
        title: "Glassmorphic Audio Interfaces",
        realm: "Interaction",
        description:
          "Designing interactive virtual vinyl turntables and ambient procedural shader sound visualizers that bridge audio engineering with visual art.",
        tag: "Web Audio / Canvas",
      },
      {
        title: "Statute-First Legal Intelligence",
        realm: "Systems",
        description:
          "Architecting deterministic, privacy-first local LLM pipelines optimized for legal reasoning and rigorous statutory interpretation.",
        tag: "Python / Ollama",
      },
    ],
    curiosities: [
      "Mechanical key switches & custom plate acoustics",
      "Dieter Rams' 10 Principles applied to modern web interfaces",
      "Apple Silicon unified memory architecture & GPU compute",
      "Mid-century modern typography and Swiss grid systems",
      "Ambient procedural audio and generative soundscapes",
      "High-refresh OLED micro-displays and low-latency SPI buses",
    ],
  },

  projects: [
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
      title: "mrps.in",
      subtitle: "Personal digital architecture & identity hub",
      category: "Web & Design",
      year: "2025",
      description:
        "The primary engineering and portfolio presence connecting software systems, hardware builds, and design explorations under a unified personal domain.",
      highlights: [
        "Lightweight, edge-rendered architecture with sub-second response times",
        "Semantic typography and bespoke layout aesthetics",
        "Direct link to live projects and digital prototypes",
      ],
      technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Edge CDN"],
      link: "https://mrps.in",
      featured: true,
      status: "Live",
    },
    {
      id: "aesthetic-music-player",
      title: "Aesthetic Vinyl Player",
      subtitle: "Glassmorphic Web Audio player with WebGL ambient shaders",
      category: "Web & Design",
      year: "2024",
      description:
        "A sensory web audio experience featuring an interactive vinyl turntable simulation, procedural WebGL 2.0 background shaders, and realistic tactile needle-drop physics.",
      highlights: [
        "Real-time procedural ambient shaders reacting to audio frequency",
        "Interactive vinyl rotation and physics-driven playback",
        "Frosted glass floating playback HUD",
      ],
      technologies: ["WebGL 2.0", "Web Audio API", "Three.js", "GLSL Shaders"],
      github: "https://github.com/maniratansingh/aesthetic-music-player",
      featured: true,
      status: "Live",
    },
    {
      id: "rp2040-oled-macropad",
      title: "RP2040 OLED Macropad",
      subtitle: "Custom hardware controller with embedded real-time telemetry",
      category: "Embedded Systems",
      year: "2024",
      description:
        "A bespoke physical input macropad powered by the Raspberry Pi RP2040 microcontroller. Features hot-swappable mechanical switches, rotary encoder navigation, and an integrated monochrome OLED screen.",
      highlights: [
        "Custom firmware with sub-millisecond key debouncing",
        "Real-time dynamic display showing active media states and system metrics",
        "Custom CNC/3D printed enclosure with weighted brass plate",
      ],
      technologies: ["RP2040", "C++", "CircuitPython", "Embedded I2C"],
      github: "https://github.com/maniratansingh/rp2040-oled-macropad",
      featured: false,
      status: "Active",
    },
    {
      id: "wificlock",
      title: "WiFi Clock & Smart Dashboard",
      subtitle: "Connected desk timekeeper with responsive web controller",
      category: "Embedded Systems",
      year: "2024",
      description:
        "An ESP32-powered ambient IoT desk clock paired with a sleek mobile-responsive web dashboard for remote message queueing, orientation toggles, and NTP synchronization.",
      highlights: [
        "Sub-millisecond NTP synchronization with low-power sleep modes",
        "Smooth font rendering and smart scrolling ticker engine",
        "Local web server with WebSocket bidirectional telemetry",
      ],
      technologies: ["ESP32", "C++", "WebSockets", "IoT"],
      github: "https://github.com/maniratansingh/wificlock",
      featured: false,
      status: "Active",
    },
    {
      id: "law-exam-batch-processor",
      title: "Legal AI Batch Processor",
      subtitle: "Statute-first automated legal reasoning engine",
      category: "Applied AI",
      year: "2024",
      description:
        "A rigorous Flask and local LLM application engineered for legal professionals to generate strict, marks-oriented exam answers and citations with statute-first accuracy and PDF compilation.",
      highlights: [
        "Deterministic statutory citation retrieval and validation",
        "Runs fully offline on local LLM runtimes (Ollama/Gemma)",
        "Automated production-grade PDF compilation",
      ],
      technologies: ["Python", "Flask", "Ollama", "ReportLab PDF"],
      github: "https://github.com/maniratansingh/law-exam-batch-processor",
      featured: false,
      status: "Active",
    },
  ] as ProjectItem[],

  connect: {
    title: "Connect",
    subtitle: "Initiate a Conversation",
    description:
      "Whether you are interested in collaborating on interactive digital experiences, discussing hardware craftsmanship, or simply sharing ideas—my inbox is always open.",
    email: "contact@mrps.in",
    socials: [
      { name: "GitHub", handle: "@maniratansingh", url: "https://github.com/maniratansingh" },
      { name: "Hub", handle: "mrps.in", url: "https://mrps.in" },
      { name: "X (Twitter)", handle: "@maniratansingh", url: "https://x.com/maniratansingh" },
      { name: "LinkedIn", handle: "Mani Ratan Singh", url: "https://linkedin.com/in/maniratansingh" },
    ],
    closingNote: "Designed and built with optical depth, restrained motion, and personal luxury in mind.",
  },
};

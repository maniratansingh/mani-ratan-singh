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

export interface TechnicalEssay {
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
  url: string;
}

export const siteContent = {
  hero: {
    name: "Mani Ratan Singh",
    fullName: "Mani Ratan Pratap Singh",
    monogram: "MRPS",
    motto: "My Simplicity Is My Identity.",
    supportingText:
      "Tech generalist, photographer, and homelab builder based in India. Exploring the intersection where sensory digital interfaces meet physical hardware craftsmanship.",
    cta: {
      primary: "Selected Works",
      primaryHref: "/work",
      secondary: "Visit mrps.in (Technical Lab)",
      secondaryHref: "https://mrps.in",
    },
  },

  about: {
    title: "About & Ethos",
    subtitle: "Behind the Craft",
    quote: "My Simplicity Is My Identity.",
    storyParagraphs: [
      "I am Mani Ratan Pratap Singh—a tech generalist, photographer, and builder based in India. While my technical hub at mrps.in serves as an open workshop for homelab configurations, C++ firmware, and cluster benchmarks, this digital space captures the human philosophy, creative aesthetics, and ideas behind my work.",
      "My craft spans the virtual and physical: capturing nocturnal light trails and geometric contrast through long-exposure photography, prototyping RP2040 micro-controllers, engineering WebGL refraction shaders, and building lightning-fast digital infrastructure for regional eye hospitals in Purvanchal.",
      "I believe true digital luxury is not excess or noise. It is clarity of purpose, tactile materiality, and systems built to operate with quiet reliability.",
    ],
    principles: [
      {
        number: "01",
        title: "Tactile Materiality",
        description:
          "Software should not feel like an abstract flat plane. Light, refraction, subtle mass, and mechanical feedback bridge the gap between human and machine.",
      },
      {
        number: "02",
        title: "Purposeful Simplicity",
        description:
          "Simplicity is not the absence of clutter; it is the presence of intentionality. Technology should quietly solve real problems without demanding performative attention.",
      },
      {
        number: "03",
        title: "Community & Physical Substrates",
        description:
          "From regional hospital platforms in Purvanchal to embedded desk instruments, the most meaningful digital solutions anchor themselves firmly into real communities and physical hardware.",
      },
    ],
    stats: [
      { label: "Identity", value: "Mani Ratan Pratap Singh" },
      { label: "Core Philosophy", value: "Simplicity Is Identity" },
      { label: "Technical Engine", value: "mrps.in (Homelab & Code)" },
      { label: "Passions", value: "Hardware · Shaders · Photography" },
      { label: "Geographic Base", value: "India" },
    ],
  },

  photography: {
    title: "Visual Storytelling",
    subtitle: "Night Photography & Urban Geometry",
    statement:
      "I capture stories through night photography, long exposures, light trails, and geometry in everyday places.",
    instagramHandle: "@maniratanpratapsingh",
    instagramUrl: "https://www.instagram.com/maniratanpratapsingh/",
    themes: [
      "Nocturnal Long Exposures",
      "Architectural Light Trails",
      "Minimalist Urban Geometry",
      "Atmospheric Shadow & Reflection",
    ],
  },

  essays: [
    {
      title: "Benchmarking a 37.7 Gbps Thunderbolt 4 Link for Mac AI Clustering",
      slug: "thunderbolt-4-mac-ai-cluster-benchmarks",
      date: "July 2026",
      category: "Hardware & Distributed AI",
      excerpt:
        "Real-world setup, iperf3 throughput measurements, and lessons learned while clustering Apple Silicon unified memory for local LLM inference using Exo.",
      url: "https://mrps.in/blog/2026-07-22-thunderbolt-4-mac-ai-cluster-benchmarks/",
    },
    {
      title: "Building Fast, Simple Websites for Real Hospitals in Purvanchal",
      slug: "building-websites-for-purvanchal-eye-hospitals",
      date: "July 2026",
      category: "Healthcare & Public Impact",
      excerpt:
        "Why rural and regional medical centers need sub-second loading speeds, zero telemetry overhead, and human-first accessibility over heavy modern web frameworks.",
      url: "https://mrps.in/blog/2026-07-18-building-websites-for-purvanchal-eye-hospitals/",
    },
    {
      title: "Building a High-Precision GPS Clock: Neo-6M, MAX7219, and SSD1306 OLED",
      slug: "building-high-precision-gps-clock",
      date: "July 2026",
      category: "Embedded C++",
      excerpt:
        "Creating an autonomous, satellite-synchronized timekeeper with dual telemetry displays, sub-millisecond precision, and custom hardware enclosure.",
      url: "https://mrps.in/blog/2026-07-20-building-high-precision-gps-clock/",
    },
    {
      title: "Why I Built an Offline Image Compressor for Android in Kotlin",
      slug: "why-i-built-an-offline-image-compressor",
      date: "September 2026",
      category: "Android & Systems",
      excerpt:
        "Engineering an entirely local, zero-permission, client-side image compression tool for mobile workflows without cloud surveillance.",
      url: "https://mrps.in/blog/2026-09-30-why-i-built-an-offline-image-compressor/",
    },
    {
      title: "AI Doesn't Need Better Scrapers. It Needs Better Websites.",
      slug: "ai-needs-better-websites",
      date: "July 2026",
      category: "Web Architecture",
      excerpt:
        "An architectural critique of the bloated modern web and how semantic HTML, clean data schemas, and edge caching create superior environments for humans and AI agents alike.",
      url: "https://mrps.in/blog/2026-07-17-ai-needs-better-websites/",
    },
  ] as TechnicalEssay[],

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
          "Simulating realistic glass refraction, chromatic dispersion, Fresnel transmission, and ambient occlusion in real-time WebGL engines.",
        tag: "Three.js / GLSL",
      },
      {
        title: "Custom Embedded Hardware",
        realm: "Electronics",
        description:
          "Prototyping RP2040-driven macropads, ESP32 IoT desk displays, rotary encoder instruments, and satellite-synchronized GPS clocks.",
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
        title: "Mac AI Clusters & Homelab",
        realm: "Distributed Systems",
        description:
          "Benchmarking 37+ Gbps Thunderbolt 4 topologies, local LLM inference engines (Exo/Ollama), and private edge servers.",
        tag: "Hardware / Networks",
      },
    ],
    curiosities: [
      "Night long-exposure light trails & urban geometric contrasts",
      "Dieter Rams' 10 Principles applied to modern tactile interfaces",
      "Apple Silicon unified memory bandwidth & GPU compute clusters",
      "Sub-millisecond hardware debouncing on RP2040 mechanical switches",
      "High-refresh OLED telemetry over low-latency SPI/I2C buses",
      "Autonomous GPS satellite time synchronization and drift elimination",
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
  ] as ProjectItem[],

  connect: {
    title: "Connect",
    subtitle: "Initiate Dialogue",
    description:
      "Whether you are interested in collaborating on interactive digital experiences, discussing hardware and homelabs, or simply talking photography—my inbox is always open.",
    email: "email@mrps.in",
    socials: [
      { name: "Instagram", handle: "@maniratanpratapsingh", url: "https://www.instagram.com/maniratanpratapsingh/" },
      { name: "Technical Lab", handle: "mrps.in", url: "https://mrps.in" },
      { name: "GitHub", handle: "@maniratansingh", url: "https://github.com/maniratansingh" },
      { name: "Photography Archive", handle: "mrps.in/photos", url: "https://mrps.in/photos/" },
    ],
    closingNote: "Mani Ratan Pratap Singh — My Simplicity Is My Identity.",
  },
};

import { projects, ProjectItem } from "./projects";
export { projects, type ProjectItem };

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

  projects,

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

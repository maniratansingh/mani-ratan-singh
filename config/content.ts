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
      "Learner, builder, and photographer based in India. Tinkering with embedded hardware, experimenting with clean code, and exploring quiet perspectives after dark.",
    cta: {
      primary: "Selected Works",
      primaryHref: "/#work",
      secondary: "Visit mrps.in (Technical Lab)",
      secondaryHref: "https://mrps.in",
    },
  },

  about: {
    title: "About Me",
    subtitle: "A Perpetual Learner",
    quote: "My Simplicity Is My Identity.",
    storyParagraphs: [
      "I’m Mani Ratan Pratap Singh—a student, tinkerer, and lifelong learner based in Ayodhya, Uttar Pradesh, India. I don’t believe in inflated titles or complex buzzwords. At heart, I’m simply someone who loves understanding how things work from the ground up, whether that’s low-level microcontroller code, homelab networking, or the behavior of light through a camera lens.",
      "Most of my days are spent exploring and learning in public. Sometimes that means writing C++ firmware for an RP2040 board, testing local tools on my computer, or walking with a tripod at blue hour to capture long exposures. Other times, it means helping build fast, simple websites for local eye hospitals in Purvanchal so patients can find care without dealing with slow, bloated web pages.",
      "To me, the best technology is quiet, honest, and respectful of people’s time. Everything you see here is a small window into my learning notes, hands-on experiments, and things built with genuine curiosity.",
    ],
    learningFocus: [
      "Embedded C++ & RP2040 Microcontrollers",
      "Nocturnal Long-Exposure Photography",
      "Private Homelabs & Local Tools",
      "Sub-second, Lightweight Healthcare Platforms",
      "First-Principles Systems Engineering",
    ],
    principles: [
      {
        number: "01",
        title: "Hands-on Learning",
        description:
          "The best way to understand a system is to build it yourself, make mistakes, and learn from first principles.",
      },
      {
        number: "02",
        title: "Quiet Simplicity",
        description:
          "Simplicity is respect for the user. Tools should work reliably without demanding performative attention or adding unnecessary weight.",
      },
      {
        number: "03",
        title: "Real-World Grounding",
        description:
          "Technology is most meaningful when it solves real everyday needs, from local community hospitals to humble hardware on your desk.",
      },
    ],
    stats: [
      { label: "Name", value: "Mani Ratan Pratap Singh" },
      { label: "Motto", value: "My Simplicity Is My Identity" },
      { label: "Workbench", value: "mrps.in (Open Experiments)" },
      { label: "Interests", value: "Hardware · Code · Photography" },
      { label: "Location", value: "Ayodhya, Uttar Pradesh, India" },
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

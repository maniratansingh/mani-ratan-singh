export const siteConfig = {
  name: "Mani Ratan Singh",
  title: "Mani Ratan Singh — Personal Luxury Digital Experience",
  description:
    "A personal digital experience inspired by Apple Liquid Glass, luxury editorial design and immersive 3D artwork.",
  url: "https://maniratansingh.com",
  ogImage: "https://maniratansingh.com/og.jpg",
  author: "Mani Ratan Singh",
  initials: "MRS.",
  location: "India",
  links: {
    github: "https://github.com/maniratansingh",
    portfolio: "https://mrps.in",
    x: "https://x.com/maniratansingh",
    linkedin: "https://linkedin.com/in/maniratansingh",
    email: "mailto:contact@mrps.in",
  },
  navItems: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "My World", href: "/explore" },
    { label: "Selected Work", href: "/work" },
    { label: "Connect", href: "/connect" },
  ],
};

export type SiteConfig = typeof siteConfig;

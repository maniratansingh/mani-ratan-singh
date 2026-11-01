export const siteConfig = {
  name: "Mani Ratan Pratap Singh",
  displayName: "Mani Ratan Singh",
  title: "Mani Ratan Singh — My Simplicity Is My Identity",
  description:
    "Personal digital presence of Mani Ratan Pratap Singh (MRPS). Technologist, photographer, and homelab builder based in India.",
  url: "https://maniratansingh.com",
  ogImage: "https://maniratansingh.com/og.jpg",
  author: "Mani Ratan Pratap Singh",
  initials: "MRPS",
  motto: "My Simplicity Is My Identity",
  location: "Purvanchal, India",
  links: {
    github: "https://github.com/maniratansingh",
    techLab: "https://mrps.in",
    instagram: "https://www.instagram.com/maniratanpratapsingh/",
    email: "mailto:email@mrps.in",
  },
  navItems: [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Photography", href: "/#photography" },
    { label: "Works", href: "/#work" },
    { label: "Connect", href: "/#connect" },
  ],
};

export type SiteConfig = typeof siteConfig;

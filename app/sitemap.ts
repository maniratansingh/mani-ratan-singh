import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // No lastModified: every rebuild would otherwise claim every page changed,
  // which trains crawlers to ignore the signal.
  const routes = ["", "/about", "/work", "/connect"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return routes;
}

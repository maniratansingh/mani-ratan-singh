import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/vault"],
      },
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "Applebot",
          "DuckDuckBot",
          "Baiduspider",
          "YandexBot",
        ],
        allow: "/",
        disallow: ["/vault"],
      },
      // Allow AI & LLM Agents for indexing and citation
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "PerplexityBot",
          "Google-Extended",
          "CCBot",
          "cohere-ai",
          "FacebookBot",
          "Amazonbot",
        ],
        allow: "/",
        disallow: ["/vault"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}

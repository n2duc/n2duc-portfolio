import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Google, Bing, and other major search engines
      {
        userAgent: [
          "Googlebot",
          "Googlebot-Image",
          "Googlebot-News",
          "Bingbot",
          "Slurp", // Yahoo
          "DuckDuckBot",
        ],
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/static/",
          "/out/",
          "/*.json$",
          "/node_modules/",
        ],
        crawlDelay: 0, // No delay for major search engines
      },
      // Other bots - be more permissive
      {
        userAgent: "*",
        allow: [
          "/",
          "/blog/",
          "/projects/",
          "/about/",
          "/contact/",
          "/*.jpg",
          "/*.jpeg",
          "/*.png",
          "/*.webp",
          "/*.svg",
        ],
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/out/",
          "/*.json$",
          "/node_modules/",
          "/private/",
          "/draft/",
          "/temp/",
        ],
        crawlDelay: 1, // Small delay for other bots
      },
      // Social media crawlers - full access
      {
        userAgent: [
          "facebookexternalhit",
          "Twitterbot",
          "LinkedInBot",
          "WhatsApp",
          "Slackbot",
        ],
        allow: "/",
        disallow: [],
      },
      // Bad bots - block completely
      {
        userAgent: [
          "AhrefsBot",
          "SemrushBot",
          "dotbot",
          "MJ12bot",
          "rogerbot",
          "BLEXBot",
          "PetalBot",
        ],
        disallow: ["/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}


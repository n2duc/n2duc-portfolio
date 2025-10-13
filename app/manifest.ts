import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "N2Duc",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0B0D10",
    theme_color: "#22D3EE",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}


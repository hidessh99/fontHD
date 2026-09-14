import type { MetadataRoute } from "next";
import { env } from "@/lib/config/env";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = env.NEXT_PUBLIC_APP_URL || "https://hidessh.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/articles",
          "/articles/*",
          "/icon.svg",
          "/manifest.webmanifest",
        ],
        disallow: [
          "/admin/*",
          "/seller/*",
          "/dashboard/*",
          "/vpn/*",
          "/billing/*",
          "/ai/*",
          "/dns/*",
          "/kubernetes/*",
          "/monitor/*",
          "/notifications/*",
          "/support/*",
          "/api/*",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

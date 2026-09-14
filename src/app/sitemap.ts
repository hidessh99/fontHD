import type { MetadataRoute } from "next";
import { env } from "@/lib/config/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = env.NEXT_PUBLIC_APP_URL || "https://hidessh.com";
  const currentDate = new Date();

  const staticArticleSlugs = [
    "panduan-lengkap-bypass-dpi-v2ray-trojan",
    "optimalisasi-latency-rendah-gaming-asia-pasifik",
  ];

  const articleEntries: MetadataRoute.Sitemap = staticArticleSlugs.map(
    (slug) => ({
      url: `${baseUrl}/articles/${slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    }),
  );

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/`,
          id: `${baseUrl}/`,
        },
      },
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...articleEntries,
  ];
}

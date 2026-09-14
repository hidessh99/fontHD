// ==============================================================================
// GoVPN Thin App Router: Public Articles & Knowledge Base
// Algoritma 4: Dynamic Island Route Splitting with CLS = 0 Suspense Boundary
// ==============================================================================

import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ContentSkeleton } from "@/modules/content/components/shared/ContentSkeleton";

export const metadata: Metadata = {
  title:
    "VPN Guides, Tutorials & Protocol Documentation | GoVPN Knowledge Base",
  description:
    "In-depth technical guides, ISP censorship bypass tutorials, V2Ray VMess/VLess setup walk-throughs, WireGuard configuration, and security architecture best practices.",
  keywords: [
    "VPN Setup Tutorials",
    "V2Ray VMess Guide",
    "VLess Reality Configuration",
    "Trojan-Go Tutorial",
    "Bypass DPI Techniques",
    "OpenClash Configuration",
    "Shadowsocks 2022 Setup",
    "WireGuard Routing Optimization",
  ],
  alternates: {
    canonical: "/articles",
  },
  openGraph: {
    title: "VPN Guides, Tutorials & Protocol Documentation | GoVPN",
    description:
      "Comprehensive technical tutorials on network tunneling, DPI evasion, and protocol optimization from GoVPN core engineers.",
    url: "/articles",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VPN Tutorials & Setup Documentation | GoVPN Knowledge Base",
    description:
      "Learn how to bypass DPI and configure high-speed V2Ray, VLess, and WireGuard tunnels with our step-by-step documentation.",
  },
};

import { env } from "@/lib/config/env";

const siteUrl = env.NEXT_PUBLIC_APP_URL || "https://hidessh.com";

const articlesSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${siteUrl}/articles/#webpage`,
      url: `${siteUrl}/articles`,
      name: "VPN Guides, Tutorials & Protocol Documentation | GoVPN",
      description:
        "Technical guides on VMess, VLess Reality, Trojan, WireGuard, anti-DPI routing, and low-latency gaming tunnels.",
      publisher: {
        "@type": "Organization",
        name: "GoVPN Enterprise",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/articles/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${siteUrl}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Articles & Knowledge Base",
          item: `${siteUrl}/articles`,
        },
      ],
    },
  ],
};

const DynamicArticlesView = dynamic(
  () => import("@/modules/content").then((mod) => mod.ArticlesView),
  {
    loading: () => <ContentSkeleton />,
  },
);

export default function ArticlesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articlesSchema) }}
      />
      <Suspense fallback={<ContentSkeleton />}>
        <DynamicArticlesView />
      </Suspense>
    </>
  );
}

// ==============================================================================
// GoVPN Thin App Router: Public Article Detail
// Algoritma 4: Dynamic Island Route Splitting with CLS = 0 Suspense Boundary
// ==============================================================================

import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ContentSkeleton } from "@/modules/content/components/shared/ContentSkeleton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const DynamicArticleDetailView = dynamic(
  () => import("@/modules/content").then((mod) => mod.ArticleDetailView),
  {
    loading: () => <ContentSkeleton />,
  },
);

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const formattedTitle = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${formattedTitle} — Technical Guide & Documentation | GoVPN`,
    description: `Complete technical walkthrough and configuration guide for ${formattedTitle}. Learn setup steps, performance optimizations, and anti-DPI security best practices.`,
    alternates: {
      canonical: `/articles/${slug}`,
    },
    openGraph: {
      title: `${formattedTitle} | GoVPN Knowledge Base`,
      description: `Step-by-step tutorial on ${formattedTitle} on GoVPN high-speed tunneling cloud infrastructure.`,
      url: `/articles/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${formattedTitle} | GoVPN Guides`,
      description: `Read the full documentation for ${formattedTitle} on GoVPN Knowledge Base.`,
    },
  };
}

import { env } from "@/lib/config/env";

const siteUrl = env.NEXT_PUBLIC_APP_URL || "https://hidessh.com";

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const formattedTitle = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${siteUrl}/articles/${slug}#article`,
        isPartOf: {
          "@type": "WebPage",
          "@id": `${siteUrl}/articles/${slug}`,
          url: `${siteUrl}/articles/${slug}`,
          name: formattedTitle,
        },
        headline: `${formattedTitle} — Technical Guide & Documentation`,
        description: `Complete technical walkthrough and configuration guide for ${formattedTitle}. Learn setup steps, performance optimizations, and anti-DPI security best practices.`,
        mainEntityOfPage: `${siteUrl}/articles/${slug}`,
        author: {
          "@type": "Organization",
          name: "GoVPN Security Research Team",
          url: siteUrl,
        },
        publisher: {
          "@type": "Organization",
          name: "GoVPN Enterprise",
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/icon.svg`,
          },
        },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/articles/${slug}#breadcrumb`,
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
            name: "Articles",
            item: `${siteUrl}/articles`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: formattedTitle,
            item: `${siteUrl}/articles/${slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Suspense fallback={<ContentSkeleton />}>
        <DynamicArticleDetailView slug={slug} />
      </Suspense>
    </>
  );
}

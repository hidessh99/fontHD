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

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <Suspense fallback={<ContentSkeleton />}>
      <DynamicArticleDetailView slug={slug} />
    </Suspense>
  );
}

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
  }
);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const formattedTitle = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${formattedTitle} | GoVPN Institutional Knowledge Base`,
    description: `Baca panduan teknis dan tutorial lengkap mengenai ${formattedTitle}`,
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

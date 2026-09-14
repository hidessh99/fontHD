// ==============================================================================
// GoVPN Thin App Router: Public Articles & Knowledge Base
// Algoritma 4: Dynamic Island Route Splitting with CLS = 0 Suspense Boundary
// ==============================================================================

import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ContentSkeleton } from "@/modules/content/components/shared/ContentSkeleton";

export const metadata: Metadata = {
  title: "Pusat Pengetahuan & Panduan VPN | GoVPN Institutional",
  description:
    "Tutorial teknis tunneling, optimalisasi protokol V2Ray & Trojan, dan panduan keamanan",
};

const DynamicArticlesView = dynamic(
  () => import("@/modules/content").then((mod) => mod.ArticlesView),
  {
    loading: () => <ContentSkeleton />,
  },
);

export default function ArticlesPage() {
  return (
    <Suspense fallback={<ContentSkeleton />}>
      <DynamicArticlesView />
    </Suspense>
  );
}

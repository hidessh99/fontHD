// ==============================================================================
// GoVPN Thin App Router: AI Gateway & LLM Inference Dashboard
// Algoritma 4: Dynamic Island Route Splitting with CLS = 0 Suspense Boundary
// ==============================================================================

import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { AiSkeleton } from "@/modules/ai/components/shared/AiSkeleton";

export const metadata: Metadata = {
  title: "AI Gateway & Models | GoVPN Institutional",
  description:
    "Akses API Keys, katalog model LLM, dan playground inferensi AI Gateway",
};

const DynamicAiDashboardView = dynamic(
  () => import("@/modules/ai").then((mod) => mod.AiDashboardView),
  {
    loading: () => <AiSkeleton />,
  },
);

export default function AiPage() {
  return (
    <Suspense fallback={<AiSkeleton />}>
      <DynamicAiDashboardView />
    </Suspense>
  );
}

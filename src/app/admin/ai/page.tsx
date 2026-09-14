// ==============================================================================
// GoVPN Thin App Router: Superadmin AI Gateway Control Center
// Algoritma 4: Dynamic Island Route Splitting with CLS = 0 Suspense Boundary
// ==============================================================================

import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { AiSkeleton } from "@/modules/ai/components/shared/AiSkeleton";

export const metadata: Metadata = {
  title: "Admin AI Gateway & Models | GoVPN Institutional",
  description: "Manajemen model inferensi LLM, koneksi provider upstream, dan audit dompet pengguna",
};

const DynamicAdminAiView = dynamic(
  () => import("@/modules/ai").then((mod) => mod.AdminAiView),
  {
    loading: () => <AiSkeleton />,
  }
);

export default function AdminAiPage() {
  return (
    <Suspense fallback={<AiSkeleton />}>
      <DynamicAdminAiView />
    </Suspense>
  );
}

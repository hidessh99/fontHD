// ==============================================================================
// GoVPN Thin App Router: User Support & Helpdesk
// Algoritma 4: Dynamic Island Route Splitting with CLS = 0 Suspense Boundary
// ==============================================================================

import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { SupportSkeleton } from "@/modules/support/components/shared/SupportSkeleton";

export const metadata: Metadata = {
  title: "Bantuan & Helpdesk | GoVPN Institutional",
  description: "Dukungan teknis responsif 24/7 untuk pemecahan masalah konektivitas VPN dan billing",
};

const DynamicSupportTicketsView = dynamic(
  () => import("@/modules/support").then((mod) => mod.SupportTicketsView),
  {
    loading: () => <SupportSkeleton />,
  }
);

export default function SupportPage() {
  return (
    <Suspense fallback={<SupportSkeleton />}>
      <DynamicSupportTicketsView />
    </Suspense>
  );
}

// ==============================================================================
// GoVPN Thin App Router: User Subscription & Plans
// Algoritma 4: Dynamic Island Route Splitting with CLS = 0 Suspense Boundary
// ==============================================================================

import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { SubscriptionSkeleton } from "@/modules/subscription/components/shared/SubscriptionSkeleton";

export const metadata: Metadata = {
  title: "Paket & Langganan VPN | GoVPN Institutional",
  description: "Pilih paket VPN tunneling berkecepatan tinggi dengan jaminan zero-logs dan aktivasi instan",
};

const DynamicSubscriptionPlansView = dynamic(
  () => import("@/modules/subscription").then((mod) => mod.SubscriptionPlansView),
  {
    loading: () => <SubscriptionSkeleton />,
  }
);

export default function SubscriptionPage() {
  return (
    <Suspense fallback={<SubscriptionSkeleton />}>
      <DynamicSubscriptionPlansView />
    </Suspense>
  );
}

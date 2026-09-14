// ==============================================================================
// GoVPN Thin App Router: Seller Subscription Management
// Algoritma 4: Dynamic Island Route Splitting with CLS = 0 Suspense Boundary
// ==============================================================================

import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { SubscriptionSkeleton } from "@/modules/subscription/components/shared/SubscriptionSkeleton";

export const metadata: Metadata = {
  title: "Reseller Subscriptions | GoVPN Partner Portal",
  description: "Kelola langganan pelanggan tenant reseller, provisi paket, dan pantau komisi",
};

const DynamicSellerSubscriptionView = dynamic(
  () => import("@/modules/subscription").then((mod) => mod.SellerSubscriptionView),
  {
    loading: () => <SubscriptionSkeleton />,
  }
);

export default function SellerSubscriptionPage() {
  return (
    <Suspense fallback={<SubscriptionSkeleton />}>
      <DynamicSellerSubscriptionView />
    </Suspense>
  );
}

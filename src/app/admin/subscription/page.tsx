// ==============================================================================
// GoVPN Thin App Router: Superadmin Subscription & Plans Engine
// Algoritma 4: Dynamic Island Route Splitting with CLS = 0 Suspense Boundary
// ==============================================================================

import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { SubscriptionSkeleton } from "@/modules/subscription/components/shared/SubscriptionSkeleton";

export const metadata: Metadata = {
  title: "Master Plans & Subscriptions | GoVPN Superadmin",
  description:
    "Konfigurasi tiering paket layanan global dan kontrol audit langganan pengguna",
};

const DynamicAdminSubscriptionView = dynamic(
  () =>
    import("@/modules/subscription").then((mod) => mod.AdminSubscriptionView),
  {
    loading: () => <SubscriptionSkeleton />,
  },
);

export default function AdminSubscriptionPage() {
  return (
    <Suspense fallback={<SubscriptionSkeleton />}>
      <DynamicAdminSubscriptionView />
    </Suspense>
  );
}

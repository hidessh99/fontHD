// ==============================================================================
// GoVPN App Router: /dashboard
// Implements Algorithm 4: Dynamic Island Route Splitting on Thin Server Component
// ==============================================================================

import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { VpnProtocolSkeleton } from "@/modules/vpn/components/shared/VpnProtocolSkeleton";

const DashboardOverviewView = dynamic(
  () =>
    import("@/modules/vpn/views/user/DashboardOverviewView").then(
      (mod) => mod.DashboardOverviewView,
    ),
  {
    loading: () => <VpnProtocolSkeleton />,
  },
);

export const metadata: Metadata = {
  title: "Console Overview | GoVPN",
  description: "Dasbor utama manajemen tunnel VPN dan infrastruktur cloud.",
};

export default function DashboardPage() {
  return (
    <Suspense fallback={<VpnProtocolSkeleton />}>
      <DashboardOverviewView />
    </Suspense>
  );
}

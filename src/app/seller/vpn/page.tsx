// ==============================================================================
// GoVPN App Router: /seller/vpn
// Implements Algorithm 4: Dynamic Island Route Splitting on Thin Server Component
// ==============================================================================

import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { VpnProtocolSkeleton } from "@/modules/vpn/components/shared/VpnProtocolSkeleton";

export const metadata: Metadata = {
  title: "Reseller & Partner VPN Hub | GoVPN",
  description: "Manajemen kuota lisensi grosir dan armada server reseller.",
};

const SellerVpnOverviewView = dynamic(
  () =>
    import("@/modules/vpn/views/seller/SellerVpnOverviewView").then(
      (mod) => mod.SellerVpnOverviewView,
    ),
  {
    loading: () => <VpnProtocolSkeleton />,
  },
);

export default function SellerVpnPage() {
  return (
    <Suspense fallback={<VpnProtocolSkeleton />}>
      <SellerVpnOverviewView />
    </Suspense>
  );
}

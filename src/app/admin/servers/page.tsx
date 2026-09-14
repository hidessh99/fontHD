// ==============================================================================
// GoVPN App Router: /admin/servers
// Implements Algorithm 4: Dynamic Island Route Splitting on Thin Server Component
// ==============================================================================

import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { VpnProtocolSkeleton } from "@/modules/vpn/components/shared/VpnProtocolSkeleton";

const AdminServersView = dynamic(
  () =>
    import("@/modules/vpn/views/admin/AdminServersView").then(
      (mod) => mod.AdminServersView
    ),
  {
    loading: () => <VpnProtocolSkeleton />,
  }
);

export const metadata: Metadata = {
  title: "Superadmin Global Server Fleet | GoVPN",
  description: "Kontrol penuh armada server VPN dan billing trigger engine.",
};

export default function AdminServersPage() {
  return (
    <Suspense fallback={<VpnProtocolSkeleton />}>
      <AdminServersView />
    </Suspense>
  );
}

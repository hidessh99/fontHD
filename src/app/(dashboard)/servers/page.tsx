// ==============================================================================
// GoVPN App Router: /servers
// Implements Algorithm 4: Dynamic Island Route Splitting on Thin Server Component
// ==============================================================================

import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { VpnProtocolSkeleton } from "@/modules/vpn/components/shared/VpnProtocolSkeleton";

const UserServersView = dynamic(
  () =>
    import("@/modules/vpn/views/user/UserServersView").then(
      (mod) => mod.UserServersView,
    ),
  {
    loading: () => <VpnProtocolSkeleton />,
  },
);

export const metadata: Metadata = {
  title: "Server Nodes & Telemetri | GoVPN",
  description:
    "Status ketersediaan server node global dan latency ping real-time.",
};

export default function ServersPage() {
  return (
    <Suspense fallback={<VpnProtocolSkeleton />}>
      <UserServersView />
    </Suspense>
  );
}

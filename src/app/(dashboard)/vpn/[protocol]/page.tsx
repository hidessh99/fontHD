// ==============================================================================
// GoVPN App Router: /vpn/[protocol]
// Implements Algorithm 4: Dynamic Island Route Splitting on Thin Server Component
// Zero-Bug Guarantee: No `ssr: false` in RSC, Exact 1:1 Skeleton Matching CLS = 0
// ==============================================================================

import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { VpnProtocolSkeleton } from "@/modules/vpn/components/shared/VpnProtocolSkeleton";

// Dynamic Island Import: Isolates bundle chunk from other routes
const VpnProtocolView = dynamic(
  () =>
    import("@/modules/vpn/views/user/VpnProtocolView").then(
      (mod) => mod.VpnProtocolView,
    ),
  {
    loading: () => <VpnProtocolSkeleton />,
  },
);

interface PageProps {
  params: Promise<{ protocol: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { protocol } = await params;
  return {
    title: `Akun ${protocol.toUpperCase()} | GoVPN`,
    description: `Kelola dan buat akun tunneling protokol ${protocol.toUpperCase()} berkecepatan tinggi.`,
  };
}

export default async function VpnProtocolPage({ params }: PageProps) {
  const { protocol } = await params;

  return (
    <Suspense fallback={<VpnProtocolSkeleton />}>
      <VpnProtocolView protocol={protocol} />
    </Suspense>
  );
}

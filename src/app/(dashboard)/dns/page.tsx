// ==============================================================================
// GoVPN Thin App Router: User DNS Management
// Algoritma 4: Dynamic Island Route Splitting with CLS = 0 Suspense Boundary
// ==============================================================================

import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { DnsSkeleton } from "@/modules/dns/components/shared/DnsSkeleton";

export const metadata: Metadata = {
  title: "Manajemen DNS Cloudflare | GoVPN Institutional",
  description:
    "Kelola domain zona dan pemetaan DNS host VPN langsung ke Cloudflare",
};

const DynamicDnsManagerView = dynamic(
  () => import("@/modules/dns").then((mod) => mod.DnsManagerView),
  {
    loading: () => <DnsSkeleton />,
  },
);

export default function DnsPage() {
  return (
    <Suspense fallback={<DnsSkeleton />}>
      <DynamicDnsManagerView />
    </Suspense>
  );
}

// ==============================================================================
// GoVPN Thin App Router: Superadmin Cloudflare & DNS Management
// Algoritma 4: Dynamic Island Route Splitting with CLS = 0 Suspense Boundary
// ==============================================================================

import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { DnsSkeleton } from "@/modules/dns/components/shared/DnsSkeleton";

export const metadata: Metadata = {
  title: "Admin DNS & Cloudflare API | GoVPN Institutional",
  description:
    "Kelola akun Cloudflare API multi-tenant, root domain zones, dan global audit DNS records",
};

const DynamicAdminDnsView = dynamic(
  () => import("@/modules/dns").then((mod) => mod.AdminDnsView),
  {
    loading: () => <DnsSkeleton />,
  },
);

export default function AdminDnsPage() {
  return (
    <Suspense fallback={<DnsSkeleton />}>
      <DynamicAdminDnsView />
    </Suspense>
  );
}

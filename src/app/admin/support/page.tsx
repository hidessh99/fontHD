// ==============================================================================
// GoVPN Thin App Router: Superadmin Support & Helpdesk Operations
// Algoritma 4: Dynamic Island Route Splitting with CLS = 0 Suspense Boundary
// ==============================================================================

import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { SupportSkeleton } from "@/modules/support/components/shared/SupportSkeleton";

export const metadata: Metadata = {
  title: "Operasional Helpdesk & Tiket | GoVPN Superadmin",
  description: "Manajemen eskalasi tiket bantuan pelanggan dan respon teknis tim internal",
};

const DynamicAdminSupportView = dynamic(
  () => import("@/modules/support").then((mod) => mod.AdminSupportView),
  {
    loading: () => <SupportSkeleton />,
  }
);

export default function AdminSupportPage() {
  return (
    <Suspense fallback={<SupportSkeleton />}>
      <DynamicAdminSupportView />
    </Suspense>
  );
}

// ==============================================================================
// GoVPN Thin App Router: Superadmin Content & Settings Manager
// Algoritma 4: Dynamic Island Route Splitting with CLS = 0 Suspense Boundary
// ==============================================================================

import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ContentSkeleton } from "@/modules/content/components/shared/ContentSkeleton";

export const metadata: Metadata = {
  title: "CMS & Parameter Sistem | GoVPN Superadmin",
  description: "Manajemen artikel pusat pengetahuan dan kontrol konfigurasi parameter sistem",
};

const DynamicAdminContentView = dynamic(
  () => import("@/modules/content").then((mod) => mod.AdminContentView),
  {
    loading: () => <ContentSkeleton />,
  }
);

export default function AdminContentPage() {
  return (
    <Suspense fallback={<ContentSkeleton />}>
      <DynamicAdminContentView />
    </Suspense>
  );
}

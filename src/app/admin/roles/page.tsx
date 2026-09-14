// ==============================================================================
// GoVPN App Router: /admin/roles
// Implements Algorithm 4: Dynamic Island Route Splitting on Thin Server Component
// ==============================================================================

import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { IamSkeleton } from "@/modules/iam/components/shared/IamSkeleton";

const AdminRolesView = dynamic(
  () =>
    import("@/modules/iam/views/admin/AdminRolesView").then(
      (mod) => mod.AdminRolesView,
    ),
  {
    loading: () => <IamSkeleton />,
  },
);

export const metadata: Metadata = {
  title: "Manajemen Peran & RBAC | GoVPN Superadmin",
  description:
    "Konfigurasi hierarki peran akun, definisi perizinan modul, dan pembatasan hak akses.",
};

export default function AdminRolesPage() {
  return (
    <Suspense fallback={<IamSkeleton />}>
      <AdminRolesView />
    </Suspense>
  );
}

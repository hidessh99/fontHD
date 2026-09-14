// ==============================================================================
// GoVPN App Router: /admin/users
// Implements Algorithm 4: Dynamic Island Route Splitting on Thin Server Component
// ==============================================================================

import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { IamSkeleton } from "@/modules/iam/components/shared/IamSkeleton";

const AdminUsersView = dynamic(
  () =>
    import("@/modules/iam/views/admin/AdminUsersView").then(
      (mod) => mod.AdminUsersView
    ),
  {
    loading: () => <IamSkeleton />,
  }
);

export const metadata: Metadata = {
  title: "Manajemen Pengguna & Saldo | GoVPN Superadmin",
  description: "Pusat kendali pengguna, penyesuaian saldo ledger, dan riwayat aktivitas sistem.",
};

export default function AdminUsersPage() {
  return (
    <Suspense fallback={<IamSkeleton />}>
      <AdminUsersView />
    </Suspense>
  );
}

// ==============================================================================
// GoVPN App Router: /admin/finance
// Implements Algorithm 4: Dynamic Island Route Splitting on Thin Server Component
// ==============================================================================

import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { FinanceSkeleton } from "@/modules/finance/components/shared/FinanceSkeleton";

const AdminFinanceLedgerView = dynamic(
  () =>
    import("@/modules/finance/views/admin/AdminFinanceLedgerView").then(
      (mod) => mod.AdminFinanceLedgerView
    ),
  {
    loading: () => <FinanceSkeleton />,
  }
);

export const metadata: Metadata = {
  title: "Audit Ledger & Keuangan | GoVPN Superadmin",
  description: "Manajemen mutasi saldo ledger, approval penarikan dana, dan kupon diskon global",
};

export default function AdminFinancePage() {
  return (
    <Suspense fallback={<FinanceSkeleton />}>
      <AdminFinanceLedgerView />
    </Suspense>
  );
}

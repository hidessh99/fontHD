// ==============================================================================
// GoVPN App Router: /billing/invoices
// Implements Algorithm 4: Dynamic Island Route Splitting on Thin Server Component
// ==============================================================================

import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { FinanceSkeleton } from "@/modules/finance/components/shared/FinanceSkeleton";

const BillingInvoicesView = dynamic(
  () =>
    import("@/modules/finance/views/user/BillingInvoicesView").then(
      (mod) => mod.BillingInvoicesView,
    ),
  {
    loading: () => <FinanceSkeleton />,
  },
);

export const metadata: Metadata = {
  title: "Faktur & Tagihan | GoVPN",
  description: "Daftar invoice, riwayat pembayaran, dan mutasi saldo GoVPN",
};

export default function InvoicesPage() {
  return (
    <Suspense fallback={<FinanceSkeleton />}>
      <BillingInvoicesView />
    </Suspense>
  );
}

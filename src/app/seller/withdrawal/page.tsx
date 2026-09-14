// ==============================================================================
// GoVPN App Router: /seller/withdrawal
// Implements Algorithm 4: Dynamic Island Route Splitting on Thin Server Component
// ==============================================================================

import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { FinanceSkeleton } from "@/modules/finance/components/shared/FinanceSkeleton";

export const metadata: Metadata = {
  title: "Pencairan Komisi Reseller | GoVPN",
  description: "Kelola saldo komisi reseller dan ajukan pencairan ke rekening bank",
};

const SellerWithdrawalView = dynamic(
  () =>
    import("@/modules/finance/views/seller/SellerWithdrawalView").then(
      (mod) => mod.SellerWithdrawalView
    ),
  {
    loading: () => <FinanceSkeleton />,
  }
);

export default function SellerWithdrawalPage() {
  return (
    <Suspense fallback={<FinanceSkeleton />}>
      <SellerWithdrawalView />
    </Suspense>
  );
}

// ==============================================================================
// GoVPN App Router: /billing/deposit
// Implements Algorithm 4: Dynamic Island Route Splitting on Thin Server Component
// ==============================================================================

import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { FinanceSkeleton } from "@/modules/finance/components/shared/FinanceSkeleton";

const DepositView = dynamic(
  () =>
    import("@/modules/finance/views/user/DepositView").then(
      (mod) => mod.DepositView,
    ),
  {
    loading: () => <FinanceSkeleton />,
  },
);

export const metadata: Metadata = {
  title: "Deposit Saldo | GoVPN",
  description:
    "Pengisian saldo akun GoVPN melalui QRIS instan dan Virtual Account",
};

export default function DepositPage() {
  return (
    <Suspense fallback={<FinanceSkeleton />}>
      <DepositView />
    </Suspense>
  );
}

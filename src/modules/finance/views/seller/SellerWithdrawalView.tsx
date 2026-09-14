// ==============================================================================
// GoVPN Finance Seller Withdrawal View
// Part of Pola C: views/seller/SellerWithdrawalView.tsx
// 100% Coinbase Institutional Design System (Commission Metrics & Payout Table)
// ==============================================================================

"use client";

import React, { useEffect } from "react";
import { useFinanceSeller } from "../../hooks/useFinanceSeller";
import { SellerCommissionCard } from "../../components/seller/SellerCommissionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Landmark, Calendar, Clock, CreditCard } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";

export function SellerWithdrawalView() {
  const { stats, withdrawals, fetchSellerStats, requestWithdrawal } =
    useFinanceSeller();

  useEffect(() => {
    fetchSellerStats();
  }, [fetchSellerStats]);

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
          <Landmark className="h-6 w-6 text-emerald-400" />
          Komisi &amp; Pencairan Reseller
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Pantau akumulasi komisi penjualan VPN Anda dan cairkan dana langsung
          ke rekening bank atau dompet digital.
        </p>
      </div>

      {/* Commission Cards */}
      <SellerCommissionCard
        stats={stats}
        onRequestWithdrawal={requestWithdrawal}
      />

      {/* Withdrawal History Table */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold font-mono text-foreground uppercase tracking-wider flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          Riwayat Pengajuan Pencairan Dana
        </h3>

        {withdrawals.length === 0 ? (
          <EmptyState
            icon={CreditCard}
            title="Belum Ada Riwayat Pencairan"
            description="Pengajuan penarikan komisi reseller Anda akan tercatat di sini."
          />
        ) : (
          <div className="w-full overflow-x-auto rounded-2xl border border-border/80 bg-card/60 shadow-xl">
            <table className="w-full text-left text-sm text-muted-foreground font-mono">
              <thead className="border-b border-border/80 bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-4">Waktu Pengajuan</th>
                  <th className="px-5 py-4">Bank Tujuan</th>
                  <th className="px-5 py-4">Nomor Rekening</th>
                  <th className="px-5 py-4">Nama Pemilik</th>
                  <th className="px-5 py-4">Nominal</th>
                  <th className="px-5 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y border-border/40 text-xs">
                {withdrawals.map((w) => (
                  <tr
                    key={w.id}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>
                          {new Date(w.created_at).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-bold text-foreground">
                      {w.bank_name}
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      {w.account_number}
                    </td>
                    <td className="px-5 py-3.5 font-sans font-medium text-foreground">
                      {w.account_name}
                    </td>
                    <td className="px-5 py-3.5 font-bold text-emerald-400 text-sm">
                      {formatIDR(w.amount)}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <StatusBadge status={w.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

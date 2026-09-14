// ==============================================================================
// GoVPN Finance Superadmin Ledger & Operations View
// Part of Pola C: views/admin/AdminFinanceLedgerView.tsx
// 100% Coinbase Institutional Design System (Tabs, Ledger, Vouchers, Payout Approvals)
// ==============================================================================

"use client";

import React, { useEffect } from "react";
import { useFinanceAdmin } from "../../hooks/useFinanceAdmin";
import { AdminBillingTable } from "../../components/admin/AdminBillingTable";
import { AdminVoucherManager } from "../../components/admin/AdminVoucherManager";
import { PendingIncomeApprovalModal } from "../../components/admin/PendingIncomeApprovalModal";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  History,
  Tag,
  Clock,
  CheckCircle2,
  XCircle,
  Landmark,
  Calendar,
} from "lucide-react";

export function AdminFinanceLedgerView() {
  const {
    billingRecords,
    incomePendingList,
    vouchers,
    withdrawals,
    loading,
    fetchAdminBilling,
    createBillingAdjustment,
    checkExpiredBilling,
    fetchIncomePending,
    triggerAlwaysPending,
    triggerMonthlyPending,
    triggerPayasPending,
    cleanupIncomePending,
    updateIncomePendingStatus,
    fetchVouchers,
    createVoucher,
    deleteVoucher,
    fetchWithdrawals,
    updateWithdrawalStatus,
  } = useFinanceAdmin();

  useEffect(() => {
    fetchAdminBilling();
    fetchIncomePending();
    fetchVouchers();
    fetchWithdrawals();
  }, [fetchAdminBilling, fetchIncomePending, fetchVouchers, fetchWithdrawals]);

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <ShieldCheck className="h-6 w-6 text-primary" />
            Audit Ledger &amp; Keuangan Global
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Pusat kendali transaksi keuangan, mutasi balance user, approval pencairan, dan diskon kupon.
          </p>
        </div>

        <PendingIncomeApprovalModal
          pendingList={incomePendingList}
          onTriggerAlways={triggerAlwaysPending}
          onTriggerMonthly={triggerMonthlyPending}
          onTriggerPayas={triggerPayasPending}
          onCleanup={cleanupIncomePending}
          onUpdateStatus={updateIncomePendingStatus}
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="ledger" className="w-full">
        <TabsList className="bg-muted/40 border border-border/80 p-1 rounded-xl">
          <TabsTrigger
            value="ledger"
            className="gap-2 text-xs font-mono font-medium data-state-active:bg-background data-state-active:text-foreground"
          >
            <History className="h-3.5 w-3.5" />
            Ledger &amp; Mutasi ({billingRecords.length})
          </TabsTrigger>
          <TabsTrigger
            value="vouchers"
            className="gap-2 text-xs font-mono font-medium data-state-active:bg-background data-state-active:text-foreground"
          >
            <Tag className="h-3.5 w-3.5" />
            Voucher Promo ({vouchers.length})
          </TabsTrigger>
          <TabsTrigger
            value="withdrawals"
            className="gap-2 text-xs font-mono font-medium data-state-active:bg-background data-state-active:text-foreground"
          >
            <Landmark className="h-3.5 w-3.5" />
            Antrian Penarikan ({withdrawals.length})
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Ledger */}
        <TabsContent value="ledger" className="mt-4">
          <AdminBillingTable
            records={billingRecords}
            isLoading={loading}
            onRefresh={fetchAdminBilling}
            onCreateAdjustment={createBillingAdjustment}
            onCheckExpired={checkExpiredBilling}
          />
        </TabsContent>

        {/* Tab 2: Vouchers */}
        <TabsContent value="vouchers" className="mt-4">
          <AdminVoucherManager
            vouchers={vouchers}
            onCreateVoucher={createVoucher}
            onDeleteVoucher={deleteVoucher}
          />
        </TabsContent>

        {/* Tab 3: Withdrawals */}
        <TabsContent value="withdrawals" className="mt-4">
          <div className="w-full overflow-x-auto rounded-2xl border border-border/80 bg-card/60 shadow-xl">
            <table className="w-full text-left text-sm text-muted-foreground font-mono">
              <thead className="border-b border-border/80 bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-4">Waktu</th>
                  <th className="px-5 py-4">User ID</th>
                  <th className="px-5 py-4">Bank &amp; Rekening</th>
                  <th className="px-5 py-4">Atas Nama</th>
                  <th className="px-5 py-4">Nominal</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Aksi Persetujuan</th>
                </tr>
              </thead>
              <tbody className="divide-y border-border/40 text-xs">
                {withdrawals.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-8 text-center text-muted-foreground font-sans">
                      Tidak ada permohonan penarikan dana pending.
                    </td>
                  </tr>
                ) : (
                  withdrawals.map((w) => (
                    <tr key={w.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {new Date(w.created_at).toLocaleDateString("id-ID")}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 font-bold text-foreground">
                        {w.user_id}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex flex-col">
                          <span className="font-bold text-foreground">{w.bank_name}</span>
                          <span className="text-[11px] text-muted-foreground">{w.account_number}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 font-sans font-medium text-foreground">
                        {w.account_name}
                      </td>
                      <td className="px-5 py-3.5 font-bold text-emerald-400 text-sm">
                        {formatIDR(w.amount)}
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusBadge status={w.status} />
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        {w.status === "PENDING" ? (
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              onClick={() => updateWithdrawalStatus(w.id, { status: "APPROVED" })}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-xs font-semibold px-3.5 h-8 gap-1 shadow-sm"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" /> Setujui
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateWithdrawalStatus(w.id, { status: "REJECTED" })}
                              className="border-rose-500/30 text-rose-400 hover:bg-rose-500/10 rounded-full text-xs font-semibold px-3 h-8 gap-1"
                            >
                              <XCircle className="h-3.5 w-3.5" /> Tolak
                            </Button>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground font-mono">Selesai</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

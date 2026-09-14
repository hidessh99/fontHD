// ==============================================================================
// GoVPN Finance User Billing & Invoices View
// Part of Pola C: views/user/BillingInvoicesView.tsx
// 100% Coinbase Institutional Design System (Tabs, Adaptive QRIS, Ledger)
// ==============================================================================

"use client";

import React, { useEffect, useState } from "react";
import { useFinanceUser } from "../../hooks/useFinanceUser";
import { BalanceWidget } from "../../components/shared/BalanceWidget";
import { InvoiceTable } from "../../components/user/InvoiceTable";
import { QrisPaymentCard } from "../../components/user/QrisPaymentCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, FileText, History, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Invoice } from "../../types/finance.types";

export function BillingInvoicesView() {
  const {
    invoices,
    billingHistory,
    activeInvoice,
    loading,
    balance,
    totalSpent,
    fetchInvoices,
    fetchBilling,
    createTopup,
    validateVoucher,
  } = useFinanceUser();

  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    fetchInvoices();
    fetchBilling();
  }, [fetchInvoices, fetchBilling]);

  // When activeInvoice is created from topup, focus it
  useEffect(() => {
    if (activeInvoice) {
      setSelectedInvoice(activeInvoice);
    }
  }, [activeInvoice]);

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Section: Balance & Quick Deposit */}
      <BalanceWidget
        balance={balance}
        totalSpent={totalSpent}
        onTopup={createTopup}
        onValidateVoucher={validateVoucher}
      />

      {/* Main Tabs: Invoices vs Ledger */}
      <Tabs defaultValue="invoices" className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <TabsList className="bg-muted/40 border border-border/80 p-1 rounded-xl">
            <TabsTrigger
              value="invoices"
              className="gap-2 text-xs font-mono font-medium data-state-active:bg-background data-state-active:text-foreground"
            >
              <FileText className="h-3.5 w-3.5" />
              Riwayat Faktur ({invoices.length})
            </TabsTrigger>
            <TabsTrigger
              value="ledger"
              className="gap-2 text-xs font-mono font-medium data-state-active:bg-background data-state-active:text-foreground"
            >
              <History className="h-3.5 w-3.5" />
              Mutasi Saldo ({billingHistory.length})
            </TabsTrigger>
          </TabsList>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              fetchInvoices();
              fetchBilling();
            }}
            disabled={loading}
            className="border-border/80 hover:bg-muted/30 text-foreground gap-2 h-9 text-xs rounded-full px-4"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            Segarkan
          </Button>
        </div>

        {/* Tab 1: Invoices */}
        <TabsContent value="invoices" className="mt-2 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className={selectedInvoice ? "lg:col-span-2" : "lg:col-span-3"}>
              <InvoiceTable
                invoices={invoices}
                onSelectInvoice={(inv) => setSelectedInvoice(inv)}
              />
            </div>

            {/* Selected Invoice QRIS Modal / Card */}
            {selectedInvoice && (
              <div className="lg:col-span-1 sticky top-6">
                <div className="flex justify-end pb-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedInvoice(null)}
                    className="text-xs text-muted-foreground hover:text-foreground gap-1 h-7 rounded-full"
                  >
                    <X className="h-3.5 w-3.5" /> Tutup QRIS
                  </Button>
                </div>
                <QrisPaymentCard
                  invoice={selectedInvoice}
                  onRefreshStatus={() => fetchInvoices(true)}
                  onPaymentSuccess={() => {
                    fetchInvoices(true);
                    fetchBilling();
                  }}
                />
              </div>
            )}
          </div>
        </TabsContent>

        {/* Tab 2: Billing Ledger */}
        <TabsContent value="ledger" className="mt-2">
          <div className="w-full overflow-x-auto rounded-2xl border border-border/80 bg-card/60 shadow-xl">
            <table className="w-full text-left text-sm text-muted-foreground">
              <thead className="border-b border-border/80 bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono">
                <tr>
                  <th className="px-5 py-4">Waktu Mutasi</th>
                  <th className="px-5 py-4">Jenis Transaksi</th>
                  <th className="px-5 py-4">Keterangan</th>
                  <th className="px-5 py-4">Nominal</th>
                  <th className="px-5 py-4 text-right">Saldo Akhir</th>
                </tr>
              </thead>
              <tbody className="divide-y border-border/40 font-mono text-xs">
                {billingHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5 text-muted-foreground">
                      {new Date(item.created_at).toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-5 py-3.5 font-sans">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                          item.type === "TOPUP"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-sans text-foreground">
                      {item.description}
                    </td>
                    <td className="px-5 py-3.5 font-bold">
                      <span
                        className={
                          item.type === "TOPUP"
                            ? "text-emerald-400"
                            : "text-rose-400"
                        }
                      >
                        {item.type === "TOPUP" ? "+" : "-"}
                        {formatIDR(item.amount)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right font-bold text-foreground">
                      {formatIDR(item.balance_after)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { useBilling } from "../hooks/useBilling";
import { BalanceWidget } from "../components/BalanceWidget";
import { InvoiceTable } from "../components/InvoiceTable";
import { QrisPaymentCard } from "../components/QrisPaymentCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw, FileText, History, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Invoice } from "../types/finance.types";

export function BillingInvoicesView() {
  const {
    invoices,
    billingHistory,
    activeInvoice,
    setActiveInvoice,
    loading,
    pollingActive,
    fetchInvoices,
    fetchBilling,
    createTopup,
    validateVoucher,
  } = useBilling();

  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    fetchInvoices();
    fetchBilling();
  }, [fetchInvoices, fetchBilling]);

  // When activeInvoice is created from topup, show it
  useEffect(() => {
    if (activeInvoice) {
      setSelectedInvoice(activeInvoice);
    }
  }, [activeInvoice]);

  const handleSimulatePaid = (invId: string) => {
    // Mark as paid locally for demo/testing
    if (selectedInvoice && selectedInvoice.id === invId) {
      setSelectedInvoice({
        ...selectedInvoice,
        status: "PAID",
        paid_at: new Date().toISOString(),
      });
    }
    fetchInvoices(true);
  };

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
        balance={35000}
        totalSpent={15000}
        onTopup={createTopup}
        onValidateVoucher={validateVoucher}
      />

      {/* Main Tabs: Invoices vs Ledger */}
      <Tabs defaultValue="invoices" className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <TabsList className="bg-zinc-900 border border-zinc-800 p-1">
            <TabsTrigger
              value="invoices"
              className="gap-2 text-xs data-state-active:bg-zinc-800 data-state-active:text-zinc-100"
            >
              <FileText className="h-3.5 w-3.5" />
              Riwayat Faktur ({invoices.length})
            </TabsTrigger>
            <TabsTrigger
              value="ledger"
              className="gap-2 text-xs data-state-active:bg-zinc-800 data-state-active:text-zinc-100"
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
            className="border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 gap-2 h-8 text-xs"
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
                    className="text-xs text-zinc-500 hover:text-zinc-300 gap-1 h-7"
                  >
                    <X className="h-3.5 w-3.5" /> Tutup QRIS
                  </Button>
                </div>
                <QrisPaymentCard
                  invoice={selectedInvoice}
                  onRefreshStatus={() => fetchInvoices(true)}
                  onSimulatePaid={handleSimulatePaid}
                  isPolling={pollingActive}
                />
              </div>
            )}
          </div>
        </TabsContent>

        {/* Tab 2: Billing Ledger */}
        <TabsContent value="ledger" className="mt-2">
          <div className="w-full overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/60 shadow-xl">
            <table className="w-full text-left text-sm text-zinc-300">
              <thead className="border-b border-zinc-800 bg-zinc-900/80 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                <tr>
                  <th className="px-5 py-4">Waktu Mutasi</th>
                  <th className="px-5 py-4">Jenis Transaksi</th>
                  <th className="px-5 py-4">Keterangan</th>
                  <th className="px-5 py-4">Nominal</th>
                  <th className="px-5 py-4 text-right">Saldo Akhir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-mono text-xs">
                {billingHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-900/40">
                    <td className="px-5 py-3.5 text-zinc-400">
                      {new Date(item.created_at).toLocaleString("id-ID")}
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
                    <td className="px-5 py-3.5 font-sans text-zinc-300">
                      {item.description}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={
                          item.type === "TOPUP"
                            ? "text-emerald-400 font-bold"
                            : "text-rose-400 font-bold"
                        }
                      >
                        {item.type === "TOPUP" ? "+" : "-"}
                        {formatIDR(item.amount)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right font-bold text-zinc-100">
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

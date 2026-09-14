"use client";

import React from "react";
import { Invoice } from "../types/finance.types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { CreditCard, QrCode, ExternalLink, Calendar } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";

interface InvoiceTableProps {
  invoices: Invoice[];
  onSelectInvoice?: (invoice: Invoice) => void;
}

export function InvoiceTable({ invoices, onSelectInvoice }: InvoiceTableProps) {
  if (invoices.length === 0) {
    return (
      <EmptyState
        icon={CreditCard}
        title="Belum Ada Riwayat Faktur"
        description="Tagihan dan faktur deposit Anda akan muncul di tabel ini."
      />
    );
  }

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/60 shadow-xl">
      <table className="w-full text-left text-sm text-zinc-300">
        <thead className="border-b border-zinc-800 bg-zinc-900/80 text-xs font-semibold uppercase tracking-wider text-zinc-400">
          <tr>
            <th className="px-5 py-4">Nomor Faktur</th>
            <th className="px-5 py-4">Tanggal Buat</th>
            <th className="px-5 py-4">Metode</th>
            <th className="px-5 py-4">Nominal</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/60">
          {invoices.map((inv) => (
            <tr
              key={inv.id}
              className="group transition-colors hover:bg-zinc-900/40"
            >
              <td className="px-5 py-4">
                <div className="flex flex-col">
                  <span className="font-mono text-xs font-semibold text-zinc-100">
                    {inv.invoice_number}
                  </span>
                  {inv.description && (
                    <span className="text-[11px] text-zinc-500 truncate max-w-[200px]">
                      {inv.description}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-5 py-4 text-xs text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                  <span>{formatDate(inv.created_at)}</span>
                </div>
              </td>
              <td className="px-5 py-4">
                <span className="inline-flex items-center rounded-md bg-zinc-800/80 px-2 py-0.5 text-xs font-medium text-zinc-300">
                  {inv.payment_method}
                </span>
              </td>
              <td className="px-5 py-4">
                <div className="flex flex-col">
                  <span className="font-mono font-medium text-zinc-100">
                    {formatIDR(inv.total_amount || inv.amount)}
                  </span>
                  {inv.admin_fee ? (
                    <span className="text-[10px] text-zinc-500">
                      Termasuk biaya {formatIDR(inv.admin_fee)}
                    </span>
                  ) : null}
                </div>
              </td>
              <td className="px-5 py-4">
                <StatusBadge status={inv.status} />
              </td>
              <td className="px-5 py-4 text-right">
                {inv.status === "PENDING" && onSelectInvoice && (
                  <Button
                    size="sm"
                    className="h-8 bg-blue-600 hover:bg-blue-500 text-white gap-1.5 shadow-sm text-xs font-medium"
                    onClick={() => onSelectInvoice(inv)}
                  >
                    <QrCode className="h-3.5 w-3.5" />
                    Bayar QRIS
                  </Button>
                )}
                {inv.status === "PAID" && (
                  <span className="text-xs text-emerald-400 font-medium">
                    Lunas
                  </span>
                )}
                {inv.checkout_url && inv.status === "PENDING" && (
                  <a
                    href={inv.checkout_url}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-2 inline-flex items-center text-xs text-blue-400 hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5 mr-1" /> Gateway
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

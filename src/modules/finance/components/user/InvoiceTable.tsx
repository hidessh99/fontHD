// ==============================================================================
// GoVPN Finance Invoice Table Component
// Part of Pola C: components/user/InvoiceTable.tsx
// Responsive table + card view, 100% Coinbase Institutional Design System
// ==============================================================================

"use client";

import React from "react";
import { Invoice } from "../../types/finance.types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  QrCode,
  ExternalLink,
  Calendar,
  Receipt,
} from "lucide-react";
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
        description="Tagihan dan faktur deposit Anda akan otomatis tercatat di sini."
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
    <div className="w-full space-y-3">
      {/* Desktop / Tablet Table View */}
      <div className="hidden md:block w-full overflow-x-auto rounded-2xl border border-border/80 bg-card/60 shadow-xl">
        <table className="w-full text-left text-sm text-muted-foreground">
          <thead className="border-b border-border/80 bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-4">Nomor Faktur</th>
              <th className="px-5 py-4">Tanggal Buat</th>
              <th className="px-5 py-4">Metode</th>
              <th className="px-5 py-4">Nominal</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y border-border/40">
            {invoices.map((inv) => (
              <tr
                key={inv.id}
                className="group transition-colors hover:bg-muted/20"
              >
                <td className="px-5 py-4">
                  <div className="flex flex-col">
                    <span className="font-mono text-xs font-bold text-foreground">
                      {inv.invoice_number}
                    </span>
                    {inv.description && (
                      <span className="text-[11px] text-muted-foreground truncate max-w-[220px]">
                        {inv.description}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-5 py-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="font-mono">
                      {formatDate(inv.created_at)}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center rounded-md bg-muted/60 border border-border/60 px-2.5 py-0.5 text-xs font-medium font-mono text-foreground">
                    {inv.payment_method}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-col">
                    <span className="font-mono font-semibold text-foreground">
                      {formatIDR(inv.total_amount || inv.amount)}
                    </span>
                    {inv.admin_fee ? (
                      <span className="text-[10px] text-muted-foreground font-mono">
                        Biaya: {formatIDR(inv.admin_fee)}
                      </span>
                    ) : null}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={inv.status} />
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {inv.status === "PENDING" && onSelectInvoice && (
                      <Button
                        size="sm"
                        className="h-8 bg-primary hover:bg-primary-hover text-white gap-1.5 shadow-sm text-xs font-semibold rounded-full px-4"
                        onClick={() => onSelectInvoice(inv)}
                      >
                        <QrCode className="h-3.5 w-3.5" />
                        Bayar QRIS
                      </Button>
                    )}
                    {inv.status === "PAID" && (
                      <span className="text-xs text-emerald-400 font-semibold font-mono">
                        Lunas
                      </span>
                    )}
                    {inv.checkout_url && inv.status === "PENDING" && (
                      <a
                        href={inv.checkout_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center text-xs text-primary hover:underline font-mono"
                      >
                        <ExternalLink className="h-3.5 w-3.5 mr-1" /> Portal
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {invoices.map((inv) => (
          <div
            key={inv.id}
            className="rounded-2xl border border-border/80 bg-card/60 p-4 space-y-3 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="h-4 w-4 text-primary" />
                <span className="font-mono text-xs font-bold text-foreground">
                  {inv.invoice_number}
                </span>
              </div>
              <StatusBadge status={inv.status} />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-border/40">
              <div>
                <span className="text-[11px] text-muted-foreground block">
                  Nominal
                </span>
                <span className="font-mono font-bold text-foreground text-sm">
                  {formatIDR(inv.total_amount || inv.amount)}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-muted-foreground block">
                  Metode
                </span>
                <span className="font-mono text-foreground font-semibold">
                  {inv.payment_method}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-border/40">
              <span className="font-mono">{formatDate(inv.created_at)}</span>
              {inv.status === "PENDING" && onSelectInvoice && (
                <Button
                  size="sm"
                  className="h-8 bg-primary hover:bg-primary-hover text-white gap-1.5 shadow-sm text-xs font-semibold rounded-full px-4"
                  onClick={() => onSelectInvoice(inv)}
                >
                  <QrCode className="h-3.5 w-3.5" />
                  Bayar
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

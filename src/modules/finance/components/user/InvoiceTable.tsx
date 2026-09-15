// ==============================================================================
// GoVPN Finance Invoice Table Component
// Part of Pola C: components/user/InvoiceTable.tsx
// 100% Coinbase Institutional Design System + Standardized Enterprise DataTable
// Fully Localized with useI18n (EN/ID)
// ==============================================================================

"use client";

import React, { useMemo } from "react";
import { Invoice } from "../../types/finance.types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { DataTable, ColumnDef, DataTableFilterConfig } from "@/components/shared/data-table";
import {
  CreditCard,
  QrCode,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

interface InvoiceTableProps {
  invoices: Invoice[];
  onSelectInvoice?: (invoice: Invoice) => void;
}

export function InvoiceTable({ invoices, onSelectInvoice }: InvoiceTableProps) {
  const { t, locale } = useI18n();

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString(locale === "id" ? "id-ID" : "en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const columns: ColumnDef<Invoice>[] = useMemo(
    () => [
      {
        id: "invoice_number",
        header: t("finance.invoiceNumber"),
        cell: (inv) => (
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
        ),
      },
      {
        id: "created_at",
        header: t("finance.createdAt"),
        cell: (inv) => (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <span>{formatDate(inv.created_at)}</span>
          </div>
        ),
      },
      {
        id: "payment_method",
        header: t("finance.paymentMethod"),
        cell: (inv) => (
          <span className="inline-flex items-center rounded-md bg-muted/60 border border-border/60 px-2.5 py-0.5 text-xs font-medium font-mono text-foreground">
            {inv.payment_method}
          </span>
        ),
      },
      {
        id: "amount",
        header: t("finance.amount"),
        cell: (inv) => (
          <div className="flex flex-col">
            <span className="font-mono font-semibold text-foreground">
              {formatIDR(inv.total_amount || inv.amount)}
            </span>
            {inv.admin_fee ? (
              <span className="text-[10px] text-muted-foreground font-mono">
                Fee: {formatIDR(inv.admin_fee)}
              </span>
            ) : null}
          </div>
        ),
      },
      {
        id: "status",
        header: t("finance.paymentStatus"),
        cell: (inv) => <StatusBadge status={inv.status} />,
      },
      {
        id: "actions",
        header: t("common.actions"),
        align: "right",
        cell: (inv) => (
          <div className="flex items-center justify-end gap-2">
            {inv.status === "PENDING" && onSelectInvoice && (
              <Button
                size="sm"
                className="h-8 bg-primary hover:bg-primary-hover text-white gap-1.5 shadow-sm text-xs font-semibold rounded-full px-4"
                onClick={() => onSelectInvoice(inv)}
              >
                <QrCode className="h-3.5 w-3.5" />
                {t("finance.payQris")}
              </Button>
            )}
            {inv.status === "PAID" && (
              <span className="text-xs text-emerald-400 font-semibold font-mono">
                {t("finance.paid")}
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
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onSelectInvoice, t],
  );

  const filters: DataTableFilterConfig<Invoice>[] = useMemo(
    () => [
      {
        id: "status",
        label: t("finance.paymentStatus"),
        defaultValue: "ALL",
        options: [
          { label: t("common.all"), value: "ALL" },
          { label: "PENDING", value: "PENDING" },
          { label: "PAID", value: "PAID" },
          { label: "EXPIRED", value: "EXPIRED" },
          { label: "CANCELLED", value: "CANCELLED" },
        ],
        filterFn: (inv, val) => inv.status?.toUpperCase() === val.toUpperCase(),
      },
    ],
    [t],
  );

  return (
    <DataTable<Invoice>
      data={invoices}
      columns={columns}
      keyExtractor={(inv) => inv.id}
      searchable={true}
      searchPlaceholder={t("common.search")}
      searchButtonText={t("common.search")}
      searchAccessor={(inv) => [inv.invoice_number, inv.description, inv.payment_method]}
      filters={filters}
      paginated={true}
      pageSize={10}
      entityName="faktur"
      emptyIcon={CreditCard}
      emptyTitle={t("finance.noInvoicesTitle")}
      emptyDescription={t("finance.noInvoicesDesc")}
    />
  );
}

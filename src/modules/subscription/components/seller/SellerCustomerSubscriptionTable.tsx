// ==============================================================================
// GoVPN Seller Customer Subscription Table Component
// Part of Pola C: components/seller/SellerCustomerSubscriptionTable.tsx
// 100% Coinbase Institutional Design System + Standardized Enterprise DataTable
// ==============================================================================

"use client";

import React, { useMemo } from "react";
import { Subscription } from "../../types/subscription.types";
import { SubscriptionStatusBadge } from "../shared/SubscriptionStatusBadge";
import { DataTable, ColumnDef, DataTableFilterConfig } from "@/components/shared/data-table";
import { ShieldCheck, User, Calendar, Smartphone } from "lucide-react";

interface SellerCustomerSubscriptionTableProps {
  subscriptions: Subscription[];
}

export function SellerCustomerSubscriptionTable({
  subscriptions,
}: SellerCustomerSubscriptionTableProps) {
  const columns: ColumnDef<Subscription>[] = useMemo(
    () => [
      {
        id: "status",
        header: "Status",
        cell: (sub) => <SubscriptionStatusBadge status={sub.status} />,
      },
      {
        id: "user_id",
        header: "User ID",
        className: "font-sans",
        cell: (sub) => (
          <div className="flex items-center gap-1.5 text-foreground font-mono">
            <User className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <span className="font-bold">#{sub.user_id}</span>
          </div>
        ),
      },
      {
        id: "plan",
        header: "Paket Langganan",
        className: "font-sans font-bold text-foreground",
        cell: (sub) => sub.plan?.name || "Premium VPN",
      },
      {
        id: "devices",
        header: "Maks. Device",
        className: "text-foreground font-mono text-xs",
        cell: (sub) => (
          <div className="flex items-center gap-1">
            <Smartphone className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <span>{sub.plan?.max_devices || 5} Devices</span>
          </div>
        ),
      },
      {
        id: "end_date",
        header: "Masa Berlaku",
        className: "font-sans text-muted-foreground",
        cell: (sub) => (
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <span>{new Date(sub.end_date).toLocaleDateString("id-ID")}</span>
          </div>
        ),
      },
    ],
    [],
  );

  const filters: DataTableFilterConfig<Subscription>[] = useMemo(
    () => [
      {
        id: "status",
        label: "Status",
        defaultValue: "ALL",
        options: [
          { label: "Semua Status", value: "ALL" },
          { label: "ACTIVE", value: "ACTIVE" },
          { label: "EXPIRED", value: "EXPIRED" },
          { label: "CANCELLED", value: "CANCELLED" },
        ],
        filterFn: (sub, val) => sub.status?.toUpperCase() === val.toUpperCase(),
      },
    ],
    [],
  );

  return (
    <DataTable<Subscription>
      data={subscriptions}
      columns={columns}
      keyExtractor={(sub) => sub.id}
      searchable={true}
      searchPlaceholder="Cari User ID atau nama paket pelanggan..."
      searchButtonText="Cari"
      searchAccessor={(sub) => [sub.user_id, sub.plan?.name, sub.status]}
      filters={filters}
      paginated={true}
      pageSize={10}
      entityName="langganan pelanggan"
      emptyIcon={ShieldCheck}
      emptyTitle="Belum Ada Langganan Pelanggan"
      emptyDescription="Pelanggan yang Anda daftarkan atau beli paket langganannya akan muncul di sini."
    />
  );
}

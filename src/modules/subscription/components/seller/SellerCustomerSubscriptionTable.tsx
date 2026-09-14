// ==============================================================================
// GoVPN Seller Customer Subscription Table Component
// Part of Pola C: components/seller/SellerCustomerSubscriptionTable.tsx
// 100% Coinbase Institutional Design System (Reseller Customer Fleet)
// ==============================================================================

"use client";

import React from "react";
import { Subscription } from "../../types/subscription.types";
import { SubscriptionStatusBadge } from "../shared/SubscriptionStatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { ShieldCheck, User, Calendar, Smartphone } from "lucide-react";

interface SellerCustomerSubscriptionTableProps {
  subscriptions: Subscription[];
}

export function SellerCustomerSubscriptionTable({
  subscriptions,
}: SellerCustomerSubscriptionTableProps) {
  if (subscriptions.length === 0) {
    return (
      <EmptyState
        icon={ShieldCheck}
        title="Belum Ada Langganan Pelanggan"
        description="Pelanggan yang Anda daftarkan atau beli paket langganannya akan muncul di sini."
      />
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-border/80 bg-card/60 shadow-xl">
      <table className="w-full text-left text-sm text-muted-foreground font-mono">
        <thead className="border-b border-border/80 bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-5 py-4 font-sans">Status</th>
            <th className="px-5 py-4 font-sans">User ID</th>
            <th className="px-5 py-4 font-sans">Paket Langganan</th>
            <th className="px-5 py-4 font-sans">Maks. Device</th>
            <th className="px-5 py-4 font-sans">Masa Berlaku</th>
          </tr>
        </thead>
        <tbody className="divide-y border-border/40 text-xs">
          {subscriptions.map((sub) => (
            <tr key={sub.id} className="hover:bg-muted/20 transition-colors">
              <td className="px-5 py-3.5">
                <SubscriptionStatusBadge status={sub.status} />
              </td>

              <td className="px-5 py-3.5 font-sans">
                <div className="flex items-center gap-1.5 text-foreground font-mono">
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="font-bold">#{sub.user_id}</span>
                </div>
              </td>

              <td className="px-5 py-3.5 font-sans">
                <span className="font-bold text-foreground">
                  {sub.plan?.name || "Premium VPN"}
                </span>
              </td>

              <td className="px-5 py-3.5 text-foreground">
                <div className="flex items-center gap-1">
                  <Smartphone className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{sub.plan?.max_devices || 5} Devices</span>
                </div>
              </td>

              <td className="px-5 py-3.5 font-sans text-muted-foreground">
                <div className="flex items-center gap-1.5 font-mono text-[11px]">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{new Date(sub.end_date).toLocaleDateString("id-ID")}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

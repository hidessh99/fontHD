// ==============================================================================
// GoVPN VPN Seller Overview View (Composite Page View for Reseller App Router)
// Part of Pola C: views/seller/SellerVpnOverviewView.tsx
// 100% Coinbase Design System (56px Pill Buttons, Near-Black Canvas, Dark Cards)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { Layers, Plus, RefreshCw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { EmptyState } from "@/components/shared/EmptyState";
import { SellerQuotaProgress } from "../../components/seller/SellerQuotaProgress";
import { SellerServerCard } from "../../components/seller/SellerServerCard";
import { BulkAccountMintModal } from "../../components/seller/BulkAccountMintModal";
import { useVpnSeller } from "../../hooks/useVpnSeller";

export function SellerVpnOverviewView() {
  const { servers, isLoading, refresh, deleteServer } = useVpnSeller();
  const [bulkMintOpen, setBulkMintOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Reseller Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1 text-primary">
            <ShieldCheck className="size-5" />
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Reseller & Partner VPN Hub
            </h1>
          </div>
          <p className="text-xs text-muted-foreground">
            Manajemen armada server reseller, kuota lisensi grosir, dan
            pencetakan batch akun VPN.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refresh()}
            disabled={isLoading}
            className="text-xs font-mono h-10 px-4 rounded-full"
          >
            <RefreshCw
              className={`mr-1.5 size-3.5 ${isLoading ? "animate-spin" : ""}`}
            />
            Segarkan
          </Button>

          <Button
            size="sm"
            onClick={() => setBulkMintOpen(true)}
            className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold h-10 px-5 rounded-full shadow-md shadow-primary/25"
          >
            <Layers className="mr-1.5 size-4" /> Cetak Massal Akun
          </Button>
        </div>
      </div>

      {/* Quota Progress Bar */}
      <SellerQuotaProgress
        totalQuota={100}
        usedQuota={42}
        remainingQuota={58}
      />

      {/* Reseller Dedicated Servers Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold tracking-wider uppercase text-muted-foreground font-mono">
            Node Server Khusus Reseller ({servers.length})
          </h2>
        </div>

        {isLoading ? (
          <div className="flex h-48 w-full items-center justify-center">
            <Spinner className="size-6 text-primary animate-spin" />
          </div>
        ) : servers.length === 0 ? (
          <EmptyState
            icon={Layers}
            title="Belum Ada Node Server Reseller"
            description="Anda belum mendaftarkan VPS dedicated untuk sub-klien Anda. Tambahkan server node untuk mulai mendistribusikan tunneling."
            action={
              <Button
                size="sm"
                onClick={() => setBulkMintOpen(true)}
                className="bg-primary hover:bg-primary-hover text-white text-xs rounded-full min-h-10 px-6 shadow-md shadow-primary/25"
              >
                <Plus className="mr-1.5 size-4" /> Daftarkan Server Perdana
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {servers.map((server) => (
              <SellerServerCard
                key={server.id}
                server={server}
                onDelete={deleteServer}
              />
            ))}
          </div>
        )}
      </div>

      <BulkAccountMintModal
        isOpen={bulkMintOpen}
        onClose={() => setBulkMintOpen(false)}
      />
    </div>
  );
}

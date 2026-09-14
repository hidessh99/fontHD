// ==============================================================================
// GoVPN VPN Superadmin Servers View (Composite Page View for Admin App Router)
// Part of Pola C: views/admin/AdminServersView.tsx
// 100% Coinbase Design System (56px Pill Buttons, Near-Black Canvas, Dark Cards)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { Server, Plus, RefreshCw, CreditCard, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { EmptyState } from "@/components/shared/EmptyState";
import { ServerNodeFormModal } from "../../components/admin/ServerNodeFormModal";
import { TriggerBillingModal } from "../../components/admin/TriggerBillingModal";
import { SellerServerCard } from "../../components/seller/SellerServerCard";
import { useVpnUser } from "../../hooks/useVpnUser";
import { ServerNode } from "../../types/vpn.types";

export function AdminServersView() {
  const { servers, isLoading, refresh } = useVpnUser();

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState<ServerNode | null>(null);
  const [billingModalOpen, setBillingModalOpen] = useState(false);

  const handleEdit = (server: ServerNode) => {
    setSelectedServer(server);
    setFormModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedServer(null);
    setFormModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1 text-primary">
            <ShieldAlert className="size-5" />
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Superadmin Global Server Fleet
            </h1>
          </div>
          <p className="text-xs text-muted-foreground">
            Kontrol penuh seluruh node VPS (Always, Month, PayAsYouGo, Free),
            port routing, dan manual cron trigger.
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
            variant="outline"
            size="sm"
            onClick={() => setBillingModalOpen(true)}
            className="text-xs font-mono h-10 px-4 rounded-full text-amber-400 border-amber-500/30 hover:bg-amber-500/10"
          >
            <CreditCard className="mr-1.5 size-3.5" /> Trigger Billing
          </Button>

          <Button
            size="sm"
            onClick={handleAddNew}
            className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold h-10 px-5 rounded-full shadow-md shadow-primary/25"
          >
            <Plus className="mr-1.5 size-4" /> Tambah Node VPS
          </Button>
        </div>
      </div>

      {/* Servers Grid */}
      {isLoading ? (
        <div className="flex h-64 w-full items-center justify-center">
          <Spinner className="size-6 text-primary animate-spin" />
        </div>
      ) : servers.length === 0 ? (
        <EmptyState
          icon={Server}
          title="Tidak Ada Server Terdaftar"
          description="Belum ada server VPS yang didaftarkan di sistem. Tambahkan server node baru sekarang."
          action={
            <Button
              size="sm"
              onClick={handleAddNew}
              className="bg-primary hover:bg-primary-hover text-white text-xs rounded-full min-h-10 px-6 shadow-md shadow-primary/25"
            >
              <Plus className="mr-1.5 size-4" /> Tambah Server Perdana
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {servers.map((server) => (
            <SellerServerCard
              key={server.id}
              server={server}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}

      <ServerNodeFormModal
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        server={selectedServer}
        onSuccess={() => refresh()}
      />

      <TriggerBillingModal
        isOpen={billingModalOpen}
        onClose={() => setBillingModalOpen(false)}
      />
    </div>
  );
}

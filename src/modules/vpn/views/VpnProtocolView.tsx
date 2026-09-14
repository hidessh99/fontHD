"use client";

import React, { useState } from "react";
import { Plus, Zap, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProtocolBadge } from "@/components/shared/ProtocolBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { Spinner } from "@/components/ui/spinner";
import { VpnAccountCard } from "../components/VpnAccountCard";
import { CreateVpnModal } from "../components/CreateVpnModal";
import { useVpnAccounts } from "../hooks/useVpnAccounts";

interface VpnProtocolViewProps {
  protocol: string;
}

export function VpnProtocolView({ protocol }: VpnProtocolViewProps) {
  const normProto = protocol.toLowerCase();
  const { accounts, isLoading, refresh, renewAccount, deleteAccount } =
    useVpnAccounts(normProto);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <ProtocolBadge protocol={normProto} />
            <h1 className="text-xl font-bold tracking-tight">
              Manajemen Akun {normProto.toUpperCase()}
            </h1>
          </div>
          <p className="text-xs text-muted-foreground">
            Daftar akun tunneling aktif, masa berlaku, dan kredensial koneksi 1-Click Copy.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refresh()}
            disabled={isLoading}
            className="text-xs font-mono h-9"
          >
            <RefreshCw
              className={`mr-1.5 size-3.5 ${isLoading ? "animate-spin" : ""}`}
            />
            Segarkan
          </Button>

          <Button
            size="sm"
            onClick={() => setCreateModalOpen(true)}
            className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold h-9 shadow-md shadow-primary/20"
          >
            <Plus className="mr-1.5 size-4" /> Buat Akun {normProto.toUpperCase()}
          </Button>
        </div>
      </div>

      {/* Account List Grid */}
      {isLoading ? (
        <div className="flex h-64 w-full items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-center">
            <Spinner className="size-6 text-primary animate-spin" />
            <p className="text-xs font-mono text-muted-foreground">
              Memuat akun {normProto.toUpperCase()}...
            </p>
          </div>
        </div>
      ) : accounts.length === 0 ? (
        <EmptyState
          icon={Zap}
          title={`Belum Ada Akun ${normProto.toUpperCase()}`}
          description={`Anda belum memiliki akun tunneling ${normProto.toUpperCase()} yang aktif. Buat akun baru sekarang untuk memulai koneksi.`}
          action={
            <Button
              size="sm"
              onClick={() => setCreateModalOpen(true)}
              className="bg-primary hover:bg-primary-hover text-white text-xs"
            >
              <Plus className="mr-1.5 size-3.5" /> Buat Akun Perdana
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((acc) => (
            <VpnAccountCard
              key={acc.id}
              account={acc}
              onRenew={(id) => renewAccount(id)}
              onDelete={(id) => deleteAccount(id)}
            />
          ))}
        </div>
      )}

      {/* Create Account Modal */}
      <CreateVpnModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        protocol={normProto}
        onSuccess={() => refresh()}
      />
    </div>
  );
}

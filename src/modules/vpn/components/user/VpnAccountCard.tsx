// ==============================================================================
// GoVPN VPN User Account Card Component
// Part of Pola C: components/user/
// Integrates Algorithm 3 (Optimistic Mutations: Pause, Resume, Renew)
// ==============================================================================

"use client";

import React, { useState } from "react";
import {
  Server,
  Calendar,
  QrCode,
  RefreshCw,
  Trash2,
  PauseCircle,
  PlayCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProtocolBadge } from "@/components/shared/ProtocolBadge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { CopyButton } from "@/components/shared/CopyButton";
import { QrCodeModal } from "@/components/shared/QrCodeModal";
import { VpnAccount } from "../../types/vpn.types";
import { formatDateShort } from "@/lib/utils";
import { useVpnUserStore } from "../../store/vpn-user.store";
import { toast } from "sonner";

interface VpnAccountCardProps {
  account: VpnAccount;
  onRenew?: (accountId: number | string) => void;
  onDelete?: (accountId: number | string) => void;
}

export function VpnAccountCard({
  account,
  onRenew,
  onDelete,
}: VpnAccountCardProps) {
  const [qrOpen, setQrOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const optimisticPauseAccount = useVpnUserStore(
    (s) => s.optimisticPauseAccount,
  );
  const optimisticResumeAccount = useVpnUserStore(
    (s) => s.optimisticResumeAccount,
  );

  const configString =
    account.config_url ||
    account.raw_config ||
    `${account.protocol}://${account.username}@${account.server_host || "vpn.hidessh.com"}:${account.port || 443}`;

  const isPaused = account.status === "PAUSED";
  const isPayas = account.tier === "payas";

  const handleTogglePayas = async () => {
    setIsPending(true);
    if (isPaused) {
      const result = await optimisticResumeAccount(account.id);
      if (result.success) {
        toast.success(`Akun ${account.username} aktif kembali!`);
      } else {
        toast.error(result.error || "Gagal mengaktifkan akun.");
      }
    } else {
      const result = await optimisticPauseAccount(account.id);
      if (result.success) {
        toast.info(`Akun ${account.username} berhasil dijeda.`);
      } else {
        toast.error(result.error || "Gagal menjeda akun.");
      }
    }
    setIsPending(false);
  };

  return (
    <>
      <Card className="border-border/80 bg-card/60 hover:border-primary/40 hover:bg-card transition-all duration-200">
        <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2.5">
            <ProtocolBadge protocol={account.protocol} />
            <div>
              <CardTitle className="text-sm font-bold font-mono">
                {account.username}
              </CardTitle>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                <Server className="size-3" />
                <span>
                  {account.server_name ||
                    account.server_host ||
                    `Server #${account.server_id}`}
                </span>
              </div>
            </div>
          </div>
          <StatusBadge status={account.status} />
        </CardHeader>

        <CardContent className="space-y-3 pt-1">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono p-2.5 rounded-xl bg-surface border border-border/60">
            <div>
              <span className="text-[10px] text-muted-foreground uppercase block">
                Host / Server
              </span>
              <span className="font-semibold truncate block">
                {account.server_host || "vpn.hidessh.com"}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground uppercase block">
                Port
              </span>
              <span className="font-semibold block">{account.port || 443}</span>
            </div>
            {account.uuid && (
              <div className="col-span-2">
                <span className="text-[10px] text-muted-foreground uppercase block">
                  UUID
                </span>
                <span className="text-[11px] truncate block text-primary">
                  {account.uuid}
                </span>
              </div>
            )}
            <div className="col-span-2 flex items-center justify-between border-t border-border/40 pt-1.5 mt-0.5">
              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Calendar className="size-3" /> Kedaluwarsa
              </span>
              <span className="text-xs font-semibold text-foreground">
                {formatDateShort(account.expired_at)}
              </span>
            </div>
          </div>

          {/* Quick Actions Toolbar */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-1.5">
              <CopyButton
                text={configString}
                label="Salin Config"
                successMessage="Config VPN disalin!"
                size="sm"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQrOpen(true)}
                className="h-8 px-2.5 text-xs font-mono rounded-full"
                title="Tampilkan QR Code"
              >
                <QrCode className="size-3.5 text-primary" />
              </Button>

              {/* PayAsYouGo Instant Pause/Resume Toggle */}
              {isPayas && (
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isPending}
                  onClick={handleTogglePayas}
                  className="h-8 px-2.5 text-xs font-mono rounded-full"
                  title={
                    isPaused ? "Lanjutkan Billing Akun" : "Jeda Akun Sementara"
                  }
                >
                  {isPaused ? (
                    <PlayCircle className="size-3.5 text-emerald-400" />
                  ) : (
                    <PauseCircle className="size-3.5 text-amber-400" />
                  )}
                </Button>
              )}
            </div>

            <div className="flex items-center gap-1">
              {onRenew && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRenew(account.id)}
                  className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground rounded-full"
                  title="Perpanjang Akun"
                >
                  <RefreshCw className="size-3.5" />
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(account.id)}
                  className="h-8 px-2 text-xs text-muted-foreground hover:text-destructive rounded-full"
                  title="Hapus Akun"
                >
                  <Trash2 className="size-3.5" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <QrCodeModal
        isOpen={qrOpen}
        onClose={() => setQrOpen(false)}
        dataString={configString}
        title={`Scan Konfigurasi ${account.protocol.toUpperCase()}`}
        protocolName={account.protocol.toUpperCase()}
      />
    </>
  );
}

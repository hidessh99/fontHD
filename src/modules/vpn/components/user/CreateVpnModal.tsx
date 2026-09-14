// ==============================================================================
// GoVPN VPN User Create Account Modal
// Part of Pola C: components/user/
// 100% Coinbase Design System (Pill Buttons, Responsive Dialog, JetBrains Mono)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { Zap, Lock, User, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProtocolBadge } from "@/components/shared/ProtocolBadge";
import { ServerNode, VpnAccount, VpnProtocol } from "../../types/vpn.types";
import { vpnUserApi } from "../../api/user.api";
import { toast } from "sonner";
import { useVpnUserStore } from "../../store/vpn-user.store";

interface CreateVpnModalProps {
  isOpen: boolean;
  onClose: () => void;
  protocol: VpnProtocol;
  onSuccess?: (account: VpnAccount) => void;
}

export function CreateVpnModal({
  isOpen,
  onClose,
  protocol,
  onSuccess,
}: CreateVpnModalProps) {
  const servers = useVpnUserStore((s) => s.servers);
  const fetchUserAccounts = useVpnUserStore((s) => s.fetchUserAccounts);

  const [selectedServerId, setSelectedServerId] = useState<number | null>(null);
  const [selectedTier, setSelectedTier] = useState<"month" | "always" | "payas">("month");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    duration_days: 30,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedServerId || !formData.username) return;

    setIsSubmitting(true);
    try {
      const txId = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `tx_${Date.now()}`;
      let res;

      if (selectedTier === "always") {
        res = await vpnUserApi.createAlwaysAccount(
          {
            server_id: selectedServerId,
            protocol,
            username: formData.username,
            password: formData.password || undefined,
            duration_days: formData.duration_days,
          },
          txId
        );
      } else if (selectedTier === "payas") {
        res = await vpnUserApi.createPayasAccount(
          {
            server_id: selectedServerId,
            protocol,
            username: formData.username,
            password: formData.password || undefined,
          },
          txId
        );
      } else {
        res = await vpnUserApi.createMonthAccount(
          {
            server_id: selectedServerId,
            protocol,
            username: formData.username,
            password: formData.password || undefined,
            duration_days: formData.duration_days,
          },
          txId
        );
      }

      if (res.payload) {
        toast.success(`Akun ${protocol.toUpperCase()} berhasil dibuat!`);
        await fetchUserAccounts();
        onSuccess?.(res.payload);
        onClose();
      } else {
        toast.error(res.message || "Gagal membuat akun.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal membuat akun.";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg border-border/80 bg-card rounded-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <ProtocolBadge protocol={protocol} />
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Order Baru
            </span>
          </div>
          <DialogTitle className="text-lg font-bold">
            Buat Akun {protocol.toUpperCase()} Tunnel
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Pilih paket masa aktif dan server node tujuan akun tunneling Anda.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Tier Selector */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Model Berlangganan</Label>
            <div className="grid grid-cols-3 gap-2">
              {(["month", "always", "payas"] as const).map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setSelectedTier(tier)}
                  className={`p-2.5 rounded-xl border text-center text-xs font-semibold uppercase tracking-wider transition-all ${
                    selectedTier === tier
                      ? "border-primary bg-primary/10 text-primary shadow-sm"
                      : "border-border/60 bg-surface/50 text-muted-foreground hover:border-border hover:text-foreground"
                  }`}
                >
                  {tier === "month" ? "Bulanan" : tier === "always" ? "Always On" : "Pay As You Go"}
                </button>
              ))}
            </div>
          </div>

          {/* Server Selector */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Pilih Server Node</Label>
            {servers.length === 0 ? (
              <div className="p-3 rounded-xl border border-dashed border-border text-center text-xs text-muted-foreground">
                Memuat server atau tidak ada server aktif untuk protokol ini.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-1">
                {servers.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedServerId(s.id)}
                    className={`flex items-center justify-between p-2 rounded-xl border text-left text-xs transition-all ${
                      selectedServerId === s.id
                        ? "border-primary bg-primary/10 text-foreground shadow-sm"
                        : "border-border/60 bg-surface/50 hover:border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="font-mono font-bold text-[10px]">
                        [{s.country_code}]
                      </span>
                      <span className="truncate font-medium">{s.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">
                      {s.latency_ms}ms
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Username & Password */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="vpn-username" className="text-xs font-medium">
                Username Akun
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 size-3.5 text-muted-foreground" />
                <Input
                  id="vpn-username"
                  placeholder="user-vpn"
                  className="pl-8 text-xs font-mono rounded-xl min-h-10"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, username: e.target.value }))
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="vpn-password" className="text-xs font-medium">
                Kata Sandi / Key
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 size-3.5 text-muted-foreground" />
                <Input
                  id="vpn-password"
                  placeholder="Pass123!"
                  className="pl-8 text-xs font-mono rounded-xl min-h-10"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, password: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/50">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-xs rounded-full min-h-10 px-5"
            >
              Batal
            </Button>
            <Button
              type="submit"
              size="sm"
              className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-full min-h-10 px-6 shadow-md shadow-primary/25"
              disabled={isSubmitting || !selectedServerId || !formData.username}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-1.5 size-3.5 animate-spin" /> Membuat Akun...
                </>
              ) : (
                <>
                  <Zap className="mr-1.5 size-3.5" /> Konfirmasi & Buat Akun
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

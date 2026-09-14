"use client";

import React, { useState } from "react";
import { Zap, Server, Lock, User, Calendar, Loader2 } from "lucide-react";
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
import { useVpnServers } from "../hooks/useVpnServers";
import { useVpnAccounts } from "../hooks/useVpnAccounts";
import { VpnAccount } from "../types/vpn.types";

interface CreateVpnModalProps {
  isOpen: boolean;
  onClose: () => void;
  protocol: string;
  onSuccess?: (account: VpnAccount) => void;
}

export function CreateVpnModal({
  isOpen,
  onClose,
  protocol,
  onSuccess,
}: CreateVpnModalProps) {
  const { servers } = useVpnServers(protocol);
  const { createAccount, isMutating } = useVpnAccounts(protocol);

  const [selectedServerId, setSelectedServerId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    duration_days: 30,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedServerId || !formData.username || !formData.password) return;

    const newAcc = await createAccount({
      server_id: selectedServerId,
      protocol: protocol.toLowerCase(),
      username: formData.username,
      password: formData.password,
      duration_days: formData.duration_days,
    });

    if (newAcc) {
      onSuccess?.(newAcc);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg border-border/80 bg-card">
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
            Pilih server node tujuan dan masukkan kredensial akun tunneling Anda.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
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
                  className="pl-8 text-xs font-mono"
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
                Kata Sandi
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 size-3.5 text-muted-foreground" />
                <Input
                  id="vpn-password"
                  placeholder="Pass123!"
                  className="pl-8 text-xs font-mono"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, password: e.target.value }))
                  }
                  required
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
              className="text-xs"
            >
              Batal
            </Button>
            <Button
              type="submit"
              size="sm"
              className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold"
              disabled={isMutating || !selectedServerId || !formData.username || !formData.password}
            >
              {isMutating ? (
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

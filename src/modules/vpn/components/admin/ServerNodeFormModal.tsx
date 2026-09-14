// ==============================================================================
// GoVPN VPN Superadmin Server Node Form Modal
// Part of Pola C: components/admin/
// 100% Coinbase Design System (56px Pill CTA, JetBrains Mono, Server Node CRUD)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { Server, Loader2, Save } from "lucide-react";
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
import { toast } from "sonner";
import { ServerNode, VpnProtocol } from "../../types/vpn.types";
import { vpnAdminApi } from "../../api/admin.api";

interface ServerNodeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  server?: ServerNode | null;
  onSuccess?: () => void;
}

export function ServerNodeFormModal({
  isOpen,
  onClose,
  server,
  onSuccess,
}: ServerNodeFormModalProps) {
  const isEditing = Boolean(server);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: server?.name || "",
    ip: server?.ip || "",
    domain: server?.domain || "",
    country: server?.country || "Singapore",
    country_code: server?.country_code || "SG",
    max_users: server?.max_users || 100,
    tier: server?.tier || "month",
    price_per_month: server?.price_per_month || 15000,
    price_hourly: server?.price_hourly || 50,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isEditing && server) {
        if (formData.tier === "always") {
          await vpnAdminApi.updateAlwaysServer(server.id, formData);
        } else if (formData.tier === "payas") {
          await vpnAdminApi.updatePayasServer(server.id, formData);
        } else if (formData.tier === "free") {
          await vpnAdminApi.updateFreeServer(server.id, formData);
        } else {
          await vpnAdminApi.updateMonthServer(server.id, formData);
        }
        toast.success(`Server ${formData.name} berhasil diperbarui!`);
      } else {
        const payload = {
          ...formData,
          supported_protocols: ["vmess", "vless", "trojan", "ssh"] as VpnProtocol[],
        };
        if (formData.tier === "always") {
          await vpnAdminApi.createAlwaysServer(payload);
        } else if (formData.tier === "payas") {
          await vpnAdminApi.createPayasServer(payload);
        } else if (formData.tier === "free") {
          await vpnAdminApi.createFreeServer(payload);
        } else {
          await vpnAdminApi.createMonthServer(payload);
        }
        toast.success(`Server node baru ${formData.name} berhasil ditambahkan!`);
      }

      onSuccess?.();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan konfigurasi server.";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg border-border/80 bg-card rounded-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1 text-primary">
            <Server className="size-4" />
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Superadmin Controls
            </span>
          </div>
          <DialogTitle className="text-lg font-bold">
            {isEditing ? `Edit Server Node #${server?.id}` : "Tambah Server Node Baru"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Konfigurasikan alamat IP publik, domain DNS, kuota kapasitas, dan biaya tiering.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2 font-mono">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Nama Server</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="SG-Premium-01"
                className="rounded-xl min-h-10 text-xs"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Negara / Kode</Label>
              <Input
                value={formData.country_code}
                onChange={(e) => setFormData({ ...formData, country_code: e.target.value.toUpperCase() })}
                placeholder="SG"
                className="rounded-xl min-h-10 text-xs uppercase"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">IP Publik Server</Label>
              <Input
                value={formData.ip}
                onChange={(e) => setFormData({ ...formData, ip: e.target.value })}
                placeholder="103.150.xxx.xxx"
                className="rounded-xl min-h-10 text-xs"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Domain DNS</Label>
              <Input
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                placeholder="sg1.hidessh.com"
                className="rounded-xl min-h-10 text-xs"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Kapasitas Max Users</Label>
              <Input
                type="number"
                value={formData.max_users}
                onChange={(e) => setFormData({ ...formData, max_users: Number(e.target.value) })}
                className="rounded-xl min-h-10 text-xs"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Tier Berlangganan</Label>
              <select
                value={formData.tier}
                onChange={(e) => setFormData({ ...formData, tier: e.target.value as any })}
                className="w-full rounded-xl min-h-10 text-xs bg-surface border border-border px-3 font-mono"
              >
                <option value="month">Month</option>
                <option value="always">Always</option>
                <option value="payas">PayAsYouGo</option>
                <option value="free">Free</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/50">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-xs rounded-full min-h-10 px-5 font-sans"
            >
              Batal
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-full min-h-10 px-6 font-sans shadow-md shadow-primary/25"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-1.5 size-3.5 animate-spin" /> Menyimpan...
                </>
              ) : (
                <>
                  <Save className="mr-1.5 size-3.5" /> Simpan Node
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

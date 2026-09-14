// ==============================================================================
// GoVPN Admin Plan Table Component
// Part of Pola C: components/admin/AdminPlanTable.tsx
// 100% Coinbase Institutional Design System (Membership Plans Management)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { Plan, BillingCycle } from "../../types/subscription.types";
import { AdminCreatePlanDto } from "../../types/admin.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ShieldCheck, Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { EmptyState } from "@/components/shared/EmptyState";

interface AdminPlanTableProps {
  plans: Plan[];
  onCreatePlan: (dto: AdminCreatePlanDto) => Promise<unknown>;
  onDeletePlan: (id: string | number) => Promise<unknown>;
  loading?: boolean;
}

export function AdminPlanTable({
  plans,
  onCreatePlan,
  onDeletePlan,
  loading = false,
}: AdminPlanTableProps) {
  const [openCreate, setOpenCreate] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState(35000);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("MONTHLY");
  const [maxDevices, setMaxDevices] = useState(3);
  const [bandwidth, setBandwidth] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Nama paket wajib diisi");
      return;
    }

    setSubmitting(true);
    try {
      await onCreatePlan({
        name: name.trim(),
        slug:
          slug.trim().toLowerCase() ||
          name.trim().toLowerCase().replace(/\s+/g, "-"),
        price: Number(price) || 35000,
        billing_cycle: billingCycle,
        max_devices: Number(maxDevices) || 3,
        bandwidth_gb: Number(bandwidth) || 0,
        is_active: true,
        features: ["Semua Protokol VPN", "High Speed Node", "Support 24/7"],
      });
      setOpenCreate(false);
      setName("");
      setSlug("");
      toast.success("Paket langganan baru berhasil ditambahkan");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (
      !confirm(
        "Hapus paket ini? Pengguna yang berlangganan aktif tidak akan terpengaruh.",
      )
    )
      return;
    setDeletingId(id);
    try {
      await onDeletePlan(id);
      toast.success("Paket berhasil dihapus");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Daftar Paket Berlangganan (Membership Tiers)
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Konfigurasi paket keanggotaan publik, batas perangkat simultan, dan
            tarif tagihan
          </p>
        </div>

        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger
            render={
              <Button
                size="sm"
                className="h-9 px-3.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs gap-1.5 shadow-md shadow-primary/20"
              >
                <Plus className="h-4 w-4" />
                Tambah Paket
              </Button>
            }
          />
          <DialogContent className="sm:max-w-md bg-card border-border text-foreground shadow-2xl rounded-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base font-bold">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Tambah Paket Membership Baru
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-3.5 pt-2">
              <div>
                <Label className="text-xs text-muted-foreground">
                  Nama Paket
                </Label>
                <Input
                  placeholder="misal: Premium Pro Monthly"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 bg-muted/30 border-border text-foreground text-xs h-10"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">
                  Harga Langganan (IDR)
                </Label>
                <Input
                  type="number"
                  step="5000"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Siklus Tagihan
                  </Label>
                  <select
                    value={billingCycle}
                    onChange={(e) =>
                      setBillingCycle(e.target.value as BillingCycle)
                    }
                    className="mt-1.5 w-full rounded-xl border border-border bg-card px-3 py-2 text-xs font-mono text-foreground outline-none focus:border-primary"
                  >
                    <option value="MONTHLY">Bulanan</option>
                    <option value="QUARTERLY">3 Bulan</option>
                    <option value="SEMI_ANNUAL">6 Bulan</option>
                    <option value="ANNUAL">Tahunan</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Maks. Perangkat
                  </Label>
                  <Input
                    type="number"
                    value={maxDevices}
                    onChange={(e) => setMaxDevices(Number(e.target.value))}
                    className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">
                  Batas Kuota GB (0 = Unlimited)
                </Label>
                <Input
                  type="number"
                  value={bandwidth}
                  onChange={(e) => setBandwidth(Number(e.target.value))}
                  className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs gap-2 mt-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Menyimpan Paket...
                  </>
                ) : (
                  "Simpan Paket Membership"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="w-full h-64 flex flex-col items-center justify-center gap-3 rounded-2xl border border-border/80 bg-card/40">
          <Loader2 className="h-7 w-7 animate-spin text-primary" />
          <p className="text-xs text-muted-foreground font-medium">
            Memuat daftar paket langganan...
          </p>
        </div>
      ) : plans.length === 0 ? (
        <EmptyState
          icon={ShieldCheck}
          title="Belum Ada Paket"
          description="Tambahkan paket keanggotaan pertama Anda untuk mulai menerima langganan pengguna."
        />
      ) : (
        <div className="w-full overflow-x-auto rounded-2xl border border-border/80 bg-card/60 shadow-xl">
          <table className="w-full text-left text-sm text-muted-foreground font-mono">
            <thead className="border-b border-border/80 bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4 font-sans">Nama Paket</th>
                <th className="px-5 py-4 font-sans">Siklus</th>
                <th className="px-5 py-4 font-sans">Maks. Device</th>
                <th className="px-5 py-4 font-sans">Bandwidth</th>
                <th className="px-5 py-4 font-sans">Tarif</th>
                <th className="px-5 py-4 font-sans text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y border-border/40 text-xs">
              {plans.map((p) => (
                <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3.5 font-sans font-bold text-foreground">
                    {p.name}
                  </td>

                  <td className="px-5 py-3.5 text-foreground">
                    {p.billing_cycle}
                  </td>

                  <td className="px-5 py-3.5 text-foreground">
                    {p.max_devices} Devices
                  </td>

                  <td className="px-5 py-3.5 text-foreground">
                    {p.bandwidth_gb > 0 ? `${p.bandwidth_gb} GB` : "Unlimited"}
                  </td>

                  <td className="px-5 py-3.5">
                    <span className="text-emerald-400 font-bold font-mono">
                      Rp {p.price.toLocaleString("id-ID")}
                    </span>
                  </td>

                  <td className="px-5 py-3.5 text-right font-sans">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={deletingId === p.id}
                      onClick={() => handleDelete(p.id)}
                      className="h-8 w-8 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
                    >
                      {deletingId === p.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

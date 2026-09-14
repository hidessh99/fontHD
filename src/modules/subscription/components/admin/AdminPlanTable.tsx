// ==============================================================================
// GoVPN Admin Plan Table Component
// Part of Pola C: components/admin/AdminPlanTable.tsx
// 100% Coinbase Institutional Design System + Standardized Enterprise DataTable
// ==============================================================================

"use client";

import React, { useState, useMemo } from "react";
import { Plan, BillingCycle } from "../../types/subscription.types";
import { AdminCreatePlanDto } from "../../types/admin.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataTable, ColumnDef, DataTableFilterConfig } from "@/components/shared/data-table";
import { ShieldCheck, Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

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

  const columns: ColumnDef<Plan>[] = useMemo(
    () => [
      {
        id: "name",
        header: "Nama Paket",
        className: "font-sans font-bold text-foreground",
        cell: (p) => p.name,
      },
      {
        id: "billing_cycle",
        header: "Siklus",
        className: "text-foreground font-mono text-xs",
        cell: (p) => p.billing_cycle,
      },
      {
        id: "max_devices",
        header: "Maks. Device",
        className: "text-foreground font-mono text-xs",
        cell: (p) => `${p.max_devices} Devices`,
      },
      {
        id: "bandwidth",
        header: "Bandwidth",
        className: "text-foreground font-mono text-xs",
        cell: (p) => (p.bandwidth_gb > 0 ? `${p.bandwidth_gb} GB` : "Unlimited"),
      },
      {
        id: "price",
        header: "Tarif",
        cell: (p) => (
          <span className="text-emerald-400 font-bold font-mono text-xs">
            Rp {p.price.toLocaleString("id-ID")}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Aksi",
        align: "right",
        cell: (p) => (
          <Button
            variant="ghost"
            size="sm"
            disabled={deletingId === p.id}
            onClick={() => handleDelete(p.id)}
            className="h-8 w-8 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
            title="Hapus Paket"
          >
            {deletingId === p.id ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
          </Button>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deletingId],
  );

  const filters: DataTableFilterConfig<Plan>[] = useMemo(
    () => [
      {
        id: "cycle",
        label: "Siklus",
        defaultValue: "ALL",
        options: [
          { label: "Semua Siklus", value: "ALL" },
          { label: "Bulanan", value: "MONTHLY" },
          { label: "3 Bulan", value: "QUARTERLY" },
          { label: "6 Bulan", value: "SEMI_ANNUAL" },
          { label: "Tahunan", value: "ANNUAL" },
        ],
        filterFn: (p, val) => p.billing_cycle?.toUpperCase() === val.toUpperCase(),
      },
    ],
    [],
  );

  const actions = (
    <Dialog open={openCreate} onOpenChange={setOpenCreate}>
      <DialogTrigger
        render={
          <Button
            size="sm"
            className="h-9 px-3.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs gap-1.5 shadow-md shadow-primary/20"
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
            <Label className="text-xs text-muted-foreground">Nama Paket</Label>
            <Input
              placeholder="misal: Premium Pro Monthly"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 bg-muted/30 border-border text-foreground text-xs h-10"
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Harga Langganan (IDR)</Label>
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
              <Label className="text-xs text-muted-foreground">Siklus Tagihan</Label>
              <NativeSelect
                variant="rounded"
                value={billingCycle}
                onChange={(e) =>
                  setBillingCycle(e.target.value as BillingCycle)
                }
                className="mt-1.5 w-full text-xs font-mono"
              >
                <option value="MONTHLY">Bulanan</option>
                <option value="QUARTERLY">3 Bulan</option>
                <option value="SEMI_ANNUAL">6 Bulan</option>
                <option value="ANNUAL">Tahunan</option>
              </NativeSelect>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Maks. Perangkat</Label>
              <Input
                type="number"
                value={maxDevices}
                onChange={(e) => setMaxDevices(Number(e.target.value))}
                className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Batas Kuota GB (0 = Unlimited)</Label>
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
            className="w-full h-10 rounded-full bg-primary hover:bg-primary-hover text-white font-bold text-xs gap-2 mt-2 shadow-md shadow-primary/25"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Menyimpan Paket...
              </>
            ) : (
              "Simpan Paket Membership"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-primary" />
          Daftar Paket Berlangganan (Membership Tiers)
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Konfigurasi paket keanggotaan publik, batas perangkat simultan, dan tarif tagihan
        </p>
      </div>

      <DataTable<Plan>
        data={plans}
        columns={columns}
        keyExtractor={(p) => p.id}
        isLoading={loading}
        searchable={true}
        searchPlaceholder="Cari nama paket, siklus, harga..."
        searchButtonText="Cari"
        searchAccessor={(p) => [p.name, p.billing_cycle, p.price]}
        filters={filters}
        paginated={true}
        pageSize={10}
        entityName="paket langganan"
        actions={actions}
        emptyIcon={ShieldCheck}
        emptyTitle="Belum Ada Paket"
        emptyDescription="Tambahkan paket keanggotaan pertama Anda untuk mulai menerima langganan pengguna."
      />
    </div>
  );
}

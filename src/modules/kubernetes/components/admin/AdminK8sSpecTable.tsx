// ==============================================================================
// GoVPN Admin Kubernetes Resource Spec Table Component
// Part of Pola C: components/admin/AdminK8sSpecTable.tsx
// 100% Coinbase Institutional Design System + Standardized Enterprise DataTable
// ==============================================================================

"use client";

import React, { useState, useMemo } from "react";
import { K8sSpec } from "../../types/k8s.types";
import { AdminCreateSpecDto } from "../../types/admin.types";
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
import { DataTable, ColumnDef } from "@/components/shared/data-table";
import { Layers, Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AdminK8sSpecTableProps {
  specs: K8sSpec[];
  onCreateSpec: (dto: AdminCreateSpecDto) => Promise<unknown>;
  onDeleteSpec: (id: string | number) => Promise<unknown>;
  loading?: boolean;
}

export function AdminK8sSpecTable({
  specs,
  onCreateSpec,
  onDeleteSpec,
  loading = false,
}: AdminK8sSpecTableProps) {
  const [openCreate, setOpenCreate] = useState(false);
  const [name, setName] = useState("");
  const [cpu, setCpu] = useState(1);
  const [ram, setRam] = useState(1024);
  const [storage, setStorage] = useState(20);
  const [price, setPrice] = useState(50000);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Nama paket spec wajib diisi");
      return;
    }

    setSubmitting(true);
    try {
      await onCreateSpec({
        name: name.trim(),
        cpu_cores: Number(cpu) || 1,
        ram_mb: Number(ram) || 1024,
        storage_gb: Number(storage) || 20,
        price_monthly: Number(price) || 50000,
        is_active: true,
      });
      setOpenCreate(false);
      setName("");
      toast.success("Paket resource spec berhasil ditambahkan");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm("Hapus paket resource spec ini?")) return;
    setDeletingId(id);
    try {
      await onDeleteSpec(id);
      toast.success("Paket resource spec berhasil dihapus");
    } finally {
      setDeletingId(null);
    }
  };

  const columns: ColumnDef<K8sSpec>[] = useMemo(
    () => [
      {
        id: "name",
        header: "Nama Spec",
        className: "font-sans font-bold text-foreground",
        cell: (s) => s.name,
      },
      {
        id: "cpu",
        header: "vCPU",
        className: "text-foreground font-mono",
        cell: (s) => `${s.cpu_cores} Cores`,
      },
      {
        id: "ram",
        header: "RAM",
        className: "text-foreground font-mono",
        cell: (s) => `${s.ram_mb} MB`,
      },
      {
        id: "storage",
        header: "Storage",
        className: "text-foreground font-mono",
        cell: (s) => `${s.storage_gb} GB`,
      },
      {
        id: "price",
        header: "Tarif Bulanan",
        cell: (s) => (
          <span className="text-emerald-400 font-bold font-mono">
            Rp {s.price_monthly.toLocaleString("id-ID")}/bln
          </span>
        ),
      },
      {
        id: "actions",
        header: "Aksi",
        align: "right",
        cell: (s) => (
          <Button
            variant="ghost"
            size="sm"
            disabled={deletingId === s.id}
            onClick={() => handleDelete(s.id)}
            className="h-8 w-8 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
            title="Hapus Spec"
          >
            {deletingId === s.id ? (
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

  const actions = (
    <Dialog open={openCreate} onOpenChange={setOpenCreate}>
      <DialogTrigger
        render={
          <Button
            size="sm"
            className="h-9 px-3.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs gap-1.5 shadow-md shadow-primary/20"
          >
            <Plus className="h-4 w-4" />
            Tambah Paket Spec
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md bg-card border-border text-foreground shadow-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-bold">
            <Layers className="h-5 w-5 text-primary" />
            Tambah Paket Resource Spec
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleCreate} className="space-y-3.5 pt-2">
          <div>
            <Label className="text-xs text-muted-foreground">Nama Paket</Label>
            <Input
              placeholder="misal: Standard 1 Core / 2GB"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 bg-muted/30 border-border text-foreground text-xs h-10"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">vCPU Cores</Label>
              <Input
                type="number"
                step="0.5"
                value={cpu}
                onChange={(e) => setCpu(Number(e.target.value))}
                className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">RAM (MB)</Label>
              <Input
                type="number"
                step="512"
                value={ram}
                onChange={(e) => setRam(Number(e.target.value))}
                className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Storage (GB)</Label>
              <Input
                type="number"
                value={storage}
                onChange={(e) => setStorage(Number(e.target.value))}
                className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Tarif Bulanan (IDR)</Label>
              <Input
                type="number"
                step="5000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full h-10 rounded-full bg-primary hover:bg-primary-hover text-white font-bold text-xs gap-2 mt-2 shadow-md shadow-primary/25"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Menyimpan Spec...
              </>
            ) : (
              "Simpan Paket Spec"
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
          <Layers className="h-4 w-4 text-primary" />
          Paket Resource Pod (Specs)
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Konfigurasi batas vCPU, RAM, dan tarif bulanan untuk deployment container
        </p>
      </div>

      <DataTable<K8sSpec>
        data={specs}
        columns={columns}
        keyExtractor={(s) => s.id}
        isLoading={loading}
        searchable={true}
        searchPlaceholder="Cari nama paket spec..."
        searchButtonText="Cari"
        searchAccessor={(s) => [s.name, s.cpu_cores, s.ram_mb, s.storage_gb]}
        paginated={true}
        pageSize={10}
        entityName="paket spec"
        actions={actions}
        emptyIcon={Layers}
        emptyTitle="Belum Ada Paket Spec"
        emptyDescription="Tambahkan paket spec pertama Anda untuk menentukan kuota dan harga container pod."
      />
    </div>
  );
}

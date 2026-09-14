// ==============================================================================
// GoVPN Admin Global Subscription Table Component
// Part of Pola C: components/admin/AdminSubscriptionTable.tsx
// 100% Coinbase Institutional Design System + Standardized Enterprise DataTable
// ==============================================================================

"use client";

import React, { useState, useMemo } from "react";
import {
  Subscription,
  Plan,
  SubscriptionStatus,
} from "../../types/subscription.types";
import { SubscriptionStatusBadge } from "../shared/SubscriptionStatusBadge";
import { Button } from "@/components/ui/button";
import { NativeSelect } from "@/components/ui/native-select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DataTable, ColumnDef, DataTableFilterConfig } from "@/components/shared/data-table";
import { ShieldCheck, User, Edit3, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AdminSubscriptionTableProps {
  subscriptions: Subscription[];
  plans: Plan[];
  onChangePlan: (
    id: string | number,
    planId: string | number,
  ) => Promise<unknown>;
  onUpdateStatus: (
    id: string | number,
    status: SubscriptionStatus,
  ) => Promise<unknown>;
  loading?: boolean;
}

export function AdminSubscriptionTable({
  subscriptions,
  plans,
  onChangePlan,
  onUpdateStatus,
  loading = false,
}: AdminSubscriptionTableProps) {
  const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);
  const [newPlanId, setNewPlanId] = useState<string | number>("");
  const [newStatus, setNewStatus] = useState<SubscriptionStatus>("ACTIVE");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleOpenDialog = (sub: Subscription) => {
    setSelectedSub(sub);
    setNewPlanId(sub.plan_id);
    setNewStatus(sub.status);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!selectedSub) return;
    setSubmitting(true);
    try {
      if (String(newPlanId) !== String(selectedSub.plan_id)) {
        await onChangePlan(selectedSub.id, newPlanId);
      }
      if (newStatus !== selectedSub.status) {
        await onUpdateStatus(selectedSub.id, newStatus);
      }
      setDialogOpen(false);
      toast.success("Perubahan langganan berhasil disimpan");
    } finally {
      setSubmitting(false);
    }
  };

  const columns: ColumnDef<Subscription>[] = useMemo(
    () => [
      {
        id: "status",
        header: "Status",
        cell: (sub) => <SubscriptionStatusBadge status={sub.status} />,
      },
      {
        id: "user_id",
        header: "User ID",
        className: "font-sans",
        cell: (sub) => (
          <div className="flex items-center gap-1.5 text-foreground font-mono">
            <User className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <span className="font-bold">#{sub.user_id}</span>
          </div>
        ),
      },
      {
        id: "plan",
        header: "Paket Langganan",
        className: "font-sans font-bold text-foreground",
        cell: (sub) => sub.plan?.name || "Premium VPN",
      },
      {
        id: "start_date",
        header: "Mulai",
        className: "font-sans text-muted-foreground",
        cell: (sub) => new Date(sub.start_date).toLocaleDateString("id-ID"),
      },
      {
        id: "end_date",
        header: "Berakhir",
        className: "font-sans text-muted-foreground",
        cell: (sub) => new Date(sub.end_date).toLocaleDateString("id-ID"),
      },
      {
        id: "actions",
        header: "Aksi",
        align: "right",
        cell: (sub) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleOpenDialog(sub)}
            className="h-8 px-2.5 text-xs text-primary hover:text-primary hover:bg-primary/10 rounded-full gap-1"
          >
            <Edit3 className="h-3.5 w-3.5" />
            Ubah
          </Button>
        ),
      },
    ],
    [],
  );

  const filters: DataTableFilterConfig<Subscription>[] = useMemo(
    () => [
      {
        id: "status",
        label: "Status",
        defaultValue: "ALL",
        options: [
          { label: "Semua Status", value: "ALL" },
          { label: "ACTIVE", value: "ACTIVE" },
          { label: "EXPIRED", value: "EXPIRED" },
          { label: "CANCELLED", value: "CANCELLED" },
        ],
        filterFn: (sub, val) => sub.status?.toUpperCase() === val.toUpperCase(),
      },
    ],
    [],
  );

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-primary" />
          Audit Global Langganan Pengguna
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Daftar seluruh langganan aktif, riwayat kadaluarsa, dan kemampuan modifikasi status
        </p>
      </div>

      <DataTable<Subscription>
        data={subscriptions}
        columns={columns}
        keyExtractor={(sub) => sub.id}
        isLoading={loading}
        searchable={true}
        searchPlaceholder="Cari user ID, nama paket..."
        searchButtonText="Cari"
        searchAccessor={(sub) => [sub.user_id, sub.plan?.name, sub.status]}
        filters={filters}
        paginated={true}
        pageSize={10}
        entityName="langganan"
        emptyIcon={ShieldCheck}
        emptyTitle="Belum Ada Langganan"
        emptyDescription="Langganan pengguna akan terdata secara otomatis di sini."
      />

      {/* Override Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border text-foreground shadow-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base font-bold">
              <Edit3 className="h-4 w-4 text-primary" />
              Modifikasi Langganan #{selectedSub?.id}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <span className="text-xs text-muted-foreground block mb-1.5">
                Ganti Paket Membership
              </span>
              <NativeSelect
                variant="rounded"
                value={String(newPlanId)}
                onChange={(e) => setNewPlanId(e.target.value)}
                className="w-full text-xs font-mono"
              >
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} - Rp {p.price.toLocaleString("id-ID")}
                  </option>
                ))}
              </NativeSelect>
            </div>

            <div>
              <span className="text-xs text-muted-foreground block mb-1.5">
                Override Status Langganan
              </span>
              <NativeSelect
                variant="rounded"
                value={newStatus}
                onChange={(e) =>
                  setNewStatus(e.target.value as SubscriptionStatus)
                }
                className="w-full text-xs font-mono"
              >
                <option value="ACTIVE">ACTIVE (Aktif)</option>
                <option value="EXPIRED">EXPIRED (Kedaluwarsa)</option>
                <option value="CANCELLED">CANCELLED (Dibatalkan)</option>
              </NativeSelect>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDialogOpen(false)}
                className="rounded-full text-xs px-4"
              >
                Batal
              </Button>
              <Button
                size="sm"
                disabled={submitting}
                onClick={handleSave}
                className="rounded-full text-xs bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-5"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" /> Menyimpan...
                  </>
                ) : (
                  "Simpan Perubahan"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

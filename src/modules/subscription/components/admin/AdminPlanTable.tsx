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
import { useI18n } from "@/lib/i18n";

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
  const { t } = useI18n();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error(t("common.error") || "Nama paket wajib diisi");
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
      toast.success(t("common.success") || "Paket langganan baru berhasil ditambahkan");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (
      !confirm(
        t("common.confirmDelete") || "Hapus paket ini? Pengguna yang berlangganan aktif tidak akan terpengaruh.",
      )
    )
      return;
    setDeletingId(id);
    try {
      await onDeletePlan(id);
      toast.success(t("common.success") || "Paket berhasil dihapus");
    } finally {
      setDeletingId(null);
    }
  };

  const columns: ColumnDef<Plan>[] = useMemo(
    () => [
      {
        id: "name",
        header: t("subscription.planName"),
        className: "font-sans font-bold text-foreground",
        cell: (p) => p.name,
      },
      {
        id: "billing_cycle",
        header: t("subscription.billingPeriod"),
        className: "text-foreground font-mono text-xs",
        cell: (p) => p.billing_cycle,
      },
      {
        id: "max_devices",
        header: t("subscription.simultaneousDevices"),
        className: "text-foreground font-mono text-xs",
        cell: (p) => `${p.max_devices} Devices`,
      },
      {
        id: "bandwidth",
        header: t("subscription.bandwidthLimit"),
        className: "text-foreground font-mono text-xs",
        cell: (p) => (p.bandwidth_gb > 0 ? `${p.bandwidth_gb} GB` : t("subscription.unlimitedQuota")),
      },
      {
        id: "price",
        header: t("subscription.planPrice"),
        cell: (p) => (
          <span className="text-emerald-400 font-bold font-mono text-xs">
            Rp {p.price.toLocaleString("id-ID")}
          </span>
        ),
      },
      {
        id: "actions",
        header: t("common.actions"),
        align: "right",
        cell: (p) => (
          <Button
            variant="ghost"
            size="sm"
            disabled={deletingId === p.id}
            onClick={() => handleDelete(p.id)}
            className="h-8 w-8 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
            title={t("common.delete")}
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
    [deletingId, t],
  );

  const filters: DataTableFilterConfig<Plan>[] = useMemo(
    () => [
      {
        id: "cycle",
        label: t("subscription.billingPeriod"),
        defaultValue: "ALL",
        options: [
          { label: t("common.all"), value: "ALL" },
          { label: t("subscription.monthly"), value: "MONTHLY" },
          { label: t("subscription.quarterly"), value: "QUARTERLY" },
          { label: t("subscription.semiAnnual"), value: "SEMI_ANNUAL" },
          { label: t("subscription.yearly"), value: "ANNUAL" },
        ],
        filterFn: (p, val) => p.billing_cycle?.toUpperCase() === val.toUpperCase(),
      },
    ],
    [t],
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
            {t("subscription.createPlan")}
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md bg-card border-border text-foreground shadow-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-bold">
            <ShieldCheck className="h-5 w-5 text-primary" />
            {t("subscription.createPlan")}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleCreate} className="space-y-3.5 pt-2">
          <div>
            <Label className="text-xs text-muted-foreground">{t("subscription.planName")}</Label>
            <Input
              placeholder="misal: Premium Pro Monthly"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 bg-muted/30 border-border text-foreground text-xs h-10"
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">{t("subscription.planPrice")}</Label>
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
              <Label className="text-xs text-muted-foreground">{t("subscription.billingPeriod")}</Label>
              <NativeSelect
                variant="rounded"
                value={billingCycle}
                onChange={(e) =>
                  setBillingCycle(e.target.value as BillingCycle)
                }
                className="mt-1.5 w-full text-xs font-mono"
              >
                <option value="MONTHLY">{t("subscription.monthly")}</option>
                <option value="QUARTERLY">{t("subscription.quarterly")}</option>
                <option value="SEMI_ANNUAL">{t("subscription.semiAnnual")}</option>
                <option value="ANNUAL">{t("subscription.yearly")}</option>
              </NativeSelect>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">{t("subscription.simultaneousDevices")}</Label>
              <Input
                type="number"
                value={maxDevices}
                onChange={(e) => setMaxDevices(Number(e.target.value))}
                className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">{t("subscription.bandwidthLimit")}</Label>
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
                <Loader2 className="h-4 w-4 animate-spin" /> {t("common.loading")}
              </>
            ) : (
              t("common.save")
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
          {t("subscription.membershipTiersTitle")}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          {t("subscription.membershipTiersSubtitle")}
        </p>
      </div>

      <DataTable<Plan>
        data={plans}
        columns={columns}
        keyExtractor={(p) => p.id}
        isLoading={loading}
        searchable={true}
        searchPlaceholder={t("common.search")}
        searchButtonText={t("common.search")}
        searchAccessor={(p) => [p.name, p.billing_cycle, p.price]}
        filters={filters}
        paginated={true}
        pageSize={10}
        entityName={t("subscription.servicePlansTab", { count: "" }).trim()}
        actions={actions}
        emptyIcon={ShieldCheck}
        emptyTitle={t("subscription.noPlansYet")}
        emptyDescription={t("subscription.noPlansYetDesc")}
      />
    </div>
  );
}

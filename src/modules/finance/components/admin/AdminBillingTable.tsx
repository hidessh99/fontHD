// ==============================================================================
// GoVPN Finance Admin Billing Ledger Table Component
// Part of Pola C: components/admin/AdminBillingTable.tsx
// 100% Coinbase Institutional Design System + Standardized Enterprise DataTable
// Fully Localized with useI18n (EN/ID)
// ==============================================================================

"use client";

import React, { useState, useMemo } from "react";
import { BillingRecord } from "../../types/finance.types";
import { AdminCreateBillingDto } from "../../types/admin.types";
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
import {
  PlusCircle,
  Calendar,
  DollarSign,
  Loader2,
  RefreshCw,
  Clock,
  Receipt,
} from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n/context";

interface AdminBillingTableProps {
  records: BillingRecord[];
  isLoading?: boolean;
  onRefresh?: () => void;
  onCreateAdjustment: (dto: AdminCreateBillingDto) => Promise<unknown>;
  onCheckExpired?: () => Promise<{ expired_count: number }>;
}

export function AdminBillingTable({
  records,
  isLoading,
  onRefresh,
  onCreateAdjustment,
  onCheckExpired,
}: AdminBillingTableProps) {
  const { t, locale } = useI18n();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingExpired, setIsCheckingExpired] = useState(false);

  // Form State for Ledger Adjustment
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"ADMIN_ADJUST" | "TOPUP" | "REFUND">(
    "ADMIN_ADJUST",
  );
  const [description, setDescription] = useState("");

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleCreateAdjustment = async (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseInt(amount, 10);
    if (!userId.trim() || isNaN(numAmount) || !description.trim()) {
      toast.error("Lengkapi ID user, nominal, dan keterangan mutasi");
      return;
    }

    setIsSubmitting(true);
    try {
      await onCreateAdjustment({
        user_id: userId.trim(),
        amount: numAmount,
        type,
        description: description.trim(),
      });
      toast.success(t("finance.mutationApplied"));
      setIsModalOpen(false);
      setUserId("");
      setAmount("");
      setDescription("");
    } catch {
      // Handled in store/caller
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTriggerCheckExpired = async () => {
    if (!onCheckExpired) return;
    setIsCheckingExpired(true);
    try {
      const res = await onCheckExpired();
      toast.success(
        `Pemeriksaan selesai: ${res.expired_count} transaksi kedaluwarsa dibersihkan.`,
      );
    } catch {
      toast.error("Gagal memeriksa transaksi kedaluwarsa");
    } finally {
      setIsCheckingExpired(false);
    }
  };

  const columns: ColumnDef<BillingRecord>[] = useMemo(
    () => [
      {
        id: "created_at",
        header: t("finance.mutationTime"),
        cell: (item) => (
          <div className="flex items-center gap-1.5 whitespace-nowrap text-muted-foreground font-mono">
            <Calendar className="h-3 w-3 shrink-0" />
            <span>
              {new Date(item.created_at).toLocaleString(locale === "id" ? "id-ID" : "en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        ),
      },
      {
        id: "user_id",
        header: t("finance.targetUserId"),
        className: "font-bold text-foreground font-mono",
        cell: (item) => item.user_id,
      },
      {
        id: "type",
        header: t("finance.transactionType"),
        cell: (item) => (
          <span
            className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold font-mono ${
              item.type === "TOPUP"
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : item.type === "ADMIN_ADJUST"
                  ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                  : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
            }`}
          >
            {item.type}
          </span>
        ),
      },
      {
        id: "description",
        header: t("finance.description"),
        cell: (item) => (
          <span className="font-sans text-muted-foreground max-w-55 truncate block">
            {item.description}
          </span>
        ),
      },
      {
        id: "amount",
        header: t("finance.amount"),
        className: "font-bold font-mono",
        cell: (item) => {
          const isPositive = item.amount >= 0 && item.type !== "PURCHASE";
          return (
            <span className={isPositive ? "text-emerald-400" : "text-rose-400"}>
              {isPositive ? "+" : ""}
              {formatIDR(item.amount)}
            </span>
          );
        },
      },
      {
        id: "balance_before",
        header: "Before",
        className: "text-muted-foreground font-mono",
        cell: (item) => formatIDR(item.balance_before),
      },
      {
        id: "balance_after",
        header: t("finance.finalBalance"),
        align: "right",
        className: "font-bold text-foreground font-mono",
        cell: (item) => formatIDR(item.balance_after),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t],
  );

  const filters: DataTableFilterConfig<BillingRecord>[] = useMemo(
    () => [
      {
        id: "type",
        label: t("finance.transactionType"),
        defaultValue: "ALL",
        options: [
          { label: t("common.all"), value: "ALL" },
          { label: "TOPUP", value: "TOPUP" },
          { label: "ADMIN_ADJUST", value: "ADMIN_ADJUST" },
          { label: "REFUND", value: "REFUND" },
          { label: "PURCHASE", value: "PURCHASE" },
        ],
        filterFn: (item, val) => item.type?.toUpperCase() === val.toUpperCase(),
      },
    ],
    [t],
  );

  const actions = (
    <div className="flex items-center gap-2">
      {onCheckExpired && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleTriggerCheckExpired}
          disabled={isCheckingExpired}
          className="rounded-full text-xs min-h-9 px-4 gap-1.5"
        >
          <Clock
            className={`h-3.5 w-3.5 ${isCheckingExpired ? "animate-spin" : ""}`}
          />
          {t("finance.checkExpired")}
        </Button>
      )}

      {onRefresh && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={isLoading}
          className="rounded-full text-xs min-h-9 px-3"
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`}
          />
        </Button>
      )}

      {/* Adjustment Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger
          render={
            <Button className="bg-primary hover:bg-primary-hover text-white gap-2 font-semibold text-xs rounded-full min-h-9 px-5 shadow-sm">
              <PlusCircle className="h-4 w-4" />
              {t("finance.ledgerAdjustment")}
            </Button>
          }
        />
        <DialogContent className="sm:max-w-md bg-card border-border/80 text-foreground rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-bold">
              <DollarSign className="h-5 w-5 text-primary" />
              {t("finance.ledgerAdjustment")}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreateAdjustment} className="space-y-4 pt-2">
            <div>
              <Label
                htmlFor="adj-user"
                className="text-xs font-medium text-muted-foreground"
              >
                {t("finance.targetUserId")}
              </Label>
              <Input
                id="adj-user"
                placeholder="usr-12345"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="mt-1.5 font-mono text-xs rounded-xl min-h-10"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-medium text-muted-foreground">
                  {t("finance.adjustmentType")}
                </Label>
                <NativeSelect
                  variant="rounded"
                  value={type}
                  onChange={(e) =>
                    setType(
                      e.target.value as "ADMIN_ADJUST" | "TOPUP" | "REFUND",
                    )
                  }
                  className="mt-1.5 w-full text-xs font-mono"
                >
                  <option value="ADMIN_ADJUST">ADMIN_ADJUST</option>
                  <option value="TOPUP">TOPUP</option>
                  <option value="REFUND">REFUND</option>
                </NativeSelect>
              </div>

              <div>
                <Label
                  htmlFor="adj-amount"
                  className="text-xs font-medium text-muted-foreground"
                >
                  {t("finance.depositAmount")}
                </Label>
                <Input
                  id="adj-amount"
                  type="number"
                  placeholder="50000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1.5 font-mono text-xs rounded-xl min-h-10"
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="adj-desc"
                className="text-xs font-medium text-muted-foreground"
              >
                {t("finance.mutationReason")}
              </Label>
              <Input
                id="adj-desc"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1.5 text-xs rounded-xl min-h-10"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/50">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="text-xs rounded-full min-h-10 px-5"
              >
                {t("finance.cancel")}
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-full min-h-10 px-6 shadow-md shadow-primary/25"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> {t("common.loading")}
                  </>
                ) : (
                  t("finance.saveMutation")
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );

  return (
    <DataTable<BillingRecord>
      data={records}
      columns={columns}
      keyExtractor={(item) => item.id}
      isLoading={isLoading}
      searchable={true}
      searchPlaceholder={t("common.search")}
      searchButtonText={t("common.search")}
      searchAccessor={(item) => [item.user_id, item.description, item.type]}
      filters={filters}
      paginated={true}
      pageSize={10}
      entityName="mutasi ledger"
      actions={actions}
      emptyIcon={Receipt}
      emptyTitle={t("finance.noMutationRecords")}
      emptyDescription={t("finance.noMutationRecordsDesc")}
    />
  );
}

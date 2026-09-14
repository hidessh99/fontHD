// ==============================================================================
// GoVPN Finance Admin Billing Ledger Table Component
// Part of Pola C: components/admin/AdminBillingTable.tsx
// 100% Coinbase Institutional Design System (Audit Ledger, Adjustment Trigger)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { BillingRecord } from "../../types/finance.types";
import { AdminCreateBillingDto } from "../../types/admin.types";
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
import {
  PlusCircle,
  Search,
  Calendar,
  DollarSign,
  Loader2,
  RefreshCw,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

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
  const [filterQuery, setFilterQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingExpired, setIsCheckingExpired] = useState(false);

  // Form State
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"ADMIN_ADJUST" | "TOPUP" | "REFUND">(
    "ADMIN_ADJUST",
  );
  const [description, setDescription] = useState("");

  const filtered = records.filter(
    (r) =>
      r.user_id.toString().toLowerCase().includes(filterQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(filterQuery.toLowerCase()) ||
      r.type.toLowerCase().includes(filterQuery.toLowerCase()),
  );

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
      toast.success("Mutasi ledger superadmin berhasil diterapkan!");
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

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari user ID, keterangan, tipe..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="pl-9 font-mono text-xs rounded-xl min-h-10"
          />
        </div>

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
              Cek Expired
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
                  Penyesuaian Ledger
                </Button>
              }
            />
            <DialogContent className="sm:max-w-md bg-card border-border/80 text-foreground rounded-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-lg font-bold">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Penyesuaian Saldo Ledger (Superadmin)
                </DialogTitle>
              </DialogHeader>

              <form
                onSubmit={handleCreateAdjustment}
                className="space-y-4 pt-2"
              >
                <div>
                  <Label
                    htmlFor="adj-user"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    Target User ID
                  </Label>
                  <Input
                    id="adj-user"
                    placeholder="Contoh: usr-12345"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="mt-1.5 font-mono text-xs rounded-xl min-h-10"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">
                      Tipe Penyesuaian
                    </Label>
                    <select
                      value={type}
                      onChange={(e) =>
                        setType(
                          e.target.value as "ADMIN_ADJUST" | "TOPUP" | "REFUND",
                        )
                      }
                      className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-xs font-mono"
                    >
                      <option value="ADMIN_ADJUST">ADMIN_ADJUST</option>
                      <option value="TOPUP">TOPUP</option>
                      <option value="REFUND">REFUND</option>
                    </select>
                  </div>

                  <div>
                    <Label
                      htmlFor="adj-amount"
                      className="text-xs font-medium text-muted-foreground"
                    >
                      Nominal (IDR)
                    </Label>
                    <Input
                      id="adj-amount"
                      type="number"
                      placeholder="Misal: 50000 / -25000"
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
                    Alasan / Keterangan Mutasi
                  </Label>
                  <Input
                    id="adj-desc"
                    placeholder="Contoh: Koreksi transaksi gagal / Bonus loyalitas"
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
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-full min-h-10 px-6 shadow-md shadow-primary/25"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />{" "}
                        Menerapkan...
                      </>
                    ) : (
                      "Simpan Mutasi"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="w-full overflow-x-auto rounded-2xl border border-border/80 bg-card/60 shadow-xl">
        <table className="w-full text-left text-sm text-muted-foreground">
          <thead className="border-b border-border/80 bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono">
            <tr>
              <th className="px-5 py-4">Waktu</th>
              <th className="px-5 py-4">User ID</th>
              <th className="px-5 py-4">Tipe</th>
              <th className="px-5 py-4">Keterangan</th>
              <th className="px-5 py-4">Nominal</th>
              <th className="px-5 py-4">Sebelum</th>
              <th className="px-5 py-4 text-right">Sesudah</th>
            </tr>
          </thead>
          <tbody className="divide-y border-border/40 font-mono text-xs">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-8 text-center text-muted-foreground font-sans"
                >
                  Tidak ada catatan mutasi ledger yang cocok.
                </td>
              </tr>
            ) : (
              filtered.map((item) => {
                const isPositive = item.amount >= 0 && item.type !== "PURCHASE";
                return (
                  <tr
                    key={item.id}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {new Date(item.created_at).toLocaleString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-bold text-foreground">
                      {item.user_id}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                          item.type === "TOPUP"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : item.type === "ADMIN_ADJUST"
                              ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                              : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-sans text-muted-foreground max-w-[220px] truncate">
                      {item.description}
                    </td>
                    <td className="px-5 py-3.5 font-bold">
                      <span
                        className={
                          isPositive ? "text-emerald-400" : "text-rose-400"
                        }
                      >
                        {isPositive ? "+" : ""}
                        {formatIDR(item.amount)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      {formatIDR(item.balance_before)}
                    </td>
                    <td className="px-5 py-3.5 text-right font-bold text-foreground">
                      {formatIDR(item.balance_after)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

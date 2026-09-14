// ==============================================================================
// GoVPN Finance Admin Pending Income Approval Modal / Manager Component
// Part of Pola C: components/admin/PendingIncomeApprovalModal.tsx
// 100% Coinbase Institutional Design System (Batch Approvals, Settle Pending)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { IncomePending } from "../../types/finance.types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DollarSign,
  Play,
  Trash2,
  CheckCircle2,
  Clock,
  Loader2,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

interface PendingIncomeApprovalModalProps {
  pendingList: IncomePending[];
  onTriggerAlways?: () => Promise<{ processed: number }>;
  onTriggerMonthly?: () => Promise<{ processed: number }>;
  onTriggerPayas?: () => Promise<{ processed: number }>;
  onCleanup?: () => Promise<{ cleaned_count: number }>;
  onUpdateStatus?: (id: string | number, status: string) => Promise<unknown>;
  triggerButton?: React.ReactNode;
}

export function PendingIncomeApprovalModal({
  pendingList,
  onTriggerAlways,
  onTriggerMonthly,
  onTriggerPayas,
  onCleanup,
  onUpdateStatus,
  triggerButton,
}: PendingIncomeApprovalModalProps) {
  const [open, setOpen] = useState(false);
  const [busyAction, setBusyAction] = useState<string | null>(null);

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleBatchTrigger = async (
    type: "always" | "monthly" | "payas",
    fn?: () => Promise<{ processed: number }>,
  ) => {
    if (!fn) return;
    setBusyAction(type);
    try {
      const res = await fn();
      toast.success(
        `Batch ${type.toUpperCase()} sukses diproses: ${res.processed} records diselesaikan.`,
      );
    } catch {
      toast.error(`Gagal memproses batch ${type}`);
    } finally {
      setBusyAction(null);
    }
  };

  const handleCleanup = async () => {
    if (!onCleanup) return;
    setBusyAction("cleanup");
    try {
      const res = await onCleanup();
      toast.success(
        `Pembersihan sukses: ${res.cleaned_count} records pending dibersihkan.`,
      );
    } catch {
      toast.error("Gagal melakukan pembersihan records");
    } finally {
      setBusyAction(null);
    }
  };

  const handleSingleSettle = async (id: string | number) => {
    if (!onUpdateStatus) return;
    setBusyAction(`settle-${id}`);
    try {
      await onUpdateStatus(id, "COMPLETED");
      toast.success("Record pending berhasil disetujui dan dicairkan!");
    } catch {
      toast.error("Gagal menyetujui record");
    } finally {
      setBusyAction(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          triggerButton ? (
            (triggerButton as React.ReactElement)
          ) : (
            <Button
              variant="outline"
              className="border-border/80 hover:bg-muted/30 text-foreground gap-2 font-semibold text-xs rounded-full min-h-9 px-4"
            >
              <Clock className="h-4 w-4 text-amber-400" />
              Kelola Pending Income ({pendingList.length})
            </Button>
          )
        }
      />

      <DialogContent className="sm:max-w-2xl bg-card border-border/80 text-foreground rounded-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            <DollarSign className="h-5 w-5 text-emerald-400" />
            Penyelesaian Pending Income &amp; Settlement
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {/* Action Toolbar */}
          <div className="rounded-2xl border border-border/80 bg-surface/50 p-4 space-y-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider font-mono">
              Batch Settlement Actions
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {onTriggerAlways && (
                <Button
                  size="sm"
                  variant="outline"
                  disabled={busyAction !== null}
                  onClick={() => handleBatchTrigger("always", onTriggerAlways)}
                  className="rounded-full text-xs font-mono gap-1.5 min-h-9 px-4"
                >
                  <Play
                    className={`h-3.5 w-3.5 ${busyAction === "always" ? "animate-spin" : ""}`}
                  />
                  Process Always
                </Button>
              )}

              {onTriggerMonthly && (
                <Button
                  size="sm"
                  variant="outline"
                  disabled={busyAction !== null}
                  onClick={() =>
                    handleBatchTrigger("monthly", onTriggerMonthly)
                  }
                  className="rounded-full text-xs font-mono gap-1.5 min-h-9 px-4"
                >
                  <Play
                    className={`h-3.5 w-3.5 ${busyAction === "monthly" ? "animate-spin" : ""}`}
                  />
                  Process Monthly
                </Button>
              )}

              {onTriggerPayas && (
                <Button
                  size="sm"
                  variant="outline"
                  disabled={busyAction !== null}
                  onClick={() => handleBatchTrigger("payas", onTriggerPayas)}
                  className="rounded-full text-xs font-mono gap-1.5 min-h-9 px-4"
                >
                  <Play
                    className={`h-3.5 w-3.5 ${busyAction === "payas" ? "animate-spin" : ""}`}
                  />
                  Process PayAs
                </Button>
              )}

              {onCleanup && (
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={busyAction !== null}
                  onClick={handleCleanup}
                  className="rounded-full text-xs font-mono text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 gap-1.5 min-h-9 px-4 ml-auto"
                >
                  <Trash2
                    className={`h-3.5 w-3.5 ${busyAction === "cleanup" ? "animate-spin" : ""}`}
                  />
                  Bersihkan Stale Records
                </Button>
              )}
            </div>
          </div>

          {/* Pending Table */}
          <div className="w-full overflow-x-auto rounded-2xl border border-border/80 bg-card/60 shadow-md">
            <table className="w-full text-left text-sm text-muted-foreground">
              <thead className="border-b border-border/80 bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono">
                <tr>
                  <th className="px-4 py-3">Waktu</th>
                  <th className="px-4 py-3">User ID</th>
                  <th className="px-4 py-3">Sumber</th>
                  <th className="px-4 py-3">Nominal</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y border-border/40 font-mono text-xs">
                {pendingList.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-6 text-center text-muted-foreground font-sans"
                    >
                      Tidak ada antrian pending income saat ini.
                    </td>
                  </tr>
                ) : (
                  pendingList.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {new Date(item.created_at).toLocaleDateString(
                            "id-ID",
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-bold text-foreground">
                        {item.user_id}
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-muted/60 border border-border/60 px-2 py-0.5 rounded text-[11px] font-semibold text-foreground">
                          {item.source}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-bold text-emerald-400">
                        {formatIDR(item.amount)}
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[10px] font-bold">
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {item.status === "PENDING" && onUpdateStatus && (
                          <Button
                            size="sm"
                            disabled={busyAction === `settle-${item.id}`}
                            onClick={() => handleSingleSettle(item.id)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-xs font-semibold px-3 h-7 gap-1"
                          >
                            {busyAction === `settle-${item.id}` ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <CheckCircle2 className="h-3 w-3" />
                            )}
                            Selesaikan
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

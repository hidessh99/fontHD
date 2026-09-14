// ==============================================================================
// GoVPN Admin Global Subscription Table Component
// Part of Pola C: components/admin/AdminSubscriptionTable.tsx
// 100% Coinbase Institutional Design System (Audit, Change Plan & Status Overrides)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { Subscription, Plan, SubscriptionStatus } from "../../types/subscription.types";
import { SubscriptionStatusBadge } from "../shared/SubscriptionStatusBadge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ShieldCheck, User, Calendar, Edit3, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { EmptyState } from "@/components/shared/EmptyState";

interface AdminSubscriptionTableProps {
  subscriptions: Subscription[];
  plans: Plan[];
  onChangePlan: (id: string | number, planId: string | number) => Promise<unknown>;
  onUpdateStatus: (id: string | number, status: SubscriptionStatus) => Promise<unknown>;
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Audit Global Langganan Pengguna
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Daftar seluruh langganan aktif, riwayat kadaluarsa, dan kemampuan modifikasi status
          </p>
        </div>
      </div>

      {subscriptions.length === 0 ? (
        <EmptyState
          icon={ShieldCheck}
          title="Belum Ada Langganan"
          description="Langganan pengguna akan terdata secara otomatis di sini."
        />
      ) : (
        <div className="w-full overflow-x-auto rounded-2xl border border-border/80 bg-card/60 shadow-xl">
          <table className="w-full text-left text-sm text-muted-foreground font-mono">
            <thead className="border-b border-border/80 bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4 font-sans">Status</th>
                <th className="px-5 py-4 font-sans">User ID</th>
                <th className="px-5 py-4 font-sans">Paket Langganan</th>
                <th className="px-5 py-4 font-sans">Mulai</th>
                <th className="px-5 py-4 font-sans">Berakhir</th>
                <th className="px-5 py-4 font-sans text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y border-border/40 text-xs">
              {subscriptions.map((sub) => (
                <tr key={sub.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3.5">
                    <SubscriptionStatusBadge status={sub.status} />
                  </td>

                  <td className="px-5 py-3.5 font-sans">
                    <div className="flex items-center gap-1.5 text-foreground font-mono">
                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="font-bold">#{sub.user_id}</span>
                    </div>
                  </td>

                  <td className="px-5 py-3.5 font-sans font-bold text-foreground">
                    {sub.plan?.name || "Premium VPN"}
                  </td>

                  <td className="px-5 py-3.5 font-sans text-muted-foreground">
                    {new Date(sub.start_date).toLocaleDateString("id-ID")}
                  </td>

                  <td className="px-5 py-3.5 font-sans text-muted-foreground">
                    {new Date(sub.end_date).toLocaleDateString("id-ID")}
                  </td>

                  <td className="px-5 py-3.5 text-right font-sans">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenDialog(sub)}
                      className="h-8 px-2.5 text-xs text-primary hover:text-primary hover:bg-primary/10 rounded-lg gap-1"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      Ubah
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
              <span className="text-xs text-muted-foreground block mb-1.5">Ganti Paket Membership</span>
              <select
                value={newPlanId}
                onChange={(e) => setNewPlanId(e.target.value)}
                className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs font-mono text-foreground outline-none focus:border-primary"
              >
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (Rp {p.price.toLocaleString("id-ID")})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span className="text-xs text-muted-foreground block mb-1.5">Override Status</span>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as SubscriptionStatus)}
                className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs font-mono text-foreground outline-none focus:border-primary"
              >
                <option value="ACTIVE">ACTIVE (Aktif Penuh)</option>
                <option value="PENDING">PENDING (Menunggu Pembayaran)</option>
                <option value="EXPIRED">EXPIRED (Kadaluarsa)</option>
                <option value="CANCELLED">CANCELLED (Dibatalkan)</option>
              </select>
            </div>

            <Button
              onClick={handleSave}
              disabled={submitting}
              className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs gap-2 mt-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Simpan Perubahan"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

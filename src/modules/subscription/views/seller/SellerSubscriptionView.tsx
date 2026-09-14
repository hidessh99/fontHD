// ==============================================================================
// GoVPN Subscription Seller View
// Part of Pola C: views/seller/SellerSubscriptionView.tsx
// Algoritma 4: Dynamic Island Route Component
// ==============================================================================

"use client";

import React, { useState } from "react";
import { useSubscriptionSeller } from "../../hooks/useSubscriptionSeller";
import { SubscriptionSkeleton } from "../../components/shared/SubscriptionSkeleton";
import { SellerStatsWidget } from "../../components/seller/SellerStatsWidget";
import { SellerCustomerSubscriptionTable } from "../../components/seller/SellerCustomerSubscriptionTable";
import { RefreshCw, UserPlus, Building2 } from "lucide-react";
import { toast } from "sonner";

export function SellerSubscriptionView() {
  const { stats, subscriptions, loading, createCustomerSubscription, refresh } =
    useSubscriptionSeller();
  const [isProvisionModalOpen, setIsProvisionModalOpen] = useState(false);
  const [customerUserId, setCustomerUserId] = useState("");
  const [planId, setPlanId] = useState("plan-pro");
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return <SubscriptionSkeleton />;
  }

  const handleCreateCustomerSub = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerUserId) {
      toast.error("User ID pelanggan wajib diisi");
      return;
    }

    setSubmitting(true);
    try {
      await createCustomerSubscription({
        customer_user_id: Number(customerUserId),
        plan_id: planId,
        auto_renew: true,
      });
      toast.success(
        `Langganan untuk User #${customerUserId} berhasil diprovisi!`,
      );
      setIsProvisionModalOpen(false);
      setCustomerUserId("");
    } catch {
      toast.error("Gagal memprovisi langganan pelanggan");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-medium text-amber-500 mb-2">
            <Building2 className="w-3.5 h-3.5" /> Portal Reseller & Partner
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Kelola Langganan Pelanggan
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Pantau pertumbuhan basis pengguna, komisi reseller, dan provisi
            paket white-label tenant Anda.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              refresh();
              toast.info("Data reseller dimuat ulang");
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg border border-border/50 bg-background/50 hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Segarkan</span>
          </button>
          <button
            onClick={() => setIsProvisionModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            <span>Provisi Langganan Baru</span>
          </button>
        </div>
      </div>

      {/* Stats Widget */}
      {stats && <SellerStatsWidget stats={stats} />}

      {/* Customer Subscriptions Table */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">
            Daftar Langganan Pelanggan
          </h2>
          <span className="text-xs text-muted-foreground">
            Total {subscriptions.length} Akun Terdaftar
          </span>
        </div>

        <SellerCustomerSubscriptionTable subscriptions={subscriptions} />
      </section>

      {/* Provision Modal */}
      {isProvisionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-card border border-border/60 rounded-2xl p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-foreground">
              Provisi Langganan Pelanggan
            </h3>
            <p className="text-xs text-muted-foreground">
              Tentukan ID pelanggan dan paket layanan yang akan diaktifkan
              secara instan di bawah tenant Anda.
            </p>

            <form onSubmit={handleCreateCustomerSub} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">
                  Customer User ID
                </label>
                <input
                  type="number"
                  required
                  placeholder="Contoh: 205"
                  value={customerUserId}
                  onChange={(e) => setCustomerUserId(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">
                  Pilihan Paket
                </label>
                <select
                  value={planId}
                  onChange={(e) => setPlanId(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="plan-basic">
                    Basic Tunneling (Rp 25.000 / bln)
                  </option>
                  <option value="plan-pro">
                    Premium Pro Max (Rp 45.000 / bln)
                  </option>
                  <option value="plan-annual">
                    Enterprise Annual Pass (Rp 420.000 / thn)
                  </option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/40">
                <button
                  type="button"
                  onClick={() => setIsProvisionModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium rounded-lg border border-border/50 hover:bg-accent transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {submitting ? "Memproses..." : "Aktifkan Paket"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==============================================================================
// GoVPN Subscription Admin View
// Part of Pola C: views/admin/AdminSubscriptionView.tsx
// Algoritma 4: Dynamic Island Route Component
// ==============================================================================

"use client";

import React, { useState } from "react";
import { useSubscriptionAdmin } from "../../hooks/useSubscriptionAdmin";
import { SubscriptionSkeleton } from "../../components/shared/SubscriptionSkeleton";
import { AdminPlanTable } from "../../components/admin/AdminPlanTable";
import { AdminSubscriptionTable } from "../../components/admin/AdminSubscriptionTable";
import type { AdminCreatePlanDto } from "../../types/admin.types";
import type { BillingCycle } from "../../types/subscription.types";
import { RefreshCw, Plus, ShieldCheck, Layers, CreditCard } from "lucide-react";
import { toast } from "sonner";

export function AdminSubscriptionView() {
  const {
    plans,
    subscriptions,
    loading,
    createPlan,
    deletePlan,
    changeSubscriptionPlan,
    updateSubscriptionStatus,
    refresh,
  } = useSubscriptionAdmin();

  const [activeTab, setActiveTab] = useState<"plans" | "subscriptions">("plans");
  const [isAddPlanModalOpen, setIsAddPlanModalOpen] = useState(false);

  // Form state
  const [newPlan, setNewPlan] = useState<AdminCreatePlanDto>({
    name: "",
    slug: "",
    price: 35000,
    currency: "IDR",
    billing_cycle: "MONTHLY",
    max_devices: 3,
    bandwidth_gb: 100,
    is_active: true,
    features: ["V2Ray & Trojan", "Node SG & ID"],
  });

  if (loading) {
    return <SubscriptionSkeleton />;
  }

  const handleCreatePlanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlan.name || !newPlan.slug) {
      toast.error("Nama paket dan slug wajib diisi");
      return;
    }

    await createPlan(newPlan);
    toast.success(`Paket ${newPlan.name} berhasil ditambahkan!`);
    setIsAddPlanModalOpen(false);
    setNewPlan({
      name: "",
      slug: "",
      price: 35000,
      currency: "IDR",
      billing_cycle: "MONTHLY",
      max_devices: 3,
      bandwidth_gb: 100,
      is_active: true,
      features: ["V2Ray & Trojan", "Node SG & ID"],
    });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-medium text-red-500 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Superadmin Billing & Tier Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Manajemen Paket & Langganan
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Konfigurasi tiering paket VPN, kuota bandwidth, batasan perangkat, dan kontrol status langganan global.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              refresh();
              toast.info("Data diperbarui");
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg border border-border/50 bg-background/50 hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Segarkan</span>
          </button>
          <button
            onClick={() => setIsAddPlanModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Paket Baru</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border/40">
        <button
          onClick={() => setActiveTab("plans")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "plans"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Paket Layanan ({plans.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("subscriptions")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "subscriptions"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Langganan Pengguna ({subscriptions.length})</span>
        </button>
      </div>

      {/* Content Area */}
      {activeTab === "plans" ? (
        <section className="space-y-4">
          <AdminPlanTable
            plans={plans}
            onCreatePlan={createPlan}
            onDeletePlan={async (id) => {
              await deletePlan(id);
              toast.success("Paket dihapus");
            }}
          />
        </section>
      ) : (
        <section className="space-y-4">
          <AdminSubscriptionTable
            subscriptions={subscriptions}
            plans={plans}
            onChangePlan={async (id, planId) => {
              await changeSubscriptionPlan(id, planId);
              toast.success(`Paket langganan #${id} berhasil diubah.`);
            }}
            onUpdateStatus={async (id, status) => {
              await updateSubscriptionStatus(id, status);
              toast.success(`Status langganan #${id} diubah ke ${status}`);
            }}
          />
        </section>
      )}

      {/* Create Plan Modal */}
      {isAddPlanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-card border border-border/60 rounded-2xl p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-foreground">Tambah Paket Layanan Baru</h3>

            <form onSubmit={handleCreatePlanSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Nama Paket</label>
                  <input
                    type="text"
                    required
                    placeholder="VIP Turbo Extreme"
                    value={newPlan.name}
                    onChange={(e) =>
                      setNewPlan({
                        ...newPlan,
                        name: e.target.value,
                        slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                      })
                    }
                    className="w-full px-3 py-2 text-sm rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Slug URL</label>
                  <input
                    type="text"
                    required
                    placeholder="vip-turbo"
                    value={newPlan.slug}
                    onChange={(e) => setNewPlan({ ...newPlan, slug: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary font-mono text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Harga (IDR)</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={newPlan.price}
                    onChange={(e) => setNewPlan({ ...newPlan, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Billing Cycle</label>
                  <select
                    value={newPlan.billing_cycle}
                    onChange={(e) =>
                      setNewPlan({
                        ...newPlan,
                        billing_cycle: e.target.value as BillingCycle,
                      })
                    }
                    className="w-full px-3 py-2 text-sm rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="MONTHLY">Bulanan (Monthly)</option>
                    <option value="QUARTERLY">Triwulan (Quarterly)</option>
                    <option value="SEMI_ANNUAL">Semester (Semi-Annual)</option>
                    <option value="ANNUAL">Tahunan (Annual)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Maksimal Perangkat</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newPlan.max_devices}
                    onChange={(e) => setNewPlan({ ...newPlan, max_devices: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Bandwidth (GB, 0 = Unlimited)</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={newPlan.bandwidth_gb}
                    onChange={(e) => setNewPlan({ ...newPlan, bandwidth_gb: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/40">
                <button
                  type="button"
                  onClick={() => setIsAddPlanModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium rounded-lg border border-border/50 hover:bg-accent transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Simpan Paket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

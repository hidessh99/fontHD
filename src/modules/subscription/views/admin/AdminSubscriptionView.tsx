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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, Plus, ShieldCheck, Layers, CreditCard } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { useI18n } from "@/lib/i18n";

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
  const { t } = useI18n();

  const [activeTab, setActiveTab] = useState<"plans" | "subscriptions">(
    "plans",
  );
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
      toast.error(t("common.error") || "Nama paket dan slug wajib diisi");
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
            <ShieldCheck className="w-3.5 h-3.5" /> Superadmin Billing & Tier
            Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {t("subscription.adminBillingTitle")}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t("subscription.adminBillingSubtitle")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              refresh();
              toast.info(t("common.refreshing") || "Data diperbarui");
            }}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t("common.refresh")}</span>
          </Button>
          <Button
            size="sm"
            onClick={() => setIsAddPlanModalOpen(true)}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>{t("subscription.createPlan")}</span>
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(val) => setActiveTab(val as "plans" | "subscriptions")}
        className="w-full"
      >
        <TabsList variant="line" className="border-b border-border/40 w-full justify-start gap-2 h-auto pb-0">
          <TabsTrigger value="plans" className="gap-2 py-2.5">
            <Layers className="w-4 h-4" />
            <span>{t("subscription.servicePlansTab", { count: plans.length })}</span>
          </TabsTrigger>
          <TabsTrigger value="subscriptions" className="gap-2 py-2.5">
            <CreditCard className="w-4 h-4" />
            <span>{t("subscription.userSubsTab", { count: subscriptions.length })}</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Content Area */}
      {activeTab === "plans" ? (
        <section className="space-y-4">
          <AdminPlanTable
            plans={plans}
            onCreatePlan={createPlan}
            onDeletePlan={async (id) => {
              await deletePlan(id);
              toast.success(t("common.success") || "Paket dihapus");
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
      <Dialog open={isAddPlanModalOpen} onOpenChange={setIsAddPlanModalOpen}>
        <DialogContent className="sm:max-w-lg bg-card border-border/60">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              {t("subscription.createPlan")}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreatePlanSubmit} className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">
                  {t("subscription.planName")}
                </label>
                <Input
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
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">
                  Slug URL
                </label>
                <Input
                  type="text"
                  required
                  placeholder="vip-turbo"
                  value={newPlan.slug}
                  onChange={(e) =>
                    setNewPlan({ ...newPlan, slug: e.target.value })
                  }
                  className="font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">
                  {t("subscription.planPrice")}
                </label>
                <Input
                  type="number"
                  required
                  min={0}
                  value={newPlan.price}
                  onChange={(e) =>
                    setNewPlan({ ...newPlan, price: Number(e.target.value) })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">
                  {t("subscription.billingPeriod")}
                </label>
                <NativeSelect
                  value={newPlan.billing_cycle}
                  onChange={(e) =>
                    setNewPlan({
                      ...newPlan,
                      billing_cycle: e.target.value as BillingCycle,
                    })
                  }
                >
                  <option value="MONTHLY">{t("subscription.monthly")}</option>
                  <option value="QUARTERLY">{t("subscription.quarterly")}</option>
                  <option value="SEMI_ANNUAL">{t("subscription.semiAnnual")}</option>
                  <option value="ANNUAL">{t("subscription.yearly")}</option>
                </NativeSelect>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">
                  {t("subscription.simultaneousDevices")}
                </label>
                <Input
                  type="number"
                  required
                  min={1}
                  value={newPlan.max_devices}
                  onChange={(e) =>
                    setNewPlan({
                      ...newPlan,
                      max_devices: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">
                  {t("subscription.bandwidthLimit")}
                </label>
                <Input
                  type="number"
                  required
                  min={0}
                  value={newPlan.bandwidth_gb}
                  onChange={(e) =>
                    setNewPlan({
                      ...newPlan,
                      bandwidth_gb: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/40">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddPlanModalOpen(false)}
              >
                {t("common.cancel")}
              </Button>
              <Button type="submit">
                {t("common.save")}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

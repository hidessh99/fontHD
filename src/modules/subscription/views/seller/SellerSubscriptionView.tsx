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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { RefreshCw, UserPlus, Building2 } from "lucide-react";
import { toast } from "sonner";

export function SellerSubscriptionView() {
  const { stats, subscriptions, loading, createCustomerSubscription, refresh } =
    useSubscriptionSeller();
  const { t } = useI18n();
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
      toast.error(t("common.error") || "User ID pelanggan wajib diisi");
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
      toast.error(t("common.error") || "Gagal memprovisi langganan pelanggan");
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
            {t("subscription.sellerPortalTitle")}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t("subscription.sellerPortalSubtitle")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              refresh();
              toast.info(t("common.refreshing") || "Data reseller dimuat ulang");
            }}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t("common.refresh")}</span>
          </Button>
          <Button
            size="sm"
            onClick={() => setIsProvisionModalOpen(true)}
            className="gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>{t("subscription.provisionCustomerTitle")}</span>
          </Button>
        </div>
      </div>

      {/* Stats Widget */}
      {stats && <SellerStatsWidget stats={stats} />}

      {/* Customer Subscriptions Table */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">
            {t("subscription.customerSubsList")}
          </h2>
          <span className="text-xs text-muted-foreground">
            {t("subscription.totalRegisteredAccounts", { count: subscriptions.length })}
          </span>
        </div>

        <SellerCustomerSubscriptionTable subscriptions={subscriptions} />
      </section>

      {/* Provision Modal */}
      <Dialog
        open={isProvisionModalOpen}
        onOpenChange={setIsProvisionModalOpen}
      >
        <DialogContent className="sm:max-w-md bg-card border-border/60">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              {t("subscription.provisionCustomerTitle")}
            </DialogTitle>
            <p className="text-xs text-muted-foreground">
              {t("subscription.provisionCustomerDesc")}
            </p>
          </DialogHeader>

          <form onSubmit={handleCreateCustomerSub} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">
                {t("subscription.customerUserId")}
              </label>
              <Input
                type="number"
                required
                placeholder="Contoh: 205"
                value={customerUserId}
                onChange={(e) => setCustomerUserId(e.target.value)}
                className="font-mono text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">
                {t("subscription.planChoice")}
              </label>
              <NativeSelect
                value={planId}
                onChange={(e) => setPlanId(e.target.value)}
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
              </NativeSelect>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/40">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsProvisionModalOpen(false)}
              >
                {t("common.cancel")}
              </Button>
              <Button
                type="submit"
                disabled={submitting}
              >
                {submitting ? t("common.loading") : t("subscription.activatePlan")}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

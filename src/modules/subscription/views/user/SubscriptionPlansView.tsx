// ==============================================================================
// GoVPN Subscription Plans User View
// Part of Pola C: views/user/SubscriptionPlansView.tsx
// Algoritma 4: Dynamic Island Route Component
// ==============================================================================

"use client";

import React, { useState } from "react";
import { useSubscriptionUser } from "../../hooks/useSubscriptionUser";
import { SubscriptionSkeleton } from "../../components/shared/SubscriptionSkeleton";
import { UserSubscriptionCard } from "../../components/user/UserSubscriptionCard";
import { PlanPricingGrid } from "../../components/user/PlanPricingGrid";
import { SubscribeModal } from "../../components/user/SubscribeModal";
import type { Plan } from "../../types/subscription.types";
import type { CreateSubscriptionDto } from "../../types/user.types";
import { RefreshCw, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function SubscriptionPlansView() {
  const { plans, subscription, loading, subscribe, upgrade, refresh } =
    useSubscriptionUser();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);

  if (loading) {
    return <SubscriptionSkeleton />;
  }

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsUpgrading(!!subscription && subscription.status === "ACTIVE");
    setIsModalOpen(true);
  };

  const handleSubscribeSubmit = async (
    dto: CreateSubscriptionDto,
    idempotencyKey: string,
  ) => {
    if (isUpgrading && subscription) {
      await upgrade({ new_plan_id: dto.plan_id }, idempotencyKey);
      toast.success("Paket langganan berhasil diperbarui!");
    } else {
      await subscribe(dto, idempotencyKey);
      toast.success("Langganan baru berhasil diaktifkan!");
    }
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-2">
            <Sparkles className="w-3.5 h-3.5" /> High-Performance Tunneling
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Paket & Langganan VPN
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Pilih paket bandwidth tanpa batas dengan latency gaming rendah dan
            enkripsi kelas militer.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            refresh();
            toast.info("Memperbarui data langganan...");
          }}
          className="gap-2 self-start sm:self-auto"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Segarkan Data</span>
        </Button>
      </div>

      {/* Active Subscription Banner */}
      {subscription && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Status Langganan Anda
          </h2>
          <UserSubscriptionCard
            subscription={subscription}
            onUpgrade={() => {
              window.scrollTo({ top: 300, behavior: "smooth" });
            }}
          />
        </section>
      )}

      {/* Plan Selection Section */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Pilihan Paket Terbaik Sesuai Kebutuhan
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Semua paket mendukung bypass DPI, protokol V2Ray/Trojan/WireGuard,
            dan jaminan uptime 99.9%.
          </p>
        </div>

        <PlanPricingGrid
          plans={plans}
          activePlanId={subscription?.plan_id}
          onSelectPlan={handleSelectPlan}
        />
      </section>

      {/* Modal Checkout / Upgrade */}
      {selectedPlan && (
        <SubscribeModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          plan={selectedPlan}
          onConfirmSubscribe={handleSubscribeSubmit}
        />
      )}

      {/* Trust & Guarantee Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-border/40">
        <div className="flex items-start gap-3 p-4 rounded-xl bg-card/40 border border-border/40">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              Zero-Logs Policy
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Tidak ada riwayat DNS, IP tujuan, atau lalu lintas data pengguna
              yang disimpan di disk server kami.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-card/40 border border-border/40">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              Aktivasi Instan
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Kredensial dan konfigurasi protokol diterbitkan dalam hitungan
              detik setelah verifikasi pembayaran.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-card/40 border border-border/40">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              Garansi 7 Hari
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Pengembalian saldo instan jika terjadi kendala konektivitas server
              yang tidak dapat terselesaikan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

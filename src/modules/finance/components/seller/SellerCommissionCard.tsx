// ==============================================================================
// GoVPN Finance Seller Commission Card Component
// Part of Pola C: components/seller/SellerCommissionCard.tsx
// 100% Coinbase Institutional Design System (Metric Cards, Monospace Figures)
// ==============================================================================

"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  SellerCommissionStats,
  SellerWithdrawalRequestDto,
} from "../../types/seller.types";
import { SellerWithdrawalModal } from "./SellerWithdrawalModal";
import { DollarSign, Clock, CheckCircle2, TrendingUp } from "lucide-react";

interface SellerCommissionCardProps {
  stats: SellerCommissionStats;
  onRequestWithdrawal: (dto: SellerWithdrawalRequestDto) => Promise<unknown>;
}

export function SellerCommissionCard({
  stats,
  onRequestWithdrawal,
}: SellerCommissionCardProps) {
  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="space-y-6">
      {/* Top Highlight Banner */}
      <Card className="border border-border/80 bg-card/60 p-6 rounded-2xl relative overflow-hidden shadow-lg">
        <div className="absolute -right-8 -bottom-8 h-36 w-36 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <CardContent className="p-0 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-3.5 text-emerald-400">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-mono">
                Komisi Reseller Tersedia
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-mono text-3xl font-black tracking-tight text-foreground">
                  {formatIDR(stats.available_balance)}
                </span>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-mono">
                  SIAP CAIR
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Hasil penjualan paket VPN, perpanjangan user, dan bonus
                afiliasi.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <SellerWithdrawalModal
              availableBalance={stats.available_balance}
              onRequestWithdrawal={onRequestWithdrawal}
            />
          </div>
        </CardContent>
      </Card>

      {/* 3 Metric Summary Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Earned */}
        <div className="rounded-2xl border border-border/80 bg-card/40 p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-mono font-medium uppercase">
              Total Akumulasi Komisi
            </span>
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
          <div className="font-mono text-2xl font-bold text-foreground">
            {formatIDR(stats.total_earned)}
          </div>
          <div className="text-[11px] text-muted-foreground">
            Semua revenue yang pernah diperoleh
          </div>
        </div>

        {/* Pending Payout */}
        <div className="rounded-2xl border border-border/80 bg-card/40 p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-mono font-medium uppercase">
              Sedang Diproses Admin
            </span>
            <Clock className="h-4 w-4 text-amber-400" />
          </div>
          <div className="font-mono text-2xl font-bold text-amber-400">
            {formatIDR(stats.pending_withdrawal)}
          </div>
          <div className="text-[11px] text-muted-foreground">
            Permintaan penarikan dalam antrian
          </div>
        </div>

        {/* Successfully Withdrawn */}
        <div className="rounded-2xl border border-border/80 bg-card/40 p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-mono font-medium uppercase">
              Total Berhasil Dicairkan
            </span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="font-mono text-2xl font-bold text-emerald-400">
            {formatIDR(stats.total_withdrawn)}
          </div>
          <div className="text-[11px] text-muted-foreground">
            Telah ditransfer ke rekening bank Anda
          </div>
        </div>
      </div>
    </div>
  );
}

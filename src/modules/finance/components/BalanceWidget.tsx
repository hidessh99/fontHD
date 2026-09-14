"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, ArrowUpRight, TrendingDown } from "lucide-react";
import { TopupModal } from "./TopupModal";
import { CreateTopupDto } from "../types/finance.types";

interface BalanceWidgetProps {
  balance: number;
  totalSpent?: number;
  onTopup: (dto: CreateTopupDto) => Promise<unknown>;
  onValidateVoucher?: (code: string) => Promise<{ valid: boolean; discount_amount: number; message?: string }>;
}

export function BalanceWidget({
  balance,
  totalSpent = 0,
  onTopup,
  onValidateVoucher,
}: BalanceWidgetProps) {
  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <Card className="border-zinc-800 bg-gradient-to-br from-zinc-900/90 via-zinc-950 to-zinc-950 p-6 shadow-xl relative overflow-hidden">
      <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-blue-600/10 blur-2xl pointer-events-none" />

      <CardContent className="p-0 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-3 text-blue-400">
            <Wallet className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Saldo Dompet Aktif
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-mono text-3xl font-bold tracking-tight text-zinc-100">
                {formatIDR(balance)}
              </span>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                IDR
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-zinc-500">
              <TrendingDown className="h-3.5 w-3.5 text-zinc-500" />
              <span>Total belanja akun VPN:</span>
              <span className="font-mono text-zinc-400">{formatIDR(totalSpent)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <TopupModal
            onTopup={onTopup}
            onValidateVoucher={onValidateVoucher}
          />
        </div>
      </CardContent>
    </Card>
  );
}

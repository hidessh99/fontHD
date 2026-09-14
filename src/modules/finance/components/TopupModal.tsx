"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PaymentMethod, CreateTopupDto } from "../types/finance.types";
import { Wallet, QrCode, Tag, Check, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface TopupModalProps {
  onTopup: (dto: CreateTopupDto) => Promise<unknown>;
  onValidateVoucher?: (code: string) => Promise<{ valid: boolean; discount_amount: number; message?: string }>;
  triggerButton?: React.ReactNode;
}

const PRESET_AMOUNTS = [10000, 25000, 50000, 100000, 250000, 500000];

export function TopupModal({
  onTopup,
  onValidateVoucher,
  triggerButton,
}: TopupModalProps) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<number>(50000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [method, setMethod] = useState<PaymentMethod>("QRIS");
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [voucherDiscount, setVoucherDiscount] = useState<number>(0);
  const [isCheckingVoucher, setIsCheckingVoucher] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedAmount = customAmount ? parseInt(customAmount, 10) || 0 : amount;
  const finalAmount = Math.max(0, selectedAmount - voucherDiscount);

  const handleApplyVoucher = async () => {
    if (!voucherCode.trim() || !onValidateVoucher) return;
    setIsCheckingVoucher(true);
    try {
      const res = await onValidateVoucher(voucherCode.trim());
      if (res.valid) {
        setVoucherDiscount(res.discount_amount);
        toast.success(res.message || "Voucher berhasil digunakan!");
      } else {
        setVoucherDiscount(0);
        toast.error(res.message || "Kode voucher tidak valid");
      }
    } finally {
      setIsCheckingVoucher(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAmount < 10000) {
      toast.error("Minimal pengisian saldo adalah Rp 10.000");
      return;
    }

    setIsSubmitting(true);
    try {
      await onTopup({
        amount: selectedAmount,
        payment_method: method,
        voucher_code: voucherCode.trim() || undefined,
      });
      setOpen(false);
    } catch {
      // Error handled in hook
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        triggerButton ? (
          (triggerButton as React.ReactElement)
        ) : (
          <Button className="bg-blue-600 hover:bg-blue-500 text-white gap-2 font-medium">
            <Wallet className="h-4 w-4" />
            Top Up Saldo
          </Button>
        )
      } />

      <DialogContent className="sm:max-w-md bg-zinc-950 border-zinc-800 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            <Wallet className="h-5 w-5 text-blue-400" />
            Isi Saldo Akun (Deposit)
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Preset Amounts */}
          <div>
            <Label className="text-xs text-zinc-400">Pilih Nominal</Label>
            <div className="grid grid-cols-3 gap-2 mt-1.5">
              {PRESET_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setAmount(amt);
                    setCustomAmount("");
                  }}
                  className={`rounded-lg border px-3 py-2 text-xs font-mono font-medium transition-all ${
                    !customAmount && amount === amt
                      ? "border-blue-500 bg-blue-600/20 text-blue-400"
                      : "border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700"
                  }`}
                >
                  {formatIDR(amt)}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div>
            <Label htmlFor="custom-amount" className="text-xs text-zinc-400">
              Atau Nominal Lainnya (Min. Rp 10.000)
            </Label>
            <div className="relative mt-1.5">
              <span className="absolute left-3 top-2.5 text-xs text-zinc-500 font-medium">
                Rp
              </span>
              <Input
                id="custom-amount"
                type="number"
                placeholder="Misal: 75000"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="pl-9 bg-zinc-900 border-zinc-800 text-zinc-100 font-mono text-sm"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <Label className="text-xs text-zinc-400">Metode Pembayaran</Label>
            <div className="grid grid-cols-2 gap-2 mt-1.5">
              <button
                type="button"
                onClick={() => setMethod("QRIS")}
                className={`flex items-center gap-2 rounded-lg border p-2.5 text-xs font-medium transition-all text-left ${
                  method === "QRIS"
                    ? "border-blue-500 bg-blue-600/20 text-blue-400"
                    : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700"
                }`}
              >
                <QrCode className="h-4 w-4 shrink-0 text-blue-400" />
                <div>
                  <div className="font-semibold text-zinc-200">QRIS Instan</div>
                  <div className="text-[10px] text-zinc-500">BCA, GoPay, OVO, Dana</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setMethod("TRIPAY")}
                className={`flex items-center gap-2 rounded-lg border p-2.5 text-xs font-medium transition-all text-left ${
                  method === "TRIPAY"
                    ? "border-blue-500 bg-blue-600/20 text-blue-400"
                    : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700"
                }`}
              >
                <Wallet className="h-4 w-4 shrink-0 text-indigo-400" />
                <div>
                  <div className="font-semibold text-zinc-200">Virtual Account</div>
                  <div className="text-[10px] text-zinc-500">Tripay Payment</div>
                </div>
              </button>
            </div>
          </div>

          {/* Voucher Code */}
          <div>
            <Label htmlFor="voucher" className="text-xs text-zinc-400">
              Kupon Promo / Diskon (Opsional)
            </Label>
            <div className="flex gap-2 mt-1.5">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                <Input
                  id="voucher"
                  placeholder="Kode voucher (cth: PROMO2026)"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                  className="pl-9 bg-zinc-900 border-zinc-800 text-zinc-100 uppercase font-mono text-xs"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleApplyVoucher}
                disabled={!voucherCode || isCheckingVoucher}
                className="border-zinc-800 hover:bg-zinc-800 text-zinc-200"
              >
                {isCheckingVoucher ? <Loader2 className="h-4 w-4 animate-spin" /> : "Gunakan"}
              </Button>
            </div>
            {voucherDiscount > 0 && (
              <p className="mt-1 flex items-center gap-1 text-[11px] text-emerald-400">
                <Check className="h-3 w-3" /> Potongan harga: {formatIDR(voucherDiscount)}
              </p>
            )}
          </div>

          {/* Summary Box */}
          <div className="rounded-lg bg-zinc-900/80 border border-zinc-800 p-3 text-xs space-y-1">
            <div className="flex justify-between text-zinc-400">
              <span>Nominal Deposit:</span>
              <span className="font-mono text-zinc-200">{formatIDR(selectedAmount)}</span>
            </div>
            {voucherDiscount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Diskon Kupon:</span>
                <span className="font-mono">-{formatIDR(voucherDiscount)}</span>
              </div>
            )}
            <div className="flex justify-between text-zinc-400">
              <span>Biaya Transaksi:</span>
              <span className="font-mono text-zinc-400">Rp 1.000</span>
            </div>
            <div className="border-t border-zinc-800 pt-1.5 flex justify-between font-bold text-sm text-zinc-100">
              <span>Total Bayar:</span>
              <span className="font-mono text-blue-400">
                {formatIDR(finalAmount + 1000)}
              </span>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white gap-2 font-medium"
            disabled={isSubmitting || selectedAmount < 10000}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Membuat Faktur Tagihan...
              </>
            ) : (
              <>
                Lanjut ke Pembayaran QRIS
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

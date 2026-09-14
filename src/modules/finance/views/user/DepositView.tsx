// ==============================================================================
// GoVPN Finance User Deposit View
// Part of Pola C: views/user/DepositView.tsx
// 100% Coinbase Institutional Design System (Preset Buttons, QRIS Streaming)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { useFinanceUser } from "../../hooks/useFinanceUser";
import { QrisPaymentCard } from "../../components/user/QrisPaymentCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PaymentMethod } from "../../types/finance.types";
import {
  Wallet,
  QrCode,
  Tag,
  ArrowRight,
  ShieldCheck,
  Zap,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

const PRESET_AMOUNTS = [10000, 25000, 50000, 100000, 250000, 500000];

export function DepositView() {
  const {
    activeInvoice,
    createTopup,
    validateVoucher,
    fetchInvoices,
    fetchBilling,
  } = useFinanceUser();

  const [amount, setAmount] = useState<number>(50000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [method, setMethod] = useState<PaymentMethod>("QRIS");
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [voucherDiscount, setVoucherDiscount] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingVoucher, setIsCheckingVoucher] = useState(false);

  const selectedAmount = customAmount
    ? parseInt(customAmount, 10) || 0
    : amount;
  const finalAmount = Math.max(0, selectedAmount - voucherDiscount);

  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) return;
    setIsCheckingVoucher(true);
    try {
      const res = await validateVoucher(voucherCode.trim());
      if (res.valid) {
        setVoucherDiscount(res.discount_amount);
        toast.success(res.message || "Voucher berhasil diterapkan!");
      } else {
        setVoucherDiscount(0);
        toast.error(res.message || "Voucher tidak valid");
      }
    } finally {
      setIsCheckingVoucher(false);
    }
  };

  const handleCreateDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAmount < 10000) {
      toast.error("Minimal pengisian saldo adalah Rp 10.000");
      return;
    }

    setIsSubmitting(true);
    try {
      await createTopup({
        amount: selectedAmount,
        payment_method: method,
        voucher_code: voucherCode.trim() || undefined,
      });
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
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
          <Wallet className="h-6 w-6 text-primary" />
          Deposit Saldo Akun
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Isi saldo dompet GoVPN Anda secara instan menggunakan QRIS atau
          Virtual Account otomatis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Deposit Form */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="border-border/80 bg-card/60 shadow-xl rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-bold text-foreground">
                Pilih Nominal &amp; Metode Deposit
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Saldo otomatis masuk 24 jam nonstop setelah QRIS terverifikasi.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateDeposit} className="space-y-5">
                {/* Presets */}
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">
                    Pilihan Nominal Cepat
                  </Label>
                  <div className="grid grid-cols-3 gap-2.5 mt-2">
                    {PRESET_AMOUNTS.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setAmount(amt);
                          setCustomAmount("");
                        }}
                        className={`rounded-xl border py-3 px-2 text-xs font-mono font-medium transition-all ${
                          !customAmount && amount === amt
                            ? "border-primary bg-primary/10 text-primary ring-1 ring-primary"
                            : "border-border/60 bg-surface/50 text-muted-foreground hover:border-border hover:text-foreground"
                        }`}
                      >
                        {formatIDR(amt)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div>
                  <Label
                    htmlFor="dep-amount"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    Atau Masukkan Nominal Lain (Min. Rp 10.000)
                  </Label>
                  <div className="relative mt-1.5">
                    <span className="absolute left-3 top-2.5 text-xs text-muted-foreground font-mono">
                      Rp
                    </span>
                    <Input
                      id="dep-amount"
                      type="number"
                      placeholder="Contoh: 150000"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="pl-9 font-mono text-sm rounded-xl min-h-10"
                    />
                  </div>
                </div>

                {/* Method */}
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">
                    Metode Pembayaran
                  </Label>
                  <div className="grid grid-cols-2 gap-3 mt-1.5">
                    <button
                      type="button"
                      onClick={() => setMethod("QRIS")}
                      className={`flex items-start gap-3 rounded-xl border p-3 text-xs transition-all text-left ${
                        method === "QRIS"
                          ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary shadow-sm"
                          : "border-border/60 bg-surface/50 text-muted-foreground hover:border-border"
                      }`}
                    >
                      <QrCode className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                      <div>
                        <div className="font-bold text-foreground font-mono">
                          QRIS Real-Time
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          BCA, Gopay, Dana, Ovo
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMethod("MIDTRANS")}
                      className={`flex items-start gap-3 rounded-xl border p-3 text-xs transition-all text-left ${
                        method === "MIDTRANS"
                          ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary shadow-sm"
                          : "border-border/60 bg-surface/50 text-muted-foreground hover:border-border"
                      }`}
                    >
                      <Zap className="h-5 w-5 shrink-0 text-amber-400 mt-0.5" />
                      <div>
                        <div className="font-bold text-foreground font-mono">
                          Virtual Account
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          BCA, Mandiri, BRI, BNI
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Promo Coupon */}
                <div>
                  <Label
                    htmlFor="dep-voucher"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    Kupon Promo (Opsional)
                  </Label>
                  <div className="flex gap-2 mt-1.5">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="dep-voucher"
                        placeholder="KODE PROMO"
                        value={voucherCode}
                        onChange={(e) =>
                          setVoucherCode(e.target.value.toUpperCase())
                        }
                        className="pl-9 uppercase font-mono text-xs rounded-xl min-h-10"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleApplyVoucher}
                      disabled={!voucherCode || isCheckingVoucher}
                      className="border-border/80 hover:bg-muted/30 text-foreground rounded-xl min-h-10 px-4 text-xs font-semibold"
                    >
                      {isCheckingVoucher ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Gunakan"
                      )}
                    </Button>
                  </div>
                </div>

                {/* Summary */}
                <div className="rounded-xl bg-surface border border-border/60 p-4 text-xs space-y-2 font-mono">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Nominal Deposit:</span>
                    <span className="text-foreground">
                      {formatIDR(selectedAmount)}
                    </span>
                  </div>
                  {voucherDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Diskon Kupon:</span>
                      <span>-{formatIDR(voucherDiscount)}</span>
                    </div>
                  )}
                  <div className="border-t border-border/50 pt-2 flex justify-between font-bold text-sm text-foreground">
                    <span>Total Pembayaran:</span>
                    <span className="text-primary font-bold">
                      {formatIDR(finalAmount)}
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover text-white gap-2 font-semibold min-h-12 text-xs rounded-full shadow-lg shadow-primary/25"
                  disabled={isSubmitting || selectedAmount < 10000}
                >
                  <ShieldCheck className="h-4 w-4" />
                  Konfirmasi &amp; Terbitkan QRIS
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: QRIS Display or Instructions */}
        <div className="lg:col-span-5 flex flex-col items-center">
          {activeInvoice ? (
            <QrisPaymentCard
              invoice={activeInvoice}
              onRefreshStatus={() => fetchInvoices(true)}
              onPaymentSuccess={() => {
                fetchInvoices(true);
                fetchBilling();
              }}
            />
          ) : (
            <Card className="w-full border-border/80 bg-card/60 p-6 text-foreground space-y-4 rounded-2xl shadow-lg">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Panduan Pembayaran QRIS Instan
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-xs text-muted-foreground leading-relaxed">
                <li>
                  Tentukan nominal deposit yang Anda inginkan (minimal Rp
                  10.000).
                </li>
                <li>
                  Klik tombol{" "}
                  <strong>&quot;Konfirmasi &amp; Terbitkan QRIS&quot;</strong>.
                </li>
                <li>
                  Buka aplikasi m-Banking atau e-Wallet favorit Anda (BCA,
                  Mandiri, GoPay, OVO, DANA).
                </li>
                <li>
                  Pindai (scan) kode QRIS yang muncul di layar pembayaran.
                </li>
                <li>
                  Pastikan nama merchant tertera <strong>GoVPN Network</strong>.
                </li>
                <li>
                  Selesaikan transaksi dan saldo Anda akan bertambah secara
                  otomatis dalam 3-5 detik.
                </li>
              </ol>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

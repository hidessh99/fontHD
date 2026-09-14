"use client";

import React, { useState } from "react";
import { useBilling } from "../hooks/useBilling";
import { QrisPaymentCard } from "../components/QrisPaymentCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PaymentMethod } from "../types/finance.types";
import { Wallet, QrCode, Tag, Check, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { toast } from "sonner";

const PRESET_AMOUNTS = [10000, 25000, 50000, 100000, 250000, 500000];

export function DepositView() {
  const {
    activeInvoice,
    setActiveInvoice,
    createTopup,
    validateVoucher,
    pollingActive,
    fetchInvoices,
  } = useBilling();

  const [amount, setAmount] = useState<number>(50000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [method, setMethod] = useState<PaymentMethod>("QRIS");
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [voucherDiscount, setVoucherDiscount] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedAmount = customAmount ? parseInt(customAmount, 10) || 0 : amount;
  const finalAmount = Math.max(0, selectedAmount - voucherDiscount);

  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) return;
    const res = await validateVoucher(voucherCode.trim());
    if (res.valid) {
      setVoucherDiscount(res.discount_amount);
      toast.success(res.message || "Voucher berhasil diterapkan!");
    } else {
      setVoucherDiscount(0);
      toast.error(res.message || "Voucher tidak valid");
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
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
          <Wallet className="h-6 w-6 text-blue-400" />
          Deposit Saldo Akun
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Isi saldo dompet GoVPN Anda secara instan menggunakan QRIS atau Virtual Account otomatis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Deposit Form */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="border-zinc-800 bg-zinc-950 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-base text-zinc-100">
                Pilih Nominal & Metode Deposit
              </CardTitle>
              <CardDescription className="text-xs text-zinc-400">
                Saldo langsung masuk otomatis 24 jam nonstop setelah QRIS terverifikasi.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateDeposit} className="space-y-5">
                {/* Presets */}
                <div>
                  <Label className="text-xs text-zinc-400">Pilihan Nominal Cepat</Label>
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
                            ? "border-blue-500 bg-blue-600/20 text-blue-400 ring-1 ring-blue-500"
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
                  <Label htmlFor="dep-amount" className="text-xs text-zinc-400">
                    Atau Masukkan Nominal Sendiri
                  </Label>
                  <div className="relative mt-1.5">
                    <span className="absolute left-3 top-2.5 text-xs text-zinc-500 font-medium">
                      Rp
                    </span>
                    <Input
                      id="dep-amount"
                      type="number"
                      placeholder="Contoh: 150000"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="pl-9 bg-zinc-900 border-zinc-800 text-zinc-100 font-mono text-sm"
                    />
                  </div>
                </div>

                {/* Method */}
                <div>
                  <Label className="text-xs text-zinc-400">Metode Pembayaran</Label>
                  <div className="grid grid-cols-2 gap-3 mt-1.5">
                    <button
                      type="button"
                      onClick={() => setMethod("QRIS")}
                      className={`flex items-start gap-3 rounded-xl border p-3 text-xs transition-all text-left ${
                        method === "QRIS"
                          ? "border-blue-500 bg-blue-600/20 text-blue-400 ring-1 ring-blue-500"
                          : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      <QrCode className="h-5 w-5 shrink-0 text-blue-400 mt-0.5" />
                      <div>
                        <div className="font-semibold text-zinc-200">QRIS Real-Time</div>
                        <div className="text-[11px] text-zinc-500">Biaya transaksi Rp 1.000</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMethod("TRIPAY")}
                      className={`flex items-start gap-3 rounded-xl border p-3 text-xs transition-all text-left ${
                        method === "TRIPAY"
                          ? "border-blue-500 bg-blue-600/20 text-blue-400 ring-1 ring-blue-500"
                          : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      <Zap className="h-5 w-5 shrink-0 text-amber-400 mt-0.5" />
                      <div>
                        <div className="font-semibold text-zinc-200">Virtual Account</div>
                        <div className="text-[11px] text-zinc-500">Tripay Multi-Bank</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Promo Coupon */}
                <div>
                  <Label htmlFor="dep-voucher" className="text-xs text-zinc-400">
                    Kupon Promo
                  </Label>
                  <div className="flex gap-2 mt-1.5">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                      <Input
                        id="dep-voucher"
                        placeholder="KODE PROMO"
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
                      disabled={!voucherCode}
                      className="border-zinc-800 hover:bg-zinc-800 text-zinc-200"
                    >
                      Gunakan
                    </Button>
                  </div>
                </div>

                {/* Summary */}
                <div className="rounded-xl bg-zinc-900/90 border border-zinc-800 p-4 text-xs space-y-2">
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
                    <span>Biaya Gateway:</span>
                    <span className="font-mono text-zinc-400">Rp 1.000</span>
                  </div>
                  <div className="border-t border-zinc-800 pt-2 flex justify-between font-bold text-base text-zinc-100">
                    <span>Total Pembayaran:</span>
                    <span className="font-mono text-blue-400">
                      {formatIDR(finalAmount + 1000)}
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white gap-2 font-medium h-11 text-sm shadow-lg shadow-blue-600/20"
                  disabled={isSubmitting || selectedAmount < 10000}
                >
                  <ShieldCheck className="h-4 w-4" />
                  Konfirmasi & Terbitkan QRIS
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
              onSimulatePaid={(invId) => {
                setActiveInvoice({
                  ...activeInvoice,
                  status: "PAID",
                  paid_at: new Date().toISOString(),
                });
              }}
              isPolling={pollingActive}
            />
          ) : (
            <Card className="w-full border-zinc-800 bg-zinc-950/60 p-6 text-zinc-300 space-y-4">
              <h3 className="font-semibold text-zinc-100 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-blue-400" />
                Panduan Pembayaran QRIS
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-xs text-zinc-400 leading-relaxed">
                <li>Tentukan nominal deposit yang Anda inginkan (minimal Rp 10.000).</li>
                <li>Klik tombol <strong>&quot;Konfirmasi &amp; Terbitkan QRIS&quot;</strong>.</li>
                <li>Buka aplikasi m-Banking atau e-Wallet (BCA, Mandiri, GoPay, Dana, dll).</li>
                <li>Pindai (scan) kode QRIS yang muncul di layar.</li>
                <li>Pastikan nama merchant tertera <strong>GoVPN Network</strong>.</li>
                <li>Selesaikan transaksi dan saldo Anda akan bertambah secara otomatis.</li>
              </ol>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

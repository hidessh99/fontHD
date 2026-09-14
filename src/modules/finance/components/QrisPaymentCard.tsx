"use client";

import React, { useEffect, useState } from "react";
import { Invoice } from "../types/finance.types";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/shared/CopyButton";
import { CheckCircle2, Clock, RefreshCw, ShieldCheck, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface QrisPaymentCardProps {
  invoice: Invoice;
  onRefreshStatus?: () => void;
  onSimulatePaid?: (invoiceId: string) => void;
  isPolling?: boolean;
}

export function QrisPaymentCard({
  invoice,
  onRefreshStatus,
  onSimulatePaid,
  isPolling = false,
}: QrisPaymentCardProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(900); // 15 minutes in seconds

  const qrPayload =
    invoice.qr_string ||
    `00020101021126570014ID.LINKAJA.WWW011893600911002233445502100000000001510200020300303UMI5204599953033605406${invoice.total_amount || invoice.amount}5802ID5911GOVPN SPEED6007JAKARTA61051234062070703A016304E64A`;

  useEffect(() => {
    QRCode.toDataURL(qrPayload, {
      width: 280,
      margin: 2,
      color: {
        dark: "#09090b",
        light: "#ffffff",
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error("QR render error", err));
  }, [qrPayload]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const isPaid = invoice.status === "PAID";

  return (
    <Card className="w-full max-w-md border-zinc-800 bg-zinc-950 text-zinc-100 shadow-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 flex items-center justify-between text-xs font-semibold text-white">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4" />
          Pembayaran Instan Otomatis (QRIS)
        </span>
        <span className="font-mono bg-white/20 px-2 py-0.5 rounded">
          {invoice.invoice_number}
        </span>
      </div>

      <CardHeader className="text-center pt-5 pb-2">
        <CardTitle className="text-xl font-bold">
          {isPaid ? (
            <span className="flex items-center justify-center gap-2 text-emerald-400">
              <CheckCircle2 className="h-6 w-6" /> Pembayaran Lunas
            </span>
          ) : (
            <span>Scan Kode QRIS Nasional</span>
          )}
        </CardTitle>
        <p className="text-xs text-zinc-400">
          Mendukung BCA, Mandiri, BRI, BNI, GoPay, OVO, DANA, ShopeePay & LinkAja
        </p>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4 pb-6">
        {/* QR Code Container */}
        <div className="relative flex items-center justify-center rounded-2xl bg-white p-3 shadow-md border-2 border-zinc-800">
          {qrDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={qrDataUrl}
              alt="QRIS Payment"
              className="h-60 w-60 rounded-lg object-contain"
            />
          ) : (
            <div className="flex h-60 w-60 items-center justify-center text-zinc-500 text-xs">
              Memuat kode QR...
            </div>
          )}

          {isPaid && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/90 rounded-2xl text-emerald-400 backdrop-blur-xs">
              <CheckCircle2 className="h-16 w-16 mb-2 animate-bounce" />
              <p className="text-base font-bold text-white">TERVERIFIKASI</p>
              <p className="text-xs text-zinc-400">Saldo Anda telah ditambahkan</p>
            </div>
          )}
        </div>

        {/* Amount Section */}
        <div className="w-full rounded-xl bg-zinc-900/90 border border-zinc-800/80 p-3.5 text-center">
          <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
            Total yang Harus Dibayar
          </span>
          <div className="flex items-center justify-center gap-2 mt-0.5">
            <span className="font-mono text-2xl font-bold text-blue-400">
              {formatIDR(invoice.total_amount || invoice.amount)}
            </span>
            <CopyButton
              text={String(invoice.total_amount || invoice.amount)}
              label="Nominal"
            />
          </div>
          <p className="text-[10px] text-amber-400/90 mt-1 flex items-center justify-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Transfer nominal harus persis hingga 3 digit terakhir
          </p>
        </div>

        {/* Timer Countdown */}
        {!isPaid && (
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Clock className="h-4 w-4 text-zinc-500" />
            <span>Berlaku hingga:</span>
            <span className="font-mono font-bold text-amber-400">
              {formattedTime}
            </span>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex w-full flex-col gap-2 pt-2">
          {!isPaid && (
            <Button
              variant="outline"
              size="sm"
              className="w-full border-zinc-800 hover:bg-zinc-900 text-zinc-300 gap-2 h-9"
              onClick={onRefreshStatus}
              disabled={isPolling}
            >
              <RefreshCw className={`h-4 w-4 ${isPolling ? "animate-spin text-blue-400" : ""}`} />
              {isPolling ? "Memeriksa Pembayaran Otomatis..." : "Cek Status Pembayaran"}
            </Button>
          )}

          {/* Developer / Demo Simulator button to test instantly */}
          {!isPaid && onSimulatePaid && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-[11px] text-zinc-500 hover:text-emerald-400 hover:bg-emerald-950/20"
              onClick={() => {
                onSimulatePaid(invoice.id);
                toast.success("Simulasi Pembayaran Berhasil!");
              }}
            >
              [Dev Sim] Klik untuk Bayar Lunas Instan
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ==============================================================================
// GoVPN QRIS Payment Card Component
// Part of Pola C: components/user/QrisPaymentCard.tsx
// Integrated with Adaptive Poller & Page Visibility API (Zero Battery Drain)
// Fully Localized with useI18n (EN/ID)
// ==============================================================================

"use client";

import React, { useEffect, useState, useRef } from "react";
import { Invoice } from "../../types/finance.types";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/shared/CopyButton";
import { CheckCircle2, Clock, RefreshCw, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { startAdaptivePoller } from "@/lib/utils/adaptive-poller";
import { financeUserApi } from "../../api/user.api";
import { useI18n } from "@/lib/i18n/context";

interface QrisPaymentCardProps {
  invoice: Invoice;
  onPaymentSuccess?: (invoice: Invoice) => void;
  onRefreshStatus?: () => void;
}

export function QrisPaymentCard({
  invoice,
  onPaymentSuccess,
  onRefreshStatus,
}: QrisPaymentCardProps) {
  const { t } = useI18n();
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(900); // 15 minutes
  const [isPollingActive, setIsPollingActive] = useState<boolean>(true);
  const [isPaid, setIsPaid] = useState<boolean>(invoice.status === "PAID");

  const stopPollerRef = useRef<(() => void) | null>(null);

  const qrPayload =
    invoice.qr_string ||
    `00020101021126570014ID.LINKAJA.WWW011893600911002233445502100000000001510200020300303UMI5204599953033605406${invoice.total_amount || invoice.amount}5802ID5911GOVPN SPEED6007JAKARTA61051234062070703A016304E64A`;

  // Render QR Data URL
  useEffect(() => {
    QRCode.toDataURL(qrPayload, {
      width: 280,
      margin: 2,
      color: {
        dark: "#0a0b0d",
        light: "#ffffff",
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error("QR render error", err));
  }, [qrPayload]);

  // Expiration countdown
  useEffect(() => {
    if (isPaid) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isPaid]);

  // Integrated Adaptive Polling with Page Visibility API
  useEffect(() => {
    if (isPaid || invoice.status === "PAID") return;

    const stop = startAdaptivePoller(
      async () => {
        try {
          const res = await financeUserApi.getInvoiceById(invoice.id);
          if (res.payload && res.payload.status === "PAID") {
            setIsPaid(true);
            setIsPollingActive(false);
            toast.success(t("finance.paymentSuccess"));
            onPaymentSuccess?.(res.payload);
            return true; // Stop polling
          }
        } catch {
          // Continue adaptive backoff
        }
        return false;
      },
      {
        baseIntervalMs: 2000,
        maxIntervalMs: 12000,
        maxAttempts: 75,
      },
    );

    stopPollerRef.current = stop;

    return () => {
      stop();
    };
  }, [invoice.id, invoice.status, isPaid, onPaymentSuccess, t]);

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

  return (
    <Card className="w-full max-w-md border-border/80 bg-card/90 text-foreground shadow-2xl overflow-hidden rounded-2xl">
      <div className="bg-primary px-6 py-3 flex items-center justify-between text-xs font-semibold text-white">
        <span className="flex items-center gap-1.5 font-sans">
          <ShieldCheck className="h-4 w-4" />
          {t("finance.qrisPayment")}
        </span>
        <span className="font-mono bg-white/20 px-2 py-0.5 rounded-full text-[11px]">
          {invoice.invoice_number}
        </span>
      </div>

      <CardHeader className="text-center pt-5 pb-2">
        <CardTitle className="text-xl font-bold">
          {isPaid ? (
            <span className="flex items-center justify-center gap-2 text-emerald-400">
              <CheckCircle2 className="h-6 w-6" /> {t("finance.paymentSuccess")}
            </span>
          ) : (
            <span>{t("finance.scanQrisNational")}</span>
          )}
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          {t("finance.scanQris")}
        </p>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4 pb-6">
        {/* QR Code Container */}
        <div className="relative flex items-center justify-center rounded-2xl bg-white p-3 shadow-md border-2 border-border/50">
          {qrDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={qrDataUrl}
              alt="QRIS Payment"
              className="h-56 w-56 rounded-xl object-contain"
            />
          ) : (
            <div className="flex h-56 w-56 items-center justify-center font-mono text-xs text-zinc-400">
              Generating QRIS...
            </div>
          )}

          {isPaid && (
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-zinc-950/85 backdrop-blur-sm">
              <CheckCircle2 className="h-16 w-16 text-emerald-400 animate-bounce" />
              <span className="mt-2 font-bold text-emerald-400 font-mono text-sm">
                {t("finance.paid").toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Amount Box */}
        <div className="w-full rounded-xl bg-surface border border-border/60 p-4 text-center space-y-1">
          <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider font-mono">
            {t("finance.exactTransferTotal")}
          </span>
          <div className="font-mono text-2xl font-black text-primary">
            {formatIDR(invoice.total_amount || invoice.amount)}
          </div>
          <span className="text-[10px] text-muted-foreground block font-mono">
            {t("finance.uniqueCodeNote")}
          </span>
        </div>

        {/* Timer Countdown */}
        {!isPaid && (
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full">
            <Clock className="h-3.5 w-3.5" />
            <span>
              {t("finance.payTimeRemaining")} <strong>{formattedTime}</strong>
            </span>
            {isPollingActive && (
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse ml-1"
                title="Mendeteksi pembayaran real-time"
              />
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex w-full items-center gap-2 pt-2">
          <CopyButton
            text={qrPayload}
            label={t("finance.copyQrisCode")}
            className="flex-1 rounded-full min-h-10 text-xs font-semibold"
          />
          {onRefreshStatus && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRefreshStatus}
              className="rounded-full min-h-10 px-4 text-xs font-mono"
              title={t("common.refresh")}
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

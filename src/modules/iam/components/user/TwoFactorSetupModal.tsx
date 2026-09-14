// ==============================================================================
// GoVPN IAM Two-Factor Authentication (2FA TOTP) Setup Modal Component
// Part of Pola C: components/user/TwoFactorSetupModal.tsx
// 100% Coinbase Institutional Design System (QR Scan, Secret Key, Backup Codes)
// ==============================================================================

"use client";

import React, { useState, useEffect } from "react";
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
import { CopyButton } from "@/components/shared/CopyButton";
import {
  ShieldCheck,
  Smartphone,
  Key,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import QRCode from "qrcode";
import { toast } from "sonner";

interface TwoFactorSetupModalProps {
  isEnabled?: boolean;
  onEnable2Fa?: (code: string) => Promise<boolean>;
  onDisable2Fa?: (code: string) => Promise<boolean>;
  triggerButton?: React.ReactNode;
}

export function TwoFactorSetupModal({
  isEnabled = false,
  onEnable2Fa,
  onDisable2Fa,
  triggerButton,
}: TwoFactorSetupModalProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"qr" | "verify" | "backup">("qr");
  const [code, setCode] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock TOTP secret and backup codes for institutional flow
  const secretKey = "JBSWY3DPEHPK3PXP";
  const otpAuthUri = `otpauth://totp/GoVPN:user@govpn.com?secret=${secretKey}&issuer=GoVPN`;
  const backupCodes = [
    "A8B2-9F1C",
    "4D7E-8A3B",
    "9C2E-1F4A",
    "3B8D-7E9F",
    "5F1A-2B3C",
    "8E4D-9A7B",
  ];

  useEffect(() => {
    if (open && !isEnabled) {
      QRCode.toDataURL(otpAuthUri, {
        width: 200,
        margin: 2,
        color: { dark: "#0a0b0d", light: "#ffffff" },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error("2FA QR render error", err));
    }
  }, [open, isEnabled, otpAuthUri]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 6) return;

    setIsSubmitting(true);
    try {
      if (isEnabled && onDisable2Fa) {
        const ok = await onDisable2Fa(code);
        if (ok) {
          toast.success("Autentikasi Dua Faktor (2FA) berhasil dinonaktifkan.");
          setOpen(false);
        }
      } else if (onEnable2Fa) {
        const ok = await onEnable2Fa(code);
        if (ok) {
          setStep("backup");
          toast.success("2FA Berhasil Diaktifkan!");
        }
      } else {
        setStep("backup");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          triggerButton ? (
            (triggerButton as React.ReactElement)
          ) : (
            <Button
              variant={isEnabled ? "outline" : "default"}
              className={`gap-2 font-semibold text-xs rounded-full min-h-10 px-5 ${
                isEnabled
                  ? "border-emerald-500/40 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20"
                  : "bg-primary hover:bg-primary-hover text-white shadow-md shadow-primary/25"
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              {isEnabled ? "2FA Aktif (Kelola)" : "Aktifkan 2FA"}
            </Button>
          )
        }
      />

      <DialogContent className="sm:max-w-md bg-card border-border/80 text-foreground rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Autentikasi Dua Faktor (2FA TOTP)
          </DialogTitle>
        </DialogHeader>

        {isEnabled ? (
          /* Disable 2FA Flow */
          <form onSubmit={handleVerify} className="space-y-4 pt-2">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-foreground block">
                  Akun Anda Dilindungi 2FA
                </span>
                <span className="text-muted-foreground">
                  Setiap kali login memerlukan kode 6-digit dari aplikasi
                  authenticator.
                </span>
              </div>
            </div>

            <div>
              <Label
                htmlFor="disable-2fa-code"
                className="text-xs font-medium text-muted-foreground"
              >
                Masukkan Kode 6-Digit Authenticator untuk Menonaktifkan
              </Label>
              <Input
                id="disable-2fa-code"
                placeholder="123456"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="mt-1.5 font-mono text-center text-sm font-bold tracking-widest rounded-xl min-h-11"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/50">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="text-xs rounded-full min-h-10 px-5"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || code.length < 6}
                className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-full min-h-10 px-6"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Nonaktifkan 2FA"
                )}
              </Button>
            </div>
          </form>
        ) : step === "backup" ? (
          /* Step 3: Backup Codes */
          <div className="space-y-4 pt-2">
            <div className="rounded-xl border border-border/60 bg-surface/50 p-4 space-y-2">
              <span className="text-xs font-bold text-foreground block">
                Simpan Kode Cadangan Pemulihan (Backup Codes)
              </span>
              <p className="text-xs text-muted-foreground">
                Gunakan kode ini untuk masuk ke akun jika Anda kehilangan akses
                ke aplikasi authenticator. Setiap kode hanya dapat dipakai satu
                kali.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2 font-mono text-xs font-bold text-primary">
                {backupCodes.map((c) => (
                  <div
                    key={c}
                    className="bg-background/80 border border-border/60 p-2 rounded-lg text-center"
                  >
                    {c}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <CopyButton
                text={backupCodes.join("\n")}
                label="Salin Semua Kode"
                className="rounded-full text-xs font-semibold"
              />
              <Button
                onClick={() => {
                  setOpen(false);
                  setStep("qr");
                  setCode("");
                }}
                className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-full min-h-10 px-6"
              >
                Selesai
              </Button>
            </div>
          </div>
        ) : (
          /* Step 1 & 2: Setup & Verify Flow */
          <form onSubmit={handleVerify} className="space-y-4 pt-2">
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-border/60 mx-auto w-48 h-48">
              {qrDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={qrDataUrl}
                  alt="2FA QR Code"
                  className="w-44 h-44 object-contain rounded-xl"
                />
              ) : (
                <Smartphone className="h-10 w-10 text-muted-foreground animate-pulse" />
              )}
            </div>

            <div className="space-y-1 text-center">
              <span className="text-xs font-medium text-muted-foreground block">
                Pindai QR di atas menggunakan Google Authenticator atau Authy
              </span>
              <div className="flex items-center justify-center gap-2 pt-1 font-mono text-xs">
                <span className="text-muted-foreground">Kunci Manual:</span>
                <span className="font-bold text-primary">{secretKey}</span>
                <CopyButton text={secretKey} label="" className="h-6 w-6 p-0" />
              </div>
            </div>

            <div>
              <Label
                htmlFor="verify-2fa-code"
                className="text-xs font-medium text-muted-foreground"
              >
                Masukkan Kode 6-Digit Verifikasi
              </Label>
              <Input
                id="verify-2fa-code"
                placeholder="000000"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="mt-1.5 font-mono text-center text-sm font-bold tracking-widest rounded-xl min-h-11"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/50">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="text-xs rounded-full min-h-10 px-5"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || code.length < 6}
                className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-full min-h-10 px-6 shadow-md shadow-primary/25"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Verifikasi & Aktifkan"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

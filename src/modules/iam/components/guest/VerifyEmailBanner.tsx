// ==============================================================================
// GoVPN IAM Verify Email Alert Banner Component
// Part of Pola C: components/guest/VerifyEmailBanner.tsx
// ==============================================================================

"use client";

import React, { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Mail, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface VerifyEmailBannerProps {
  email: string;
  isVerified?: boolean;
  onResendVerification: (email: string) => Promise<unknown>;
}

export function VerifyEmailBanner({
  email,
  isVerified,
  onResendVerification,
}: VerifyEmailBannerProps) {
  const [isSending, setIsSending] = useState(false);
  const [hasSent, setHasSent] = useState(false);

  if (isVerified) return null;

  const handleResend = async () => {
    setIsSending(true);
    try {
      await onResendVerification(email);
      setHasSent(true);
      toast.success("Tautan verifikasi email berhasil dikirim ulang!");
    } catch {
      toast.error("Gagal mengirim ulang email verifikasi.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Alert className="border-amber-500/30 bg-amber-500/10 text-amber-300 rounded-2xl p-4">
      <AlertTriangle className="h-5 w-5 text-amber-400" />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
        <div>
          <AlertTitle className="text-xs font-bold font-mono">
            Verifikasi Alamat Email Anda
          </AlertTitle>
          <AlertDescription className="text-xs text-amber-300/80 mt-0.5">
            Akun Anda belum diverifikasi. Harap periksa kotak masuk email <strong className="font-mono">{email}</strong>.
          </AlertDescription>
        </div>

        <Button
          size="sm"
          variant="outline"
          disabled={isSending || hasSent}
          onClick={handleResend}
          className="border-amber-500/40 text-amber-300 hover:bg-amber-500/20 rounded-full text-xs font-semibold h-8 px-4 shrink-0"
        >
          {isSending ? (
            <>
              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> Mengirim...
            </>
          ) : hasSent ? (
            <>
              <CheckCircle2 className="mr-1.5 h-3.5 w-3.5 text-emerald-400" /> Terkirim
            </>
          ) : (
            <>
              <Mail className="mr-1.5 h-3.5 w-3.5" /> Kirim Ulang
            </>
          )}
        </Button>
      </div>
    </Alert>
  );
}

// ==============================================================================
// GoVPN IAM Forgot Password Modal Component
// Part of Pola C: components/guest/ForgotPasswordModal.tsx
// 100% Coinbase Institutional Design System (Recovery Email Trigger)
// ==============================================================================

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
import { Mail, Loader2, KeyRound } from "lucide-react";
import { toast } from "sonner";

interface ForgotPasswordModalProps {
  onSubmitForgot: (email: string) => Promise<unknown>;
}

export function ForgotPasswordModal({
  onSubmitForgot,
}: ForgotPasswordModalProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmitForgot(email.trim());
      toast.success("Tautan pemulihan kata sandi telah dikirim ke email Anda!");
      setOpen(false);
      setEmail("");
    } catch {
      toast.error("Gagal mengirim tautan pemulihan. Periksa email Anda.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button
            type="button"
            className="text-xs text-primary hover:underline font-mono font-medium"
          >
            Lupa Kata Sandi?
          </button>
        }
      />

      <DialogContent className="sm:max-w-md bg-card border-border/80 text-foreground rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            <KeyRound className="h-5 w-5 text-primary" />
            Pemulihan Kata Sandi
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Masukkan alamat email yang terdaftar pada akun GoVPN Anda. Kami akan
            mengirimkan tautan aman untuk membuat kata sandi baru.
          </p>

          <div>
            <Label
              htmlFor="forgot-email"
              className="text-xs font-medium text-muted-foreground"
            >
              Alamat Email Terdaftar
            </Label>
            <div className="relative mt-1.5">
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="forgot-email"
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 font-mono text-xs rounded-xl min-h-11"
              />
            </div>
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
              disabled={isSubmitting || !email.trim()}
              className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-full min-h-10 px-6 shadow-md shadow-primary/25"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />{" "}
                  Mengirim...
                </>
              ) : (
                "Kirim Tautan Reset"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

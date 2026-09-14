// ==============================================================================
// GoVPN IAM User Change Password Modal Component
// Part of Pola C: components/user/ChangePasswordModal.tsx
// 100% Coinbase Institutional Design System (Old Password Verification)
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
import { ChangePasswordRequest } from "../../types/user.types";
import { Lock, Loader2, KeyRound } from "lucide-react";
import { toast } from "sonner";

interface ChangePasswordModalProps {
  onChangePassword: (data: ChangePasswordRequest) => Promise<unknown>;
  triggerButton?: React.ReactNode;
}

export function ChangePasswordModal({
  onChangePassword,
  triggerButton,
}: ChangePasswordModalProps) {
  const [open, setOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) return;

    if (newPassword.length < 8) {
      toast.error("Kata sandi baru minimal 8 karakter");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Konfirmasi kata sandi tidak cocok");
      return;
    }

    setIsSubmitting(true);
    try {
      await onChangePassword({
        old_password: oldPassword,
        new_password: newPassword,
      });
      toast.success("Kata sandi berhasil diperbarui!");
      setOpen(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast.error("Gagal memperbarui kata sandi. Periksa kata sandi lama Anda.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        triggerButton ? (
          (triggerButton as React.ReactElement)
        ) : (
          <Button
            variant="outline"
            className="border-border/80 hover:bg-muted/30 text-foreground gap-2 font-semibold text-xs rounded-full min-h-10 px-5"
          >
            <KeyRound className="h-4 w-4 text-primary" />
            Ganti Kata Sandi
          </Button>
        )
      } />

      <DialogContent className="sm:max-w-md bg-card border-border/80 text-foreground rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            <Lock className="h-5 w-5 text-primary" />
            Perbarui Kata Sandi Akun
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <Label htmlFor="old-pw" className="text-xs font-medium text-muted-foreground">
              Kata Sandi Saat Ini
            </Label>
            <Input
              id="old-pw"
              type="password"
              placeholder="••••••••••••"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="mt-1.5 font-mono text-xs rounded-xl min-h-10"
            />
          </div>

          <div>
            <Label htmlFor="new-pw" className="text-xs font-medium text-muted-foreground">
              Kata Sandi Baru (Min. 8 Karakter)
            </Label>
            <Input
              id="new-pw"
              type="password"
              placeholder="••••••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-1.5 font-mono text-xs rounded-xl min-h-10"
            />
          </div>

          <div>
            <Label htmlFor="conf-pw" className="text-xs font-medium text-muted-foreground">
              Ulangi Kata Sandi Baru
            </Label>
            <Input
              id="conf-pw"
              type="password"
              placeholder="••••••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1.5 font-mono text-xs rounded-xl min-h-10"
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
              disabled={isSubmitting || !oldPassword || !newPassword}
              className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-full min-h-10 px-6 shadow-md shadow-primary/25"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> Menyimpan...
                </>
              ) : (
                "Simpan Kata Sandi"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

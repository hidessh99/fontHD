// ==============================================================================
// GoVPN IAM Guest Register Form Component
// Part of Pola C: components/guest/RegisterForm.tsx
// 100% Coinbase Institutional Design System (56px Pill CTA, Password Strength)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { RegisterRequest } from "../../types/guest.types";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  Gift,
  Loader2,
  ArrowRight,
  Check,
} from "lucide-react";
import Link from "next/link";

interface RegisterFormProps {
  onRegister: (data: RegisterRequest) => Promise<boolean>;
}

export function RegisterForm({ onRegister }: RegisterFormProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simple password strength calculation
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const isStrong = hasMinLength && hasNumber && hasSpecial;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email.trim() || !password || !hasMinLength) return;

    setIsSubmitting(true);
    try {
      await onRegister({
        username: username.trim(),
        email: email.trim(),
        password,
        referral_code: referralCode.trim() || undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-border/80 bg-card/90 shadow-2xl rounded-3xl overflow-hidden backdrop-blur-md">
      <CardHeader className="text-center pt-8 pb-4 space-y-2">
        <div className="mx-auto h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-1">
          <UserPlus className="h-6 w-6" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
          Buat Akun GoVPN
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Dapatkan akses instan ke jaringan server VPN berkecepatan tinggi di
          30+ negara.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 pt-2 space-y-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <Label
              htmlFor="reg-username"
              className="text-xs font-medium text-muted-foreground"
            >
              Username
            </Label>
            <div className="relative mt-1.5">
              <User className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="reg-username"
                type="text"
                placeholder="misal: ahmad_vpn"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value.toLowerCase().replace(/\s/g, ""))
                }
                required
                className="pl-10 font-mono text-xs rounded-2xl min-h-12 border-border/70 bg-background/50"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <Label
              htmlFor="reg-email"
              className="text-xs font-medium text-muted-foreground"
            >
              Alamat Email Aktif
            </Label>
            <div className="relative mt-1.5">
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="reg-email"
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 font-mono text-xs rounded-2xl min-h-12 border-border/70 bg-background/50"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <Label
              htmlFor="reg-pw"
              className="text-xs font-medium text-muted-foreground"
            >
              Kata Sandi (Min. 8 Karakter)
            </Label>
            <div className="relative mt-1.5">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="reg-pw"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 font-mono text-xs rounded-2xl min-h-12 border-border/70 bg-background/50"
              />
            </div>

            {/* Strength Indicators */}
            {password.length > 0 && (
              <div className="flex items-center gap-3 mt-2 text-[10px] font-mono text-muted-foreground">
                <span
                  className={`flex items-center gap-1 ${hasMinLength ? "text-emerald-400" : ""}`}
                >
                  <Check className="h-3 w-3" /> Min 8 Char
                </span>
                <span
                  className={`flex items-center gap-1 ${hasNumber ? "text-emerald-400" : ""}`}
                >
                  <Check className="h-3 w-3" /> Angka
                </span>
                <span
                  className={`flex items-center gap-1 ${hasSpecial ? "text-emerald-400" : ""}`}
                >
                  <Check className="h-3 w-3" /> Simbol
                </span>
              </div>
            )}
          </div>

          {/* Referral Code (Optional) */}
          <div>
            <Label
              htmlFor="reg-ref"
              className="text-xs font-medium text-muted-foreground"
            >
              Kode Referral Reseller (Opsional)
            </Label>
            <div className="relative mt-1.5">
              <Gift className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="reg-ref"
                type="text"
                placeholder="KODE REFERRAL"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                className="pl-10 font-mono text-xs uppercase rounded-2xl min-h-12 border-border/70 bg-background/50"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={
              isSubmitting || !username.trim() || !email.trim() || !hasMinLength
            }
            className="w-full bg-primary hover:bg-primary-hover text-white font-semibold text-xs rounded-full min-h-12 shadow-lg shadow-primary/25 gap-2 mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Mendaftarkan
                Akun...
              </>
            ) : (
              <>
                Daftar Akun Baru
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground pt-2">
          Sudah memiliki akun?{" "}
          <Link
            href="/login"
            className="text-primary hover:underline font-semibold font-mono"
          >
            Masuk Sekarang
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

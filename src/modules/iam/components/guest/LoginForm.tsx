// ==============================================================================
// GoVPN IAM Guest Login Form Component
// Part of Pola C: components/guest/LoginForm.tsx
// 100% Coinbase Institutional Design System (56px Pill CTA, JetBrains Mono)
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
import { LoginRequest } from "../../types/guest.types";
import { ForgotPasswordModal } from "./ForgotPasswordModal";
import { Lock, Mail, Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface LoginFormProps {
  onLogin: (data: LoginRequest) => Promise<boolean>;
  onForgotPassword?: (email: string) => Promise<unknown>;
}

export function LoginForm({ onLogin, onForgotPassword }: LoginFormProps) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [show2Fa, setShow2Fa] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) return;

    setIsSubmitting(true);
    try {
      const ok = await onLogin({
        username_or_email: identifier.trim(),
        password,
        two_factor_code: show2Fa ? twoFactorCode.trim() : undefined,
      });
      if (!ok && !show2Fa && password) {
        // If server indicated 2FA required, show input
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-border/80 bg-card/90 shadow-2xl rounded-3xl overflow-hidden backdrop-blur-md">
      <CardHeader className="text-center pt-8 pb-4 space-y-2">
        <div className="mx-auto h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-1">
          <Lock className="h-6 w-6" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
          Masuk ke GoVPN
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Kelola server VPN berkecepatan tinggi, saldo akun, dan telemetri
          jaringan.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 pt-2 space-y-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username or Email */}
          <div>
            <Label
              htmlFor="login-id"
              className="text-xs font-medium text-muted-foreground"
            >
              Email atau Username
            </Label>
            <div className="relative mt-1.5">
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="login-id"
                type="text"
                placeholder="nama@email.com atau username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                autoComplete="username"
                required
                className="pl-10 font-mono text-xs rounded-2xl min-h-12 border-border/70 bg-background/50 focus:border-primary"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between">
              <Label
                htmlFor="login-pw"
                className="text-xs font-medium text-muted-foreground"
              >
                Kata Sandi
              </Label>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setShow2Fa((prev) => !prev)}
                  className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {show2Fa ? "Sembunyikan 2FA" : "+ 2FA"}
                </button>
                {onForgotPassword && (
                  <ForgotPasswordModal onSubmitForgot={onForgotPassword} />
                )}
              </div>
            </div>
            <div className="relative mt-1.5">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="login-pw"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="pl-10 font-mono text-xs rounded-2xl min-h-12 border-border/70 bg-background/50 focus:border-primary"
              />
            </div>
          </div>

          {/* Optional 2FA Code */}
          {show2Fa && (
            <div>
              <Label
                htmlFor="login-2fa"
                className="text-xs font-medium text-muted-foreground"
              >
                Kode Autentikasi 2FA (6 Digit)
              </Label>
              <div className="relative mt-1.5">
                <ShieldCheck className="absolute left-3.5 top-3.5 h-4 w-4 text-primary" />
                <Input
                  id="login-2fa"
                  type="text"
                  placeholder="123456"
                  maxLength={6}
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  className="pl-10 font-mono text-center text-sm font-bold tracking-widest rounded-2xl min-h-12 border-primary/60 bg-primary/5"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || !identifier.trim() || !password.trim()}
            className="w-full bg-primary hover:bg-primary-hover text-white font-semibold text-xs rounded-full min-h-12 shadow-lg shadow-primary/25 gap-2 mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Sedang Masuk...
              </>
            ) : (
              <>
                Masuk ke Akun
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-border/60 w-full" />
          <span className="bg-card px-3 text-[11px] uppercase tracking-wider text-muted-foreground font-mono">
            Atau
          </span>
        </div>

        {/* Google OAuth Button */}
        <a
          href="/api/auth/google/login"
          className="flex items-center justify-center gap-2.5 w-full rounded-full border border-border/80 bg-surface/80 hover:bg-surface text-foreground font-medium text-xs min-h-11 transition-all shadow-sm"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Lanjutkan dengan Google
        </a>

        {/* Register CTA */}
        <p className="text-center text-xs text-muted-foreground pt-2">
          Belum memiliki akun?{" "}
          <Link
            href="/register"
            className="text-primary hover:underline font-semibold font-mono"
          >
            Daftar Sekarang
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

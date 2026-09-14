"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "../hooks/useAuth";

export function LoginForm() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    username_or_email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username_or_email || !formData.password) return;

    const ok = await login(formData);
    if (ok) {
      router.push("/dashboard");
    }
  };

  return (
    <Card className="w-full max-w-md border-border/80 bg-card/80 backdrop-blur-md shadow-2xl">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-2">
          <Shield className="size-6" />
        </div>
        <CardTitle className="text-xl font-bold tracking-tight">Masuk ke GoVPN</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Kelola kredensial tunnel VPN, DNS, dan infrastruktur cloud Anda.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="username_or_email" className="text-xs font-medium">
              Username atau Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
              <Input
                id="username_or_email"
                type="text"
                placeholder="nama@domain.com atau username"
                className="pl-9 text-xs"
                value={formData.username_or_email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, username_or_email: e.target.value }))
                }
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-xs font-medium">
                Kata Sandi
              </Label>
              <Link
                href="/forgot-password"
                className="text-[11px] text-primary hover:underline"
              >
                Lupa kata sandi?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pl-9 text-xs"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                required
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/20"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" /> Memproses Masuk...
              </>
            ) : (
              <>
                Masuk ke Akun <ArrowRight className="ml-1.5 size-4" />
              </>
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Belum punya akun?{" "}
            <Link href="/register" className="font-semibold text-primary hover:underline">
              Daftar sekarang
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}

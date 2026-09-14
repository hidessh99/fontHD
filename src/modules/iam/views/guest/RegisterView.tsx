// ==============================================================================
// GoVPN IAM Guest Register View
// Part of Pola C: views/guest/RegisterView.tsx
// 100% Coinbase Institutional Design System (Responsive Center Container)
// ==============================================================================

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/auth.store";
import { RegisterForm } from "../../components/guest/RegisterForm";
import { Shield } from "lucide-react";
import Link from "next/link";

export function RegisterView() {
  const router = useRouter();
  const { register } = useAuthStore();

  const handleRegister = async (data: Parameters<typeof register>[0]) => {
    const ok = await register(data);
    if (ok) {
      router.push("/dashboard");
      return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-background relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-emerald-600/5 blur-[100px] pointer-events-none" />

      {/* Brand Header */}
      <Link href="/" className="flex items-center gap-2 mb-8 group">
        <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform">
          <Shield className="h-5 w-5" />
        </div>
        <span className="font-mono text-xl font-bold tracking-tight text-foreground">
          GoVPN<span className="text-primary">.net</span>
        </span>
      </Link>

      <RegisterForm onRegister={handleRegister} />
    </div>
  );
}

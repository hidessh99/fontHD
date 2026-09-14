"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "@/lib/storage/cookies";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

interface SellerRouteGuardProps {
  children: React.ReactNode;
}

export function SellerRouteGuard({ children }: SellerRouteGuardProps) {
  const router = useRouter();
  const [isSeller, setIsSeller] = useState<boolean | null>(null);

  useEffect(() => {
    const token = getCookie("hide-jwt") || getCookie("govpn_session_token");
    const role = (getCookie("govpn_user_role") || "").toUpperCase();

    if (!token) {
      setIsSeller(false);
      router.replace("/login?from=/seller/vpn");
      return;
    }

    // Allow SELLER or ADMIN/SUPERADMIN
    const allowed =
      role === "SELLER" ||
      role === "ADMIN" ||
      role === "SUPERADMIN" ||
      role === "SUPER_ADMIN" ||
      role === "RESELLER";

    if (!allowed) {
      setIsSeller(false);
      toast.error(
        "Akses terbatas. Anda memerlukan akun Reseller/Partner untuk mengakses portal ini.",
      );
      router.replace("/dashboard");
      return;
    }

    setIsSeller(true);
  }, [router]);

  if (isSeller === null) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3 text-center">
          <Spinner className="size-6 text-amber-500 animate-spin" />
          <p className="text-xs font-mono text-muted-foreground">
            Memverifikasi otorisasi Partner Reseller...
          </p>
        </div>
      </div>
    );
  }

  if (!isSeller) {
    return null;
  }

  return <>{children}</>;
}

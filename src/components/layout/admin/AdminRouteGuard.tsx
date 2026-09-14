"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "@/lib/storage/cookies";
import { Spinner } from "@/components/ui/spinner";

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

export function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const token = getCookie("hide-jwt") || getCookie("govpn_session_token");
    const role = (getCookie("govpn_user_role") || "").toUpperCase();

    if (!token) {
      setIsAdmin(false);
      router.replace("/login");
      return;
    }

    if (role !== "SUPERADMIN" && role !== "SUPER_ADMIN" && role !== "ADMIN") {
      setIsAdmin(false);
      router.replace("/dashboard");
      return;
    }

    setIsAdmin(true);
  }, [router]);

  if (isAdmin === null) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3 text-center">
          <Spinner className="size-6 text-primary animate-spin" />
          <p className="text-xs font-mono text-muted-foreground">
            Memverifikasi otorisasi Superadmin...
          </p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return <>{children}</>;
}

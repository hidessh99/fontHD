"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getCookie } from "@/lib/storage/cookies";
import { Spinner } from "@/components/ui/spinner";

interface MemberRouteGuardProps {
  children: React.ReactNode;
}

export function MemberRouteGuard({ children }: MemberRouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const token = getCookie("hide-jwt") || getCookie("govpn_session_token");

    if (!token) {
      setIsAuthorized(false);
      router.replace(`/login?from=${encodeURIComponent(pathname)}`);
    } else {
      setIsAuthorized(true);
    }
  }, [router, pathname]);

  if (isAuthorized === null) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3 text-center">
          <Spinner className="size-6 text-primary animate-spin" />
          <p className="text-xs font-mono text-muted-foreground">
            Memverifikasi izin akses...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}

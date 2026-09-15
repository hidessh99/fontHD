// ==============================================================================
// GoVPN IAM Active Session Device Item Component
// Part of Pola C: components/shared/SessionDeviceItem.tsx
// 100% Coinbase Institutional Design System (Device metadata & Revoke CTA)
// ==============================================================================

"use client";

import React from "react";
import { UserDeviceSession } from "../../types/iam.types";
import { Button } from "@/components/ui/button";
import { Laptop, Smartphone, Globe, LogOut, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface SessionDeviceItemProps {
  session: UserDeviceSession;
  onRevoke?: (id: string | number) => void;
  isRevoking?: boolean;
}

export function SessionDeviceItem({
  session,
  onRevoke,
  isRevoking,
}: SessionDeviceItemProps) {
  const { t, locale } = useI18n();
  const isMobile =
    session.user_agent?.toLowerCase().includes("mobile") ||
    session.device_name?.toLowerCase().includes("android") ||
    session.device_name?.toLowerCase().includes("iphone");

  const Icon = isMobile ? Smartphone : Laptop;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString(
      locale === "id" ? "id-ID" : "en-US",
      {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-border/80 bg-card/60 hover:bg-card/90 transition-colors">
      <div className="flex items-start gap-3.5">
        <div className="rounded-xl bg-primary/10 border border-primary/20 p-2.5 text-primary shrink-0">
          <Icon className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-foreground font-mono">
              {session.device_name || session.browser || "Unknown Device"}
            </span>
            {session.is_current && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400">
                <CheckCircle2 className="h-3 w-3" />
                {t("iam.thisDevice")}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground font-mono">
            <span className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              {session.ip_address}
            </span>
            {session.location && <span>• {session.location}</span>}
            <span>
              • {t("iam.activeAt")}{" "}
              {formatDate(session.last_active_at || session.created_at)}
            </span>
          </div>
        </div>
      </div>

      {!session.is_current && onRevoke && (
        <Button
          variant="outline"
          size="sm"
          disabled={isRevoking}
          onClick={() => onRevoke(session.id)}
          className="border-rose-500/30 text-rose-400 hover:bg-rose-500/10 rounded-full text-xs font-semibold px-4 h-8 gap-1.5 self-end sm:self-center"
        >
          <LogOut className="h-3.5 w-3.5" />
          {t("iam.revokeSession")}
        </Button>
      )}
    </div>
  );
}

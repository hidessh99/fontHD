// ==============================================================================
// GoVPN IAM Active Session Manager Component
// Part of Pola C: components/user/UserSessionManager.tsx
// 100% Coinbase Institutional Design System (Session Revocation & Multi-Device)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { UserDeviceSession } from "../../types/iam.types";
import { SessionDeviceItem } from "../shared/SessionDeviceItem";
import { Button } from "@/components/ui/button";
import { ShieldAlert, LogOut, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";

interface UserSessionManagerProps {
  sessions: UserDeviceSession[];
  onRevokeSession?: (id: string | number) => Promise<unknown>;
  onLogoutAllOther?: () => Promise<unknown>;
}

export function UserSessionManager({
  sessions,
  onRevokeSession,
  onLogoutAllOther,
}: UserSessionManagerProps) {
  const { t } = useI18n();
  const [revokingId, setRevokingId] = useState<string | number | null>(null);
  const [isLoggingOutAll, setIsLoggingOutAll] = useState(false);

  const handleRevokeSingle = async (id: string | number) => {
    if (!onRevokeSession) return;
    setRevokingId(id);
    try {
      await onRevokeSession(id);
      toast.success(t("iam.sessionRevoked"));
    } catch {
      toast.error(t("iam.sessionRevokeFailed"));
    } finally {
      setRevokingId(null);
    }
  };

  const handleLogoutAllOther = async () => {
    if (!onLogoutAllOther) return;
    setIsLoggingOutAll(true);
    try {
      await onLogoutAllOther();
      toast.success(t("iam.allOtherSessionsRevoked"));
    } catch {
      toast.error(t("iam.allOtherSessionsRevokeFailed"));
    } finally {
      setIsLoggingOutAll(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold font-mono text-foreground flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-primary" />
            {t("iam.activeSessionsTitle", { count: sessions.length })}
          </h3>
          <p className="text-xs text-muted-foreground">
            {t("iam.activeSessionsDesc")}
          </p>
        </div>

        {sessions.length > 1 && onLogoutAllOther && (
          <Button
            variant="outline"
            size="sm"
            disabled={isLoggingOutAll}
            onClick={handleLogoutAllOther}
            className="border-rose-500/40 text-rose-400 hover:bg-rose-500/10 rounded-full text-xs font-semibold px-4 h-9 gap-1.5 self-start sm:self-center"
          >
            {isLoggingOutAll ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <LogOut className="h-3.5 w-3.5" />
            )}
            {t("iam.logoutAllOtherDevices")}
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {sessions.map((sess) => (
          <SessionDeviceItem
            key={sess.id}
            session={sess}
            onRevoke={handleRevokeSingle}
            isRevoking={revokingId === sess.id}
          />
        ))}
      </div>
    </div>
  );
}

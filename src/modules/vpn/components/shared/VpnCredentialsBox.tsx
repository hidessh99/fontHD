// ==============================================================================
// GoVPN VPN Credentials Box Component (Shared UI Primitive)
// High-contrast monospace credentials box with 1-click copy & token styling
// ==============================================================================

"use client";

import React from "react";
import { CopyButton } from "@/components/shared/CopyButton";

interface VpnCredentialsBoxProps {
  host: string;
  port: number;
  username: string;
  password?: string;
  uuid?: string;
  configUrl?: string;
}

export function VpnCredentialsBox({
  host,
  port,
  username,
  password,
  uuid,
  configUrl,
}: VpnCredentialsBoxProps) {
  return (
    <div className="p-4 rounded-2xl bg-surface border border-border/70 space-y-3 font-mono text-xs">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <span className="text-[10px] text-muted-foreground uppercase block tracking-wider">
            Host / SNI
          </span>
          <span className="font-semibold text-foreground truncate block">
            {host}
          </span>
        </div>
        <div>
          <span className="text-[10px] text-muted-foreground uppercase block tracking-wider">
            Port
          </span>
          <span className="font-semibold text-foreground block">{port}</span>
        </div>
        <div>
          <span className="text-[10px] text-muted-foreground uppercase block tracking-wider">
            Username
          </span>
          <span className="font-semibold text-foreground truncate block">
            {username}
          </span>
        </div>
        {password && (
          <div>
            <span className="text-[10px] text-muted-foreground uppercase block tracking-wider">
              Password
            </span>
            <span className="font-semibold text-foreground truncate block">
              {password}
            </span>
          </div>
        )}
        {uuid && (
          <div className="col-span-2">
            <span className="text-[10px] text-muted-foreground uppercase block tracking-wider">
              UUID / User ID
            </span>
            <span className="font-semibold text-primary truncate block select-all">
              {uuid}
            </span>
          </div>
        )}
      </div>

      {configUrl && (
        <div className="pt-2 border-t border-border/50 flex items-center justify-between gap-3">
          <span className="text-[11px] text-muted-foreground truncate select-all">
            {configUrl}
          </span>
          <CopyButton
            text={configUrl}
            label="Salin URI"
            successMessage="Konfigurasi URI berhasil disalin!"
            size="sm"
          />
        </div>
      )}
    </div>
  );
}

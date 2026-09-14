// ==============================================================================
// GoVPN VPN Seller Server Node Card Component
// Part of Pola C: components/seller/
// 100% Coinbase Design System (Pill Buttons, Status indicator, JetBrains Mono)
// ==============================================================================

"use client";

import React from "react";
import { Globe, Trash2, Edit3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ServerPingBadge } from "@/components/shared/ServerPingBadge";
import { ProtocolBadge } from "@/components/shared/ProtocolBadge";
import { ServerNode } from "../../types/vpn.types";

interface SellerServerCardProps {
  server: ServerNode;
  onEdit?: (server: ServerNode) => void;
  onDelete?: (serverId: number) => void;
}

export function SellerServerCard({
  server,
  onEdit,
  onDelete,
}: SellerServerCardProps) {
  return (
    <Card className="border border-border/80 bg-card/60 hover:border-primary/40 hover:bg-card transition-all duration-200 rounded-2xl">
      <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-surface border border-border text-foreground font-bold text-xs font-mono">
            {server.country_code || "SG"}
          </div>
          <div>
            <CardTitle className="text-sm font-bold">{server.name}</CardTitle>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5 font-mono">
              <Globe className="size-3" />
              <span>
                {server.country} ({server.ip})
              </span>
            </div>
          </div>
        </div>
        <ServerPingBadge latencyMs={server.latency_ms} />
      </CardHeader>

      <CardContent className="space-y-3 pt-0">
        <div className="grid grid-cols-2 gap-2 text-xs font-mono p-2.5 rounded-xl bg-surface border border-border/50">
          <div>
            <span className="text-[10px] text-muted-foreground uppercase block">
              Pengguna Aktif
            </span>
            <span className="font-semibold text-foreground">
              {server.current_users} / {server.max_users}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground uppercase block">
              Tipe Server
            </span>
            <span className="font-semibold text-primary uppercase">
              {server.tier}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {server.supported_protocols.map((proto) => (
            <ProtocolBadge key={proto} protocol={proto} size="sm" />
          ))}
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/40">
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(server)}
              className="text-xs rounded-full min-h-9 px-3 gap-1.5"
            >
              <Edit3 className="size-3.5 text-muted-foreground" /> Edit Node
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(server.id)}
              className="text-xs rounded-full min-h-9 px-3 text-destructive hover:bg-destructive/10 gap-1.5"
            >
              <Trash2 className="size-3.5" /> Hapus
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

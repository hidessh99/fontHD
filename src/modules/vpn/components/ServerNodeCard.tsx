"use client";

import React from "react";
import { Server, Users, ArrowRight, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ServerPingBadge } from "@/components/shared/ServerPingBadge";
import { ProtocolBadge } from "@/components/shared/ProtocolBadge";
import { ServerNode } from "../types/vpn.types";

interface ServerNodeCardProps {
  server: ServerNode;
  onSelect?: (server: ServerNode) => void;
  selected?: boolean;
}

export function ServerNodeCard({
  server,
  onSelect,
  selected = false,
}: ServerNodeCardProps) {
  return (
    <Card
      className={`border transition-all duration-200 ${
        selected
          ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
          : "border-border/80 bg-card/60 hover:border-primary/40 hover:bg-card"
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-surface border border-border text-foreground font-bold text-xs font-mono">
              {server.country_code || "SG"}
            </div>
            <div>
              <CardTitle className="text-sm font-bold">{server.name}</CardTitle>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5 font-mono">
                <Globe className="size-3" />
                <span>{server.country}</span>
              </div>
            </div>
          </div>
          <ServerPingBadge latencyMs={server.latency_ms} />
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-0">
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground p-2 rounded-xl bg-surface border border-border/50">
          <div className="flex items-center gap-1.5">
            <Users className="size-3.5" />
            <span>Kapasitas:</span>
          </div>
          <span className="font-semibold text-foreground">
            {server.current_users} / {server.max_users} Users
          </span>
        </div>

        {/* Supported Protocols */}
        <div className="flex flex-wrap gap-1">
          {server.supported_protocols.map((proto) => (
            <ProtocolBadge key={proto} protocol={proto} size="sm" />
          ))}
        </div>

        {onSelect && (
          <Button
            size="sm"
            variant={selected ? "default" : "outline"}
            className="w-full text-xs font-semibold"
            onClick={() => onSelect(server)}
          >
            {selected ? "Server Dipilih" : "Pilih Server Ini"}
            <ArrowRight className="ml-1.5 size-3.5" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

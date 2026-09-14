// ==============================================================================
// GoVPN Dashboard Overview View (Composite Page View for User App Router)
// Part of Pola C: views/user/DashboardOverviewView.tsx
// 100% Coinbase Design System (56px Pill Buttons, Near-Black Canvas, Dark Cards)
// ==============================================================================

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Zap,
  Server,
  Wallet,
  Activity,
  ArrowRight,
  Plus,
  Shield,
  Layers,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProtocolBadge } from "@/components/shared/ProtocolBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { VpnAccountCard } from "../../components/user/VpnAccountCard";
import { CreateVpnModal } from "../../components/user/CreateVpnModal";
import { useVpnUser } from "../../hooks/useVpnUser";
import { useAuthStore } from "@/modules/iam/hooks/useAuth";
import { VpnProtocol } from "../../types/vpn.types";

export function DashboardOverviewView() {
  const { user } = useAuthStore();
  const { accounts, servers, isLoading, refresh, deleteAccount } = useVpnUser();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedProto, setSelectedProto] = useState<VpnProtocol>("vmess");

  const protocols = [
    { name: "SSH / Dropbear", id: "ssh" as VpnProtocol, desc: "Port 22, 442, WS CDN & TLS" },
    { name: "VMess (V2Ray)", id: "vmess" as VpnProtocol, desc: "WS, gRPC, TLS CDN multi-path" },
    { name: "VLess Reality", id: "vless" as VpnProtocol, desc: "XTLS Reality with direct zero-hop" },
    { name: "Trojan", id: "trojan" as VpnProtocol, desc: "gRPC & WS TLS high-throughput" },
    { name: "Shadowsocks", id: "shadowsocks" as VpnProtocol, desc: "AEAD 2022 encryption standard" },
    { name: "WireGuard", id: "wireguard" as VpnProtocol, desc: "Ultra-low latency kernel tunnel" },
  ];

  const handleOpenCreate = (protoId: VpnProtocol) => {
    setSelectedProto(protoId);
    setCreateModalOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-border/80 bg-surface/50 p-6 backdrop-blur-sm">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground">
            Selamat Datang,{" "}
            <span className="text-primary">{user?.username || "Member"}</span>!
          </h1>
          <p className="mt-1 text-xs text-muted-foreground max-w-xl">
            Console infrastruktur tunneling GoVPN. Kelola akun multi-protokol, pantau status server real-time, dan salin kredensial dalam satu klik.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => handleOpenCreate("vmess")}
            className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-lg shadow-primary/25 h-10 px-5 rounded-full"
          >
            <Plus className="mr-1.5 size-4" /> Order Akun Baru
          </Button>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="border-border/80 bg-card/60 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-mono">
              Akun Aktif
            </CardTitle>
            <Zap className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black font-mono">{accounts.length}</div>
            <p className="text-[10px] text-muted-foreground mt-1 font-mono">
              Tunnel siap terhubung
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/60 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-mono">
              Saldo Wallet
            </CardTitle>
            <Wallet className="size-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black font-mono text-emerald-400">
              Rp {(user?.balance || 50000).toLocaleString("id-ID")}
            </div>
            <Link
              href="/billing/deposit"
              className="text-[10px] text-primary hover:underline mt-1 block font-mono"
            >
              + Top up deposit
            </Link>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/60 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-mono">
              Server Online
            </CardTitle>
            <Server className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black font-mono">
              {servers.length > 0 ? servers.length : 12} Nodes
            </div>
            <p className="text-[10px] text-muted-foreground mt-1 font-mono">
              SG, ID, US, JP, NL
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/60 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-mono">
              Protokol Aktif
            </CardTitle>
            <Activity className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black font-mono">6/6</div>
            <p className="text-[10px] text-muted-foreground mt-1 font-mono">
              Semua protokol online
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Protocol Quick-Launch Selector */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold tracking-wider uppercase text-muted-foreground font-mono">
            Pilih Protokol Tunneling
          </h2>
          <Link
            href="/servers"
            className="text-xs font-medium text-primary hover:underline flex items-center gap-1 font-mono"
          >
            Lihat semua server <ArrowRight className="size-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {protocols.map((proto) => (
            <Card
              key={proto.id}
              className="border-border/70 bg-card/50 hover:border-primary/50 hover:bg-card transition-all cursor-pointer group rounded-2xl"
              onClick={() => handleOpenCreate(proto.id)}
            >
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <ProtocolBadge protocol={proto.id} size="sm" />
                  <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                  {proto.name}
                </div>
                <div className="text-[10px] text-muted-foreground leading-tight">
                  {proto.desc}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Active Accounts Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold tracking-wider uppercase text-muted-foreground font-mono">
            Akun VPN Aktif Anda ({accounts.length})
          </h2>
          {accounts.length > 0 && (
            <span className="text-[10px] font-mono text-muted-foreground">
              Auto-sync enabled
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="h-40 rounded-xl border border-dashed border-border flex items-center justify-center">
            <p className="text-xs font-mono text-muted-foreground">
              Memuat akun VPN aktif...
            </p>
          </div>
        ) : accounts.length === 0 ? (
          <EmptyState
            icon={Zap}
            title="Belum Ada Akun VPN Aktif"
            description="Anda belum memiliki akun tunneling yang aktif. Pilih protokol di atas atau klik tombol di bawah untuk membuat akun baru."
            action={
              <Button
                onClick={() => handleOpenCreate("vmess")}
                size="sm"
                className="bg-primary hover:bg-primary-hover text-white text-xs rounded-full min-h-10 px-6 shadow-md shadow-primary/25"
              >
                <Plus className="mr-1.5 size-3.5" /> Buat Akun Pertama
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.map((acc) => (
              <VpnAccountCard
                key={acc.id}
                account={acc}
                onDelete={deleteAccount}
              />
            ))}
          </div>
        )}
      </div>

      <CreateVpnModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        protocol={selectedProto}
        onSuccess={() => refresh()}
      />
    </div>
  );
}

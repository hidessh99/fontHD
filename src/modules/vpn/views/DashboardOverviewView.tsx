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
import { VpnAccountCard } from "../components/VpnAccountCard";
import { CreateVpnModal } from "../components/CreateVpnModal";
import { useVpnAccounts } from "../hooks/useVpnAccounts";
import { useAuthStore } from "@/modules/iam/hooks/useAuth";

export function DashboardOverviewView() {
  const { user } = useAuthStore();
  const { accounts, isLoading, refresh } = useVpnAccounts();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedProto, setSelectedProto] = useState("vmess");

  const protocols = [
    { name: "SSH / Dropbear", id: "ssh", desc: "Port 22, 442, WS CDN & TLS" },
    { name: "VMess (V2Ray)", id: "vmess", desc: "WS, gRPC, TLS CDN multi-path" },
    { name: "VLess Reality", id: "vless", desc: "XTLS Reality with direct zero-hop" },
    { name: "Trojan", id: "trojan", desc: "gRPC & WS TLS high-throughput" },
    { name: "Shadowsocks", id: "shadowsocks", desc: "AEAD 2022 encryption standard" },
    { name: "WireGuard", id: "wireguard", desc: "Ultra-low latency kernel tunnel" },
  ];

  const handleOpenCreate = (protoId: string) => {
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
            className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-lg shadow-primary/25 h-10 px-4"
          >
            <Plus className="mr-1.5 size-4" /> Order Akun Baru
          </Button>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="border-border/80 bg-card/60">
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

        <Card className="border-border/80 bg-card/60">
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
              + Top up saldo
            </Link>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-mono">
              Server Online
            </CardTitle>
            <Server className="size-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black font-mono">14 Nodes</div>
            <p className="text-[10px] text-emerald-400 mt-1 font-mono flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
              100% Uptime
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-mono">
              Avg Latensi
            </CardTitle>
            <Activity className="size-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black font-mono text-cyan-400">32 ms</div>
            <p className="text-[10px] text-muted-foreground mt-1 font-mono">
              Direct Singapore Hub
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Protocol Quick Order Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold tracking-tight">Pilih Protokol Tunneling</h2>
            <p className="text-xs text-muted-foreground">
              Akses cepat ke form pembuatan akun sesuai protokol yang Anda butuhkan.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {protocols.map((proto) => (
            <button
              key={proto.id}
              type="button"
              onClick={() => handleOpenCreate(proto.id)}
              className="flex flex-col items-start p-3.5 rounded-2xl border border-border/80 bg-card/60 hover:border-primary/40 hover:bg-card text-left transition-all group"
            >
              <ProtocolBadge protocol={proto.id} size="sm" className="mb-2" />
              <span className="text-xs font-bold font-mono text-foreground group-hover:text-primary transition-colors">
                {proto.name}
              </span>
              <span className="text-[10px] text-muted-foreground mt-1 line-clamp-2">
                {proto.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Accounts Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold tracking-tight">Akun VPN Anda</h2>
            <p className="text-xs text-muted-foreground">
              Kredensial akun tunneling aktif yang dapat Anda salin langsung ke aplikasi VPN.
            </p>
          </div>
          <Button variant="ghost" size="sm" asChild className="text-xs">
            <Link href="/vpn/vmess">
              Lihat Semua <ArrowRight className="ml-1 size-3.5" />
            </Link>
          </Button>
        </div>

        {accounts.length === 0 ? (
          <EmptyState
            icon={Zap}
            title="Belum Ada Akun Aktif"
            description="Anda belum memiliki akun tunneling. Pilih salah satu protokol di atas untuk membuat akun perdana Anda."
            action={
              <Button
                size="sm"
                onClick={() => handleOpenCreate("vmess")}
                className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold"
              >
                <Plus className="mr-1.5 size-3.5" /> Buat Akun VMess
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.slice(0, 6).map((acc) => (
              <VpnAccountCard key={acc.id} account={acc} />
            ))}
          </div>
        )}
      </div>

      {/* Create Account Modal */}
      <CreateVpnModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        protocol={selectedProto}
        onSuccess={() => refresh()}
      />
    </div>
  );
}

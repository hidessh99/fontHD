"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Zap,
  Terminal,
  Copy,
  Check,
  Activity,
  Cpu,
  RefreshCw,
  Lock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n/context";

interface ProtocolPreset {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  targetNode: string;
  region: string;
  flag: string;
  port: number;
  transport: string;
  cipher: string;
  overhead: string;
  evasion: string;
  basePing: number;
  sampleUri: string;
}

const PROTOCOL_PRESETS: ProtocolPreset[] = [
  {
    id: "vless",
    name: "VLess Reality",
    badge: "Anti-DPI Tier-1",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    targetNode: "sg-edge-01.govpn.net",
    region: "Singapore",
    flag: "🇸🇬",
    port: 443,
    transport: "TCP + XTLS Vision",
    cipher: "ChaCha20-Poly1305",
    overhead: "0-RTT (Kernel Zero-Copy)",
    evasion: "Full HTTPS Masking (SNI Camouflage)",
    basePing: 12,
    sampleUri: "vless://4f8e71b2-govpn@sg-edge-01.govpn.net:443?security=reality&sni=microsoft.com&fp=chrome#GoVPN-SG-VLess",
  },
  {
    id: "wireguard",
    name: "WireGuard Fast",
    badge: "Kernel Speed",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    targetNode: "jp-edge-02.govpn.net",
    region: "Tokyo, Japan",
    flag: "🇯🇵",
    port: 51820,
    transport: "Kernel Space UDP (eBPF)",
    cipher: "Curve25519 + ChaCha20",
    overhead: "Minimal (4-way Handshake)",
    evasion: "Pure Fast Gaming Tunnel",
    basePing: 34,
    sampleUri: "[Interface]\nPrivateKey = aGVsbG9...=\nAddress = 10.66.66.2/32\n[Peer]\nPublicKey = d29ybGQ...=\nEndpoint = jp-edge-02.govpn.net:51820",
  },
  {
    id: "trojan",
    name: "Trojan-GFW",
    badge: "Censorship Bypass",
    badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    targetNode: "sg-edge-02.govpn.net",
    region: "Singapore",
    flag: "🇸🇬",
    port: 443,
    transport: "HTTPS / TLS 1.3 Multiplexing",
    cipher: "AES-256-GCM / SHA256",
    overhead: "Standard TLS Resume",
    evasion: "Standard Port 443 Imitation",
    basePing: 14,
    sampleUri: "trojan://password-govpn@sg-edge-02.govpn.net:443?security=tls&headerType=none#GoVPN-SG-Trojan",
  },
  {
    id: "vmess",
    name: "VMess (V2Ray)",
    badge: "Dynamic CDN",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    targetNode: "id-edge-01.govpn.net",
    region: "Jakarta, Indonesia",
    flag: "🇮🇩",
    port: 80,
    transport: "WebSocket + CDN Multi-Path",
    cipher: "AEAD Chacha20",
    overhead: "WS Frame Header",
    evasion: "Cloudflare Anycast Proxy",
    basePing: 8,
    sampleUri: "vmess://eyJhZGQiOiJpZC1lZGdlLTAxLmdvdnBuLm5ldCIsInBvcnQiOjgwLCJpZCI6IjhmYTctLi4uIn0=",
  },
  {
    id: "shadowsocks",
    name: "Shadowsocks 2022",
    badge: "Ultra Low Jitter",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    targetNode: "us-edge-01.govpn.net",
    region: "Los Angeles, USA",
    flag: "🇺🇸",
    port: 8388,
    transport: "AEAD 2022-blake3 UDP/TCP",
    cipher: "2022-blake3-aes-128-gcm",
    overhead: "Zero Metadata Handshake",
    evasion: "Raw Encrypted Stream",
    basePing: 135,
    sampleUri: "ss://MjAyMi1ibGFrZTMtYWVzLTEyOC1nY206cGFzc3dvcmRA...#GoVPN-US-SS2022",
  },
];

export function LandingHero() {
  const { t } = useI18n();
  const [selectedProto, setSelectedProto] = useState<ProtocolPreset>(
    PROTOCOL_PRESETS[0],
  );
  const [copied, setCopied] = useState(false);
  const [pinging, setPinging] = useState(false);
  const [currentPing, setCurrentPing] = useState(selectedProto.basePing);

  const handleSelectProto = (proto: ProtocolPreset) => {
    setSelectedProto(proto);
    setCurrentPing(proto.basePing);
    setCopied(false);
  };

  const handleRunPing = () => {
    setPinging(true);
    const timer = setTimeout(() => {
      const jitter = Math.floor(Math.random() * 5) - 2;
      setCurrentPing(Math.max(4, selectedProto.basePing + jitter));
      setPinging(false);
    }, 600);
    return () => clearTimeout(timer);
  };

  const handleCopyUri = () => {
    navigator.clipboard.writeText(selectedProto.sampleUri);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-border/40">
      {/* Precision Ambient Cyber Lighting */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-125 h-125 bg-blue-600/10 dark:bg-blue-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-indigo-600/10 dark:bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Cyber Grid Background Matrix */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="container relative mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* LEFT COLUMN: Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Live Operational Network Pill */}
            <div className="inline-flex items-center gap-2 rounded-full bg-surface-subtle border border-border/80 px-3.5 py-1.5 text-xs font-semibold text-foreground/90 mb-6 shadow-xs backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[11px] tracking-wide text-emerald-400 font-bold">
                {t("landing.hero.badge")}
              </span>
            </div>

            {/* Main Punchy Technical Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black leading-[1.14] tracking-tight text-foreground mb-5">
              {t("landing.hero.titleLine1")}{" "}
              <span className="block mt-1 bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                {t("landing.hero.titleLine2")}
              </span>
            </h1>

            {/* Clear Technical Subtitle */}
            <p className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed font-normal mb-8">
              {t("landing.hero.subtitle")}
            </p>

            {/* Primary & Secondary CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-8">
              <Button
                size="lg"
                className="h-12 sm:h-13 rounded-xl bg-primary hover:bg-primary-hover px-7 text-sm sm:text-base font-bold text-white shadow-lg shadow-primary/25 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
                asChild
              >
                <Link href="/register">
                  {t("landing.hero.ctaPrimary")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-12 sm:h-13 rounded-xl border-border/80 bg-surface hover:bg-surface-subtle px-6 text-sm sm:text-base font-semibold text-foreground hover:border-primary/40 transition-all cursor-pointer"
                asChild
              >
                <Link href="#protocols">
                  <Terminal className="mr-2 h-4 w-4 text-primary" />
                  {t("landing.hero.ctaSecondary")}
                </Link>
              </Button>

              <Link
                href="/seller"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-amber-400 transition-colors py-2 px-1 sm:ml-2"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>Reseller Partner Portal & API &rarr;</span>
              </Link>
            </div>

            {/* Micro Trust Architecture Chips */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-3 border-t border-border/40 text-xs text-muted-foreground font-medium w-full">
              <span className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-emerald-400" />
                <span>{t("landing.hero.noLogs")}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-primary" />
                <span>{t("landing.hero.instant")}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Activity className="h-4 w-4 text-cyan-400" />
                <span>{t("landing.hero.uptime")}</span>
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Live Protocol & Handshake Console */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-2xl border border-border/80 bg-surface/90 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden">
              {/* macOS / Linux Terminal Titlebar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 bg-surface-subtle/80">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-rose-500/80" />
                  <div className="size-3 rounded-full bg-amber-500/80" />
                  <div className="size-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[11px] font-semibold text-muted-foreground">
                    govpn-core-v2.0 // telemetry
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Badge
                    variant="outline"
                    className="font-mono text-[10px] px-2 py-0.5 border-emerald-500/30 text-emerald-400 bg-emerald-500/5"
                  >
                    ONLINE
                  </Badge>
                </div>
              </div>

              {/* Protocol Quick-Tabs */}
              <div className="p-3 border-b border-border/40 bg-surface/50 overflow-x-auto no-scrollbar">
                <div className="flex gap-1.5 min-w-max">
                  {PROTOCOL_PRESETS.map((p) => {
                    const isSelected = selectedProto.id === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleSelectProto(p)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-primary text-white shadow-xs"
                            : "bg-surface-subtle text-muted-foreground hover:text-foreground hover:bg-surface-subtle/80"
                        }`}
                      >
                        {p.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Protocol Telemetry Deep Dive */}
              <div className="p-5 space-y-4">
                {/* Node & Region Header */}
                <div className="flex items-center justify-between pb-3 border-b border-border/40">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{selectedProto.flag}</span>
                    <div>
                      <div className="text-sm font-bold text-foreground flex items-center gap-2">
                        {selectedProto.targetNode}
                        <span className="text-[11px] font-normal text-muted-foreground">
                          ({selectedProto.region})
                        </span>
                      </div>
                      <div className="text-xs font-mono text-muted-foreground">
                        Port: {selectedProto.port} • {selectedProto.transport}
                      </div>
                    </div>
                  </div>

                  {/* Interactive Ping Tester */}
                  <button
                    type="button"
                    onClick={handleRunPing}
                    disabled={pinging}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-surface-subtle hover:bg-surface border border-border/60 text-xs font-mono font-bold transition-all cursor-pointer group"
                    title="Click to test live ping"
                  >
                    <RefreshCw
                      className={`size-3 text-muted-foreground group-hover:text-primary ${
                        pinging ? "animate-spin text-primary" : ""
                      }`}
                    />
                    <span
                      className={`font-black ${
                        currentPing < 20
                          ? "text-emerald-400"
                          : currentPing < 60
                            ? "text-cyan-400"
                            : "text-amber-400"
                      }`}
                    >
                      {currentPing}ms
                    </span>
                  </button>
                </div>

                {/* Technical Specifications Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-surface-subtle/50 border border-border/30">
                    <span className="text-[10px] text-muted-foreground block uppercase">
                      Crypto Cipher
                    </span>
                    <span className="text-foreground font-semibold truncate block mt-0.5">
                      {selectedProto.cipher}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface-subtle/50 border border-border/30">
                    <span className="text-[10px] text-muted-foreground block uppercase">
                      Handshake Overhead
                    </span>
                    <span className="text-emerald-400 font-semibold truncate block mt-0.5">
                      {selectedProto.overhead}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface-subtle/50 border border-border/30 col-span-2">
                    <span className="text-[10px] text-muted-foreground block uppercase">
                      Firewall Evasion Engine
                    </span>
                    <span className="text-cyan-400 font-semibold truncate block mt-0.5">
                      {selectedProto.evasion}
                    </span>
                  </div>
                </div>

                {/* Quick URI / Config Inspector */}
                <div className="relative rounded-xl bg-black/60 border border-border/50 p-3 font-mono text-[11px]">
                  <div className="flex items-center justify-between text-muted-foreground pb-1.5 mb-1 border-b border-white/5">
                    <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-400">
                      <Lock className="size-3 text-primary" />
                      Configuration String
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyUri}
                      className="flex items-center gap-1 text-[11px] text-primary hover:text-primary-hover font-semibold transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="size-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-3" />
                          <span>Copy URI</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="text-slate-300 font-mono break-all line-clamp-2 select-all">
                    {selectedProto.sampleUri}
                  </div>
                </div>

                {/* Terminal Footer Action */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                    <Cpu className="size-3.5 text-muted-foreground" />
                    Sing-box & Xray Core v2.0
                  </span>
                  <Button
                    size="sm"
                    className="h-8 rounded-lg bg-primary hover:bg-primary-hover text-xs font-bold text-white px-3.5 cursor-pointer"
                    asChild
                  >
                    <Link href={`/vpn`}>
                      <span>Deploy {selectedProto.name}</span>
                      <ArrowRight className="size-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

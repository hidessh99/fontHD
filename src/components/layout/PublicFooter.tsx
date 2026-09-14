"use client";

import React from "react";
import Link from "next/link";
import { Shield, MessageCircle, Send, Globe, CheckCircle2 } from "lucide-react";

export function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-card/60 text-xs text-muted-foreground">
      <div className="container mx-auto px-4 py-14 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 mb-12">
          {/* Col 1: Brand & Mission */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex size-8 items-center justify-center rounded-xl bg-primary/10 border border-primary/30 text-primary">
                <Shield className="size-4.5" />
              </div>
              <span className="text-lg font-black tracking-tight text-foreground">
                Go<span className="text-primary">VPN</span>
              </span>
            </Link>
            <p className="max-w-sm text-xs leading-relaxed text-muted-foreground mb-4">
              Infrastruktur tunneling multi-protokol enterprise (SSH, VMess,
              VLess Reality, Trojan-Go, Shadowsocks 2022, WireGuard). Dirancang
              untuk privasi mutlak, kecepatan murni, dan proteksi sensor ISP.
            </p>

            {/* Operational System Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono font-medium text-emerald-500">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>Seluruh Sistem Beroperasi Normal (99.99% SLA)</span>
            </div>
          </div>

          {/* Col 2: Protokol Tunneling */}
          <div>
            <h4 className="font-semibold text-foreground mb-3.5 uppercase tracking-wider text-[11px] font-mono">
              Protokol VPN
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/#protocols"
                  className="hover:text-foreground transition-colors"
                >
                  SSH Dropbear / WS
                </Link>
              </li>
              <li>
                <Link
                  href="/#protocols"
                  className="hover:text-foreground transition-colors"
                >
                  VMess (V2Ray AEAD)
                </Link>
              </li>
              <li>
                <Link
                  href="/#protocols"
                  className="hover:text-foreground transition-colors"
                >
                  VLess XTLS Reality
                </Link>
              </li>
              <li>
                <Link
                  href="/#protocols"
                  className="hover:text-foreground transition-colors"
                >
                  Trojan-GFW / Go
                </Link>
              </li>
              <li>
                <Link
                  href="/#protocols"
                  className="hover:text-foreground transition-colors"
                >
                  Shadowsocks 2022
                </Link>
              </li>
              <li>
                <Link
                  href="/#protocols"
                  className="hover:text-foreground transition-colors"
                >
                  WireGuard Fast Kernel
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Ekosistem & Layanan */}
          <div>
            <h4 className="font-semibold text-foreground mb-3.5 uppercase tracking-wider text-[11px] font-mono">
              Ekosistem
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/subscription"
                  className="hover:text-foreground transition-colors"
                >
                  Paket Langganan VIP
                </Link>
              </li>
              <li>
                <Link
                  href="/seller"
                  className="text-amber-500/90 hover:text-amber-500 transition-colors font-medium"
                >
                  Portal Mitra Reseller
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="hover:text-foreground transition-colors"
                >
                  Pusat Panduan & Setup
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="hover:text-foreground transition-colors"
                >
                  Bantuan & Tiket Prioritas
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legalitas & Komunitas */}
          <div>
            <h4 className="font-semibold text-foreground mb-3.5 uppercase tracking-wider text-[11px] font-mono">
              Legal & Komunitas
            </h4>
            <ul className="space-y-2.5">
              <li>
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <CheckCircle2 className="size-3 text-emerald-500" />
                  Zero-Logs Policy
                </span>
              </li>
              <li>
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <CheckCircle2 className="size-3 text-primary" />
                  Terms of Service
                </span>
              </li>
              <li className="pt-2">
                <a
                  href="https://t.me/hidessh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-colors font-semibold"
                >
                  <Send className="size-3.5" />
                  Channel Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/40 text-[11px] text-muted-foreground font-mono">
          <div>
            &copy; {currentYear} GoVPN Enterprise. Hak cipta dilindungi
            undang-undang.
          </div>
          <div className="flex items-center gap-4">
            <span>Enkripsi AES-256-GCM & ChaCha20</span>
            <span>•</span>
            <span className="text-emerald-500">Uptime 99.99%</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

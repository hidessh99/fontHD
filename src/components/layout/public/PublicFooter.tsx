"use client";

import React from "react";
import Link from "next/link";
import { Shield, Send, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export function PublicFooter() {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-card/60 text-xs text-muted-foreground">
      <div className="container mx-auto px-4 py-14 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 mb-12">
          {/* Col 1: Brand & Mission */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex size-8 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-700 dark:text-blue-400">
                <Shield className="size-4.5" />
              </div>
              <span className="text-lg font-black tracking-tight text-foreground">
                Go<span className="text-blue-700 dark:text-blue-400">VPN</span>
              </span>
            </Link>
            <p className="max-w-sm text-xs leading-relaxed text-muted-foreground mb-4">
              {t("landing.footer.description")}
            </p>

            {/* Operational System Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono font-medium text-emerald-700 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>{t("landing.footer.systemStatus")}</span>
            </div>
          </div>

          {/* Col 2: Protokol Tunneling */}
          <div>
            <h3 className="font-semibold text-foreground mb-3.5 uppercase tracking-wider text-[11px] font-mono">
              {t("landing.footer.vpnProtocols")}
            </h3>
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
            <h3 className="font-semibold text-foreground mb-3.5 uppercase tracking-wider text-[11px] font-mono">
              {t("landing.footer.ecosystem")}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/subscription"
                  className="hover:text-foreground transition-colors"
                >
                  {t("landing.footer.vipPricing")}
                </Link>
              </li>
              <li>
                <Link
                  href="/seller"
                  className="text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors font-semibold"
                >
                  {t("landing.footer.partnerPortal")}
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="hover:text-foreground transition-colors"
                >
                  {t("landing.footer.guideDocs")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-foreground transition-colors"
                >
                  Tentang Kami (About Us)
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-foreground transition-colors"
                >
                  Hubungi Kami (Contact)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legalitas & Komunitas */}
          <div>
            <h3 className="font-semibold text-foreground mb-3.5 uppercase tracking-wider text-[11px] font-mono">
              {t("landing.footer.legalCommunity")}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="size-3 text-emerald-700 dark:text-emerald-400 shrink-0" />
                  <span>Zero-Logs & Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="size-3 text-blue-700 dark:text-blue-400 shrink-0" />
                  <span>Terms of Service & SLA</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="size-3 text-blue-700 dark:text-blue-400 shrink-0" />
                  <span>Bantuan & Dukungan Tiket</span>
                </Link>
              </li>
              <li className="pt-2">
                <a
                  href="https://t.me/hidessh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-400 hover:bg-blue-500/20 transition-colors font-semibold"
                >
                  <Send className="size-3.5" />
                  <span>{t("landing.footer.telegram")}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/40 text-[11px] text-muted-foreground font-mono">
          <div>
            &copy; {currentYear} {t("landing.footer.rights")}
          </div>
          <div className="flex items-center gap-4">
            <span>Enkripsi AES-256-GCM & ChaCha20</span>
            <span>•</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Uptime 99.99% SLA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

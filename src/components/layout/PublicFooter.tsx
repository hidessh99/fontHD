import React from "react";
import Link from "next/link";
import { Shield } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="border-t border-border/50 bg-card/40 text-xs text-muted-foreground">
      <div className="container mx-auto px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-3">
              <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 border border-primary/30 text-primary">
                <Shield className="size-4" />
              </div>
              <span className="text-base font-black tracking-tight text-foreground">
                Go<span className="text-primary">VPN</span>
              </span>
            </Link>
            <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
              Infrastruktur tunneling multi-protokol enterprise (SSH, VMess, VLess, Trojan, Shadowsocks, WireGuard) dengan latensi ultra-rendah dan proteksi anti-blokir.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3 uppercase tracking-wider text-[11px] font-mono">
              Protokol VPN
            </h4>
            <ul className="space-y-2">
              <li><Link href="/vpn/ssh" className="hover:text-foreground transition-colors">SSH Dropbear</Link></li>
              <li><Link href="/vpn/vmess" className="hover:text-foreground transition-colors">VMess V2Ray</Link></li>
              <li><Link href="/vpn/vless" className="hover:text-foreground transition-colors">VLess Reality</Link></li>
              <li><Link href="/vpn/trojan" className="hover:text-foreground transition-colors">Trojan gRPC</Link></li>
              <li><Link href="/vpn/wireguard" className="hover:text-foreground transition-colors">WireGuard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3 uppercase tracking-wider text-[11px] font-mono">
              Tools & Cloud
            </h4>
            <ul className="space-y-2">
              <li><Link href="/servers" className="hover:text-foreground transition-colors">Server Status</Link></li>
              <li><Link href="/dns" className="hover:text-foreground transition-colors">DNS Cloudflare</Link></li>
              <li><Link href="/ai" className="hover:text-foreground transition-colors">AI Gateway</Link></li>
              <li><Link href="/k8s" className="hover:text-foreground transition-colors">Kubernetes</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground transition-colors">Paket Langganan</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3 uppercase tracking-wider text-[11px] font-mono">
              Bantuan & Legal
            </h4>
            <ul className="space-y-2">
              <li><Link href="/docs" className="hover:text-foreground transition-colors">Dokumentasi</Link></li>
              <li><Link href="/support" className="hover:text-foreground transition-colors">Pusat Bantuan</Link></li>
              <li><Link href="/terms" className="hover:text-foreground transition-colors">Ketentuan Layanan</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">Kebijakan Privasi</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <p>© 2026 GoVPN / HideSSH Platform. All rights reserved.</p>
          <p className="font-mono text-muted-foreground">388 Endpoints Synchronized • Enterprise Ready</p>
        </div>
      </div>
    </footer>
  );
}

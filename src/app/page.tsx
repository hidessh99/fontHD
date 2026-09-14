import Link from "next/link";
import {
  Shield,
  Zap,
  Server,
  Key,
  ArrowRight,
  Activity,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const protocols = [
    {
      name: "SSH / Dropbear",
      desc: "Port 22, 442, WS CDN & TLS Direct",
      color: "border-blue-500/30 text-blue-400",
    },
    {
      name: "VMess (V2Ray)",
      desc: "WS, gRPC, TLS CDN multi-path",
      color: "border-purple-500/30 text-purple-400",
    },
    {
      name: "VLess Reality",
      desc: "XTLS Reality with direct zero-hop",
      color: "border-cyan-500/30 text-cyan-400",
    },
    {
      name: "Trojan",
      desc: "gRPC & WS TLS high-throughput",
      color: "border-rose-500/30 text-rose-400",
    },
    {
      name: "Shadowsocks",
      desc: "AEAD 2022 encryption standard",
      color: "border-amber-500/30 text-amber-400",
    },
    {
      name: "WireGuard",
      desc: "Ultra-low latency kernel tunneling",
      color: "border-emerald-500/30 text-emerald-400",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 border border-primary/30 text-primary">
              <Shield className="size-5" />
            </div>
            <span className="text-xl font-black tracking-tight text-foreground">
              Go<span className="text-primary">VPN</span>
            </span>
            <Badge
              variant="outline"
              className="border-primary/30 text-primary font-mono text-xs"
            >
              v2.0
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Masuk</Link>
            </Button>
            <Button
              className="bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/20"
              asChild
            >
              <Link href="/register">
                Mulai Sekarang <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent -z-10" />
          <div className="container mx-auto px-4 text-center sm:px-6">
            <Badge
              variant="secondary"
              className="mb-6 border border-border px-3 py-1 font-mono text-xs"
            >
              <span className="inline-block size-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
              All Systems Operational • 388 Endpoints Live
            </Badge>

            <h1 className="mx-auto max-w-4xl text-4xl font-black tracking-tight sm:text-6xl md:text-7xl">
              Enterprise Tunneling &{" "}
              <span className="text-primary">High-Assurance</span> Cloud Network
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Infrastruktur multi-protokol berkecepatan tinggi dengan proteksi
              anti-blokir, DNS Cloudflare terpadu, orkestrasi Kubernetes, dan
              integrasi AI Gateway.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-hover text-white px-8 font-semibold shadow-xl shadow-primary/25"
                asChild
              >
                <Link href="/dashboard">
                  <Zap className="mr-2 size-4" /> Buka Console
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-muted font-mono"
                asChild
              >
                <Link href="/servers">
                  <Server className="mr-2 size-4 text-muted-foreground" />{" "}
                  Server Nodes
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Protocol Grid */}
        <section className="container mx-auto px-4 py-16 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Protokol Tunneling Resmi
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Mendukung koneksi multi-hop, WebSocket CDN Cloudflare, TLS
              Reality, dan gRPC.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {protocols.map((proto) => (
              <Card
                key={proto.name}
                className="border-border/60 bg-card/60 transition-all hover:border-primary/40 hover:bg-card"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold">
                      {proto.name}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className={`font-mono text-xs ${proto.color}`}
                    >
                      Active
                    </Badge>
                  </div>
                  <CardDescription className="text-xs text-muted-foreground">
                    {proto.desc}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="size-3.5" /> Direct + CDN
                    </span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Activity className="size-3" /> Latency &lt;45ms
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 text-center text-xs text-muted-foreground">
        <p>
          © 2026 GoVPN (HideSSH). Enterprise High-Assurance Network
          Infrastructure.
        </p>
      </footer>
    </div>
  );
}

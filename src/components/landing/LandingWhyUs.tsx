"use client";

import React from "react";
import {
  Zap,
  ShieldAlert,
  Smartphone,
  CreditCard,
  BookOpen,
  Headphones,
  CheckCircle,
} from "lucide-react";

export function LandingWhyUs() {
  const reasons = [
    {
      title: "Throughput Gigabits Tanpa FUP",
      desc: "Nikmati bandwidth tanpa batasan kecepatan semu. Streaming 4K, video conference, dan unduhan file besar berjalan dengan kecepatan penuh.",
      icon: Zap,
      accent: "text-blue-500",
    },
    {
      title: "Proteksi Kebocoran DNS & WebRTC",
      desc: "Setiap sesi VPN dilengkapi dedicated resolver DNS terenkripsi DoH/DoT yang kebal terhadap pembajakan DNS ISP lokal.",
      icon: ShieldAlert,
      accent: "text-emerald-500",
    },
    {
      title: "Dukungan Seluruh Sistem Operasi",
      desc: "Kompatibel dengan aplikasi resmi dan pihak ketiga di Android, iOS, Windows, macOS, Linux, serta router OpenWrt / Mikrotik.",
      icon: Smartphone,
      accent: "text-indigo-500",
    },
    {
      title: "Aktivasi Pembayaran Otomatis 24/7",
      desc: "Topup saldo dan pembelian paket diproses otomatis dalam 3 detik via QRIS, Virtual Account BCA/Mandiri, dan e-wallet.",
      icon: CreditCard,
      accent: "text-amber-500",
    },
    {
      title: "Pusat Panduan & Setup Wizard",
      desc: "Tersedia tutorial visual langkah demi langkah untuk setiap protokol dan aplikasi, memudahkan pengguna baru sekalipun.",
      icon: BookOpen,
      accent: "text-rose-500",
    },
    {
      title: "Customer Support Cepat & Komunitas",
      desc: "Tim teknis kami siap membantu kendala koneksi melalui sistem tiket prioritas dan grup komunitas Telegram aktif.",
      icon: Headphones,
      accent: "text-cyan-500",
    },
  ];

  return (
    <section
      id="why-us"
      className="py-16 lg:py-24 bg-card/30 border-t border-border/50 relative"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary mb-3.5 uppercase tracking-wider font-mono">
            <CheckCircle className="h-3.5 w-3.5" /> Standar Kualitas
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
            Mengapa GoVPN Pilihan Terbaik?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-3 font-normal">
            Bukan sekadar VPN konvensional, kami menghadirkan ekosistem
            tunneling terlengkap untuk produktivitas, privasi, dan bisnis Anda.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-3xl border border-border/70 bg-card p-7 hover:border-primary/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3.5 mb-4">
                  <div
                    className={`h-11 w-11 rounded-xl bg-muted/60 flex items-center justify-center ${reason.accent} border border-border/60 group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-black text-foreground group-hover:text-primary transition-colors">
                    {reason.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal">
                  {reason.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

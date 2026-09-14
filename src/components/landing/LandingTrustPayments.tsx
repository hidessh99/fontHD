"use client";

import React from "react";
import { CheckCircle2, Shield, Lock, Zap } from "lucide-react";

export function LandingTrustPayments() {
  const trustItems = [
    "Kebijakan Tanpa Pencatatan Jejak (Zero-Logs Policy Terverifikasi)",
    "Server RAM-Disk Ephemeral — Data Terhapus Otomatis Saat Reboot",
    "Jaminan Ketersediaan Jaringan 99.99% SLA Tanpa Kompromi",
    "Aktivasi Instan Real-time dalam 3 Detik Tanpa Perlu Konfirmasi Manual",
  ];

  const paymentBadges = [
    {
      name: "QRIS",
      type: "text",
      label: "QRIS",
      desc: "Semua E-Wallet & Bank",
    },
    { name: "BCA", type: "text", label: "BCA", desc: "Virtual Account" },
    { name: "Mandiri", type: "text", label: "MANDIRI", desc: "Livin' & VA" },
    { name: "GoPay", type: "text", label: "GoPay", desc: "Instant Scan" },
    { name: "DANA", type: "text", label: "DANA", desc: "Dompet Digital" },
    { name: "OVO", type: "text", label: "OVO", desc: "Push Payment" },
    {
      name: "ShopeePay",
      type: "text",
      label: "ShopeePay",
      desc: "SPay Later & Saldo",
    },
    {
      name: "PayPal",
      type: "text",
      label: "PayPal",
      desc: "USD & Kartu Kredit",
    },
    { name: "Crypto", type: "text", label: "USDT", desc: "TRC20 & BEP20" },
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-950 text-white border-t border-slate-800/80 overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Trust Statements */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/15 border border-blue-500/30 px-3.5 py-1 text-xs font-bold text-blue-400 mb-4 uppercase tracking-wider font-mono">
              <Shield className="h-3.5 w-3.5" /> Garansi Keamanan & Privasi
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 leading-tight tracking-tight">
              Privasi Mutlak dengan Transaksi Finansial Aman
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
              Kami menjamin privasi digital Anda tanpa kompromi. Tidak ada log
              riwayat penelusuran, tidak ada pelacakan IP, dan seluruh
              pembayaran diproses melalui gerbang pembayaran terenkripsi resmi.
            </p>

            <div className="space-y-4">
              {trustItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="h-7 w-7 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-slate-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center gap-6 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-emerald-400" /> PCI-DSS
                Compliant
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-primary" /> Auto Settlement
              </span>
            </div>
          </div>

          {/* Right Column: Payment Gateway Badges */}
          <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800 backdrop-blur-xl shadow-2xl">
            <div className="flex flex-col gap-6">
              <div>
                <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">
                  Supported Payment Gateways
                </div>
                <h3 className="text-lg font-black text-white">
                  Pembayaran Otomatis & Terverifikasi
                </h3>
              </div>

              {/* Grid of Payment Brands */}
              <div className="grid grid-cols-3 gap-3">
                {paymentBadges.map((badge, idx) => (
                  <div
                    key={idx}
                    className="h-14 bg-slate-950/80 border border-slate-800/90 rounded-2xl flex flex-col items-center justify-center p-2 hover:border-blue-500/50 hover:bg-slate-800/50 transition-all duration-300 group cursor-default"
                  >
                    <span className="text-sm font-black tracking-tight text-slate-200 group-hover:text-blue-400 transition-colors font-mono">
                      {badge.label}
                    </span>
                    <span className="text-[10px] text-slate-500 truncate max-w-full font-sans">
                      {badge.desc}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-slate-400 text-xs leading-relaxed font-normal pt-2 border-t border-slate-800/80">
                Didukung integrasi langsung QRIS Nasional, Bank Indonesia, serta
                protokol Web3 cryptocurrency untuk fleksibilitas pembayaran
                pengguna internasional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

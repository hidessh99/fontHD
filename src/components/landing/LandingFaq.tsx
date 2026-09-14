"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export function LandingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Apa perbedaan antara protokol SSH, VMess, VLess Reality, dan Trojan?",
      a: "SSH Dropbear sangat ideal untuk tunneling TCP dengan payload custom dan port standar. VMess (V2Ray) menggunakan dynamic routing untuk memecah enkripsi paket di jaringan kompleks. VLess Reality adalah generasi terbaru tanpa kebutuhan domain sendiri dengan kecepatan native Linux. Sedangkan Trojan menyamarkan seluruh traffic menyerupai lalu lintas browsing web HTTPS standar port 443 sehingga hampir mustahil diblokir oleh firewall ISP.",
    },
    {
      q: "Aplikasi klien apa saja yang direkomendasikan untuk menggunakan akun GoVPN?",
      a: "Untuk Android kami merekomendasikan v2rayNG, Sing-box, NekoBox, atau HTTP Custom. Untuk iOS / iPhone Anda dapat menggunakan Shadowrocket, Sing-box, atau FoXray. Untuk Windows dan Mac tersedia v2rayN, Nekoray, Clash Verge Rev, dan aplikasi resmi WireGuard.",
    },
    {
      q: "Apakah ada batasan kuota (FUP) atau batas kecepatan per akun?",
      a: "Seluruh akun reguler dan VIP GoVPN berjalan di port uplink 10 Gbps tanpa FUP (Fair Usage Policy) tersembunyi. Kecepatan maksimal bergantung pada kualitas sinyal operator seluler atau ISP lokal yang Anda gunakan.",
    },
    {
      q: "Bagaimana cara menjadi Mitra Reseller GoVPN dan apa keuntungannya?",
      a: "Anda cukup mendaftar akun dan mengakses menu Portal Reseller. Mitra Reseller mendapatkan diskon kuota grosir hingga 30%, akses API pencetakan massal instan, white-label sub-akun, serta fasilitas penarikan komisi saldo otomatis ke rekening bank lokal atau e-wallet.",
    },
    {
      q: "Apakah GoVPN mencatat log riwayat situs yang saya kunjungi?",
      a: "Sama sekali TIDAK. Kami mematuhi standar Zero-Logs Policy yang ketat. Server kami beroperasi pada sistem operasi ephemeral berbasis RAM disk, di mana seluruh memori sementara terhapus secara otomatis dan tidak ada satupun jejak penjelajahan, DNS query, atau alamat IP asli yang disimpan ke media penyimpanan permanen.",
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="py-16 lg:py-24 bg-card/40 border-t border-border/50"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary mb-3.5 uppercase tracking-wider font-mono">
            <HelpCircle className="h-3.5 w-3.5" /> Tanya Jawab Populer
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-3 font-normal">
            Temukan jawaban cepat atas pertanyaan seputar akun, protokol,
            kompatibilitas aplikasi, dan ekosistem kemitraan.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-primary/50 bg-card shadow-lg shadow-primary/5"
                    : "border-border/70 bg-card/60 hover:border-border"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-black text-foreground">
                    {faq.q}
                  </span>
                  <div
                    className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? "bg-primary text-white rotate-180"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-muted-foreground leading-relaxed font-normal border-t border-border/40 pt-4 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

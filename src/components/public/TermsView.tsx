"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { CopyButton } from "@/components/shared/CopyButton";
import {
  Scale,
  AlertTriangle,
  FileText,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Server,
  Zap,
  CreditCard,
  Building2,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Clock,
} from "lucide-react";

export function TermsView() {
  const { t, locale } = useI18n();
  const [activeSection, setActiveSection] = useState<string>("pasal-1");

  const isId = locale === "id";

  const sections = [
    {
      id: "pasal-1",
      title: isId ? "Ketentuan Umum & Penerimaan" : "General Provisions & Acceptance",
      num: 1,
    },
    {
      id: "pasal-2",
      title: isId ? "Kebijakan Penggunaan Wajar (AUP)" : "Acceptable Use Policy (AUP)",
      num: 2,
    },
    {
      id: "pasal-3",
      title: isId ? "Lisensi & Integritas Protokol" : "Protocols & Engine Integrity",
      num: 3,
    },
    {
      id: "pasal-4",
      title: isId ? "SLA Ketersediaan 99.99%" : "99.99% Uptime SLA Guarantee",
      num: 4,
    },
    {
      id: "pasal-5",
      title: isId ? "Akun, API Keys & Multi-Device" : "Accounts, API Keys & Concurrency",
      num: 5,
    },
    {
      id: "pasal-6",
      title: isId ? "Pembayaran & Kebijakan Refund" : "Billing, Top-up & Refund Terms",
      num: 6,
    },
    {
      id: "pasal-7",
      title: isId ? "Batasan Tanggung Jawab" : "Limitation of Liability",
      num: 7,
    },
    {
      id: "pasal-8",
      title: isId ? "Hukum Berlaku & Yurisdiksi" : "Governing Law & Jurisdiction",
      num: 8,
    },
  ];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
      {/* Header */}
      <div className="max-w-3xl space-y-4 border-b border-border/60 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold font-mono bg-primary/10 border border-primary/20 text-primary">
          <Scale className="size-3.5" />
          <span>{t("legal.termsBadge")}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
          {t("legal.termsTitle")}
        </h1>
        <p className="text-sm sm:text-base font-normal text-muted-foreground leading-relaxed">
          {t("legal.termsSubtitle")}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground pt-1">
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5 text-primary" />
            {t("legal.termsLastUpdated")}
          </span>
          <span>•</span>
          <span className="text-emerald-400 font-medium flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Legal Version 2.4.0 (Global & UU PDP)
          </span>
        </div>
      </div>

      {/* Official Identity Card */}
      <div className="my-8 p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/70 backdrop-blur-sm shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Building2 className="size-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
                {t("legal.companyInfoTitle")}
              </h2>
              <p className="text-xs text-muted-foreground">
                Hide Group / Hide Digital Security — Legal Entity & Operations
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full w-fit">
            <ShieldCheck className="size-3.5" />
            <span>Verified Infrastructure Provider</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-muted-foreground">
          <div className="space-y-1.5">
            <div className="text-foreground font-semibold flex items-center gap-2">
              <FileText className="size-3.5 text-primary" />
              <span>{t("legal.operatorLabel")}</span>
            </div>
            <div className="font-mono text-foreground font-medium">
              Hide Group / Hide Digital Security
            </div>
            <div className="text-[11px] text-muted-foreground">
              Autonomous System & Cloud Tunneling
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-foreground font-semibold flex items-center gap-2">
              <Mail className="size-3.5 text-primary" />
              <span>{t("legal.emailLabel")}</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="mailto:support@hidessh.com"
                className="text-primary font-mono hover:underline truncate"
              >
                support@hidessh.com
              </a>
              <CopyButton text="support@hidessh.com" size="sm" className="h-6 px-2 text-[10px]" />
            </div>
            <div className="text-[11px] text-muted-foreground">
              Secondary: dmaskurniawan56@gmail.com
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-foreground font-semibold flex items-center gap-2">
              <Phone className="size-3.5 text-primary" />
              <span>{t("legal.phoneLabel")}</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-foreground">
              <span>0877-1113-01818</span>
              <CopyButton text="0877111301818" size="sm" className="h-6 px-2 text-[10px]" />
            </div>
            <div className="text-[11px] text-muted-foreground">
              WhatsApp CS & Emergency NOC Desk
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border/50 text-xs text-muted-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-2">
            <MapPin className="size-4 text-primary shrink-0 mt-0.5 sm:mt-0" />
            <span>
              Jl. Kampung Baris No.391, Karangturi, Kec. Semarang Tim., Kota Semarang, Jawa Tengah 50124
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <CopyButton
              text="Jl. Kampung Baris No.391, Karangturi, Kec. Semarang Tim., Kota Semarang, Jawa Tengah 50124"
              label={isId ? "Salin Alamat" : "Copy Address"}
              size="sm"
              className="h-7 text-xs"
            />
            <a
              href="https://maps.google.com/?q=Jl.+Kampung+Baris+No.391,+Karangturi,+Kec.+Semarang+Tim.,+Kota+Semarang,+Jawa+Tengah+50124"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
            >
              <span>Google Maps</span>
              <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Layout with Sticky Sidebar on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Table of Contents Sticky Sidebar */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
          <div className="p-5 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm shadow-md">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
              <FileText className="size-4 text-primary" />
              <span>{t("legal.quickNavTitle")}</span>
            </h3>
            <nav className="space-y-1">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  type="button"
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                    activeSection === s.id
                      ? "bg-primary/10 text-primary font-bold border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface-subtle"
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <span className="font-mono text-[10px] size-5 rounded-md bg-muted/60 flex items-center justify-center shrink-0">
                      {s.num}
                    </span>
                    <span className="truncate">{s.title}</span>
                  </span>
                  <ChevronRight className="size-3.5 shrink-0 opacity-60" />
                </button>
              ))}
            </nav>

            <div className="mt-6 pt-5 border-t border-border/50 space-y-3">
              <div className="text-xs text-muted-foreground leading-relaxed">
                {isId
                  ? "Butuh konsultasi kontrak B2B atau SLA khusus untuk institusi Anda?"
                  : "Need custom enterprise B2B tunneling agreements or high-volume SLA?"}
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
              >
                <span>{isId ? "Hubungi Tim Kemitraan" : "Contact Enterprise Desk"}</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>
        </aside>

        {/* Legal Articles Content */}
        <div className="lg:col-span-8 space-y-8 text-xs sm:text-sm font-normal text-muted-foreground leading-relaxed">
          {/* Article 1 */}
          <section
            id="pasal-1"
            className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card space-y-4 shadow-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center text-sm font-mono font-bold shrink-0">
                01
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground">
                {isId
                  ? "Ketentuan Umum & Penerimaan Perjanjian"
                  : "General Provisions & Agreement Acceptance"}
              </h2>
            </div>
            <p>
              {isId
                ? "Perjanjian ini mengatur syarat dan ketentuan penggunaan layanan cloud tunneling, virtual private network (VPN), dan infrastruktur akselerasi protokol yang disediakan oleh Hide Group ('GoVPN'). Dengan mengakses situs web, membeli paket langganan, mengunduh konfigurasi (V2Ray, VLess, Trojan, WireGuard, Shadowsocks, SSH), atau menghubungkan client ke simpul edge GoVPN, Anda secara hukum menyatakan telah membaca, memahami, dan menyetujui seluruh ketentuan ini."
                : "This Agreement governs the terms and conditions for using the cloud tunneling, virtual private network (VPN), and protocol acceleration services provided by Hide Group ('GoVPN'). By visiting our website, purchasing a subscription, downloading configuration files (V2Ray, VLess, Trojan, WireGuard, Shadowsocks, SSH), or establishing a socket connection to GoVPN edge nodes, you legally affirm that you have read, understood, and consented to all provisions herein."}
            </p>
            <p>
              {isId
                ? "Layanan ini ditujukan untuk pengguna perorangan, profesional teknologi informasi, pengembang aplikasi, dan badan usaha yang membutuhkan saluran koneksi terenkripsi berkecepatan tinggi demi perlindungan privasi digital dan optimalisasi routing jaringan."
                : "The service is provided for individuals, IT professionals, software engineers, and enterprise entities requiring high-speed encrypted channels for digital privacy protection and network latency optimization."}
            </p>
          </section>

          {/* Article 2: AUP */}
          <section
            id="pasal-2"
            className="p-6 sm:p-8 rounded-2xl border border-rose-500/30 bg-card space-y-4 shadow-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center text-sm font-mono font-bold shrink-0">
                02
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground">
                {isId
                  ? "Kebijakan Penggunaan Wajar (AUP) & Larangan Mutlak"
                  : "Acceptable Use Policy (AUP) & Zero Tolerance Violations"}
              </h2>
            </div>
            <p>
              {isId
                ? "Infrastruktur GoVPN didesain untuk kebebasan berinternet yang bertanggung jawab. Pengguna DILARANG KERAS memanfaatkan simpul server atau bandwidth GoVPN untuk:"
                : "GoVPN infrastructure is architected for lawful, ethical, and responsible Internet freedom. Users are STRICTLY PROHIBITED from leveraging GoVPN edge servers or bandwidth for:"}
            </p>
            <div className="p-4 sm:p-5 rounded-xl bg-rose-500/5 border border-rose-500/20 text-xs space-y-2.5">
              <div className="flex items-center gap-2 text-rose-500 font-bold">
                <AlertTriangle className="size-4 shrink-0" />
                <span>
                  {isId
                    ? "Pelanggaran yang Mengakibatkan Pemutusan Akun Seketika Tanpa Refund:"
                    : "Severe Infractions Triggering Instant Account Termination Without Refund:"}
                </span>
              </div>
              <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
                <li>
                  {isId
                    ? "Serangan siber dalam bentuk apa pun, termasuk Distributed Denial of Service (DDoS), Port Scanning agresif, brute-force attack, atau penyebaran botnet/malware."
                    : "Cyberattacks of any nature, including Distributed Denial of Service (DDoS), aggressive mass port scanning, brute-force cracking, or botnet/malware dissemination."}
                </li>
                <li>
                  {isId
                    ? "Pengiriman email massal yang tidak diminta (Spamming), open-relay exploitation, atau email phishing."
                    : "Transmission of unsolicited bulk commercial emails (Spamming), SMTP open-relay abuse, or credential phishing."}
                </li>
                <li>
                  {isId
                    ? "Penyebaran atau pengunduhan materi eksploitasi seksual anak (CSAM/CSAE), pornografi ilegal, atau perdagangan zat terlarang."
                    : "Distribution, caching, or transmission of Child Sexual Abuse Material (CSAM/CSAE), illegal trafficking, or terrorism."}
                </li>
                <li>
                  {isId
                    ? "Tindakan sabotase sistem yang sengaja menghabiskan bandwidth node (card sharing brute, crypto mining intensif pada VPS, torrenting massal ilegal pada node berlabel Non-Torrent)."
                    : "Deliberate network sabotage, unauthorized bandwidth hoarding (excessive crypto-mining or unlicensed peer-to-peer torrenting on non-torrent edge nodes)."}
                </li>
              </ul>
            </div>
            <p className="text-xs text-muted-foreground/80">
              {isId
                ? "Hide Group berhak memblokir kredensial akun, mencabut hak akses API, dan memasukkan identitas pembayaran pelanggar ke dalam blacklist sistem jika terjadi pelanggaran AUP."
                : "Hide Group reserves the unilateral right to revoke credentials, terminate API tokens, and blacklist billing profiles immediately upon detection of AUP violations."}
            </p>
          </section>

          {/* Article 3: Protocols & License */}
          <section
            id="pasal-3"
            className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card space-y-4 shadow-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center text-sm font-mono font-bold shrink-0">
                03
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground">
                {isId
                  ? "Integritas Protokol & Lisensi Software Client"
                  : "Protocol Integrity & Client Software Attribution"}
              </h2>
            </div>
            <p>
              {isId
                ? "GoVPN menyediakan endpoint tunneling berbasis protokol open source standar industri: VLess XTLS Reality, VMess (V2Ray AEAD), Trojan-GFW / Trojan-Go, Shadowsocks 2022, WireGuard (Linux Kernel Module), dan SSH Dropbear/WebSocket. Seluruh kode protokol upstream tetap merupakan hak kekayaan intelektual komunitas pengembang masing-masing (Project V, Sing-box, Jason A. Donenfeld / WireGuard)."
                : "GoVPN provisions tunneling endpoints utilizing industry-standard open-source protocol suites: VLess XTLS Reality, VMess (V2Ray AEAD), Trojan-GFW / Trojan-Go, Shadowsocks 2022, WireGuard (Linux Kernel Module), and SSH Dropbear/WebSocket. All upstream protocol codes remain the intellectual property of their respective creators (Project V, Sing-box, Jason A. Donenfeld / WireGuard)."}
            </p>
            <p>
              {isId
                ? "Pengguna bertanggung jawab menggunakan aplikasi client yang sah dan bebas dari malware (seperti v2rayNG, Sing-box, NekoBox, Clash Verge Rev, Shadowrocket, atau HTTP Custom). GoVPN tidak bertanggung jawab atas kerugian yang disebabkan oleh modifikasi client tidak resmi pihak ketiga."
                : "Users are solely responsible for deploying verified, malware-free client applications (such as v2rayNG, Sing-box, NekoBox, Clash Verge Rev, Shadowrocket, or HTTP Custom). GoVPN assumes no liability for damages arising from unverified third-party client modifications."}
            </p>
          </section>

          {/* Article 4: SLA */}
          <section
            id="pasal-4"
            className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card space-y-4 shadow-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center text-sm font-mono font-bold shrink-0">
                04
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground">
                {isId
                  ? "Komitmen SLA Ketersediaan Sistem (99.99% Core Uptime)"
                  : "Service Level Agreement (99.99% Core Infrastructure Uptime)"}
              </h2>
            </div>
            <p>
              {isId
                ? "GoVPN menjamin Service Level Agreement (SLA) ketersediaan infrastruktur jaringan inti minimum sebesar 99.99% setiap bulannya, didukung oleh redundansi BGP Anycast Tier-1. Gangguan pada satu edge node akan dialihkan secara otomatis ke node cadangan dalam wilayah terdekat."
                : "GoVPN guarantees a core network availability Service Level Agreement (SLA) of 99.99% monthly, backed by redundant Tier-1 BGP Anycast routes. Any transient anomaly on a single edge node is automatically failover-routed to peer nodes in the same region."}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-border/60 bg-surface-subtle space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                  <Server className="size-3.5 text-primary" />
                  <span>{isId ? "Pemeliharaan Terjadwal (Maintenance)" : "Scheduled Maintenance"}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {isId
                    ? "Diberitahukan minimum 12 jam sebelumnya melalui channel Telegram resmi @hidessh atau banner status."
                    : "Notified at least 12 hours prior via our official Telegram channel @hidessh or status banner."}
                </p>
              </div>
              <div className="p-4 rounded-xl border border-border/60 bg-surface-subtle space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                  <Zap className="size-3.5 text-emerald-400" />
                  <span>{isId ? "Kompensasi SLA" : "SLA Credit Compensation"}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {isId
                    ? "Jika downtime jaringan inti melebihi batas toleransi bulanan, pengguna berhak mengajukan perpanjangan masa aktif akun secara proporsional."
                    : "If unplanned core downtime exceeds SLA thresholds, affected accounts are entitled to proportional validity extensions."}
                </p>
              </div>
            </div>
          </section>

          {/* Article 5: Accounts & Multi-device */}
          <section
            id="pasal-5"
            className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card space-y-4 shadow-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center text-sm font-mono font-bold shrink-0">
                05
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground">
                {isId
                  ? "Ketentuan Akun, Kunci API, & Batas Multi-Device"
                  : "Account Terms, API Credentials & Concurrency Limits"}
              </h2>
            </div>
            <p>
              {isId
                ? "Setiap akun langganan GoVPN memiliki kuota batas perangkat simultan (biasanya 2 hingga 5 koneksi bersamaan tergantung paket yang dipilih). Membagikan kredensial SSH/VPN secara publik ke ribuan pengguna dilarang karena akan memicu proteksi multi-login otomatis."
                : "Each GoVPN subscription plan enforces specific concurrent device limits (typically 2 to 5 simultaneous active tunnels depending on tier). Publicly disseminating credentials causing uncontrolled mass concurrency triggers automated session throttling."}
            </p>
            <p>
              {isId
                ? "Untuk mitra Reseller yang menggunakan REST API, kunci API (API Key) bersifat rahasia. Mitra bertanggung jawab penuh atas seluruh akun sub-tenant yang dibuat melalui integrasi kunci API tersebut."
                : "For Reseller Partners utilizing our REST API, API tokens are confidential. Partners are strictly responsible for all sub-tenant accounts provisioned via their credentials."}
            </p>
          </section>

          {/* Article 6: Payments & Refund */}
          <section
            id="pasal-6"
            className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card space-y-4 shadow-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center text-sm font-mono font-bold shrink-0">
                06
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground">
                {isId
                  ? "Sistem Pembayaran, Top-Up, & Jaminan Refund"
                  : "Payment Gateways, Balance Top-Up & Refund Policy"}
              </h2>
            </div>
            <p>
              {isId
                ? "Pembayaran layanan GoVPN diproses secara otomatis melalui payment gateway resmi: QRIS (GoPay, OVO, Dana, ShopeePay), Virtual Account Bank (BCA, Mandiri, BRI, BNI), serta Crypto USDT (TRC20/BEP20). Seluruh transaksi diverifikasi instan secara digital 24/7."
                : "GoVPN billing is processed automatically via official payment gateways: QRIS (GoPay, OVO, Dana, ShopeePay), Indonesian Bank Virtual Accounts, and Crypto USDT (TRC20/BEP20). All transactions are digitally verified 24/7."}
            </p>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-xs space-y-2">
              <div className="flex items-center gap-2 text-foreground font-bold">
                <CreditCard className="size-4 text-primary" />
                <span>{isId ? "Garansi Pengembalian Dana 24 Jam:" : "24-Hour Connectivity Refund Guarantee:"}</span>
              </div>
              <p className="text-muted-foreground">
                {isId
                  ? "Jika dalam kurun waktu 24 jam setelah aktivasi layanan Anda mengalami kegagalan koneksi total pada seluruh edge server GoVPN dan tim dukungan kami tidak berhasil menyelesaikannya, Anda berhak mengajukan pengembalian saldo atau dana 100%."
                  : "If within 24 hours of provisioning you experience total connectivity failure across all GoVPN edge nodes and our support desk cannot remediate the issue, you are entitled to a 100% refund."}
              </p>
            </div>
          </section>

          {/* Article 7: Limitation of Liability */}
          <section
            id="pasal-7"
            className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card space-y-4 shadow-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center text-sm font-mono font-bold shrink-0">
                07
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground">
                {isId
                  ? "Batasan Tanggung Jawab (*Limitation of Liability*)"
                  : "Limitation of Liability & Force Majeure"}
              </h2>
            </div>
            <p>
              {isId
                ? "Dalam batasan maksimal yang diperbolehkan hukum Indonesia, Hide Group tidak bertanggung jawab atas kerugian tidak langsung, kehilangan keuntungan usaha, atau gangguan koneksi lokal ISP (seperti kabel laut putus, gangguan operator seluler lokal, atau pemadaman listrik lokal pengguna). Tanggung jawab agregat GoVPN kepada pengguna tidak akan melebihi total nominal yang telah dibayarkan pengguna dalam 30 hari terakhir."
                : "To the fullest extent permitted by law, Hide Group shall not be liable for indirect, incidental, or consequential damages, commercial downtime, or local ISP outages (such as submarine cable cuts, regional cellular outages, or user-end power failure). Our aggregate liability shall under no circumstances exceed the total fee paid by the user in the preceding 30 days."}
            </p>
          </section>

          {/* Article 8: Governing Law */}
          <section
            id="pasal-8"
            className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card space-y-4 shadow-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center text-sm font-mono font-bold shrink-0">
                08
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground">
                {isId
                  ? "Hukum yang Berlaku & Penyelesaian Sengketa"
                  : "Governing Law & Dispute Resolution"}
              </h2>
            </div>
            <p>
              {isId
                ? "Syarat & Ketentuan ini tunduk dan ditafsirkan berdasarkan hukum Negara Kesatuan Republik Indonesia. Setiap perselisihan yang timbul dari atau terkait dengan penggunaan layanan GoVPN akan diselesaikan terlebih dahulu melalui musyawarah mufakat. Apabila kesepakatan tidak tercapai dalam 30 hari kerja, sengketa akan diselesaikan melalui yurisdiksi Pengadilan Negeri Kota Semarang, Jawa Tengah."
                : "These Terms of Service are governed by and construed in accordance with the laws of the Republic of Indonesia. Any disputes arising out of or in connection with GoVPN services shall first be negotiated in good faith. If unresolved within 30 business days, the parties submit to the exclusive jurisdiction of the Semarang District Court, Central Java, Indonesia."}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

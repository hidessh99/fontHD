"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { CopyButton } from "@/components/shared/CopyButton";
import {
  ShieldCheck,
  Lock,
  HardDrive,
  FileText,
  Mail,
  MapPin,
  Phone,
  Building2,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Clock,
  KeyRound,
} from "lucide-react";

export function PrivacyView() {
  const { t, locale } = useI18n();
  const [activeSection, setActiveSection] = useState<string>("section-1");

  const isId = locale === "id";

  const sections = [
    {
      id: "section-1",
      title: isId ? "Landasan Hukum UU PDP & GDPR" : "Legal Framework (UU PDP & GDPR)",
      num: 1,
    },
    {
      id: "section-2",
      title: isId ? "Arsitektur Ephemeral RAM-Only" : "Ephemeral RAM-Only Architecture",
      num: 2,
    },
    {
      id: "section-3",
      title: isId ? "Data Minimal yang Diproses" : "Minimal Data Collected & Purpose",
      num: 3,
    },
    {
      id: "section-4",
      title: isId ? "Standar Enkripsi & Kriptografi" : "Cryptographic Ciphers & Standards",
      num: 4,
    },
    {
      id: "section-5",
      title: isId ? "Hak Subjek Data (UU PDP)" : "Data Subject Rights (GDPR & PDP)",
      num: 5,
    },
    {
      id: "section-6",
      title: isId ? "Cookie & Keamanan Turnstile" : "Cookies & Cloudflare Turnstile",
      num: 6,
    },
    {
      id: "section-7",
      title: isId ? "Kontak Petugas DPO & Kepatuhan" : "DPO & Compliance Officer Contact",
      num: 7,
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          <ShieldCheck className="size-3.5" />
          <span>{t("legal.privacyBadge")}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
          {t("legal.privacyTitle")}
        </h1>
        <p className="text-sm sm:text-base font-normal text-muted-foreground leading-relaxed">
          {t("legal.privacySubtitle")}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground pt-1">
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5 text-emerald-400" />
            {t("legal.privacyLastUpdated")}
          </span>
          <span>•</span>
          <span className="text-emerald-400 font-medium flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Zero-Logs Audited Guarantee
          </span>
        </div>
      </div>

      {/* Official Identity Card */}
      <div className="my-8 p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/70 backdrop-blur-sm shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Building2 className="size-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
                {t("legal.companyInfoTitle")}
              </h2>
              <p className="text-xs text-muted-foreground">
                Hide Group / Hide Digital Security — Data Controller & Infrastructure Operator
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full w-fit">
            <ShieldCheck className="size-3.5" />
            <span>UU PDP No. 27/2022 & GDPR Compliant</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-muted-foreground">
          <div className="space-y-1.5">
            <div className="text-foreground font-semibold flex items-center gap-2">
              <FileText className="size-3.5 text-emerald-400" />
              <span>{t("legal.operatorLabel")}</span>
            </div>
            <div className="font-mono text-foreground font-medium">
              Hide Group / Hide Digital Security
            </div>
            <div className="text-[11px] text-muted-foreground">
              Autonomous Cloud Network Controller
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-foreground font-semibold flex items-center gap-2">
              <Mail className="size-3.5 text-emerald-400" />
              <span>{t("legal.emailLabel")}</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="mailto:support@hidessh.com"
                className="text-emerald-400 font-mono hover:underline truncate"
              >
                support@hidessh.com
              </a>
              <CopyButton text="support@hidessh.com" size="sm" className="h-6 px-2 text-[10px]" />
            </div>
            <div className="text-[11px] text-muted-foreground">
              DPO Desk: dmaskurniawan56@gmail.com
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-foreground font-semibold flex items-center gap-2">
              <Phone className="size-3.5 text-emerald-400" />
              <span>{t("legal.phoneLabel")}</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-foreground">
              <span>0877-1113-01818</span>
              <CopyButton text="0877111301818" size="sm" className="h-6 px-2 text-[10px]" />
            </div>
            <div className="text-[11px] text-muted-foreground">
              Direct Inquiries & DPO Verification
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border/50 text-xs text-muted-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-2">
            <MapPin className="size-4 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
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
              className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:underline font-medium"
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
              <FileText className="size-4 text-emerald-400" />
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
                      ? "bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20"
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
                  ? "Ingin mengajukan hak penghapusan akun permanen (right to be forgotten)?"
                  : "Need to exercise your right to erasure (right to be forgotten)?"}
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:underline"
              >
                <span>{isId ? "Kirim Tiket Penghapusan Data" : "Submit Data Deletion Request"}</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>
        </aside>

        {/* Privacy Articles Content */}
        <div className="lg:col-span-8 space-y-8 text-xs sm:text-sm font-normal text-muted-foreground leading-relaxed">
          {/* Section 1 */}
          <section
            id="section-1"
            className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card space-y-4 shadow-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-mono font-bold shrink-0">
                01
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground">
                {isId
                  ? "Landasan Hukum & Kepatuhan Regulasi (UU PDP & GDPR)"
                  : "Legal Foundation & Regulatory Compliance (UU PDP & GDPR)"}
              </h2>
            </div>
            <p>
              {isId
                ? "Kebijakan Privasi ini disusun atas dasar kepatuhan mutlak terhadap Undang-Undang Republik Indonesia Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP) serta mengadopsi standar perlindungan internasional General Data Protection Regulation (GDPR - Regulation EU 2016/679). Hide Group bertindak sebagai Pengendali Data (Data Controller) yang bertanggung jawab penuh dalam menjaga hak-hak privasi setiap pengguna."
                : "This Privacy Policy is established in strict adherence to the Republic of Indonesia Law No. 27 of 2022 on Personal Data Protection (UU PDP) and integrates international gold standards including the General Data Protection Regulation (GDPR - Regulation EU 2016/679). Hide Group operates as the Data Controller, legally accountable for safeguarding user privacy entitlements."}
            </p>
          </section>

          {/* Section 2: Ephemeral RAM */}
          <section
            id="section-2"
            className="p-6 sm:p-8 rounded-2xl border border-emerald-500/30 bg-card space-y-4 shadow-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-mono font-bold shrink-0">
                02
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground">
                {isId
                  ? "Arsitektur Ephemeral RAM-Only & Jaminan Strict Zero-Logs"
                  : "Ephemeral RAM-Only Architecture & Strict Zero-Logs Guarantee"}
              </h2>
            </div>
            <p>
              {isId
                ? "Tidak seperti penyedia VPN konvensional yang menyimpan riwayat koneksi ke dalam hard disk fisik atau NVMe SSD, seluruh edge server GoVPN beroperasi di atas sistem operasi RAM-only (tmpfs). Artinya:"
                : "Unlike legacy VPN providers that store connection traces to physical NVMe SSDs, all GoVPN edge nodes run exclusively on volatile RAM-only (tmpfs) operating systems. Concretely:"}
            </p>
            <div className="p-4 sm:p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs space-y-3">
              <div className="flex items-center gap-2 text-foreground font-bold">
                <HardDrive className="size-4 text-emerald-400 shrink-0" />
                <span>
                  {isId
                    ? "Jaminan Teknis Tanpa Jejak Penyimpanan (Zero-Disk Activity):"
                    : "Zero-Disk Storage Engineering Guarantee:"}
                </span>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>
                  <strong>{isId ? "Tidak Ada Log DNS:" : "Zero DNS Query Logging:"}</strong>{" "}
                  {isId
                    ? "Seluruh resolusi domain diproses melalui resolver lokal non-caching 1.1.1.1 / 8.8.8.8 di RAM dan langsung dimusnahkan."
                    : "Domain queries are resolved via local in-memory non-caching resolvers and purged instantly."}
                </li>
                <li>
                  <strong>{isId ? "Tidak Ada Riwayat Web:" : "Zero Browsing History / IP Logging:"}</strong>{" "}
                  {isId
                    ? "Kami tidak pernah merekam alamat IP asal pengguna, situs tujuan yang dikunjungi, atau payload konten lalu lintas data Anda."
                    : "We never record source IP addresses, destination websites, connection durations, or data payloads."}
                </li>
                <li>
                  <strong>{isId ? "Penghapusan Memori Otomatis:" : "Automated Volatile Purge on Reboot:"}</strong>{" "}
                  {isId
                    ? "Setiap server melakukan siklus restart terjadwal; setiap buffer sementara di memori RAM terhapus secara fisik dan permanen saat tegangan daya diputus."
                    : "Edge nodes perform scheduled memory cycles; any ephemeral volatile buffer is physically and irrevocably eradicated upon reboot."}
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3: Minimal Data Collected */}
          <section
            id="section-3"
            className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card space-y-4 shadow-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-mono font-bold shrink-0">
                03
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground">
                {isId
                  ? "Data Minimal yang Diproses & Tujuan Operasional"
                  : "Minimal Data Collected & Operational Purposes"}
              </h2>
            </div>
            <p>
              {isId
                ? "Untuk mengoperasikan platform penagihan, otentikasi akun, dan mencegah penyalahgunaan multi-device, GoVPN hanya memproses metadata minimal berikut:"
                : "To facilitate billing, account authentication, and manage device concurrency, GoVPN processes only the following strictly minimal metadata:"}
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>{isId ? "Kredensial Akun:" : "Account Credentials:"}</strong>{" "}
                {isId
                  ? "Alamat email aktif, nama akun pengguna (username), dan kata sandi yang di-hash dengan algoritma bcrypt / argon2id. Kami tidak pernah menyimpan kata sandi dalam bentuk plaintext."
                  : "Active email, username, and one-way cryptographic password hashes (bcrypt/argon2id). Plaintext passwords are never stored."}
              </li>
              <li>
                <strong>{isId ? "Data Transaksi Tagihan:" : "Billing & Invoice Records:"}</strong>{" "}
                {isId
                  ? "Nomor invoice, tanggal transaksi, metode pembayaran (QRIS/VA/USDT), dan masa aktif paket akun yang diperlukan untuk pembukuan fiskal."
                  : "Invoice identifiers, transaction dates, selected payment rails, and subscription expiration timestamps required for tax and financial auditing."}
              </li>
              <li>
                <strong>{isId ? "Penghitung Sesi Volatile (In-Memory Counter):" : "Ephemeral Session Counters:"}</strong>{" "}
                {isId
                  ? "Status jumlah perangkat yang sedang tersambung secara bersamaan (misal: 1 dari 2 kuota) yang disimpan sementara di memori Redis volatile dan dihapus seketika saat koneksi ditutup."
                  : "An active connection counter in Redis volatile memory to enforce package device limits, cleared the instant the tunnel socket disconnects."}
              </li>
            </ul>
          </section>

          {/* Section 4: Cryptography */}
          <section
            id="section-4"
            className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card space-y-4 shadow-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-mono font-bold shrink-0">
                04
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground">
                {isId
                  ? "Standar Enkripsi & Keamanan Transport"
                  : "Cryptographic Ciphers & Transport Security Standards"}
              </h2>
            </div>
            <p>
              {isId
                ? "Seluruh paket data yang melewati terowongan GoVPN diproteksi dengan cipher enkripsi standar militer dan perbankan:"
                : "All packets traversing GoVPN tunnels are secured with defense-grade cryptographic primitives:"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-border/60 bg-surface-subtle space-y-1.5">
                <div className="flex items-center gap-2 text-foreground font-bold text-xs">
                  <Lock className="size-4 text-emerald-400" />
                  <span>AES-256-GCM & ChaCha20</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {isId
                    ? "Enkripsi simetris AEAD dengan integritas autentikasi tinggi, dioptimalkan untuk instruksi CPU AES-NI dan perangkat seluler ARM."
                    : "Authenticated AEAD encryption optimized for both desktop AES-NI hardware instructions and mobile ARM Neon chips."}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-border/60 bg-surface-subtle space-y-1.5">
                <div className="flex items-center gap-2 text-foreground font-bold text-xs">
                  <KeyRound className="size-4 text-emerald-400" />
                  <span>Curve25519 & XTLS Reality</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {isId
                    ? "Pertukaran kunci Diffie-Hellman Elliptic Curve 256-bit dengan proteksi forward secrecy tanpa risiko kebocoran sertifikat domain publik."
                    : "Elliptic-curve key exchanges delivering perfect forward secrecy and eliminating public domain certificate inspection leaks."}
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Data Subject Rights */}
          <section
            id="section-5"
            className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card space-y-4 shadow-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-mono font-bold shrink-0">
                05
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground">
                {isId
                  ? "Hak Subjek Data Anda (*Data Subject Rights*)"
                  : "Your Rights as a Data Subject (UU PDP & GDPR)"}
              </h2>
            </div>
            <p>
              {isId
                ? "Sesuai Pasal 5 hingga Pasal 13 UU PDP dan Pasal 15 hingga Pasal 20 GDPR, Anda memiliki hak-hak hukum penuh sebagai pemilik data pribadi:"
                : "Under Articles 5 to 13 of UU PDP and Articles 15 to 20 of GDPR, you hold inviolable statutory rights over your personal data:"}
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>{isId ? "Hak Akses & Portabilitas:" : "Right of Access & Data Portability:"}</strong>{" "}
                {isId
                  ? "Hak untuk memperoleh salinan data profil dan riwayat transaksi akun Anda dalam format terstruktur."
                  : "Right to inspect and download your profile data and transaction ledger in machine-readable JSON/CSV format."}
              </li>
              <li>
                <strong>{isId ? "Hak Koreksi Data:" : "Right to Rectification:"}</strong>{" "}
                {isId
                  ? "Hak untuk memperbarui alamat email atau preferensi keamanan langsung melalui dasbor GoVPN."
                  : "Right to update incorrect billing emails or security preferences directly in your dashboard."}
              </li>
              <li>
                <strong>{isId ? "Hak Penghapusan Permanen (Right to be Forgotten):" : "Right to Erasure (Right to be Forgotten):"}</strong>{" "}
                {isId
                  ? "Hak untuk meminta penghapusan total seluruh data akun Anda dari database utama kami kapan saja."
                  : "Right to demand complete and irreversible deletion of your account entity from our primary databases."}
              </li>
            </ul>
          </section>

          {/* Section 6: Cookies */}
          <section
            id="section-6"
            className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card space-y-4 shadow-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-mono font-bold shrink-0">
                06
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground">
                {isId
                  ? "Kebijakan Cookie & Proteksi Cloudflare Turnstile"
                  : "Cookie Policy & Cloudflare Turnstile Verification"}
              </h2>
            </div>
            <p>
              {isId
                ? "GoVPN tidak menggunakan cookie pelacak pihak ketiga untuk keperluan periklanan profiling. Kami hanya menggunakan cookie fungsional penting (seperti preferensi tema 'theme' dan bahasa 'govpn_locale') serta token sesi otentikasi HttpOnly Secure untuk menjaga keamanan login Anda."
                : "GoVPN does not employ tracking cookies for ad profiling. We strictly utilize essential functional cookies (e.g., UI theme preferences, 'govpn_locale' language selector) and HttpOnly Secure auth cookies to safeguard active sessions."}
            </p>
            <p>
              {isId
                ? "Untuk melindungi platform dari serangan botnet dan brute-force login, kami menerapkan Cloudflare Turnstile yang memvalidasi manusia tanpa mengumpulkan informasi pribadi atau riwayat penjelajahan Anda."
                : "To shield the network against distributed bot attacks, we implement Cloudflare Turnstile, verifying human sessions without scraping personal telemetry."}
            </p>
          </section>

          {/* Section 7: DPO Desk */}
          <section
            id="section-7"
            className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card space-y-4 shadow-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-mono font-bold shrink-0">
                07
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground">
                {t("legal.contactDpoTitle")}
              </h2>
            </div>
            <p>{t("legal.contactDpoDesc")}</p>
            <div className="p-5 rounded-xl bg-surface-subtle border border-border/60 text-xs space-y-2">
              <div>
                <strong>Data Protection Officer (DPO Desk):</strong> Hide Group / Hide Digital Security
              </div>
              <div>
                <strong>Official Email:</strong>{" "}
                <a href="mailto:support@hidessh.com" className="text-emerald-400 font-mono hover:underline">
                  support@hidessh.com
                </a>{" "}
                |{" "}
                <a href="mailto:dmaskurniawan56@gmail.com" className="text-emerald-400 font-mono hover:underline">
                  dmaskurniawan56@gmail.com
                </a>
              </div>
              <div>
                <strong>Direct Hotline:</strong> 0877111301818
              </div>
              <div>
                <strong>Operational Address:</strong> Jl. Kampung Baris No.391, Karangturi, Kec. Semarang Tim., Kota Semarang, Jawa Tengah 50124
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

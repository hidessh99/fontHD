# 📋 Rencana Implementasi: Arsitektur Frontend Next.js 16 Enterprise — GoVPN (`fontgovpn`)
**Project:** GoVPN / HideSSH Web Client  
**Target Path:** `G:\WEB2026\fontgovpn`  
**Target Plan File:** `G:\WEB2026\fontgovpn\docs\plan\frontend_nextjs16_implementation_plan.md`  
**API Specification Source:** `G:\WEB2026\postman-govpn` (388 Modern Endpoints / 12 Modul Teruji TDD)  
**Architectural Baseline:** `G:\WEB2026\fontwahide\doc\frontend-architecture-guidelines.md`  
**Design Reference:** `G:\WEB2026\fontend\docs\ENTERPRISE_PRODUCT_DESIGN_BRIEF.md`  
**Design Specification:** `G:\WEB2026\fontgovpn\docs\design.md`  
**Version:** 2.0 (Next.js 16 App Router, React 19, Bun 1.4, Tailwind CSS v4, Turbopack)  

---

## 🎯 1. Tujuan & Ruang Lingkup Arsitektur

1. **Penerapan Strategi Opsi C (Selective Enterprise Extraction):**
   - Mengambil *core foundation engine* yang sudah teruji di `fontwahide` (Next.js 16, React 19, Bun 1.4, Tailwind CSS v4, Zustand 5, Zod 4, TanStack Virtual, Sonner).
   - Mengambil seluruh 26 komponen primitif UI Shadcn/Base UI, Next.js 16 Edge proxy (`src/proxy.ts`), universal Go envelope REST HTTP client (`src/lib/api/http-client.ts`), dan cookie session manager (`src/lib/storage/cookies.ts`).
   - **Membersihkan 100% dead code WhatsApp** dari `fontwahide` (tidak ada residu spintax, kampanye WA, template WA, atau phone validator).
2. **Penyelarasan Penuh dengan Standar Desain `docs/opendesign.md` (Coinbase Institutional System):**
   - **Warna Brand Primer:** Mengadopsi **Coinbase Blue (`#0052ff`)** sebagai aksen tunggal fungsional dengan transisi hover **Light Blue (`#578bfa`)**.
   - **Kanvas & Permukaan Gelap:** Menggunakan **Near-Black (`#0a0b0d`)** sebagai background utama, **Dark Card (`#282b31`)**, dan border halus **`rgba(91, 97, 110, 0.2)`**.
   - **Sistem Tombol Pill 56px:** Seluruh CTA dan tombol aksi utama **WAJIB berbentuk Pill dengan radius 56px (`rounded-full`)**, bebas dari sudut tajam (*sharp corners*).
   - **Tipografi & Spacing:** Heading dengan line-height rapat (`1.00` tight), UI menggunakan sans modern, dan seluruh data teknis (IP, Port, UUID, Config URI, Saldo IDR) wajib menggunakan font **`JetBrains Mono`** (`font-mono`).
3. **Penyelarasan 1:1 dengan 388 Endpoints di `postman-govpn`:**
   - Membangun 12 domain modul bisnis menggunakan **Pola C: Role-Partitioned Module** (`types`, `api`, `hooks`, `components`, `views`) untuk memisahkan hak akses `USER`, `SELLER`, dan `ADMIN`.
   - Menerapkan pola **Thin App Router** di `src/app/` tanpa business logic bloat.
4. **Proteksi Edge & Tanpa FOUC (0ms Zero Flash):**
   - Validasi sesi berbasis cookie `hide-jwt` pada runtime Edge Next.js 16 (`src/proxy.ts`) sebelum HTML dirender.

---

## 🗺️ 2. Pemetaan Modul Domain 1:1 (`postman-govpn` ⟷ `fontgovpn`)

Seluruh 388 modern endpoint dari 12 folder koleksi `postman-govpn` dipetakan secara terstruktur:

| No | Modul Postman | Jumlah Endpoint | Lokasi Modul UI (`fontgovpn`) | Cakupan Fitur Utama |
| :-: | :--- | :-: | :--- | :--- |
| **00** | `00-health` | 4 | `src/modules/monitor/` | Liveness, readiness, system health diagnostics |
| **01** | `01-ai` | 36 | `src/modules/ai/` | AI Gateway, token wallets, provider models, chat |
| **02** | `02-content` | 18 | `src/modules/content/` | CMS blog, knowledge base, maintenance notice, FAQ |
| **03** | `03-dns` | 19 | `src/modules/dns/` | Cloudflare DNS zones, A/CNAME records, auto-pointing |
| **04** | `04-finance` | 58 | `src/modules/finance/` | Invoices, deposit saldo, QRIS Midtrans/Tripay, voucher |
| **05** | `05-iam` | 51 | `src/modules/iam/` | Auth (login, register, 2FA), profiles, RBAC, API keys |
| **06** | `06-kubernetes` | 22 | `src/modules/kubernetes/` | K8s container deploy, pod logs, app restart/renew |
| **07** | `07-monitor` | 9 | `src/modules/monitor/` | Server ping telemetry, node uptime, live server stats |
| **08** | `08-notification` | 10 | `src/modules/notification/` | Telegram webhook alerts, email notices, web push |
| **09** | `09-subscription` | 43 | `src/modules/subscription/` | VPN plans, reseller volume tiers, user quotas |
| **10** | `10-support` | 22 | `src/modules/support/` | Support tickets, CS live assistance, problem reports |
| **11** | `11-vpn` | 96 | `src/modules/vpn/` | SSH, VMess, VLess, Trojan, Shadowsocks, WireGuard |
| **12** | `12-cronjob` | 40 | `src/modules/cronjob/` | Superadmin cron runner, task history, log executions |
| **TOTAL** | **12 Modul** | **388** | **12 Modul Terisolasi** | **100% Endpoint Terpetakan** |

---

## 🏗️ 3. Tahapan Eksekusi Rinci (Phased Implementation Plan)

### Fase 1: Inisialisasi Pondasi & Ekstraksi Engine dari `fontwahide`
- [ ] **1.1 Setup Root Konfigurasi:**
  - Salin `package.json` dari `fontwahide` ke `fontgovpn` dan sesuaikan metadata (`"name": "fontgovpn"`).
  - Salin `bun.lock`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`.
  - Jalankan `bun install` untuk mereproduksi dependency tree secara deterministik.
- [ ] **1.2 Konfigurasi Design Tokens Tailwind v4:**
  - Buat `src/app/globals.css` dengan token warna resmi GoVPN:
    - Primary: `#2563eb` (Cobalt Blue), hover `#1d4ed8`, glow `rgba(37, 99, 235, 0.2)`.
    - Dark Canvas: `#09090b` (Background), `#141417` (Cards), `#18181b` (Surface).
    - Font Family: `Inter` untuk `--font-sans`, `JetBrains Mono` untuk `--font-mono`.
- [ ] **1.3 Instalasi & Download Lengkap Seluruh Komponen Shadcn UI (`src/components/ui/`):**
  - Buat dan konfigurasi `components.json` resmi di root proyek (`style: "base-nova"`, `rsc: true`, `tailwind: globals.css`).
  - Ekstrak 26 komponen primitif yang sudah disempurnakan dari `fontwahide/src/components/ui/`.
  - **Download & lengkapi 100% seluruh katalog komponen Shadcn UI** ke `src/components/ui/` sehingga tidak ada komponen yang kurang saat proses pengerjaan:
    - **Layout & Navigation:** `sidebar.tsx`, `navigation-menu.tsx`, `breadcrumb.tsx`, `menubar.tsx`, `pagination.tsx`, `tabs.tsx`, `separator.tsx`, `scroll-area.tsx`, `resizable.tsx`.
    - **Forms & Inputs:** `form.tsx`, `input.tsx`, `textarea.tsx`, `select.tsx`, `checkbox.tsx`, `radio-group.tsx`, `switch.tsx`, `slider.tsx`, `toggle.tsx`, `toggle-group.tsx`, `label.tsx`, `input-otp.tsx` (wajib untuk 2FA akun), `calendar.tsx`.
    - **Overlays & Modals:** `dialog.tsx`, `alert-dialog.tsx`, `sheet.tsx` (wajib untuk mobile nav & slide-over drawer), `drawer.tsx`, `command.tsx` (wajib untuk global search Cmd+K server/akun), `popover.tsx`, `hover-card.tsx`, `context-menu.tsx`, `dropdown-menu.tsx`, `tooltip.tsx`.
    - **Data Display & Status:** `table.tsx`, `data-table-column-header.tsx`, `card.tsx`, `accordion.tsx`, `collapsible.tsx`, `avatar.tsx` (avatar user & bendera server), `badge.tsx`, `progress.tsx`, `skeleton.tsx`, `spinner.tsx`, `empty.tsx`, `chart.tsx`.
    - **Feedback & Toasts:** `alert.tsx`, `sonner.tsx`.
  - Pastikan seluruh dependencies pembantu terpasang (`@radix-ui/*` / `@base-ui/react`, `cmdk`, `input-otp`, `embla-carousel-react`, `recharts`).
- [ ] **1.4 Setup Edge Security & Core Libs:**
  - Buat `src/proxy.ts` (Next.js 16 Edge runtime guard) dengan verifikasi cookie `hide-jwt` dan proteksi rute `/dashboard/*`, `/vpn/*`, `/billing/*`, `/admin/*`.
  - Buat `src/lib/storage/cookies.ts` untuk manipulasi cookie `hide-jwt` (Strict SameSite, instant purge 1970).
  - Buat `src/lib/api/http-client.ts` yang mendukung Universal Go Envelope decoding, in-flight deduplication, auto-retry, dan idempotency key.
  - Buat `src/lib/utils.ts` (`cn()` helper).
  - Buat `src/app/providers.tsx` (`ThemeProvider` dari `next-themes`, `Toaster` dari `sonner`).

---

### Fase 2: Layout Shell & Komponen Spesifik Domain VPN
- [ ] **2.1 Shell Navigasi Enterprise (`src/components/layout/`):**
  - `DashboardSidebar.tsx`: Navigasi modular responsif (Overview, VPN Protocols, Servers, Billing, DNS, AI, K8s, Support, Settings).
  - `DashboardHeader.tsx`: Breadcrumbs dinamis, indikator saldo wallet user, notifikasi bell, dark mode toggle, user dropdown.
  - `AdminSidebar.tsx`: Navigasi khusus Superadmin (Server CRUD, User Management, Finance Ledger, Cronjobs).
  - `PublicNavbar.tsx` & `PublicFooter.tsx`: Layout halaman publik (Landing hero, server status publik, pricing).
- [ ] **2.2 Komponen Spesial Domain VPN (`src/components/shared/`):**
  - `CopyButton.tsx`: Tombol 1-klik salin konfigurasi VPN dengan animasi checklist hijau dan toast Sonner.
  - `QrCodeModal.tsx`: Modal popup render QR Code untuk URI `vmess://`, `vless://`, `trojan://` agar mudah discan via smartphone (v2rayNG, Clash, Shadowrocket).
  - `ServerPingBadge.tsx`: Visual badge latensi server (Hijau `<100ms`, Kuning `100-250ms`, Merah `>250ms`).
  - `ProtocolBadge.tsx`: Badge visual protokol (SSH biru, VMess ungu, VLess cyan, Trojan merah, WireGuard oranye).
  - `EmptyState.tsx`: State visual kosong berstandar enterprise.

---

### Fase 3: Implementasi Modul Prioritas Tinggi (Pola C: Role-Partitioned Module)

Setiap modul di bawah ini menerapkan struktur **Pola C** dengan pembagian: `api/` (`user.api.ts`, `seller.api.ts`, `admin.api.ts`), `components/` (`shared/`, `user/`, `seller/`, `admin/`), `hooks/`, `types/`, dan `views/` (`user/`, `seller/`, `admin/`).

#### Modul 1: IAM (Identity & Access Management) — `src/modules/iam/`
- [x] `types/`: `iam.types.ts`, `user.types.ts`, `admin.types.ts`.
- [x] `api/`: `iam.api.ts` (Login, Register, Profile, Admin User Management).
- [x] `hooks/`: `useAuth.ts` (Zustand session store, cookie sync `hide-jwt`, role-based access).
- [x] `components/`: `LoginForm.tsx`, `RegisterForm.tsx`, Profile Settings.
- [x] `views/`: `LoginView.tsx`, `RegisterView.tsx`.
- [x] `src/app/(auth)/`: Halaman tipis login, register, forgot-password.

#### Modul 2: VPN (Core Tunneling Engine) — `src/modules/vpn/` (Pola C)
- [x] `types/`: `vpn.types.ts` (Core Entity), `user.types.ts`, `seller.types.ts`, `admin.types.ts`.
- [x] `api/`: `user.api.ts`, `seller.api.ts`, `admin.api.ts`, `index.ts`.
- [x] `hooks/`: `useVpnAccounts.ts`, `useVpnServers.ts`, `useSellerVpn.ts`.
- [x] `components/`:
  - `shared/`: `ProtocolBadge.tsx`, `ServerPingBadge.tsx`, `CopyCredentialsButton.tsx`, `QrCodeModal.tsx`.
  - `user/`: `VpnAccountCard.tsx`, `ServerNodeCard.tsx`, `CreateVpnModal.tsx`.
  - `seller/`: `BulkAccountMintModal.tsx`, `SellerQuotaProgress.tsx`, `SubTenantVpnTable.tsx`.
  - `admin/`: `ServerNodeFormModal.tsx`, `NodePortConfigSheet.tsx`.
- [x] `views/`: `user/VpnProtocolView.tsx`, `user/ServersView.tsx`, `seller/SellerVpnOverviewView.tsx`, `admin/AdminServersView.tsx`.
- [x] `src/app/(dashboard)/vpn/[protocol]/page.tsx`: Thin router rendering `VpnProtocolView`.
- [x] `src/app/(dashboard)/seller/vpn/page.tsx`: Thin router rendering `SellerVpnOverviewView`.

#### Modul 3: Finance & Billing — `src/modules/finance/` (Pola C)
- [x] `types/`: `finance.types.ts` (`Invoice`, `BillingRecord`, `WalletBalance`, `Withdrawal`).
- [x] `api/`: `finance.api.ts` (User Invoices, Seller Withdrawal, Admin Ledger Audit).
- [x] `hooks/`: `useBilling.ts` (Auto-poll 3 detik QRIS, topup, voucher validation).
- [x] `components/`: `InvoiceTable.tsx`, `QrisPaymentCard.tsx`, `TopupModal.tsx`, `BalanceWidget.tsx`.
- [x] `views/`: `BillingInvoicesView.tsx`, `DepositView.tsx`.
- [x] `src/app/(dashboard)/billing/`: Thin router halaman invoice dan deposit QRIS.

#### Modul 4: Server Monitoring & Telemetri — `src/modules/monitor/`
- [x] `types/`: `monitor.types.ts` (`ServerTelemetry`, `PingMetric`, `SystemHealth`).
- [x] `api/`: `monitor.api.ts` (`/api/monitor`, `/health`).
- [x] `hooks/`: `useServerTelemetry.ts` (Live 10s telemetry polling, CPU/RAM/IO load).
- [x] `components/`: `ServerHealthGrid.tsx`, `LatencyChart.tsx`.
- [x] `views/`: `ServersMonitorView.tsx`.
- [x] `src/app/(dashboard)/monitor/page.tsx`: Thin router status telemetri server.

---

### Fase 4: Implementasi Modul Lanjutan & Ekosistem Pendukung (Pola C)
- [x] **Modul DNS (`src/modules/dns/`):** Cloudflare zones, CRUD DNS records (`A`, `CNAME`, `TXT`), auto-pointing host VPN, proxy toggle.
- [ ] **Modul AI Gateway (`src/modules/ai/`):** Model catalog, token wallet, chat completions playground, API keys management.
- [ ] **Modul Kubernetes (`src/modules/kubernetes/`):** Deploy container template micro-apps, view live pod logs, restart/renew pods.
- [ ] **Modul Subscription (`src/modules/subscription/`):** Matriks harga paket VPN, alokasi kuota reseller, checkout upgrade paket.
- [ ] **Modul Support (`src/modules/support/`):** Tiket bantuan CS, live thread replies, upload file lampiran.
- [ ] **Modul Content (`src/modules/content/`):** Panduan setup VPN per OS (Windows, Android, iOS, Linux, OpenWrt).
- [ ] **Modul Notification (`src/modules/notification/`):** Konfigurasi webhook Telegram bot untuk notifikasi akun hampir habis (<3 hari).
- [ ] **Modul Cronjob & Admin (`src/modules/cronjob/` & `src/modules/admin/`):** Portal superadmin untuk monitor 40 tugas cron otomatis dan eksekusi manual via header `X-Cron-Key`.

---

### Fase 5: Optimasi Performa, Virtualisasi & Rekayasa Responsif Mobile-Desktop (Modern Web Guidance)

Berdasarkan pedoman resmi `modern-web-guidance`, seluruh halaman dan komponen wajib memenuhi standar responsif mobile-desktop anti-slop berikut:

- [ ] **5.1 Dynamic Viewport Units (`dvh` & `dvw`):**
  - Menggantikan seluruh penggunaan `100vh` atau `100vw` yang memicu horizontal scrollbar atau lonjakan tampilan saat browser bar ponsel muncul/hilang. Gunakan `min-h-dvh` dan `w-full` / `max-w-full`.
- [ ] **5.2 Container Queries (`@container`) untuk Komponen Modular:**
  - Menerapkan `container-type: inline-size` pada wrapper kartu VPN, node server, dan widget finansial agar komponen dapat secara mandiri berganti dari tampilan stacked (mobile/sidebar) ke side-by-side (desktop) berdasarkan lebar kontainer elemennya sendiri, bukan hanya lebar layar global.
- [ ] **5.3 Ergonomi Sentuh Ponsel (Mobile Touch Targets $\ge 44\text{px}$):**
  - Memastikan seluruh tombol aksi, input form, icon button, dan switch di perangkat mobile memiliki area sentuh minimal $44\times 44\text{px}$ (`min-h-11`, `min-w-11` atau `p-3`) untuk mencegah salah sentuh (*misclicks*).
- [ ] **5.4 Adaptive Overlay: Dialog Desktop vs Drawer/Bottom Sheet Mobile:**
  - Menggunakan dialog mengambang di layar desktop ($\ge 768\text{px}$), namun bertransisi otomatis menjadi swipeable bottom sheet (`Drawer` via Vaul / `Sheet`) di layar smartphone ($< 768\text{px}$) agar jempol pengguna mudah menjangkau tombol konfirmasi.
- [ ] **5.5 Stabilitas Scroll & Eliminasi Layout Shift (CLS = 0):**
  - Menerapkan `scrollbar-gutter: stable` pada daftar data dan kontainer tabel agar kemunculan scrollbar tidak menyebabkan geseran layout (*layout shift*).
  - Menerapkan `overscroll-behavior: contain` pada modal, drawer, dan tabel agar scroll pada elemen melayang tidak merambat ke halaman induk.
- [ ] **5.6 Virtualisasi Tabel Skala Besar (`@tanstack/react-virtual`):**
  - Terapkan virtual scrolling pada tabel riwayat akun VPN dan log koneksi server untuk memastikan render stabil pada 60 FPS tanpa memory leak di smartphone maupun PC.
- [ ] **5.7 Internasionalisasi (i18n):**
  - Pastikan seluruh string UI terdaftar simetris pada `src/locales/id/` (Bahasa Indonesia) dan `src/locales/en/` (English).
- [ ] **5.8 Static Quality & Anti-Slop Audit:**
  - Eksekusi pengecekan TypeScript: `bun x tsc --noEmit` untuk memastikan 100% type-safety tanpa compile errors.
  - Verifikasi seluruh rute di `src/proxy.ts` bebas dari celah kebocoran rute privat.

---

## ⚠️ 4. Aturan Wajib & Larangan Keras AI (AI Hard Rules)

1. **DILARANG KERAS menjalankan `bun run build` atau `next build`** di terminal selama sesi coding! Verifikasi wajib menggunakan static check (`bun x tsc --noEmit`) atau scratch audit script.
2. **Wajib `"use client";`** pada baris pertama di setiap komponen yang menggunakan React hooks (`useState`, `useEffect`, `useRouter`, event handler).
3. **Dilarang memakai `overflow-hidden`** pada pembungkus Card yang memuat dropdown / selector protokol VPN (gunakan `overflow-visible relative z-20`).
4. **Wajib font `JetBrains Mono`** (`font-mono`) untuk seluruh data teknis: IP Address, Port, UUID, Config URI, dan Keys.
5. **Dilarang meng-hardcode teks UI** langsung di JSX (selalu gunakan `t("namespace.key")`).
6. **Wajib Tombol Pill 56px (`rounded-full`) untuk CTA Utama:** Sesuai `opendesign.md`, seluruh tombol aksi utama (Buat Akun, Bayar QRIS, Simpan) wajib berbentuk Pill halus tanpa sudut tajam (*56px radius minimum*).
7. **Wajib Token Semantik Coinbase System (`#0052ff`):** Seluruh styling warna wajib melalui CSS variables (`bg-primary`, `bg-card`, `border-border`, `text-muted-foreground`) tanpa hardcoded hex sembarangan di JSX.
8. **Wajib Pola C (Role Partitioning):** Setiap modul memisahkan hak akses `user/`, `seller/`, `admin/` dengan fondasi atomik di `shared/`.

---

## 🏁 5. Kriteria Keberhasilan (Definition of Done)

1. [x] Dokumen arsitektur resmi [`G:\WEB2026\fontgovpn\docs\design.md`](file:///G:/WEB2026/fontgovpn/docs/design.md) telah disahkan.
2. [x] Dokumen rencana implementasi [`G:\WEB2026\fontgovpn\docs\plan\frontend_nextjs16_implementation_plan.md`](file:///G:/WEB2026/fontgovpn/docs/plan/frontend_nextjs16_implementation_plan.md) telah terdokumentasi rapi di folder target.
3. [ ] Repositori `fontgovpn` memiliki struktur project yang bersih tanpa dead code WhatsApp.
4. [ ] Seluruh DTO form dan query terhubung dengan 388 endpoints di `postman-govpn`.
5. [ ] Server Next.js 16 berjalan lancar dengan Turbopack (`bun run dev`) di Windows environment.

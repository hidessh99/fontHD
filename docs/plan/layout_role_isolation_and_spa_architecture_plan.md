# 📋 Rencana Arsitektur Enterprise: Isolasi Layout Multi-Role & Penguatan SPA Engine Next.js 16

- **Project:** GoVPN Institutional Web Client (`fontgovpn`)
- **Target File:** `G:\WEB2026\fontgovpn\docs\plan\layout_role_isolation_and_spa_architecture_plan.md`
- **Architect Reference:** Next.js 16 App Router (React 19, Turbopack, Tailwind CSS, shadcn/ui)
- **Design System Reference:** Coinbase Institutional High-Trust Tokens (`docs/opendesign.md`)
- **Backend Route Catalog:** `G:\WEB2026\backendv2\docs\api_routes_catalog.md` (388 Endpoints)

---

## 🎯 1. Latar Belakang & Analisis Gap Arsitektural

### 1.1 Kondisi Saat Ini (Current State)

Berdasarkan audit mendalam pada direktori `src/app/` dan `src/components/layout/`:

1. **Navigasi SPA**: Seluruh modul telah mengimplementasikan **Algoritma 4 (Dynamic Island Route Splitting)** dengan `next/dynamic` dan `<Suspense fallback={<Skeleton />}>` sehingga transisi rute telah berjalan 100% di sisi klien tanpa full page reload (F5).
2. **Pemisahan User vs Public**:
   - Public: `src/app/(public)/layout.tsx` terisolasi dengan `PublicNavbar` dan `PublicFooter`.
   - User: `src/app/(dashboard)/layout.tsx` menggunakan `DashboardSidebar` dan `DashboardHeader`.
3. **GAP ARSITEKTURAL 1 — Modul Seller (Reseller / Partner) Belum Terisolasi**:
   - Rute seller saat ini berada di `src/app/(dashboard)/seller/*` (`/seller/vpn`, `/seller/subscription`, `/seller/withdrawal`).
   - Karena berada di dalam route group `(dashboard)`, rute seller **terpaksa mewarisi sidebar dan header milik User biasa** (`DashboardSidebar` & `DashboardHeader`).
   - Akibatnya: Pengguna dengan peran Reseller disuguhkan navigasi member umum ("Overview", "VPN Protocols"), padahal domain Seller memerlukan UI khusus: _Ringkasan Komisi, Kuota Minting Akun VPN, Daftar Pelanggan White-Label, dan Pencairan Komisi (Withdrawal)_.
4. **GAP ARSITEKTURAL 2 — Admin Portal Belum Memiliki Header & Navigasi Belum Lengkap**:
   - `src/app/admin/layout.tsx` belum memiliki `AdminHeader.tsx` terdedikasi (tidak ada breadcrumb admin, indikator status root engine, quick alerts, profil admin, dan theme toggle).
   - `AdminSidebar.tsx` saat ini hanya mendaftarkan 7 rute lama dan **belum mencakup 7 modul admin modern** yang telah dibangun (`/admin/dns`, `/admin/ai`, `/admin/kubernetes`, `/admin/subscription`, `/admin/support`, `/admin/notifications`, `/admin/content`).

---

## 🏛️ 2. Blueprint Target Arsitektur Layout Multi-Role

Arsitektur layout akan dibagi menjadi **4 domain fisik independen**, masing-masing dengan Guard, Sidebar, Header, dan tema visual yang berbeda sesuai _Coinbase Institutional High-Trust Design System_:

```
src/app/
├── (public)/layout.tsx        --> [PUBLIC] Landing page, Docs, Auth Gateway
├── (dashboard)/layout.tsx     --> [USER] Konsol Tunneling Pribadi & Billing Member
├── seller/layout.tsx          --> [SELLER] Portal Reseller, White-Label Tenant & Komisi
└── admin/layout.tsx           --> [ADMIN] Superadmin Root Console & Fleet Engine
```

### 2.1 Matriks Peran & Karakteristik Visual Shell

| Domain     | Route Prefix                                                                           | Accent Token                     | Route Guard        | Sidebar                | Header                |
| ---------- | -------------------------------------------------------------------------------------- | -------------------------------- | ------------------ | ---------------------- | --------------------- |
| **Public** | `/`, `/login`, `/articles`                                                             | Neutral / Blue (`#0052ff`)       | None (Public)      | N/A (Top Nav)          | `PublicNavbar.tsx`    |
| **User**   | `/dashboard`, `/vpn`, `/billing`, `/ai`, `/subscription`, `/support`, `/notifications` | Coinbase Blue (`#0052ff`)        | `MemberRouteGuard` | `DashboardSidebar.tsx` | `DashboardHeader.tsx` |
| **Seller** | `/seller/dashboard`, `/seller/vpn`, `/seller/subscription`, `/seller/withdrawal`       | Amber / Partner Gold (`#f59e0b`) | `SellerRouteGuard` | `SellerSidebar.tsx`    | `SellerHeader.tsx`    |
| **Admin**  | `/admin/*` (Seluruh 11 modul admin)                                                    | Rose / Root Red (`#f43f5e`)      | `AdminRouteGuard`  | `AdminSidebar.tsx`     | `AdminHeader.tsx`     |

---

## 🚀 3. Rencana Eksekusi Bertahap (Phased Execution)

### Fase 1: Pemisahan Fisik Rute Seller (`src/app/seller`)

1. **Memindahkan Rute Seller ke Root App Router**:
   - Pindahkan `src/app/(dashboard)/seller/` $\rightarrow$ `src/app/seller/`.
   - URL rute tetap identik dan backward-compatible:
     - `/seller/vpn` (Bulk minting & kuota server reseller)
     - `/seller/subscription` (Manajemen langganan pelanggan tenant)
     - `/seller/withdrawal` (Permintaan pencairan komisi reseller)
   - Tambahkan halaman ringkasan: `src/app/seller/page.tsx` (Redirect atau Reseller Executive Overview).

### Fase 2: Pembangunan Komponen Shell Seller Terdedikasi

1. **`src/components/layout/shared/SellerRouteGuard.tsx`**:
   - Validasi sesi cookie `hide-jwt` dan verifikasi payload role (`role === 'SELLER' || role === 'ADMIN' || role === 'SUPERADMIN'`).
   - Redirect pengguna reguler (`USER`) kembali ke `/dashboard` dengan notifikasi toast informatif jika mencoba mengakses portal reseller.
2. **`src/components/layout/SellerSidebar.tsx`**:
   - Header Brand: "GoVPN Partner Portal" dengan badge aksen Amber `GOLD / PLATINUM PARTNER`.
   - Navigasi Inti Reseller:
     - **Partner Overview** (`/seller/vpn` / `/seller`)
     - **Provisi VPN & Minting** (`/seller/vpn`)
     - **Langganan Pelanggan** (`/seller/subscription`)
     - **Penarikan Komisi (Payout)** (`/seller/withdrawal`)
   - Footer Switcher: Tombol cepat _"Kembali ke Console Member"_ (`/dashboard`).
3. **`src/components/layout/SellerHeader.tsx`**:
   - Indikator saldo komisi reseller aktif (`Rp XXX.XXX`).
   - Quick CTA: _"Tarik Komisi"_ langsung membuka dialog penarikan.
   - Breadcrumb dinamis (`Partner / Subscriptions`).
   - Notification bell & Theme switcher.
4. **`src/app/seller/layout.tsx`**:
   - Menggabungkan `SellerRouteGuard`, `SellerSidebar`, `SellerHeader`, dan area `<main>` dengan scroll container terisolasi.

### Fase 3: Penyempurnaan Shell Superadmin (`src/app/admin`)

1. **`src/components/layout/AdminHeader.tsx`**:
   - Brand Superadmin Root Indicator dengan pulse status hijau (All Systems Operational).
   - Breadcrumbs hirarkis admin (`Superadmin / Kubernetes / Pods`).
   - Quick search command palette (`⌘K`).
   - Profil Superadmin & Theme toggle.
2. **Refaktor `src/components/layout/AdminSidebar.tsx`**:
   - Mengorganisasi seluruh **11 Modul Admin** ke dalam 4 kelompok logis:
     - **Core Infrastructure**:
       - Server Node Fleet (`/admin/servers`)
       - Kubernetes Cluster (`/admin/kubernetes` / `/admin/k8s`)
       - System Health & Telemetry (`/admin/monitor`)
       - Cronjob Tasks (`/admin/cron`)
     - **Security & Network**:
       - IAM & User Roles (`/admin/users`)
       - DNS Cloudflare Zones (`/admin/dns`)
       - AI Gateway Engine (`/admin/ai`)
     - **Finance & Operations**:
       - Finansial Ledger & Gateway (`/admin/finance`)
       - Paket & Subscriptions (`/admin/subscription`)
       - Helpdesk & Support (`/admin/support`)
     - **Communications & Content**:
       - Antrean Siaran & Queue (`/admin/notifications`)
       - Artikel & Config Sistem (`/admin/content` / `/admin/settings`)
   - Tombol switch: _"Kembali ke Console Member"_ (`/dashboard`).
3. **Penyempurnaan `src/app/admin/layout.tsx`**:
   - Memasukkan `AdminHeader` ke dalam shell admin agar sejajar dan konsisten dengan User dan Seller layout.

### Fase 4: Sinkronisasi Navigasi User Shell (`src/components/layout/DashboardSidebar.tsx`)

1. Pastikan seluruh tautan modul baru terdaftar di sidebar pengguna:
   - Overview (`/dashboard`)
   - VPN Protocols (`/vpn`)
   - Server Nodes (`/servers`)
   - Billing & Saldo (`/billing`)
   - DNS Cloudflare (`/dns`)
   - AI Gateway (`/ai`)
   - Kubernetes Apps (`/kubernetes`)
   - Paket Langganan (`/subscription`)
   - Bantuan & CS (`/support`)
   - Notifikasi (`/notifications`)
   - Pusat Pengetahuan (`/articles`)
2. Tambahkan switcher kondisional: Jika akun memiliki role `SELLER` atau `ADMIN`, tampilkan tombol switch _"Buka Portal Partner / Reseller"_ atau _"Buka Superadmin Console"_.

---

## 🛡️ 4. Integritas SPA & Pengujian Bebas Bug

1. **Zero Full-Page Reload Verification**:
   - Navigasi antar rute di dalam User, Seller, maupun Admin dipastikan tidak memicu pemuatan ulang dokumen (F5).
   - Switch antar-portal (`/dashboard` $\rightleftharpoons$ `/seller` $\rightleftharpoons$ `/admin`) berjalan instan via Next.js client router.
2. **Zero Layout Shift ($\text{CLS} = 0$)**:
   - Setiap layout shell menyematkan kerangka layout (`flex h-screen overflow-hidden`) yang identik agar transisi tidak menyebabkan pergeseran layout viewport.
3. **TypeScript Strict Type Check**:
   - Verifikasi penuh dengan `bun x tsc --noEmit` untuk memastikan 0 error tipe atau broken import.

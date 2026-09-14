# 🛡️ GoVPN (HideSSH) Enterprise Frontend Architecture & Design System Specification
**Project:** GoVPN / HideSSH Web Client  
**Target Path:** `G:\WEB2026\fontgovpn`  
**API Specification Source:** `G:\WEB2026\postman-govpn` (388 Modern Endpoints / 12 Modules)  
**Architectural Baseline:** `G:\WEB2026\fontwahide\doc\frontend-architecture-guidelines.md`  
**Design & Domain Identity Reference:** `G:\WEB2026\fontend\docs\ENTERPRISE_PRODUCT_DESIGN_BRIEF.md`  
**Version:** 2.0 (Next.js 16 App Router, React 19, Bun 1.4, Tailwind CSS v4, Turbopack)  

---

## 📑 Daftar Isi
1. [Ringkasan Eksekutif & Filosofi Desain](#1-ringkasan-eksekutif--filosofi-desain)
2. [Keputusan Arsitektur: Rebuild vs Fork vs Selective Extraction](#2-keputusan-arsitektur-rebuild-vs-fork-vs-selective-extraction)
3. [Tech Stack & Runtime Specifications](#3-tech-stack--runtime-specifications)
4. [Design System & Design Tokens (Tailwind v4)](#4-design-system--design-tokens-tailwind-v4)
5. [Arsitektur Direktori & Struktur Folder](#5-arsitektur-direktori--struktur-folder)
6. [Pola Arsitektur 5-Lapisan Domain (5-Layer Modular Monolith)](#6-pola-arsitektur-5-lapisan-domain-5-layer-modular-monolith)
7. [Thin App Router Pattern & Routing Blueprint](#7-thin-app-router-pattern--routing-blueprint)
8. [Edge Security, Zero-Trust Proxy & Auth Architecture](#8-edge-security-zero-trust-proxy--auth-architecture)
9. [Standard REST API Client & Go Backend Envelope Decoding](#9-standard-rest-api-client--go-backend-envelope-decoding)
10. [Pemetaan 12 Modul Domain (388 Endpoints Postman)](#10-pemetaan-12-modul-domain-388-endpoints-postman)
11. [Performa Tinggi, Virtualisasi DOM & Real-Time Streaming](#11-performa-tinggi-virtualisasi-dom--real-time-streaming)
12. [Aturan Wajib & Larangan Keras AI (AI Hard Rules)](#12-aturan-wajib--larangan-keras-ai-ai-hard-rules)

---

## 1. Ringkasan Eksekutif & Filosofi Desain

Aplikasi **GoVPN (HideSSH)** adalah antarmuka web enterprise untuk platform penyedia infrastruktur jaringan tunneling multi-protokol (SSH, VMess, VLess, Trojan, Shadowsocks, WireGuard), manajemen DNS Cloudflare, orkestrasi container Kubernetes, integrasi AI Gateway, dan sistem billing multi-tenant.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 3 HUKUM UTAMA DESAIN GOVPN (CYBER-TACTICAL ELEGANCE):                                 │
│ 1. Zero Cognitive Friction in Tunneling:                                              │
│    Konfigurasi VPN (.ovpn, VMess JSON, VLess/Trojan URI, WireGuard conf, SSH)         │
│    WAJIB dapat disalin dalam SATU KALI KLIK (1-Click Copy) dari viewport mana pun.    │
│ 2. High-Contrast Technical Clarity & Precision Typography:                            │
│    UI umum memakai 'Inter', sedangkan data teknis (IP, Port, UUID, Hash, Host, Script)│
│    WAJIB menggunakan font 'JetBrains Mono' tabular numeric.                            │
│ 3. Resilient Statefulness & Zero Layout Shift (0ms CLS):                              │
│    Setiap operasi async (telemetri server, mutasi saldo, generate akun) memiliki      │
│    5 status kanonikal: Empty, Loading, Error, Success, dan Offline.                    │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Keputusan Arsitektur: Rebuild vs Fork vs Selective Extraction

Berdasarkan audit mendalam terhadap:
- `G:\WEB2026\postman-govpn` (388 modern endpoints teruji TDD 100%)
- `G:\WEB2026\fontwahide` (Next.js 16 + React 19 + Tailwind v4 + Bun)
- `G:\WEB2026\fontend` (Nuxt 3 / Vue 3 legacy code)

### Analisis 3 Opsi Utama:

| Metrik Evaluasi | Opsi A: Buat Ulang dari Nol (Scratch) | Opsi B: Fork/Salin Penuh `fontwahide` | Opsi C: Selective Enterprise Extraction (Rekomendasi CTO) |
| :--- | :--- | :--- | :--- |
| **Kecepatan Setup (TTM)** | ⚠️ Sangat Lambat (2–4 Minggu) | ⚡ Instan (1 Hari) | 🚀 Cepat & Terukur (1–2 Hari) |
| **Kualitas Pondasi (Foundation)** | Rentan bug baru (FOUC, SSR cookie mismatch) | ✅ Sangat Matang | ✅ Sangat Matang (Teruji di Wahide) |
| **Technical Debt & Dead Code** | Rendah | ❌ Ekstrem (Tercampur kode WhatsApp) | 🟢 Nol (Clean Domain) |
| **Kesesuaian Desain Merek** | Perlu dibuat manual | Perlu diganti dari Wise Green | Dikonfigurasi langsung ke Cobalt Blue |
| **Kesesuaian Kontrak Backend** | Perlu dibuat dari awal | Menggunakan envelope Go yang sama | Langsung sinkron dengan `backendv2` |

> [!IMPORTANT]
> **Keputusan Resmi (CTO Verdict): Gunakan Opsi C (Selective Enterprise Extraction).**  
> - **Jangan Fork Blindly:** `fontwahide` memiliki 15 modul WhatsApp (spintax, pairing QR WhatsApp, kontak, form dinamis) yang sama sekali tidak relevan dengan VPN. Menyalin utuh akan mencemari codebase dengan dead code dan membingungkan developer.  
> - **Jangan Buat dari Nol:** Mengonfigurasi ulang Next.js 16 Edge proxy, Tailwind v4 tokens, 26 komponen Shadcn, HTTP client dengan auto-refresh cookie, dan Sonner toast akan membuang waktu dan berisiko memunculkan bug edge-cases.  
> - **Posisi `fontend` (Vue 3/Nuxt 3):** `fontend` TIDAK BISA disalin ke Next.js karena perbedaan framework. Namun, `fontend` adalah **acuan bisnis & UI/UX terbaik** (daftar form protokol, logika parameter VPN, dan design token di `fontend/docs/ENTERPRISE_PRODUCT_DESIGN_BRIEF.md`).

---

## 3. Tech Stack & Runtime Specifications

| Komponen | Spesifikasi & Versi | Peran & Rationale |
| :--- | :--- | :--- |
| **Runtime Engine** | **Bun** `bun@1.4.0` | Eksekutor ultra-cepat, instalasi paket deterministik via `bun.lock`. |
| **Web Framework** | **Next.js 16** (`16.3.3`) | App Router, Server Actions, Streaming SSR, Turbopack engine (`--turbopack`). |
| **Core UI Library** | **React 19** (`19.2.8`) | React Server Components (RSC) by default, Leaf Client Components (`"use client"`). |
| **Styling Engine** | **Tailwind CSS v4** (`@tailwindcss/postcss@^4`) | CSS Variables, `@theme inline`, zero config overhead, instant build. |
| **Theme System** | **next-themes** (`^0.4.6`) | Dark mode by default (`class="dark"`), zero flash flicker. |
| **UI Primitives** | **Base UI** (`@base-ui/react`) & **shadcn/ui** | Headless, accessible dialogs, dropdowns, tabs, sheets, popovers. |
| **Iconography** | **lucide-react** (`^1.37.0`) | Konsisten, tree-shaken, ukuran standar (`size-3.5`, `size-4`, `size-5`). |
| **State Management** | **Zustand 5** (`^5.0.15`) | Session store, cart/order store, UI ephemeral state. |
| **Data Fetching** | **Custom HTTP Client** + TanStack Patterns | In-flight deduplication, auto-retry exponential backoff, cookie auth. |
| **Virtualization** | **@tanstack/react-virtual** (`^3.14.10`) | Render tabel 10.000+ baris akun/log VPN dengan performa 60 FPS. |
| **Schema Validation** | **Zod 4** (`zod@^4.5.4`) | Sinkronisasi kontrak DTO backend Go & validasi form input. |
| **Notifications** | **Sonner** (`sonner@^2.0.8`) | Toast interaktif toast.success, toast.error, toast.promise. |
| **Anti-Bot / Security** | **@marsidev/react-turnstile** (`^1.6.1`) | Cloudflare Turnstile CAPTCHA untuk registrasi, login, dan order VPN. |

---

## 4. Design System & Design Tokens (Tailwind v4)

GoVPN mengusung identitas visual **Cyber-Tactical Elegance & High-Assurance Infrastructure** yang diadaptasi dari `fontend/docs/ENTERPRISE_PRODUCT_DESIGN_BRIEF.md`.

### A. Palet Warna Utama (Cobalt Tactical Palette)

```css
/* src/app/globals.css */
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-surface: var(--surface);
  --color-surface-subtle: var(--surface-subtle);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);

  /* Brand Tactical Cobalt Colors */
  --color-primary: #2563eb;          /* Cobalt Blue CTA & Active Items */
  --color-primary-hover: #1d4ed8;    /* Deep Cobalt Hover */
  --color-primary-glow: rgba(37, 99, 235, 0.2);
  --color-primary-foreground: #ffffff;

  /* Neutrals & Surfaces */
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: #2563eb;

  /* Status Semantics */
  --color-success: #10b981;          /* Active VPN, Online Server, Paid Invoice */
  --color-warning: #f59e0b;          /* Expiring Soon (<3 Days), Pending Topup */
  --color-destructive: #ef4444;      /* Expired Account, Node Offline, Failed */
  --color-info: #06b6d4;             /* System Notices, Cloudflare Telemetry */

  /* Typography Fonts */
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;

  /* Radius Scale */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-pill: 9999px;
}

/* Dark Mode (Default Canvas) */
:root, .dark {
  --background: #09090b;             /* Zinc 950 Deep Canvas */
  --foreground: #f8fafc;             /* Slate 50 Crisp High-Contrast */
  --surface: #121215;                /* Elevated Canvas */
  --surface-subtle: #18181b;         /* Zinc 900 */
  --card: #141417;                   /* Card Background */
  --card-foreground: #f8fafc;
  --popover: #141417;
  --popover-foreground: #f8fafc;
  --border: rgba(255, 255, 255, 0.08);
  --input: rgba(255, 255, 255, 0.12);
  --muted: #1f1f23;
  --muted-foreground: #a1a1aa;
}

/* Light Mode Support */
.light {
  --background: #f8fafc;
  --foreground: #0f172a;
  --surface: #ffffff;
  --surface-subtle: #f1f5f9;
  --card: #ffffff;
  --card-foreground: #0f172a;
  --popover: #ffffff;
  --popover-foreground: #0f172a;
  --border: #e2e8f0;
  --input: #cbd5e1;
  --muted: #f1f5f9;
  --muted-foreground: #64748b;
}
```

### B. Aturan Tipografi
- **UI & Navigasi:** Font `'Inter'` dengan modular major third scale.
- **Data Teknis:** Font `'JetBrains Mono'` (`font-mono`) untuk IP Address, Port, UUID VMess, Trojan Password, Public Key WireGuard, Cron Syntax, dan Base64 payloads.

---

## 5. Arsitektur Direktori & Struktur Folder

Struktur folder `fontgovpn` mengadopsi prinsip **Domain-Driven Modular Monolith**:

```
fontgovpn/
├── docs/                               # Dokumentasi arsitektur & panduan sistem
│   ├── design.md                       # Spesifikasi arsitektur ini (SSOT)
│   └── plan/                           # Rencana implementasi teknis per modul
├── public/                             # Aset statis publik (logo, favicon, protocol icons)
│   ├── icons/protocols/                # SSH, VMess, VLess, Trojan, WireGuard SVG
│   └── branding/                       # Logo HideSSH / GoVPN
└── src/
    ├── app/                            # Thin Next.js 16 App Router (Rute & Layout)
    │   ├── (auth)/                     # Rute Autentikasi Publik
    │   │   ├── login/page.tsx
    │   │   ├── register/page.tsx
    │   │   ├── forgot-password/page.tsx
    │   │   └── reset-password/page.tsx
    │   ├── (dashboard)/                # Member & Client Portal
    │   │   ├── dashboard/page.tsx      # Overview, kuota aktif, saldo, ringkasan
    │   │   ├── vpn/                    # VPN Protocol Clients & Management
    │   │   │   ├── [protocol]/page.tsx # ssh, vmess, vless, trojan, shadowsocks, wireguard
    │   │   │   └── create/page.tsx     # Order / Create VPN Account Wizard
    │   │   ├── servers/page.tsx        # Server Status & Realtime Ping Latency
    │   │   ├── billing/                # Invoice, Deposit Saldo, Payment History
    │   │   │   ├── invoices/page.tsx
    │   │   │   ├── deposit/page.tsx
    │   │   │   └── [invoiceId]/page.tsx
    │   │   ├── dns/page.tsx            # Cloudflare Subdomain & DNS Records
    │   │   ├── ai/page.tsx             # AI Gateway Models & Usage
    │   │   ├── k8s/page.tsx            # Kubernetes Apps & Containers
    │   │   ├── support/page.tsx        # Support Tickets & Live Chat
    │   │   └── settings/page.tsx       # User Profile, Security, API Keys
    │   ├── (public)/                   # Portal Publik & Landing Page
    │   │   ├── page.tsx                # Homepage Landing Hero & Server Stats
    │   │   ├── pricing/page.tsx        # VPN Pricing Matrix
    │   │   ├── servers/page.tsx        # Public Server Health Monitor
    │   │   ├── tools/page.tsx          # Network Tools (Subnet, DNS, IP Lookup)
    │   │   ├── docs/                   # Knowledge Base & Protocol Guides
    │   │   └── announcements/page.tsx  # News & Maintenance Updates
    │   ├── admin/                      # Superadmin & Infrastructure Portal
    │   │   ├── dashboard/page.tsx      # Global System Overview & Revenue
    │   │   ├── servers/page.tsx        # Server Node CRUD & Multi-Port Monitor
    │   │   ├── users/page.tsx          # User Management & Balance Adjustment
    │   │   ├── finance/page.tsx        # Financial Ledger, Payment Gateways
    │   │   ├── cron/page.tsx           # Cronjob Execution Status & Logs
    │   │   └── k8s/page.tsx            # Cluster Orchestrator
    │   ├── globals.css                 # Tailwind v4 Configuration & Tokens
    │   ├── layout.tsx                  # Root Layout (Font, ThemeProvider, Sonner)
    │   └── providers.tsx               # NextThemes, Query, Auth Provider
    ├── components/                     # Reusable Cross-Module Components
    │   ├── ui/                         # Katalog Lengkap Komponen Shadcn UI (40+ Komponen Lengkap)
    │   ├── layout/                     # Shell Components
    │   │   ├── DashboardSidebar.tsx    # Responsive Collapsible Sidebar
    │   │   ├── DashboardHeader.tsx     # Breadcrumbs, Balance, User Menu
    │   │   ├── AdminSidebar.tsx        # Superadmin Navigation
    │   │   └── PublicNavbar.tsx        # Landing Page Navigation
    │   └── shared/                     # Specialized Domain Shared Components
    │       ├── CopyButton.tsx          # 1-Click Copy with Feedback & Micro-Haptic
    │       ├── QrCodeModal.tsx         # Render Base64 / SVG QR Code for VPN URI
    │       ├── ServerPingBadge.tsx     # Latency Badge (Green <100ms, Yellow, Red)
    │       ├── ProtocolBadge.tsx       # Protocol Visual Tag with Official Color
    │       ├── EmptyState.tsx          # Canonical Empty State Card
    │       └── StatusBadge.tsx         # Active, Expired, Suspended, Maintenance
    ├── hooks/                          # Shared Utility Hooks
    │   ├── useClipboard.ts             # Safe One-Click Copy Hook
    │   ├── useDebounce.ts              # Search & Filter Debouncing
    │   └── useMediaQuery.ts            # Responsive Breakpoint Detection
    ├── lib/                            # Pure Utility & Infrastructure Libraries
    │   ├── api/                        # HTTP Client Engine
    │   │   ├── http-client.ts          # Core Client, Token Ingestion, Deduplication
    │   │   └── endpoints.ts            # Centralized API Route URL Constants
    │   ├── config/                     # Environment Config & Runtime Constants
    │   ├── storage/                    # Cookie Abstraction for 'hide-jwt'
    │   │   └── cookies.ts
    │   └── utils.ts                    # cn() helper (clsx + tailwind-merge)
    ├── locales/                        # Internationalization (ID & EN)
    │   ├── id/                         # Indonesian dictionary
    │   └── en/                         # English dictionary
    └── modules/                        # Domain Business Modules (12 Domains)
        ├── ai/                         # AI Gateway & Tokens
        ├── content/                    # Articles, Announcements, FAQ
        ├── dns/                        # Cloudflare Zones & Records
        ├── finance/                    # Billing, Deposit, Invoices, Gateways
        ├── iam/                        # Auth, Profile, RBAC, API Keys
        ├── kubernetes/                 # K8s Containers & Deployments
        ├── monitor/                    # Health, Telemetry, Ping, Server Metrics
        ├── notification/               # Web Push, Telegram, Email Alerts
        ├── subscription/               # Plan Quotas & Reseller Limits
        ├── support/                    # Tickets, Live CS, Feedback
        ├── vpn/                        # Core VPN Account Management (All Protocols)
        └── cronjob/                    # Cron Management & Task Execution
```

---

## 6. Pola Arsitektur 5-Lapisan Domain — Pola C: Role-Partitioned Module (Resmi SSOT)

Setiap domain bisnis di `src/modules/<domain>/` **WAJIB** menerapkan struktur **Pola C: Role-Partitioned Module** yang memisahkan tanggung jawab antara `user/`, `seller/`, dan `admin/`, dengan penopang `shared/`:

```
src/modules/<domain>/
├── types/          # 1. Domain Contracts & DTOs
│   ├── index.ts                   # Re-export barrel
│   ├── <domain>.types.ts          # Core Domain Entity (dipakai semua peran)
│   ├── user.types.ts              # DTO khusus User
│   ├── seller.types.ts            # DTO khusus Seller / Reseller
│   └── admin.types.ts             # DTO khusus Superadmin
├── api/            # 2. REST API Client Layer (Pure Async HTTP)
│   ├── index.ts                   # Unified API object: { user, seller, admin }
│   ├── user.api.ts                # Endpoint konsumen biasa (/api/<domain>/*)
│   ├── seller.api.ts              # Endpoint reseller (/api/seller/<domain>/*)
│   └── admin.api.ts               # Endpoint admin (/api/admin/<domain>/*)
├── hooks/          # 3. State & Business Logic Layer
│   ├── index.ts                   # Re-export barrel
│   ├── use<Domain>User.ts         # Hook aksi & state pelanggan biasa
│   ├── use<Domain>Seller.ts       # Hook kuota grosir & batch seller
│   └── use<Domain>Admin.ts        # Hook kontrol armada & CRUD admin
├── components/     # 4. Standardized UI Component Layer (Shadcn UI)
│   ├── shared/                    # 🟢 Komponen atomik UI bersama (Badge, QrModal, CopyButton)
│   ├── user/                      # 👤 Komponen eksklusif user biasa
│   ├── seller/                    # 💼 Komponen eksklusif reseller (BulkMint, QuotaProgress)
│   └── admin/                     # 🛡️ Komponen eksklusif admin (ServerCrud, ConfigSheet)
└── views/          # 5. Composite View Layer (Page-Level Assembled Views)
    ├── user/<Domain>View.tsx           # Assembled view untuk rute user
    ├── seller/Seller<Domain>View.tsx   # Assembled view untuk rute reseller
    └── admin/Admin<Domain>View.tsx     # Assembled view untuk rute admin
```

### Empat Hukum Emas Pola C (*The 4 Golden Rules*):
1. **Downward Dependency Only:** Komponen `user/`, `seller/`, dan `admin/` boleh mengimpor dari `shared/`, namun komponen `shared/` **DILARANG KERAS** mengimpor dari `user/`, `seller/`, atau `admin/`.
2. **No Cross-Role Imports:** Komponen `user/` tidak boleh mengimpor komponen dari `seller/` atau `admin/`, begitu juga sebaliknya.
3. **Penyimpanan Komponen Bersama:** Jika suatu komponen atomik atau modal dibutuhkan oleh lebih dari satu role, komponen tersebut **WAJIB** berada di dalam subfolder `shared/`.
4. **Isolasi Kontrak DTO:** Seluruh request body spesifik role diletakkan terpisah (`user.types.ts`, `seller.types.ts`, `admin.types.ts`) agar validasi payload Zod tetap independen.

---

## 7. Thin App Router Pattern & Routing Blueprint

Sesuai standar Next.js 16 App Router, file di `src/app/` **TIDAK BOLEH** memuat logika bisnis berat atau state management. File `page.tsx` hanya bertindak sebagai orkestrator rute:

```tsx
// src/app/(dashboard)/vpn/[protocol]/page.tsx
import type { Metadata } from "next";
import { VpnProtocolView } from "@/modules/vpn/views/VpnProtocolView";
import { MemberRouteGuard } from "@/components/layout/shared/MemberRouteGuard";

interface PageProps {
  params: Promise<{ protocol: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { protocol } = await params;
  return {
    title: `${protocol.toUpperCase()} Tunneling Accounts | GoVPN`,
    description: `Manage and create high-speed ${protocol.toUpperCase()} accounts.`,
  };
}

export default async function VpnProtocolPage({ params }: PageProps) {
  const { protocol } = await params;

  return (
    <MemberRouteGuard>
      <VpnProtocolView protocol={protocol} />
    </MemberRouteGuard>
  );
}
```

---

## 8. Edge Security, Zero-Trust Proxy & Auth Architecture

### A. Edge Route Protection (`src/proxy.ts`)
Next.js 16 menggunakan konvensi `src/proxy.ts` yang berjalan di **Edge Runtime**. Ini mengeliminasi Flash of Unauthenticated Content (FOUC) dengan memeriksa status sesi dalam `0ms` sebelum HTML di-render ke browser.

```ts
// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rute yang wajib memiliki token aktif
const MEMBER_ROUTES = [
  "/dashboard",
  "/vpn",
  "/billing",
  "/servers",
  "/dns",
  "/ai",
  "/k8s",
  "/support",
  "/settings",
];

// Rute khusus SUPERADMIN
const ADMIN_ROUTES = ["/admin"];

// Rute otentikasi publik (redirect ke dashboard jika sudah login)
const AUTH_ROUTES = ["/login", "/register", "/forgot-password"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ambil token dari cookie resmi backendv2
  const sessionToken =
    request.cookies.get("hide-jwt")?.value ||
    request.cookies.get("govpn_session_token")?.value;

  const userRole = (
    request.cookies.get("govpn_user_role")?.value || ""
  ).toUpperCase();

  // 1. Guard Member Routes
  if (MEMBER_ROUTES.some((prefix) => pathname.startsWith(prefix))) {
    if (!sessionToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Guard Admin Routes
  if (ADMIN_ROUTES.some((prefix) => pathname.startsWith(prefix))) {
    if (!sessionToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const isAdmin =
      userRole === "SUPERADMIN" ||
      userRole === "SUPER_ADMIN" ||
      userRole === "ADMIN";

    if (!isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // 3. Prevent Authenticated Users from Accessing Login/Register
  if (AUTH_ROUTES.some((prefix) => pathname.startsWith(prefix))) {
    if (sessionToken) {
      const redirectUrl =
        request.nextUrl.searchParams.get("from") || "/dashboard";
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|icon\\.svg|.*\\.png$).*)",
  ],
};
```

### B. Sinkronisasi Cookie & Token
- Backend Go `backendv2` mengatur cookie sesi bernama `hide-jwt`.
- Frontend menyimpan status presentasi non-sensitif (`username`, `role`, `balance`) pada Zustand store `useAuthStore`.
- Penghapusan sesi (`logout`) wajib membersihkan `hide-jwt`, `govpn_session_token`, dan `govpn_user_role` dengan flag `Expires=1970` dan `Max-Age=0`.

---

## 9. Standard REST API Client & Go Backend Envelope Decoding

Backend Go `backendv2` selalu mengembalikan format JSON terpadu (_Standard REST Envelope_). HTTP Client frontend diadaptasi dari `fontwahide/src/lib/api/http-client.ts`:

```typescript
// Kontrak Envelope Universal dari Go backendv2
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  payload?: T;
  error?: unknown;
  additional_info?: {
    code?: string;
    page?: number;
    size?: number;
    total?: number;
    [key: string]: unknown;
  };
  pagination?: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}
```

### Fitur Utama HTTP Client:
1. **Deduplikasi In-Flight:** Mencegah request ganda untuk GET query yang sama saat user mengklik tombol berkali-kali.
2. **Auto-Retry dengan Exponential Jitter:** Menoleransi fluktuasi jaringan mikro pada endpoint GET.
3. **Idempotency Key Injection:** Menjamin transaksi finansial (topup, create account) tidak ter-charge dua kali.
4. **Graceful Error Normalizer:** Memetakan status 401 ke logout otomatis, 403 ke pesan pembatasan izin, dan 422 ke inline form errors.

---

## 10. Pemetaan 12 Modul Domain (388 Endpoints Postman)

Berdasarkan `G:\WEB2026\postman-govpn` (OpenAPI 3.0), berikut adalah pemetaan lengkap seluruh 12 modul ke dalam arsitektur `fontgovpn`:

```
┌────┬─────────────────┬───────────────────┬────────────────────────────────────────────────────────┐
│ No │ Modul Postman   │ Lokasi Modul UI   │ Cakupan Fitur & Endpoint Kunci                          │
├────┼─────────────────┼───────────────────┼────────────────────────────────────────────────────────┤
│ 00 │ 00-health       │ modules/monitor   │ Liveness, Readiness, Metrics telemetri server          │
│ 01 │ 01-ai           │ modules/ai        │ Chat completions, wallet saldo AI, model manager       │
│ 02 │ 02-content      │ modules/content   │ Artikel blog, KB docs, pengumuman maintenance, FAQ     │
│ 03 │ 03-dns          │ modules/dns       │ Cloudflare Zones, A/CNAME record CRUD, auto-pointing   │
│ 04 │ 04-finance      │ modules/finance   │ Invoice, QRIS Midtrans/Tripay, Saldo wallet, withdrawal│
│ 05 │ 05-iam          │ modules/iam       │ Auth login/register, 2FA, API Keys, RBAC permissions   │
│ 06 │ 06-kubernetes   │ modules/kubernetes│ K8s pods deploy, container restart, namespace logs     │
│ 07 │ 07-monitor      │ modules/monitor   │ Server ping latency, CPU/RAM telemetry, active users   │
│ 08 │ 08-notification │ modules/notif     │ Telegram alert webhook, email notification, web push   │
│ 09 │ 09-subscription │ modules/subs      │ Paket langganan VPN, reseller volume tier, kuota akun  │
│ 10 │ 10-support      │ modules/support   │ Tiket keluhan, CS livechat, live assistance log        │
│ 11 │ 11-vpn          │ modules/vpn       │ SSH, VMess, VLess, Trojan, Shadowsocks, WireGuard      │
│ 12 │ 12-cronjob      │ modules/cronjob   │ Task scheduler, reset kuota akun, backup data server   │
└────┴─────────────────┴───────────────────┴────────────────────────────────────────────────────────┘
```

### Rincian Modul VPN (`src/modules/vpn/`):
Mendukung 6 protokol tunneling utama:
1. **SSH:** Port Dropbear, OpenSSH, SSL/TLS, WebSocket CDN (Cloudflare & Fastly).
2. **VMess:** WS, gRPC, TCP HTTP, UUID generation, auto-link `vmess://`.
3. **VLess:** WS TLS, gRPC XTLS Reality, Flow control, auto-link `vless://`.
4. **Trojan:** gRPC, WS TLS, auto-link `trojan://`.
5. **Shadowsocks:** Shadowsocks 2022, AEAD Ciphers, SIP002 URIs.
6. **WireGuard:** Private key, Public key, Preshared key, Interface IP, `.conf` download.

---

## 11. Performa Tinggi, Virtualisasi DOM & Real-Time Streaming

### A. Virtualisasi Data Besar (`@tanstack/react-virtual`)
Untuk tabel dengan ratusan riwayat akun atau log telemetri server:
- Gunakan `useVirtualizer` untuk merender hanya elemen yang terlihat di viewport.
- Mengurangi penggunaan memori DOM browser hingga 90%.

### B. 1-Click Copy & Quick Actions
Komponen `<CopyButton text={configString} />` harus menyediakan:
- Visual feedback ikon checklist hijau selama 2 detik.
- Toast Sonner singkat: *"Konfigurasi VMess berhasil disalin!"*.
- Opsional: Modal QR Code untuk pemindaian instan via smartphone (v2rayNG, Clash, Shadowrocket).

### C. Server Latency SSE / WebSocket Polling
- Tampilkan ping real-time server node dengan warna indikator:
  - `< 100ms`: Emerald Green (Sangat Baik / Direct)
  - `100ms - 250ms`: Amber Yellow (Stabil / Inter-Asia)
  - `> 250ms`: Rose Red (Tinggi / Trans-Atlantic)

---

## 12. Aturan Wajib & Larangan Keras AI (AI Hard Rules)

Semua developer manusia dan AI Agent yang bekerja pada repositori `fontgovpn` **WAJIB MEMATUHI** aturan berikut:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ ⚠️ 1. DILARANG KERAS MENJALANKAN `bun run build` ATAU `next build` DI TERMINAL!        │
│    - Proses build Next.js 16 memakan CPU/RAM sangat tinggi dan membekukan proses CLI.  │
│    - Verifikasi kode WAJIB menggunakan static analysis (tsc --noEmit) atau scratch script.│
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 2. Wajib Directiva "use client";:                                                     │
│    Setiap komponen yang menggunakan state, hooks, event listeners, atau browser API     │
│    WAJIB menyertakan "use client"; di baris pertama.                                  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 3. Larangan overflow-hidden pada Kontainer Popover/Dropdown:                           │
│    Jangan gunakan overflow-hidden pada Card/Wrapper yang menampung Select atau Dropdown│
│    agar menu pilihan tidak terpotong (Gunakan overflow-visible).                       │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 4. Wajib Dukungan i18n Simetris (ID & EN):                                            │
│    Dilarang menaruh teks UI hardcoded langsung di JSX. Gunakan t("namespace.key")       │
│    dan daftarkan secara simetris di locales/id/ dan locales/en/.                       │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 5. Konsistensi Token Tailwind v4:                                                     │
│    Dilarang menuliskan warna hex arbitrary di class (seperti text-[#2563eb]).          │
│    Gunakan token semantik: text-primary, bg-surface, border-border.                   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---
*Dokumen ini disahkan oleh Senior Next.js Architect & CTO Programmer sebagai acuan resmi implementasi `G:\WEB2026\fontgovpn`.*

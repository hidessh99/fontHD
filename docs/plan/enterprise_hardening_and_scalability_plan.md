# Master Architecture Plan: Enterprise Hardening, Performance & Scalability GoVPN Next.js 16

Dokumen arsitektur ini memetakan rencana strategis dan teknis untuk mentransformasikan platform **GoVPN Institutional** (`G:\WEB2026\fontgovpn`) menjadi sistem enterprise sekelas Coinbase Cloud, Stripe, dan Cloudflare Dashboard.

---

## 1. Executive Summary & Kesepakatan Arsitektur

Berdasarkan audit komprehensif dan arahan arsitektur, implementasi perbaikan disepakati menggunakan prinsip:

1. **Murni Konvensi Next.js 16 `src/proxy.ts`**: Tidak ada pembuatan file `middleware.ts`. Seluruh optimasi Edge Network Guard dilakukan in-place pada `src/proxy.ts`.
2. **Porting Desain 404 & 500 dari `fontend/app/error.vue`**: Mengadopsi 100% visual styling (ambient glow, gradient status code, Alert badge, collapsible technical details, dual CTA Home/Dashboard, dan i18n) ke dalam standar Next.js 16 (`not-found.tsx`, `error.tsx`, `global-error.tsx`).
3. **Penyatuan Route Group `/articles`**: Memindahkan artikel publik ke `src/app/(public)/articles/` agar mewarisi `PublicNavbar` dan `PublicFooter` secara konsisten tanpa mengubah URL.
4. **Automated SEO & Manifest**: Menghasilkan `robots.ts`, `sitemap.ts`, dan `manifest.ts` secara otomatis.
5. **Runtime Hardening**: Mengaktifkan `reactStrictMode: true` dan dynamic SSR locale pada tag `<html lang>`.

---

## 2. Roadmap Perbaikan Bertahap (Final Architecture)

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                 ENTERPRISE HARDENING ROADMAP (NEXT.JS 16)                     │
├───────────────────────────────────────────────────────────────────────────────┤
│  PHASE 1: In-Place Hardening src/proxy.ts (Next.js 16 Edge Proxy) (P0)        │
│  ├── Pertahankan src/proxy.ts murni (Tanpa membuat file middleware.ts)       │
│  ├── Tambahkan proteksi rute /seller/* dengan role guard (SELLER/ADMIN)       │
│  └── Perbaiki rute yang belum terdaftar: /kubernetes dan /notifications       │
├───────────────────────────────────────────────────────────────────────────────┤
│  PHASE 2: Porting 404 & 500 dari error.vue ke Next.js 16 (P0)                │
│  ├── Porting visual error.vue ke src/app/not-found.tsx (Khusus 404)           │
│  ├── Porting visual error.vue ke src/app/error.tsx (Khusus 500 + reset retry) │
│  ├── Buat src/app/global-error.tsx (Root Layout safety net)                   │
│  └── Sinkronisasi kamus terjemahan i18n errorPage (English & Indonesia)       │
├───────────────────────────────────────────────────────────────────────────────┤
│  PHASE 3: Standarisasi Route Group /articles & SEO Automation (P1)            │
│  ├── Pindahkan src/app/articles ke src/app/(public)/articles                  │
│  ├── Buat src/app/robots.ts (Type-safe crawlers protection)                   │
│  ├── Buat src/app/sitemap.ts (Dynamic institutional sitemap)                  │
│  └── Buat src/app/manifest.ts (Web App Manifest / PWA metadata)               │
├───────────────────────────────────────────────────────────────────────────────┤
│  PHASE 4: Runtime Hardening & Configuration Purity (P1 - P2)                  │
│  ├── Aktifkan reactStrictMode: true di next.config.ts                         │
│  ├── Sinkronisasi tag <html lang={locale}> dinamis di src/app/layout.tsx      │
│  └── Validasi menyeluruh: bun run typescript, bun run lint, bun run format    │
└───────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Rincian Teknis Implementasi

### 3.1 Phase 1: In-Place Hardening `src/proxy.ts`

Memperbarui `src/proxy.ts` yang sudah ada untuk menambahkan proteksi rute seller dan memperbaiki path:

```ts
// src/proxy.ts (Enhanced Next.js 16 Edge Routing Proxy)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Canonical protected routes requiring active session in GoVPN
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/vpn",
  "/billing",
  "/servers",
  "/monitor",
  "/dns",
  "/ai",
  "/kubernetes",
  "/k8s",
  "/subscription",
  "/support",
  "/settings",
  "/profile",
  "/notifications",
];

// Seller partner protected routes requiring SELLER, ADMIN, or SUPERADMIN role
const SELLER_PREFIXES = ["/seller"];

// Superadmin protected routes requiring SUPERADMIN / ADMIN role
const ADMIN_PREFIXES = ["/admin"];

// Public auth routes (redirect to dashboard if already authenticated)
const AUTH_PREFIXES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionToken =
    request.cookies.get("hide-jwt")?.value ||
    request.cookies.get("govpn_session_token")?.value ||
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  const userRole = (
    request.cookies.get("govpn_user_role")?.value || ""
  ).toUpperCase();

  // 1. Guard Member Protected Dashboard Routes (0ms Edge Redirect, Zero FOUC)
  if (PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    if (!sessionToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Guard Seller Partner Routes (Role-Based Access Control at Edge)
  if (SELLER_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    if (!sessionToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const isSellerOrAdmin =
      userRole === "SELLER" ||
      userRole === "ADMIN" ||
      userRole === "SUPERADMIN" ||
      userRole === "SUPER_ADMIN";

    if (!isSellerOrAdmin) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // 3. Guard Superadmin Routes (Role-Based Access Control at Edge)
  if (ADMIN_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    if (!sessionToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const isSuperAdmin =
      userRole === "SUPERADMIN" ||
      userRole === "SUPER_ADMIN" ||
      userRole === "ADMIN";

    if (!isSuperAdmin) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // 4. Prevent Authenticated Users from Accessing Login/Register
  if (AUTH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    if (sessionToken) {
      const redirectUrl =
        request.nextUrl.searchParams.get("from") || "/dashboard";
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
  }

  return NextResponse.next();
}

// Edge matcher ignoring static files, images, favicons, robots, sitemaps
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|favicon\\.svg|icon\\.svg|icon\\.png|apple-icon\\.png|robots\\.txt|sitemap\\.xml).*)",
  ],
};
```

---

### 3.2 Phase 2: Porting 404 & 500 dari `fontend/app/error.vue` ke Next.js 16

Mengadopsi seluruh estetika visual dari `G:\WEB2026\fontend\app\error.vue`:

- Ambient background glow (radial ambient blue & indigo blur).
- Giant gradient status code `404` / `500`.
- Alert icon badge.
- Dual button CTA (Home & Dashboard).
- Collapsible _Technical Details_ (`error.message`, `error.digest`, `stack`).
- Multi-bahasa via `useI18n()` (`t("errorPage.*")`).

#### 1. Sinkronisasi Kamus i18n (`errorPage`):

Menambahkan key `errorPage` pada `src/locales/en/landing.json` dan `src/locales/id/landing.json` (atau common dictionary):

```json
"errorPage": {
  "title404": "Halaman Tidak Ditemukan",
  "description404": "Oops! Halaman yang Anda cari telah hilang atau tidak pernah ada.",
  "title500": "Kesalahan Server",
  "description500": "Oops! Terjadi kesalahan pada server kami. Kami sedang menanganinya.",
  "titleGeneric": "Terjadi Kesalahan",
  "descriptionGeneric": "Kesalahan yang tidak terduga telah terjadi. Silakan coba beberapa saat lagi.",
  "backHome": "Kembali ke Beranda",
  "backDashboard": "Masuk ke Dashboard",
  "retry": "Coba Lagi",
  "technicalDetails": "Detail Kesalahan Teknis"
}
```

#### 2. File `src/app/not-found.tsx` (Khusus 404):

- Merender layout 404 berestetika `error.vue`.
- Header dengan Logo GoVPN dan `LanguageSwitcher`.
- Tombol Home & Dashboard.

#### 3. File `src/app/error.tsx` (Khusus 500 / Runtime Error Boundary):

- Menerima props `error: Error & { digest?: string }` dan `reset: () => void`.
- Merender visual 500 dengan tombol aksi `reset()` (Coba Lagi) tanpa reload halaman browser.
- Collapsible section untuk melihat `error.message` dan `error.digest`.

#### 4. File `src/app/global-error.tsx` (Root Layout Error Boundary):

- Membungkus fallback dengan tag `<html>` dan `<body>` darurat jika `RootLayout` gagal.

---

### 3.3 Phase 3: Standarisasi Route Group `/articles` & SEO Automation

1. **Penyatuan Route Group `/articles`**:
   - Pindahkan `src/app/articles/page.tsx` -> `src/app/(public)/articles/page.tsx`.
   - Pindahkan `src/app/articles/[slug]/page.tsx` -> `src/app/(public)/articles/[slug]/page.tsx`.
   - Hapus direktori kosong `src/app/articles`.
   - _Hasil:_ URL tetap `/articles` dan `/articles/:slug`, tetapi secara otomatis mendapatkan `PublicNavbar` (dengan LanguageSwitcher & ThemeToggle) dan `PublicFooter`.

2. **Automated SEO & Manifest**:
   - `src/app/robots.ts`: Membolehkan Googlebot meng-crawl halaman publik (`/`, `/articles`), memblokir `/admin/*`, `/seller/*`, `/dashboard/*`, `/api/*`.
   - `src/app/sitemap.ts`: Menghasilkan XML sitemap dinamis untuk landing page dan seluruh artikel publik.
   - `src/app/manifest.ts`: Metadata Progressive Web App (PWA) dengan nama "GoVPN Institutional".

---

### 3.4 Phase 4: Runtime Hardening & Quality Configuration

1. **Aktifkan `reactStrictMode: true`**:
   - Ubah `reactStrictMode: true` pada `next.config.ts` untuk memastikan lifecycle React 19 bebas dangling timers / memory leak.
2. **Dynamic SSR Locale**:
   - Baca cookie `govpn_locale` di `src/app/layout.tsx` untuk menyetel `<html lang={locale}>` secara dinamis pada SSR.
3. **Validasi Quality Gates**:
   - `bun run typescript` (`tsc --noEmit`) -> Exit code 0.
   - `bun run lint` (`eslint`) -> Exit code 0.
   - `bun run format:check` -> Exit code 0.

---

## 4. Verification & Testing Plan

1. **Edge Proxy Verification**:
   - Akses `/admin/users` tanpa login -> Langsung 307 redirect ke `/login?from=/admin/users` (0ms).
   - Akses `/seller/vpn` dengan role USER -> Langsung redirect ke `/dashboard` (0ms).
   - Akses `/seller/vpn` tanpa login -> Langsung redirect ke `/login?from=/seller/vpn` (0ms).
2. **Error & 404 UI Verification**:
   - Buka `/halaman-palsu-404` -> Halaman 404 bergaya `error.vue` tampil lengkap dengan LanguageSwitcher, tombol Home, dan Dashboard.
3. **Layout Consistency**:
   - Buka `/articles` -> Pastikan `PublicNavbar` dan `PublicFooter` tampil rapi.

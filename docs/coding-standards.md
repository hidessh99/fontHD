# Pedoman Standar Coding, Style Formatting & Komponen Shadcn UI (GoVPN)
**Target Platform:** GoVPN Next.js 16 Web Application (App Router + Turbopack + Bun)  
**Tujuan Dokumen:** Acuan Tunggal (_Single Source of Truth_) Standar Format Koding, Desain Sistem, dan Arsitektur Komponen untuk Developer & AI Agent.  
**Status:** Approved SSOT (Anti-Slop Standard)  
**Versi:** 2.0.0  

---

## 1. ⚠️ Aturan Wajib & Larangan Keras AI (AI Hard Rules)

Setiap AI agent (Antigravity, Gemini, Claude) maupun programmer manusia yang berkontribusi pada repositori `fontgovpn` **WAJIB MEMATUHI** 7 aturan mutlak di bawah ini tanpa pengecualian:

### ⛔ Aturan 1: DILARANG KERAS Menjalankan `bun run build` atau `next build`
> [!CAUTION]
> **Dilarang keras mengeksekusi `bun run build` atau `next build`** di terminal saat coding!
> - Proses kompilasi produksi Next.js 16 memakan alokasi RAM dan CPU sangat tinggi pada Windows environment yang memicu freeze, interupsi proses terminal, dan mematikan dev server.
> - **Solusi Validasi:** Selalu gunakan pemeriksaan tipe statis berkecepatan tinggi:
>   ```bash
>   bun x tsc --noEmit
>   ```

### 🏷️ Aturan 2: Penempatan Wajib `"use client";`
Setiap berkas komponen atau hook yang menggunakan:
- React Hooks (`useState`, `useEffect`, `useCallback`, `useMemo`, `useRef`, `usePathname`, `useRouter`, `useI18n`)
- Event Handlers (`onClick`, `onChange`, `onSubmit`, `onKeyDown`)
- Browser APIs (`window`, `document`, `navigator.clipboard`, `localStorage`, `cookies`)  
**WAJIB** mencantumkan `"use client";` tepat pada **baris pertama (line 1)** berkas.

### 🛡️ Aturan 3: Pencegahan Jebakan `overflow-hidden` (Popover & Dropdown Clipping)
> [!IMPORTANT]
> Komponen `<Card>` bawaan Shadcn memiliki class default `overflow-hidden`. Jika Card tersebut menampung dropdown protokol, select box, atau popover tooltip, menu melayang akan **terpotong (clipped)** dan tidak bisa di-scroll!
> - **Wajib:** Tambahkan `overflow-visible relative z-20` pada Card pembungkus form:
>   ```tsx
>   <Card className="border-zinc-800 bg-zinc-950 overflow-visible relative z-20">
>   ```

### 🔡 Aturan 4: Mandat Font `JetBrains Mono` (`font-mono`) untuk Data Teknis
Seluruh data teknis berikut **WAJIB** menggunakan class `font-mono`:
- Alamat IP Server (IPv4 / IPv6)
- Port, UUID, ShortID, Public/Private Keys
- URL/URI Konfigurasi (Vmess link, VLess string, Trojan URL, Subdomain)
- Nilai Hash, Token, No. Faktur Invoice (`INV-202609-001`), dan Nominal Uang.

### 🌐 Aturan 5: Standar Multi-Bahasa (i18n)
- **Dilarang meng-hardcode teks UI secara mentah di JSX.**
- Gunakan context engine `@/lib/i18n`:
  ```tsx
  import { useI18n } from "@/lib/i18n/context";
  const { t } = useI18n();
  // Contoh: <span>{t("vpn.protocol")}</span>
  ```
- Setiap penambahan key baru wajib didaftarkan simetris di kedua kamus bahasa (`src/lib/i18n/dict.ts` atau `src/locales/`).

### 📋 Aturan 6: Standar 1-Click Clipboard Copy UX
Setiap data teknis yang dapat disalin pengguna (IP, UUID, Vless URL, QR Payload) **WAJIB** menyertakan tombol salin dengan micro-feedback instan:
```tsx
import { CopyButton } from "@/components/shared/CopyButton";
<CopyButton text={vpnAccount.vless_url} label="Config URL" />
```

### 🧩 Aturan 7: Konvensi Base UI Primitives (`render` vs `asChild`)
Karena paket Shadcn UI menggunakan engine modern `@base-ui/react`:
- Elemen trigger modal/sheet (`DialogTrigger`, `SheetTrigger`, `DropdownMenuItem`) menggunakan prop:
  ```tsx
  <DialogTrigger render={<Button variant="outline">Buka Modal</Button>} />
  ```
- Tombol `<Button>` tetap mendukung `asChild` melalui custom cloneElement wrapper:
  ```tsx
  <Button asChild><Link href="/dashboard">Ke Dashboard</Link></Button>
  ```

---

## 2. Struktur Folder & Organisasi Multi-Role (`USER`, `SELLER`, `ADMIN`)

Untuk menjaga basis kode tetap **Scalable**, **Maintainable**, dan **Efisien**, struktur folder memisahkan peran pengguna ke dalam tingkatan yang jelas:

### 2.1 Peta Routing App Router (`src/app/`)

```
src/app/
├── (auth)/                    # Autentikasi Publik (Login, Register)
├── (public)/                  # Halaman Marketing (Landing, Pricing, Panduan OS)
├── (dashboard)/               # 👤 Portal Pelanggan & Reseller (Layout Bersama)
│   ├── layout.tsx             # Shell Dashboard (DashboardSidebar & DashboardHeader)
│   ├── dashboard/page.tsx     # Overview Pelanggan
│   ├── vpn/[protocol]/page.tsx# Pengelolaan Akun VPN
│   ├── servers/page.tsx       # Daftar Node Server
│   ├── monitor/page.tsx       # Telemetri Real-time
│   ├── billing/               # Faktur & Deposit QRIS
│   ├── dns/page.tsx           # Cloudflare DNS
│   ├── ai/page.tsx            # AI Gateway
│   ├── k8s/page.tsx           # Kubernetes App
│   ├── subscription/page.tsx  # Paket Langganan
│   ├── support/page.tsx       # CS & Bantuan
│   └── seller/                # 💼 SUB-PORTAL RESELLER (Role: SELLER)
│       ├── dashboard/page.tsx # Metrik Gross Revenue & Kuota Reseller
│       ├── tenants/page.tsx   # Pengelolaan Sub-Tenant / Klien
│       ├── subscriptions/page.tsx # Pembelian Kuota Grosir
│       ├── pricing/page.tsx   # Pengaturan Margin Harga Jual
│       └── withdrawal/page.tsx# Pencairan Komisi / Saldo Seller
└── admin/                     # 🛡️ PORTAL SUPERADMIN (Role: SUPERADMIN)
    ├── layout.tsx             # Shell Terisolasi (AdminSidebar - Red/Cobalt Accent)
    ├── dashboard/page.tsx     # Metrik Sistem Global
    ├── servers/page.tsx       # Global Server Node CRUD
    ├── users/page.tsx         # Manajemen Pengguna & Banned
    ├── finance/page.tsx       # Ledger Finansial & Approval Payout
    ├── cron/page.tsx          # 40 Automated Tasks Trigger Engine
    └── k8s/page.tsx           # Klaster & Template Kontainer
```

### 2.2 Aturan Organisasi dalam Modul Bisnis (`src/modules/<feature>/`)

Setiap modul bisnis mengadopsi struktur 5 lapisan terstandarisasi:

```
src/modules/<feature>/
├── types/
│   ├── <feature>.types.ts         # Model data utama & DTO umum
│   └── <feature>-seller.types.ts  # (Jika ada) DTO khusus reseller
├── api/
│   └── <feature>.api.ts           # REST API calls terpusat
├── hooks/
│   ├── use<Feature>.ts            # State & logika fitur umum
│   └── useSeller<Feature>.ts      # (Jika ada) Logika khusus reseller
├── components/
│   ├── <Feature>Card.tsx          # Komponen UI tingkat atom/molekul
│   ├── <Feature>Table.tsx
│   ├── seller/                    # Komponen khusus reseller (opsional)
│   └── admin/                     # Komponen khusus admin (opsional)
└── views/
    ├── <Feature>View.tsx          # View utama untuk User
    ├── seller/Seller<Feature>View.tsx # View untuk Reseller
    └── admin/Admin<Feature>View.tsx   # View untuk Admin
```

---

## 3. Standarisasi 51 Komponen Shadcn UI (`src/components/ui/`)

Seluruh komponen antarmuka **WAJIB** memanfaatkan pustaka Shadcn UI yang telah diinstal di `src/components/ui/`.

### 3.1 Panduan Penggunaan Komponen Utama

#### 1. `<Button>`
```tsx
import { Button } from "@/components/ui/button";

// Primary Action (Cobalt Blue)
<Button className="bg-blue-600 hover:bg-blue-500 text-white gap-2 font-medium">
  <Zap className="h-4 w-4" /> Buat Akun VPN
</Button>

// Secondary / Outline Action
<Button variant="outline" className="border-zinc-800 hover:bg-zinc-900 text-zinc-300">
  Batal
</Button>

// Destructive Action
<Button variant="destructive" size="sm">
  Hapus Record
</Button>

// Loading State (Wajib saat proses asinkron)
<Button disabled={isSubmitting} className="bg-blue-600 text-white">
  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
  {isSubmitting ? "Memproses..." : "Simpan"}
</Button>
```

#### 2. `<Card>`
```tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

<Card className="border-zinc-800 bg-zinc-950/80 p-5 shadow-xl overflow-visible relative z-20">
  <CardHeader className="p-0 pb-3">
    <CardTitle className="text-sm font-semibold text-zinc-100">Judul Kartu</CardTitle>
    <CardDescription className="text-xs text-zinc-400">Deskripsi singkat</CardDescription>
  </CardHeader>
  <CardContent className="p-0 pt-2">
    {/* Isi Konten */}
  </CardContent>
</Card>
```

#### 3. `<Dialog>` & Modal
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger render={
    <Button className="bg-blue-600 text-white">Buka Modal</Button>
  } />
  <DialogContent className="sm:max-w-md bg-zinc-950 border-zinc-800 text-zinc-100">
    <DialogHeader>
      <DialogTitle>Judul Modal</DialogTitle>
    </DialogHeader>
    {/* Form isi */}
  </DialogContent>
</Dialog>
```

#### 4. `<Badge>` & Status
Gunakan komponen wrapper resmi `@/components/shared/StatusBadge`:
```tsx
import { StatusBadge } from "@/components/shared/StatusBadge";
<StatusBadge status="ACTIVE" />   // Hijau Emerald
<StatusBadge status="PENDING" />  // Kuning Amber
<StatusBadge status="EXPIRED" />  // Merah Rose
```

---

## 4. Konvensi Penamaan Berkas & Variabel

| Kategori | Konvensi | Contoh |
| :--- | :--- | :--- |
| **Komponen React** | `PascalCase.tsx` | `VpnAccountCard.tsx`, `InvoiceTable.tsx` |
| **Custom Hooks** | `camelCase.ts` (`use` prefix) | `useBilling.ts`, `useVpnAccounts.ts` |
| **API Client** | `<domain>.api.ts` | `finance.api.ts`, `vpn.api.ts` |
| **Tipe Data / DTO** | `<domain>.types.ts` | `finance.types.ts`, `vpn.types.ts` |
| **Views Komposit** | `<Feature>View.tsx` | `BillingInvoicesView.tsx`, `DepositView.tsx` |
| **Rute App Router** | `page.tsx`, `layout.tsx` | `src/app/(dashboard)/billing/page.tsx` |
| **Dokumentasi** | `kebab-case.md` | `coding-standards.md`, `architecture.md` |

---

## 5. Token Desain Semantik (Tailwind CSS v4 & Dark Palette)

Dilarang keras memakai arbitrary hex codes sembarangan di JSX. Gunakan palette token semantik Cobalt Tactical:

```css
/* Background Surfaces */
bg-zinc-950        /* Background canvas utama */
bg-zinc-900/80     /* Background card & panel sekunder */
bg-zinc-900/40     /* Hover state table row */

/* Borders */
border-zinc-800    /* Border utama container */
border-zinc-800/80 /* Border halus separator */
border-zinc-700    /* Border saat hover */

/* Tipografi */
text-zinc-100      /* Teks judul & data penting */
text-zinc-300      /* Teks paragraf utama */
text-zinc-400      /* Teks label & placeholder */
text-zinc-500      /* Teks keterangan sekunder / waktu */

/* Aksen Warna */
bg-blue-600        /* Warna aksen primer GoVPN (#2563eb) */
text-blue-400      /* Teks aksen primer */
text-emerald-400   /* Status aktif / sukses / online */
text-amber-400     /* Status peringatan / QRIS pending / latensi sedang */
text-rose-400      /* Status error / offline / batas kuota habis */
```

---

## 6. Checklist Verifikasi Mandiri Sebelum Commit

Sebelum AI atau developer menyatakan suatu tugas selesai:

- [ ] Apakah `"use client";` ada di baris pertama jika file memanggil hooks atau event handlers?
- [ ] Apakah **TIDAK ADA** perintah `bun run build` atau `next build` yang dijalankan?
- [ ] Apakah verifikasi tipe statis berhasil 100% tanpa error via `bun x tsc --noEmit`?
- [ ] Apakah seluruh Card yang menampung dropdown/popover sudah memakai `overflow-visible relative z-20`?
- [ ] Apakah seluruh data teknis (IP, Port, UUID, URL, Saldo) menggunakan `font-mono`?
- [ ] Apakah komponen menggunakan primitives dari `@/components/ui/` (Shadcn UI)?
- [ ] Apakah tombol salin menggunakan komponen terpadu `CopyButton`?
- [ ] Apakah seluruh interaksi asinkron memiliki indikator loading (`Loader2` spinner) dan notifikasi `toast`?

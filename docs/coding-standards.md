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

### 2.2 Aturan Organisasi dalam Modul Bisnis — Standar Resmi Pola C (Role-Partitioned)

Seluruh modul bisnis di `src/modules/<feature>/` **WAJIB** menerapkan **Pola C: Role-Partitioned Module**:

```
src/modules/<feature>/
├── types/
│   ├── index.ts                   # Re-export barrel
│   ├── <feature>.types.ts         # Core Domain Entity (dipakai semua)
│   ├── user.types.ts              # Request/Response DTO khusus User
│   ├── seller.types.ts            # DTO khusus Seller / Reseller
│   └── admin.types.ts             # DTO khusus Superadmin
├── api/
│   ├── index.ts                   # Unified API object: { user, seller, admin }
│   ├── user.api.ts                # Endpoint konsumen biasa (/api/<feature>/*)
│   ├── seller.api.ts              # Endpoint reseller (/api/seller/<feature>/*)
│   └── admin.api.ts               # Endpoint admin (/api/admin/<feature>/*)
├── hooks/
│   ├── index.ts                   # Re-export barrel
│   ├── use<Feature>User.ts        # State & logika aksi user
│   ├── use<Feature>Seller.ts      # State & logika batch/kuota seller
│   └── use<Feature>Admin.ts       # State & logika audit/CRUD admin
├── components/
│   ├── shared/                    # 🟢 Komponen atomik UI lintas role (Badge, Box, Modal)
│   ├── user/                      # 👤 Komponen UI eksklusif User biasa
│   ├── seller/                    # 💼 Komponen UI eksklusif Reseller
│   └── admin/                     # 🛡️ Komponen UI eksklusif Superadmin
└── views/
    ├── user/<Feature>View.tsx          # View utama untuk User
    ├── seller/Seller<Feature>View.tsx  # View untuk Reseller
    └── admin/Admin<Feature>View.tsx    # View untuk Admin
```

### 2.3 Aturan Impor & Batasan Dependensi Pola C:
1. **Downward Dependency Only:** Komponen `user/`, `seller/`, dan `admin/` boleh mengimpor dari `shared/`, namun komponen `shared/` **DILARANG KERAS** mengimpor dari `user/`, `seller/`, atau `admin/`.
2. **No Cross-Role Leaks:** Komponen `user/` tidak boleh mengimpor komponen dari `seller/` atau `admin/`, dan begitu juga sebaliknya.
3. **Penyimpanan Komponen Bersama:** Jika suatu komponen atomik atau dialog dibutuhkan oleh lebih dari satu role, komponen tersebut **WAJIB** berada di dalam subfolder `shared/`.

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

## 6. Rekayasa Desain Responsif Mobile & Desktop Anti-Slop (Modern Web Guidance)

Setiap halaman dan komponen yang dibangun **WAJIB** menerapkan prinsip modern web development resmi:

### 6.1 Viewport Dinamis & Anti-Horizontal Overflow
1. **Dilarang memakai `min-h-screen` atau `100vh`** pada container utama karena menyebabkan lonjakan layout (*layout jump*) saat URL bar browser smartphone (iOS Safari / Android Chrome) muncul atau tenggelam.
   - **Wajib:** Gunakan `min-h-dvh` (*dynamic viewport height*).
2. **Dilarang memakai `100vw` untuk elemen full-width** karena `100vw` mengabaikan lebar scrollbar vertikal di Windows/macOS yang memicu horizontal scrollbar cacat (*side-scrolling*).
   - **Wajib:** Gunakan `w-full` atau `100%`.
3. **Dilarang memakai fixed width absolut** (seperti `w-[600px]`) yang merusak tampilan smartphone.
   - **Wajib:** Gunakan `w-full max-w-xl` dengan padding horizontal responsif `px-4 sm:px-6`.

### 6.2 Ergonomi Sentuh Layar Ponsel (Touch Targets $\ge 44\text{px}$)
Di perangkat sentuh (smartphone & tablet):
- Seluruh tombol aksi utama, input form, icon button, dan trigger dropdown **WAJIB** memiliki area sentuh minimal **$44\times 44\text{px}$** (`min-h-11`, `h-11`, atau `p-3`).
- Jarak antar tombol interaktif minimal **8px** (`gap-2` atau `space-y-2`) untuk mencegah salah sentuh (*misclicks*).

### 6.3 Komponen Sadar Ukuran: Container Queries (`@container`)
Gunakan **Container Queries** pada komponen kartu VPN, node server, dan tabel agar komponen dapat beradaptasi secara modular terhadap ruang induknya:
```tsx
// Pembungkus kartu diberi kelas @container
<div className="@container w-full">
  <div className="flex flex-col @md:flex-row @md:items-center justify-between gap-4">
    {/* Stacked di kontainer sempit, side-by-side di kontainer lebar */}
  </div>
</div>
```

### 6.4 Stabilitas Tata Letak & Scrollbar (CLS = 0)
1. **Pencegahan Pergeseran Konten:** Terapkan `scrollbar-gutter: stable` pada kontainer daftar panjang agar saat data dimuat, munculnya scrollbar tidak menggeser posisi elemen (Cumulative Layout Shift = 0).
2. **Isolasi Scroll:** Terapkan `overscroll-behavior: contain` pada modal, drawer, dan tabel agar aktivitas scroll pengguna tidak merembet ke halaman latar belakang (*no scroll bubbling*).

### 6.5 Adaptive Overlay: Dialog vs Bottom Sheet (Drawer)
- **Desktop ($\ge 768\text{px}$):** Tampilkan modal melayang di tengah layar (`<Dialog>`).
- **Mobile ($< 768\text{px}$):** Tampilkan swipeable bottom sheet (`<Drawer>` berbasis Vaul atau `<Sheet side="bottom">`) agar tombol aksi berada dalam jangkauan natural jempol pengguna (*thumb zone*).

---

## 7. Checklist Verifikasi Mandiri Sebelum Commit (Anti-Slop AI)

Sebelum AI atau developer menyatakan suatu tugas selesai:

- [ ] Apakah `"use client";` ada di baris pertama jika file memanggil hooks atau event handlers?
- [ ] Apakah **TIDAK ADA** perintah `bun run build` atau `next build` yang dijalankan?
- [ ] Apakah verifikasi tipe statis berhasil 100% tanpa error via `bun x tsc --noEmit`?
- [ ] Apakah tampilan telah diuji responsif pada lebar layar mobile (`375px`), tablet (`768px`), dan desktop (`1280px+`)?
- [ ] Apakah tidak ada overflow horizontal pada layar ponsel (tidak ada scrollbar ke kanan/kiri yang tidak disengaja)?
- [ ] Apakah seluruh Card yang menampung dropdown/popover sudah memakai `overflow-visible relative z-20`?
- [ ] Apakah seluruh data teknis (IP, Port, UUID, URL, Saldo) menggunakan `font-mono`?
- [ ] Apakah komponen menggunakan primitives dari `@/components/ui/` (Shadcn UI)?
- [ ] Apakah tombol aksi utama menggunakan bentuk Pill 56px (`rounded-full`) sesuai `opendesign.md`?
- [ ] Apakah tombol salin menggunakan komponen terpadu `CopyButton`?
- [ ] Apakah seluruh interaksi asinkron memiliki indikator loading (`Loader2` spinner) dan notifikasi `toast`?


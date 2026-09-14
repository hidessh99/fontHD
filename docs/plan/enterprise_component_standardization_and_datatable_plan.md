# Master Architecture Plan: Enterprise Component Standardization & Unified DataTable System

Dokumen arsitektur ini memetakan rencana komprehensif, terstruktur, aman, scalable, dan bebas memory leak (*zero leak*) untuk menstandarisasi seluruh komponen UI di **GoVPN Next.js 16** (`G:\WEB2026\fontgovpn`).

Target utama adalah menyelaraskan seluruh tabel, pencarian, paginasi, dropdown filter, empty state, dan form controls di seluruh modul bisnis dengan standar **shadcn/ui** berbasis **Coinbase High-Trust Design System**.

---

## 1. Executive Summary & Core Requirements

Berdasarkan audit mendalam terhadap seluruh lapisan komponen:
1. **UI Layer Kematangan Tinggi (90%)**: Terdapat 51 komponen atomik shadcn/ui di `src/components/ui/`, termasuk `table.tsx`, `pagination.tsx`, `search-input.tsx`, `empty.tsx`, `select.tsx`, dan `native-select.tsx`.
2. **Module Layer Terfragmentasi (25%)**: Sebanyak **20 komponen tabel** di 8 modul bisnis (`iam`, `finance`, `dns`, `kubernetes`, `monitor`, `subscription`, `support`, `content`, `ai`) masih menggunakan elemen HTML mentah `<table>`, `<select>`, dan `<input>` tanpa paginasi terstandarisasi.
3. **Mandat Eksplisit User**:
   - **Click-to-Search Only**: Pencarian data **hanya aktif saat pengguna mengklik tombol Cari** (atau submit form melalui tuts `Enter`). Mengetik di kolom search tidak boleh memicu filtering instan atau me-render ulang data tabel secara agresif.
   - **Zero Bug & Zero Leak**: Arsitektur wajib bebas dari potensi memory leak (penghapusan event listener, abort controller pada request asinkron, proteksi unmount state) dan bebas runtime bug (null-safety pada filter string, boundary pagination aman, zero division guard).
   - **Scalable & Efficient**: Mendukung dataset lokal di memori maupun transisi mulus ke server-side query tanpa membongkar antarmuka komponen.

---

## 2. Arsitektur Komponen 3-Tier

Untuk menjamin modularitas dan skalabilitas tingkat enterprise, sistem dibagi menjadi 3 tier yang terisolasi dengan rapi:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              TIER 3: FEATURE MODULES                                   │
│  AdminUserTable | AdminBillingTable | PodListTable | DnsRecordTable | AdminTicketTable │
└───────────────────────────────────────────▲────────────────────────────────────────────┘
                                            │ Konsumsi Konfigurasi Kolom & Data
┌───────────────────────────────────────────┴────────────────────────────────────────────┐
│                    TIER 2: SHARED UNIFIED DATA TABLE LAYER                             │
│                  (src/components/shared/data-table/DataTable.tsx)                      │
│  ├── DataTableToolbar.tsx        (Explicit Click-to-Search + Filter Select Slots)      │
│  ├── DataTableCore.tsx           (Generic <TData> Renderer + Sort Headers)             │
│  ├── DataTablePagination.tsx     (Standardized Page Size & Safe Boundary Paging)       │
│  ├── DataTableRowSkeleton.tsx    (Zero-Layout-Shift Shimmer Rows)                      │
│  └── DataTableEmptyState.tsx     (Integrated Fallback Display)                         │
└───────────────────────────────────────────▲────────────────────────────────────────────┘
                                            │ Komposisi Primitives
┌───────────────────────────────────────────┴────────────────────────────────────────────┐
│                       TIER 1: SHADCN / RADIX PRIMITIVES                                │
│                     (src/components/ui/ [Purity Standardized])                         │
│  ├── table.tsx         (Table, TableHeader, TableBody, TableRow, TableCell)            │
│  ├── pagination.tsx    (Cleaned from wise-green tokens -> 100% Theme Primary)          │
│  ├── search-input.tsx  (Draft State + Explicit Submit Button + Reset Action)           │
│  ├── native-select.tsx (Normalized Border, Focus & Chevron Indicator)                  │
│  ├── empty.tsx         (Atomic Empty Primitives)                                       │
│  └── skeleton.tsx      (Base Shimmer Loader)                                           │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Spesifikasi Teknis: Zero-Leak & Click-to-Search Architecture

### 3.1 Pola "Click-to-Search" (Draft-Commit State Separation)

Pada implementasi lama, pencarian menggunakan state tunggal yang terikat langsung ke event `onChange`:
```tsx
// ❌ POLA LAMA (ANTI-PATTERN): Mengetik memicu filtering sinkron pada setiap tuts
<Input value={search} onChange={(e) => setSearch(e.target.value)} />
const filtered = items.filter(...) // Dieksekusi puluhan kali saat mengetik cepat
```

Pada standar baru, state dipisahkan menjadi dua lapisan:
1. **Draft State (`draftQuery`)**: Berada di dalam input search. Berubah saat user mengetik, namun **tidak memicu filtering atau re-render data tabel**.
2. **Committed State (`appliedQuery`)**: Hanya diperbarui ketika:
   - Pengguna mengklik tombol **Cari (Search Button)**.
   - Pengguna menekan tombol `Enter` (form submission).
   - Pengguna mengklik tombol **Reset/Hapus (`X`)**, yang seketika mengosongkan `draftQuery` sekaligus `appliedQuery`.

```tsx
// ✅ POLA ENTERPRISE BARU: Click-to-Search dengan Zero Unnecessary Re-render
export function useTableSearch(initialValue: string = "") {
  const [draftQuery, setDraftQuery] = useState(initialValue);
  const [appliedQuery, setAppliedQuery] = useState(initialValue);

  const handleSearchCommit = useCallback((query?: string) => {
    const target = query !== undefined ? query : draftQuery;
    setAppliedQuery(target.trim());
  }, [draftQuery]);

  const handleSearchClear = useCallback(() => {
    setDraftQuery("");
    setAppliedQuery("");
  }, []);

  return {
    draftQuery,
    setDraftQuery,
    appliedQuery,
    handleSearchCommit,
    handleSearchClear,
  };
}
```

### 3.2 Proteksi Zero Memory Leak & Safe Async Handling

Untuk menjamin **zero leak**, seluruh komponen tabel dan filter menerapkan kaidah rekayasa berikut:
1. **AbortController untuk Async Requests**: Jika tabel terhubung dengan server-side search atau fetch API, request sebelumnya otomatis dibatalkan (*aborted*) jika pencarian baru dilakukan sebelum response selesai.
2. **Unmount Safety**: Tidak ada pembaruan state pada komponen yang telah di-unmount.
3. **Event Listener Cleanup**: Seluruh custom listener (misalnya keyboard shortcut `⌘K` atau resize observer) memiliki fungsi cleanup eksplisit di `useEffect`.
4. **No Closure Leaks pada Event Handlers**: Menggunakan `useCallback` dan `useMemo` dengan dependency array yang presisi agar garbage collector dapat membersihkan referensi lama tanpa tertahan.

```tsx
// Contoh penanganan asynchronous zero-leak pada server-side fetch:
useEffect(() => {
  const abortController = new AbortController();

  async function fetchData() {
    try {
      setIsLoading(true);
      const res = await fetchUsers({ query: appliedQuery, page }, { signal: abortController.signal });
      setData(res.items);
    } catch (err: unknown) {
      if ((err as Error).name !== "AbortError") {
        toast.error("Gagal memuat data tabel");
      }
    } finally {
      if (!abortController.signal.aborted) {
        setIsLoading(false);
      }
    }
  }

  fetchData();

  return () => {
    abortController.abort(); // Membersihkan pending request saat query/page berganti atau komponen di-unmount
  };
}, [appliedQuery, page]);
```

### 3.3 Proteksi Zero Runtime Bug (Safe Boundary Guards)

1. **Null/Undefined Search Sanitization**:
   ```ts
   // Mencegah TypeError: Cannot read properties of null (reading 'toLowerCase')
   const safeIncludes = (val: unknown, query: string): boolean => {
     if (val === null || val === undefined) return false;
     return String(val).toLowerCase().includes(query.toLowerCase());
   };
   ```
2. **Safe Boundary Pagination**:
   ```ts
   // Mencegah NaN, 0, atau pembagian dengan nol
   const safePageSize = Math.max(1, pageSize);
   const safeTotal = Math.max(0, total);
   const totalPages = Math.max(1, Math.ceil(safeTotal / safePageSize));
   const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
   ```
3. **Immutable Sorting**:
   ```ts
   // Tidak melakukan mutasi in-place array.sort()
   const sorted = [...data].sort((a, b) => ...);
   ```

---

## 4. Rincian Pembersihan UI Primitives (Phase 1)

Sebelum wrapper tabel dibangun, sisa-sisa token desain lama (*legacy tokens*) pada `src/components/ui/` dibersihkan:

### 4.1 Pembersihan `src/components/ui/pagination.tsx`
- **Isu Saat Ini**: Baris 66 menggunakan `bg-wise-green text-dark-green`, baris 131 menggunakan `hover:bg-wise-green/10 hover:text-wise-green`, dan baris 304 menggunakan `focus:border-wise-green`.
- **Standarisasi**:
  - Ganti active link pill dengan `bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs`.
  - Ganti hover state dengan `hover:bg-accent hover:text-accent-foreground`.
  - Ganti selector page size dengan `<NativeSelect size="sm">` atau styling border token `focus:border-primary focus:ring-1 focus:ring-primary`.

### 4.2 Pembersihan `src/components/ui/search-input.tsx`
- **Isu Saat Ini**: Baris 80 menggunakan `focus:border-emerald-600 dark:focus:border-emerald-500`, dan `hideSubmitButton` secara default bernilai `true`.
- **Standarisasi**:
  - Ubah `hideSubmitButton` menjadi opsi default `false` atau jadikan tombol "Cari" selalu terlihat dengan label/ikon yang rapi.
  - Ganti warna focus ring menjadi `focus:border-primary focus:ring-1 focus:ring-primary`.
  - Pastikan event `onSubmit` memicu `onSearch(draftValue)` dan mencegah submit form bawaan browser (`e.preventDefault()`).

### 4.3 Pembersihan `src/components/ui/native-select.tsx`
- **Isu Saat Ini**: Baris 14 & 16 menggunakan `focus:border-emerald-600 dark:focus:border-wise-green`.
- **Standarisasi**:
  - Ganti dengan `focus:border-primary focus:ring-1 focus:ring-primary`.

### 4.4 Konsolidasi Empty State
- Hubungkan `src/components/shared/EmptyState.tsx` agar menggunakan komponen atomik primitif dari `src/components/ui/empty.tsx`, menjaga antarmuka kompatibilitas ke belakang (*backward-compatible*) dengan prop `icon: LucideIcon`.

---

## 5. Blueprint Unified Enterprise DataTable Component (Phase 2)

Dibuat di `src/components/shared/data-table/`:

### 5.1 Definisi Kolom Type-Safe (`types.ts`)
```ts
export interface ColumnDef<TData> {
  id: string;
  header: string | React.ReactNode;
  cell: (item: TData, index: number) => React.ReactNode;
  className?: string;
  headerClassName?: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  sortAccessor?: (item: TData) => string | number | boolean;
}

export interface DataTableFilterOption {
  label: string;
  value: string;
}

export interface DataTableFilterConfig<TData> {
  id: string;
  label: string;
  options: DataTableFilterOption[];
  filterFn: (item: TData, value: string) => boolean;
}
```

### 5.2 Antarmuka Komponen `<DataTable<TData>>`
```tsx
export interface DataTableProps<TData> {
  // Data & Kolom
  data: TData[];
  columns: ColumnDef<TData>[];
  keyExtractor: (item: TData) => string | number;

  // State Status
  isLoading?: boolean;
  loadingRowsCount?: number;

  // Pencarian (Click-to-Search)
  searchable?: boolean;
  searchPlaceholder?: string;
  searchButtonText?: string;
  searchAccessor?: (item: TData) => string[];

  // Filter Kategori (Dropdown)
  filters?: DataTableFilterConfig<TData>[];

  // Paginasi
  paginated?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];

  // Custom Toolbar Actions (Slot Kanan: Add, Export, Refresh)
  actions?: React.ReactNode;

  // Empty State Fallback
  emptyIcon?: LucideIcon;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: React.ReactNode;

  // Styling & Kontainer
  className?: string;
  tableClassName?: string;
}
```

### 5.3 Flow Eksekusi Internal `<DataTable<TData>>`
1. **Input Search Draft**: Disimpan dalam `draftSearch`. User dapat mengetik tanpa filter data berjalan.
2. **Search Action Trigger**: Saat tombol "Cari" diklik atau user menekan Enter, `activeSearch` diisi dengan `draftSearch`.
3. **Filtering Pipeline (Memoized)**:
   ```ts
   const filteredData = useMemo(() => {
     let result = data;

     // 1. Terapkan Active Search (Hanya jika ada)
     if (activeSearch && searchAccessor) {
       const query = activeSearch.toLowerCase();
       result = result.filter((item) => {
         const fields = searchAccessor(item);
         return fields.some((f) => f && f.toLowerCase().includes(query));
       });
     }

     // 2. Terapkan Dropdown Filters
     if (filters && filters.length > 0) {
       result = result.filter((item) => {
         return filters.every((filter) => {
           const selectedVal = activeFilters[filter.id] || "ALL";
           if (selectedVal === "ALL") return true;
           return filter.filterFn(item, selectedVal);
         });
       });
     }

     return result;
   }, [data, activeSearch, activeFilters, searchAccessor, filters]);
   ```
4. **Pagination Slicing**:
   ```ts
   const totalItems = filteredData.length;
   const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
   const currentPage = Math.min(Math.max(1, page), totalPages);

   const paginatedData = useMemo(() => {
     if (!paginated) return filteredData;
     const start = (currentPage - 1) * pageSize;
     return filteredData.slice(start, start + pageSize);
   }, [filteredData, paginated, currentPage, pageSize]);
   ```
5. **Auto-Reset Page saat Search**: Ketika pengguna mengklik tombol "Cari" baru, nomor halaman otomatis kembali ke halaman 1 (`setPage(1)`).

---

## 6. Matrix Migrasi 20 Komponen Tabel (Phase 3)

Seluruh 20 komponen tabel di modul bisnis akan dimigrasikan menggunakan format declarative columns standar:

| No | Modul | File Komponen | Fitur Search Yang Dimigrasikan | Dropdown Filters |
|:---|:---|:---|:---|:---|
| 1 | IAM | `iam/components/admin/AdminUserTable.tsx` | Click-to-Search: Username, Email, ID | Role Filter (`USER`, `SELLER`, `ADMIN`, `SUPERADMIN`) |
| 2 | IAM | `iam/components/admin/AdminUserActivityTable.tsx` | Click-to-Search: User ID, Action, IP | Action Type Filter |
| 3 | Finance | `finance/components/admin/AdminBillingTable.tsx` | Click-to-Search: User ID, Description | Type Filter (`TOPUP`, `ADMIN_ADJUST`, `REFUND`) |
| 4 | Finance | `finance/components/user/InvoiceTable.tsx` | Click-to-Search: Invoice No, Plan Name | Status Filter (`PENDING`, `PAID`, `EXPIRED`) |
| 5 | Kubernetes | `kubernetes/components/admin/AdminK8sServerTable.tsx` | Click-to-Search: Node Name, IP, Region | Status Filter (`READY`, `NOT_READY`, `MAINTENANCE`) |
| 6 | Kubernetes | `kubernetes/components/admin/AdminK8sSpecTable.tsx` | Click-to-Search: Spec Name, CPU, RAM | Type Filter (`STANDARD`, `HIGH_MEM`, `GPU`) |
| 7 | Kubernetes | `kubernetes/components/admin/AdminK8sTemplateTable.tsx` | Click-to-Search: Template Name, Image | Category Filter |
| 8 | Monitor | `monitor/components/admin/AdminMonitorTable.tsx` | Click-to-Search: Server Host, Tag, Location | Health Filter (`HEALTHY`, `DEGRADED`, `DOWN`) |
| 9 | DNS | `dns/components/admin/AdminDnsAccountTable.tsx` | Click-to-Search: Email, Account ID | Provider Filter (`CLOUDFLARE`, `ROUTE53`) |
| 10 | DNS | `dns/components/admin/AdminGlobalRecordTable.tsx` | Click-to-Search: Hostname, Value, Zone | Record Type Filter (`A`, `AAAA`, `CNAME`, `TXT`) |
| 11 | DNS | `dns/components/user/UserDnsRecordTable.tsx` | Click-to-Search: Subdomain, Target IP | Record Type Filter |
| 12 | Subscription | `subscription/components/admin/AdminPlanTable.tsx` | Click-to-Search: Plan Title, Slug | Billing Cycle Filter (`MONTHLY`, `ANNUAL`) |
| 13 | Subscription | `subscription/components/admin/AdminSubscriptionTable.tsx` | Click-to-Search: Subscription ID, User | Status Filter (`ACTIVE`, `EXPIRED`, `CANCELLED`) |
| 14 | Subscription | `subscription/components/seller/SellerCustomerSubscriptionTable.tsx` | Click-to-Search: Customer Name, Plan | Status Filter |
| 15 | Support | `support/components/admin/AdminTicketTable.tsx` | Click-to-Search: Subject, Ticket ID, User | Status & Priority Filter (`OPEN`, `RESOLVED`, `HIGH`, `URGENT`) |
| 16 | Notification | `notification/components/admin/AdminQueueTable.tsx` | Click-to-Search: Recipient, Channel | Queue Status Filter (`PENDING`, `SENT`, `FAILED`) |
| 17 | AI | `ai/components/admin/AdminAiModelTable.tsx` | Click-to-Search: Model Name, Provider | Family Filter (`CHAT`, `EMBEDDING`, `AUDIO`) |
| 18 | AI | `ai/components/admin/AdminAiProviderTable.tsx` | Click-to-Search: Provider Name, Base URL | Status Filter (`ACTIVE`, `INACTIVE`) |
| 19 | Content | `content/components/admin/AdminPostTable.tsx` | Click-to-Search: Post Title, Slug, Author | Status Filter (`PUBLISHED`, `DRAFT`, `ARCHIVED`) |
| 20 | Content | `content/components/admin/AdminSettingsTable.tsx` | Click-to-Search: Key, Description | Group Filter (`SEO`, `SYSTEM`, `PAYMENT`) |

---

## 7. Roadmap Implementasi Bertahap

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        ROADMAP STANDARISASI KOMPONEN GOVPN                             │
├────────────────────────────────────────────────────────────────────────────────────────┤
│  PHASE 1: Pembersihan Token Primitives & Hardening UI Layer                            │
│  ├── Bersihkan wise-green di src/components/ui/pagination.tsx                          │
│  ├── Tambahkan fitur explicit submit button di src/components/ui/search-input.tsx      │
│  ├── Perbaiki focus ring di src/components/ui/native-select.tsx                         │
│  └── Harmonisasi EmptyState ke arah primitif src/components/ui/empty.tsx               │
├────────────────────────────────────────────────────────────────────────────────────────┤
│  PHASE 2: Pembangunan Enterprise Unified <DataTable<TData>>                            │
│  ├── Buat src/components/shared/data-table/types.ts                                    │
│  ├── Buat src/components/shared/data-table/DataTableToolbar.tsx (Click-to-Search)      │
│  ├── Buat src/components/shared/data-table/DataTableRowSkeleton.tsx                    │
│  ├── Buat src/components/shared/data-table/DataTable.tsx (Generics + Memoized Engine)  │
│  └── Buat src/components/shared/data-table/index.ts                                    │
├────────────────────────────────────────────────────────────────────────────────────────┤
│  PHASE 3: Migrasi Bertahap 20 Tabel Modul                                              │
│  ├── Batch 1: IAM & Finance (AdminUserTable, AdminBillingTable, InvoiceTable)          │
│  ├── Batch 2: Kubernetes & Monitor (Servers, Specs, Templates, Monitoring)             │
│  ├── Batch 3: DNS & Subscription (DnsRecords, Plans, Subscriptions)                    │
│  └── Batch 4: Support, Notification, AI & Content (Tickets, Queues, Models, Posts)     │
├────────────────────────────────────────────────────────────────────────────────────────┤
│  PHASE 4: Verifikasi, Zero-Leak Audit & Quality Assurance                              │
│  ├── Verifikasi Bun Type-check: bun run typescript (0 errors)                          │
│  ├── Verifikasi Linter: bun run lint (0 warnings)                                      │
│  ├── Tes Click-to-Search: Mengetik di input TIDAK boleh memfilter data                 │
│  ├── Tes Tombol Cari & Tombol Reset: Filter aktif hanya saat submit atau clear         │
│  └── Validasi Responsiveness: Uji tampilan di viewport Mobile (375px) & Desktop (1440px)│
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. Verifikasi & Pengujian Kualitas

1. **Uji Fungsionalitas Click-to-Search**:
   - Buka halaman tabel (misal Superadmin User Table).
   - Ketik `"admin"` pada kolom pencarian -> **Hasil tabel tetap menampilkan data awal tanpa filter**.
   - Klik tombol **"Cari"** -> **Tabel seketika memfilter hanya baris yang sesuai kata kunci, dan pagination mereset ke halaman 1**.
   - Tekan tombol **"X" (Clear)** -> Kolom input kosong dan tabel kembali menampilkan seluruh data awal.
2. **Uji Paginasi & Boundary Guard**:
   - Ganti Page Size dari `10` ke `20` -> Tabel menyesuaikan jumlah baris secara instan.
   - Pada halaman terakhir, tombol "Berikutnya" wajib nonaktif (`disabled`).
   - Pada halaman pertama, tombol "Sebelumnya" wajib nonaktif (`disabled`).
3. **Uji Zero Memory Leak**:
   - Melakukan navigasi bolak-balik antara halaman Admin Users, Billing, dan Kubernetes.
   - Memastikan tidak ada peringatan *"Can't perform a React state update on an unmounted component"* di console browser.
   - Memastikan tidak ada penumpukan event listener atau pending network connections pada browser DevTools.
4. **Uji Type Safety & Lint**:
   - Menjalankan `bun run typescript` -> Hasil wajib 100% clean dengan 0 error.
   - Menjalankan `bun run lint` -> Hasil wajib 100% clean dengan 0 error.

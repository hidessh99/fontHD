# 🛡️ GoVPN Security Policy & Responsible Disclosure

## 🔒 Supported Versions

Kami secara aktif memelihara, mengaudit, dan merilis pembaruan keamanan (*security patches*) untuk versi aktif berikut:

| Version | Supported | Next.js Baseline | Architecture Baseline | Status |
| :--- | :---: | :--- | :--- | :--- |
| **0.1.x (Current)** | :white_check_mark: | 16.3.x (App Router) | React 19 • Bun • Turbopack | **Active Security Support** |
| **< 0.1.0** | :x: | Legacy | Deprecated Monolith | End of Life (EOL) |

---

## 🚨 Reporting a Vulnerability (Pelaporan Kerentanan)

**GoVPN Security & Infrastructure Team** mengutamakan keamanan data pengguna, integritas protokol tunneling multi-tenant, dan proteksi sesi *Zero-Logs*. Jika Anda menemukan celah atau potensi kerentanan keamanan (*vulnerability*), mohon bantu kami melalui proses **Responsible Disclosure** pada saluran privat resmi kami.

> [!CAUTION]
> **JANGAN MEMBUAT ISSUE PUBLIK DI GITHUB UNTUK LAPORAN KERENTANAN KEAMANAN.**
> Mohon jangan mendiskusikan atau mempublikasikan kerentanan sebelum tim pengembang kami merilis patch perbaikan resmi demi melindungi seluruh pengguna aktif.

---

### 📬 Saluran Pelaporan Resmi:

1. **GitHub Private Vulnerability Reporting** *(Direkomendasikan)*:  
   Gunakan fitur resmi [Security &rarr; Report a vulnerability](../../security/advisories/new) di repositori ini.
2. **Email Tim Keamanan**:  
   Kirimkan detail temuan terenkripsi ke:
   - **Email**: [`security@hidessh.com`](mailto:security@hidessh.com) (cc: [`support@hidessh.com`](mailto:support@hidessh.com))
   - **Subjek**: `[SECURITY VULNERABILITY REPORT] fontgovpn - <Judul Singkat>`
3. **Emergency Escalation (Telegram)**:  
   Untuk insiden kritis / *zero-day exposure*:  
   - **Official Dispatch**: [https://t.me/hidessh](https://t.me/hidessh)

---

## 📋 Informasi yang Diperlukan dalam Laporan

Untuk mempercepat verifikasi, triase, dan perbaikan, mohon sertakan informasi teknis berikut:

- **Jenis Kerentanan**: (misal: XSS, CSRF, Session Hijacking, Token Leak, SSRF, RCE, IDOR, Protocol Evasion Bypass).
- **Komponen Terdampak**: Route path, API endpoint, middleware guard, atau modul spesifik.
- **Langkah Reproduksi (*Step-by-step reproduction*)**: Langkah jelas dan konsisten beserta *Proof of Concept (PoC)*, cURL payload, atau skrip uji.
- **Dampak Potensial (*Impact Assessment*)**: Tingkat risiko terhadap kerahasiaan data pengguna, saldo reseller, atau stabilitas node.
- **Lingkungan Pengujian**: Versi browser, OS, Node.js / Bun runtime yang digunakan saat pengujian.

---

## ⏱️ Response Time & SLA

Kami berkomitmen merespons setiap laporan secara cepat dan transparan:

- **Konfirmasi Penerimaan**: Tim kami akan mengonfirmasi tanda terima laporan dalam waktu **maksimal 24 jam**.
- **Triase & Analisis**: Verifikasi teknis dan penilaian tingkat keparahan (*CVSS Score*) diselesaikan dalam **48 jam**.
- **Rilis Patch Keamanan**:
  - **Critical / High**: Patch mitigasi dirilis dalam **1–3 hari kerja**.
  - **Medium / Low**: Patch dimasukkan ke dalam siklus rilis terjadwal berikutnya.
- **Pengakuan Peneliti (*Hall of Fame / Credits*)**: Kami menghargai kontribusi etis para peneliti keamanan (*White Hat Researchers*). Nama atau alias Anda akan dicantumkan secara terhormat pada catatan rilis resmi (*Release Notes*).

---

## 🏛️ Arsitektur Keamanan Bawaan GoVPN

Repositori ini mengimplementasikan lapisan pertahanan berstandar industri:
- **Zero-Logs Architecture**: Buffer memori *ephemeral* (RAM-only tmpfs) tanpa jejak riwayat penjelajahan di media penyimpanan persisten.
- **Strict Content-Security-Policy (CSP)**: Pencegahan injeksi skrip berbahaya (*XSS*) dan *framing attacks* (*Clickjacking*).
- **HttpOnly & SameSite=Strict Cookie Storage**: Proteksi token autentikasi IAM dari akses sisi klien (*Document Cookie Hijacking*).
- **Real-Time DPI & Evasion Resistance**: Standarisasi tunneling TLS 1.3 Reality & WireGuard *kernel-level zero-copy*.

---

**GoVPN Enterprise Infrastructure**  
*Official Web*: [https://hidessh.com](https://hidessh.com)  
*Telegram Community*: [https://t.me/hidessh](https://t.me/hidessh)

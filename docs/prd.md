# Product Requirements Document (PRD) — GoVPN Enterprise Platform

**Platform:** GoVPN Web Client & Reseller/Admin Management Console  
**Framework:** Next.js 16 (App Router + Turbopack), React 19, Bun, Tailwind CSS v4, Shadcn UI  
**Target Backend:** GoVPN High-Performance Go Modular Microservices (388 Modern REST Endpoints)  
**Document Status:** Production Ready (SSOT)  
**Version:** 2.0.0

---

## 1. Executive Summary & Vision

### 1.1 Product Vision

GoVPN is an ultra-modern, enterprise-grade cloud networking and digital infrastructure platform designed to democratize high-speed, censorship-resistant internet tunneling, autonomous Cloudflare DNS routing, containerized micro-applications, and OpenAI-compatible AI gateway access.

Built on a unified **Tri-Role Architecture** (`USER`, `SELLER`, and `ADMIN`), GoVPN empowers individual privacy seekers, digital nomads, business resellers, and superadmin infrastructure teams to provision, manage, bill, and monitor thousands of high-speed VPN endpoints in seconds.

### 1.2 Core Business Value

- **Zero-Friction Tunnel Provisioning:** 1-click generation, instant QR code rendering, and clipboard copy for 6 modern tunneling protocols (SSH/Dropbear, VMess, VLess Reality, Trojan-GFW, Shadowsocks, WireGuard).
- **Multi-Tenant Wholesale Distribution (Reseller Hub):** Allows `SELLER` accounts to purchase discounted bulk quotas, set custom end-user margins, manage sub-tenants, and withdraw commissions.
- **Autonomous Financial Settlement:** Dynamic QRIS generation (Midtrans/Tripay/Duitku/Xendit) with automated polling and sub-3-second ledger settlement.
- **Unified Cloud Ecosystem:** Integrated Cloudflare DNS zone management, real-time node telemetry, and Kubernetes micro-app deployments.

---

## 2. Tri-Role Actor Matrix & User Personas

| Role Attribute         | `USER` (Customer / Member)                                                                 | `SELLER` (Reseller / Distributor)                                                                            | `ADMIN` (Superadmin / Operator)                                                                                  |
| :--------------------- | :----------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| **Target Persona**     | Digital nomad, gamer, privacy seeker needing fast & bypass-capable VPN.                    | ISP agent, reseller, agency providing VPNs to regional clients.                                              | Lead devops, infrastructure engineer, platform owner.                                                            |
| **Primary Goals**      | Quick VPN account creation, low-ping node selection, easy QR scan, instant balance top-up. | Quota bulk purchase, custom tenant branding, sub-account management, profit withdrawal.                      | Global server node CRUD, financial ledger auditing, 40 automated cron tasks control, AI provider provisioning.   |
| **Access Scope**       | Personal VPN accounts, own invoices, DNS records, AI playground, personal support tickets. | All user features + Reseller Portal, Tenant CRUD, Bulk Account Minting, Reseller Wallet, Commission Cashout. | Full system access: `/admin/*`, user balance adjustments, global server health, cron execution via `X-Cron-Key`. |
| **Auth Boundary**      | Standard Member JWT (`ROLE_USER`)                                                          | Reseller JWT (`ROLE_SELLER`)                                                                                 | Superadmin JWT (`ROLE_SUPERADMIN`)                                                                               |
| **Default Land Route** | `/dashboard`                                                                               | `/dashboard` (with `/seller/*` unlocked)                                                                     | `/admin/dashboard`                                                                                               |

---

## 3. Product Epics & Technical Requirements (Mapped to 388 Backend Endpoints)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             GOVPN EPIC TOPOLOGY                                  │
├────────────────────────┬─────────────────────────────┬───────────────────────────┤
│ EPIC 1: IAM & Security │ EPIC 2: Multi-Protocol VPN  │ EPIC 3: Finance & Billing │
│ (05-iam - 48 routes)   │ (11-vpn - 83 routes)        │ (04-finance - 49 routes)  │
├────────────────────────┼─────────────────────────────┼───────────────────────────┤
│ EPIC 4: DNS Cloudflare │ EPIC 5: AI Model Gateway    │ EPIC 6: K8s Containers   │
│ (03-dns - 18 routes)   │ (01-ai - 35 routes)         │ (06-kubernetes - 18 rts)  │
├────────────────────────┼─────────────────────────────┼───────────────────────────┤
│ EPIC 7: Subscription   │ EPIC 8: Support & Desk      │ EPIC 9: Cronjob & Monitor │
│ (09-subscription - 40) │ (10-support - 21 routes)    │ (07, 12, 00 - 51 routes)  │
└────────────────────────┴─────────────────────────────┴───────────────────────────┘
```

---

### Epic 1: Identity & Access Management (IAM)

_Mapped to `05-iam` (48 routes)_

1. **Self-Service Authentication:**
   - User registration (`POST /api/auth/register`), multi-factor login (`POST /api/auth/login`), password recovery (`POST /api/auth/forgot-password`).
   - Session storage via `httpOnly`, `Secure`, `SameSite=Strict` cookie named `hide-jwt`.
   - Dynamic Edge guard in `src/proxy.ts` enforcing 0ms FOUC redirection based on cookie presence and decoded claims.
2. **Profile & Security Settings:**
   - Password mutation (`POST /api/users/change-password`).
   - Telegram ID binding for instant notification of account expiration (<3 days).
   - Activity audit logs (`GET /api/users/activities`) with IP, User-Agent, and geolocation tracing.
3. **Role-Based Permissions (RBAC):**
   - Seamless token refreshment (`POST /api/auth/refresh-token`).
   - Superadmin override to lock/ban compromised accounts (`PATCH /api/admin/users/:id/status`).

---

### Epic 2: Multi-Protocol VPN Fleet & Tunnel Provisioning

_Mapped to `11-vpn` (83 routes)_

1. **Protocol Engine Coverage:**
   - Full support for:
     - **SSH / Dropbear:** Port 22, 443 (SSL/TLS), Websocket CDN payload support.
     - **VMess:** WS, gRPC, TCP TLS with AlterID, UUID authentication, and Base64 client link generation.
     - **VLess Reality:** Zero-RTT TLS camouflage, SNI spoofing, Reality Public Key, ShortID, SpiderX support.
     - **Trojan:** Pure TLS handshake bypass on port 443 with WebSocket CDN fallback.
     - **Shadowsocks:** AEAD ciphers (`chacha20-ietf-poly1305`, `aes-256-gcm`).
     - **WireGuard:** Multi-peer keypair generation (`PrivateKey`, `PublicKey`, `PresharedKey`), endpoint address assignment, MTU 1420 configuration.
2. **Account Types & Lifecycles:**
   - **Free / Trial Accounts (`/api/account-free/*`):** Rate-limited to 1 account per user per 24 hours, auto-expiry in 3 days.
   - **Monthly / Premium Accounts (`/api/vpn-accounts-month/*`):** Billed monthly, renewable via wallet balance.
   - **Pay-As-You-Go Accounts:** Hourly balance deduction based on uptime.
   - **Seller Wholesale Minting (`/api/seller/vpn/*`):** Bulk minting of 10-100 accounts in one API batch.
3. **1-Click Deployment UX:**
   - Instant config copy button with Sonner visual confirmation.
   - In-modal QR code generation for camera scan on v2rayNG, Clash, Sing-Box, Shadowrocket, and WireGuard mobile apps.
   - Technical credentials rendered strictly in **JetBrains Mono** (`font-mono`).

---

### Epic 3: High-Velocity Automated Finance & Billing

_Mapped to `04-finance` (49 routes)_

1. **Real-Time Payment Gateways:**
   - Support for **QRIS Instant** (BCA, GoPay, Mandiri, OVO, ShopeePay, Dana, LinkAja) via Midtrans / Tripay / Duitku.
   - Automated polling mechanism (3-second intervals) checking `GET /api/invoice/:id` until status transitions from `PENDING` to `PAID`.
   - Webhook ingress (`POST /api/webhook/xendit`, Midtrans IPN) verifying cryptographic signature before balance disbursement.
2. **Accounting Ledger & Invoices:**
   - Immutable double-entry transaction history (`GET /api/billing`): `TOPUP`, `PURCHASE`, `RENEWAL`, `REFUND`.
   - PDF/HTML invoice generation with VAT calculation and official billing numbers.
3. **Reseller Commission & Withdrawals:**
   - Reseller wallet separation (`balance`, `pending_clearance`, `withdrawable`).
   - Withdrawal request pipeline (`POST /api/seller/withdrawal`, `POST /api/withdrawal`) with bank routing and admin audit approval (`PATCH /api/admin/withdrawal/status`).
4. **Promotional Engine:**
   - Coupon voucher validation (`POST /api/vouchers/validate`) with percentage or flat discount calculation.

---

### Epic 4: Cloudflare DNS Zone & Host Pointing

_Mapped to `03-dns` (18 routes)_

1. **Domain Zone Sync:**
   - Direct integration with Cloudflare API via Go backend.
   - Zone selection (`GET /api/dns/domains`) supporting multiple platform-managed domains.
2. **Record CRUD Operations:**
   - Creation of `A`, `AAAA`, `CNAME`, and `TXT` records (`POST /api/dns/records`).
   - Dynamic toggle for Cloudflare Orange Cloud (Proxied CDN) vs Gray Cloud (DNS Only Direct).
   - TTL selector (Automatic, 60s, 300s, 3600s).
   - Automatic VPN node pointing: User clicks "Point to Server" to auto-create `[node]-[user].domain.com` without manual IP typing.

---

### Epic 5: Enterprise AI Model Gateway & Token Playground

_Mapped to `01-ai` (35 routes)_

1. **Unified AI Routing:**
   - Proxy access to OpenAI, Anthropic, Google Gemini, DeepSeek, and Groq via standardized `/api/ai/v1/*` endpoint.
   - Model catalog selector (`GET /api/ai/models-active`) with context length and token pricing cards.
2. **Chat Playground & API Keys:**
   - Interactive chat completion interface with markdown rendering, streaming tokens, and syntax-highlighted code blocks.
   - User-managed API key generation (`POST /api/ai/api-keys`) for external integrations.
   - AI Wallet balance management (`GET /api/ai/wallet`) with automated balance deduction per 1,000 prompt/completion tokens.

---

### Epic 6: Kubernetes Micro-Container App Orchestration

_Mapped to `06-kubernetes` (18 routes)_

1. **Template-Driven App Deployment:**
   - Pre-configured deployment templates (`GET /api/kubernetes/templates`): Shadowsocks-Rust, WireGuard-Easy, Sing-Box Node, AdGuard Home, Speedtest Tracker.
   - Resource specification selection (`GET /api/kubernetes/specs`): Micro (0.5 vCPU, 512MB RAM), Standard (1 vCPU, 1GB RAM), Turbo (2 vCPU, 2GB RAM).
2. **Pod Lifecycle & Live Telemetry:**
   - Deployment dispatch (`POST /api/kubernetes/deploy`).
   - Pod control: Restart (`POST /api/kubernetes/apps/:id/restart`), Renew (`PUT /api/kubernetes/apps/:id/renew`), Environment mutation (`PUT /api/kubernetes/apps/:id/env`).
   - Real-time container log streaming (`GET /api/kubernetes/apps/:id/logs`) displayed in terminal emulator drawer.

---

### Epic 7: Subscription & Multi-Tenant Reseller Hierarchy

_Mapped to `09-subscription` (40 routes)_

1. **Tiered Pricing Matrix:**
   - Visual tier comparison (`GET /api/plan`): Member, Reseller Silver, Reseller Gold, Enterprise Partner.
   - Automated plan upgrade with prorated balance deduction (`POST /api/subscription/upgrade`).
2. **Seller Tenant Isolation:**
   - Reseller tenant creation (`POST /api/seller/tenant`) and member quota allocation.
   - Reseller dashboard metrics (`GET /api/seller/dashboard/stats`): Monthly Gross Revenue, Active Sub-Users, Quota Utilization, Net Margin.

---

### Epic 8: Support Desk & Customer Communication

_Mapped to `10-support` (21 routes)_

1. **Ticketing Pipeline:**
   - Ticket creation (`POST /api/ticket`) categorized by: Billing, VPN Connection, Server Node Issue, Reseller Inquiry.
   - Priority levels: Low, Normal, High, Critical.
2. **Real-Time Thread Messaging:**
   - Conversation history (`GET /api/ticket/:id/reply`) with chronological message bubbles.
   - Support staff reply badges, image attachment uploads (`POST /api/ticket/upload`), and resolved/closed status transitions.

---

### Epic 9: Superadmin Core, Node Health & 40 Cron Tasks

_Mapped to `00-health`, `07-monitor`, `12-cronjob` (51 routes)_

1. **Global Server Node CRUD:**
   - Admin server management (`/api/admin/servers`, `/api/admin/monitor`): Add new physical/VPS nodes, configure IP, location, flags, maximum bandwidth, and port bindings.
2. **40 Automated Cron Task Trigger Portal:**
   - Visual grid of all 40 scheduled maintenance jobs:
     - `cleanup-expired-records`, `cleanup-ai-usage`, `sync-midtrans-pending`, `sync-tripay-pending`, `expired-topup`, `check-uptime`, `process-queue`, `reset-stock`, `generate-monthly-invoice`.
   - 1-click manual trigger executing `/api/cronjob/*` with secure administrative header `X-Cron-Key`.
   - Real-time execution status badges (Success, In-Progress, Failed).

---

## 4. Non-Functional Requirements (NFRs)

### 4.1 Security & Zero-Trust Architecture

- **JWT Protection:** All sensitive tokens stored exclusively in `httpOnly` secure cookies.
- **Content Security Policy (CSP):** Strict script-src and connect-src directives preventing unauthorized external socket injection.
- **Edge Route Protection:** All member, seller, and admin routes guarded at the edge runtime via `src/proxy.ts` (0ms FOUC).
- **Sensitive Credential Camouflage:** Passwords and private keys masked by default with reveal/hide toggle buttons.

### 4.2 Performance & Reliability Benchmarks

- **Core Web Vitals:**
  - **LCP (Largest Contentful Paint):** $\le 1.2\text{ s}$
  - **INP (Interaction to Next Paint):** $\le 100\text{ ms}$
  - **CLS (Cumulative Layout Shift):** $0.00$
- **Streaming SSR:** App Router layouts streamed using React 19 Suspense boundaries.
- **Memory Safety:** Virtualized tables (`@tanstack/react-virtual`) utilized for logs or lists exceeding 50 items.
- **Build Guard:** Zero build freezes on developer/production machines.

### 4.3 Design System & Accessibility

- **Design Tokens:** Strict alignment with Shadcn UI and Cobalt Tactical dark design palette.
- **Accessibility:** WCAG 2.1 Level AA compliance, full keyboard navigation for Cmd+K search and modal dialogs.
- **Localization:** 100% string coverage across English (`en`) and Indonesian (`id`).

---

## 5. Success Metrics & Key Performance Indicators (KPIs)

1. **QRIS Conversion Velocity:** Average time from invoice generation to payment settlement $\le 30\text{ seconds}$.
2. **Time to First Connection:** User onboarding to successful VPN config copy $\le 45\text{ seconds}$.
3. **Reseller Retention:** Over 85% monthly renewal rate on active reseller tenant accounts.
4. **Error Rate:** Frontend uncaught exception rate $\le 0.01\%$ across all route navigations.

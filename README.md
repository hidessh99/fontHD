

Enterprise web client for infrastructure platform, built on Next.js 16 (App Router + Turbopack), React 19, Bun, Tailwind CSS v4, and synchronized 1:1 with 388 modern endpoints from `postman-govpn`.

---

## ⚡ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Streaming SSR, Turbopack)
- **UI Engine:** [React 19](https://react.dev/) + React Server Components (RSC)
- **Runtime:** [Bun](https://bun.sh/) (`bun@1.4.2`)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (CSS variables, `@theme inline`)
- **UI Primitives:** Complete suite of 51 [shadcn/ui](https://ui.shadcn.com/) & Base UI components
- **Theme:** [next-themes](https://github.com/pacocoursey/next-themes) (Dark Tactical Theme default)
- **State Management:** [Zustand 5](https://zustand-demo.pmnd.rs/)
- **Validation:** [Zod 4](https://zod.dev/)
- **Virtualization:** [@tanstack/react-virtual](https://tanstack.com/virtual)
- **Toast Notifications:** [Sonner](https://sonner.emilkowal.ski/)
- **Iconography:** [Lucide React](https://lucide.dev/)

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
bun install

# 2. Run local development with Turbopack
bun run dev

# 3. Static type check
bun run typescript
```

---

## 🏛️ Architecture & Documentation

- **Design System & Architecture Specification:** [`docs/design.md`](docs/design.md)
- **Master Implementation Plan:** [`docs/plan/frontend_nextjs16_implementation_plan.md`](docs/plan/frontend_nextjs16_implementation_plan.md)
- **API Contracts:** 388 modern REST endpoints in `postman-govpn`

---

## 📜 License

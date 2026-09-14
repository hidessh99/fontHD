# ==============================================================================
# GoVPN Frontend (Next.js 16 + React 19 + Turbopack + Bun) Makefile
# Location: G:\WEB2026\fontgovpn\Makefile
# ==============================================================================

BUN ?= bun
.DEFAULT_GOAL := help

.PHONY: help install dev build start preview lint lint-fix typecheck types format format-check check verify fix clean clean-all fresh

help:
	@echo ==============================================================================
	@echo  GoVPN Frontend Workflow Commands (Next.js 16 + Bun)
	@echo ==============================================================================
	@echo   make dev          - Jalankan dev server dengan Turbopack (http://localhost:3000)
	@echo   make build        - Kompilasi aplikasi untuk produksi (next build)
	@echo   make start        - Jalankan production server hasil build
	@echo   make preview      - Alias untuk make start (preview build produksi)
	@echo   make lint         - Jalankan ESLint linter
	@echo   make lint-fix     - Auto-fix linting issues and unused imports via ESLint
	@echo   make typecheck    - Validasi tipe TypeScript (tsc --noEmit)
	@echo   make types        - Alias untuk make typecheck
	@echo   make format       - Format seluruh berkas menggunakan Prettier
	@echo   make format-check - Cek kesesuaian format kode dengan Prettier
	@echo   make check        - Jalankan seluruh inspeksi: typecheck + lint + format-check
	@echo   make verify       - Alias untuk make check
	@echo   make fix          - Format kode dan bersihkan lint otomatis (format + lint-fix)
	@echo   make install      - Pasang dependensi proyek via Bun
	@echo   make clean        - Bersihkan direktori build cache (.next dan out)
	@echo   make clean-all    - Bersihkan cache .next dan folder node_modules
	@echo   make fresh        - Bersihkan cache, instal ulang dependensi, dan verifikasi
	@echo ==============================================================================

# --- Development & Production Server ---
dev:
	$(BUN) run dev

build:
	$(BUN) run build

start:
	$(BUN) run start

preview:
	$(BUN) run preview

# --- Quality Control & Linting ---
lint:
	$(BUN) run lint

lint-fix:
	$(BUN) run lint:fix

typecheck:
	$(BUN) run typescript

types: typecheck

format:
	$(BUN) run format

format-check:
	$(BUN) run format:check

check: typecheck lint format-check

verify: check

fix: format lint-fix

# --- Dependency Management & Maintenance ---
install:
	$(BUN) install

clean:
	@$(BUN) -e "const fs = require('fs'); ['.next', 'out'].forEach(p => { if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true }); }); console.log('Cleaned build cache (.next, out).');"

clean-all:
	@$(BUN) -e "const fs = require('fs'); ['.next', 'out', 'node_modules'].forEach(p => { if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true }); }); console.log('Cleaned .next, out, and node_modules.');"

fresh: clean install check

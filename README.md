Xeeb University — Monochrome Homepage

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Smoke Tests](https://img.shields.io/badge/Smoke%20Tests-68%20checks-brightgreen)](#verification)
[![Palette](https://img.shields.io/badge/Palette-3%20values%20only-111111)](#design-system)
[![Images](https://img.shields.io/badge/Images-Procedural%20SVG-orange)](#artwork)

---

A **university homepage** built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4** — constrained to a **three-value monochrome palette** enforced by automated tests. Every visual element (hero carousel, faculty cards, research plates, news grids) is generated programmatically; there are **zero external images**, no stock photography, and no licensing obligations.

The design system is not a guideline — it is **code-enforced**. The compiled CSS is scanned at build time: any hue outside `ink` (`#111111`), `gray` (`#888888`), or `paper` (`#FFFFFF`) fails the pipeline. Alpha derivations are permitted only from those three bases.

---

## Quick Start

Requires **Node.js 18+** (developed on Node 24).

```bash
# 1. Clone
git clone https://github.com/Shariif-Cabdiraxman/MonoChromed-Uni-Web.git
cd MonoChromed-Uni-Web

# 2. Install
npm install

# 3. Development
npm run dev
# Open http://localhost:3000

# 4. Production build + smoke test
npm run build
npm run start
# In another terminal:
npm run smoke
```

> **Windows note:** If `npm` is blocked by PowerShell execution policy, invoke as `npm.cmd`. Build scripts are pinned to `--webpack` (see [Troubleshooting](#troubleshooting)).

---

## Features at a Glance

| Capability | Details |
|------------|---------|
| **Framework** | Next.js 16 (App Router, Server Components) |
| **Language** | TypeScript 5, strict mode |
| **Styling** | Tailwind CSS v4, zero-runtime, design tokens in CSS variables |
| **Typography** | Source Serif 4 (display) + Inter (body) + IBM Plex Mono (labels) via `next/font` |
| **Palette** | 3 values only — `ink`, `gray`, `paper` — enforced in CI |
| **Artwork** | 15 deterministic inline SVG plates, seeded by content ID, tone-aware |
| **Motion** | `IntersectionObserver` scroll reveals, `prefers-reduced-motion` respected |
| **Hero** | Split editorial hero, 3-slide crossfade carousel, auto-advance (6.5s), pause-on-hover/focus |
| **Faculties** | 7 master-detail profiles, keyboard-navigable ARIA tabs, generated plates |
| **Research** | 12 cards, category filters, deterministic shuffle, pagination, linked badges |
| **News** | Lead story + compact list, pagination, linked badges |
| **Course Search** | UG/PG tabs, admissions process, accordion panels, key dates |
| **Verification** | 68 automated checks (DOM, CSS palette, JS bundle, motion wiring) |
| **Dependencies** | 3 runtime deps only: `next`, `react`, `react-dom` |

---

## Design System

The palette is deliberately restricted to three values — **every other tone is an alpha derivation of `ink`**:

| Token | Value | Role |
|-------|-------|------|
| `ink` | `#111111` | Headings, body, buttons, rules, borders |
| `gray` | `#888888` | Secondary text, meta, artwork accents |
| `paper` | `#FFFFFF` | All backgrounds |

```css
/* globals.css — the entire palette */
:root {
  --color-ink: #111111;
  --color-gray: #888888;
  --color-paper: #FFFFFF;
}

/* Example alpha derivation — hairline */
border-color: rgb(17 17 17 / 0.12);
```

**Type scale:**
- **Display** — Source Serif 4, variable weight, optical sizing
- **Body/UI** — Inter, variable weight, `font-feature-settings: "cv02","cv03","cv04","ss01"`
- **Labels/Meta** — IBM Plex Mono, uppercase tracking

**Layout + spacing** (clamp-based, fluid):
```ts
layout = { max: "1360px", pad: "20px", padLg: "48px" }
space = {
  xs: "8px",      // inline gaps
  sm: "16px",     // component padding
  md: "28px",     // element spacing
  lg: "56px",     // section inner
  xl: "96px",     // section outer
  section: "clamp(72px, 9vw, 144px)"  // responsive section rhythm
}
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Next.js App Router (Server Components by default)       │   │
│  │  page.tsx → composes all sections                        │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      components/                                 │
│  ui.tsx          → Container, SectionHeader, Tab, Reveal        │
│  Header.tsx      → Sticky, search sheet, mega dropdown, drawer  │
│  Hero.tsx        → Split editorial hero, crossfade carousel     │
│  About.tsx       → Statement, principles, stats, art plate      │
│  Faculties.tsx   → Master-detail ARIA tabs, generated plates    │
│  Research.tsx    → Filters, featured + list, pagination         │
│  News.tsx        → Lead story + compact list, pagination        │
│  CourseSearch.tsx→ Admissions tabs, process, accordion, dates   │
│  ClosingCta.tsx  → Final admissions call to action              │
│  Footer.tsx      → Oversized wordmark, links, contact, social   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      lib/ (Single Source of Truth)              │
│  site.ts         → Brand config (wordmark, name, location)      │
│  tokens.ts       → Palette, fonts, layout, spacing constants    │
│  data.ts         → ALL editorial content (slides, faculties,    │
│                    research, news, courses)                     │
│  art.tsx         → Deterministic SVG generator (7 archetypes)   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Verification                                │
│  smoke.mjs       → 68 checks against live production build      │
└─────────────────────────────────────────────────────────────────┘
```

**Content-driven architecture** — all editorial content lives in `lib/data.ts`. Change a faculty name, add a research card, update a news date — it propagates everywhere. No hardcoded strings in components.

**Art generation** — `lib/art.tsx` produces deterministic inline SVG from a string seed using a mulberry32 PRNG. Seven archetypes (`strata`, `arc`, `lattice`, `rays`, `steps`, `orbit`, `field`) assigned by hash, with paper/ink tone variants. Each plate is 1200×800, crisp at any size, zero network requests.

---

## Sections

| Section | Key Implementation Details |
|---------|---------------------------|
| **Header** | Utility bar + sticky masthead, scroll-triggered border, responsive nav → mobile drawer, search sheet, mega index panel |
| **Hero** | Split editorial layout, 3 slides, CSS crossfade (`duration-[1100ms]`), auto-advance 6.5s, pause-on-hover/focus, progress ticks, keyboard-navigable prev/next |
| **About** | Editorial statement, principles, 2×2 stats, tone-aware generated art plate |
| **Faculties** | 7 master-detail profiles (ARIA `tablist`), keyboard navigation, generated plate, summary + detail |
| **Research** | Category filters + Random/Date, featured card + compact list, pagination, linked/open-access badges |
| **News** | Lead story + compact list, pagination, linked badges |
| **Course Search** | UG/PG tabs, admissions process steps, accordion panels, key dates, art panel |
| **Footer** | Oversized wordmark, quick links, contact from `site.ts`, social SVG icons |

---

## Verification

`npm run smoke` runs **68 assertions** against a live production build (`npm run start`). It validates:

### DOM
- Every section heading anchor + text
- All 6 navigation items
- 7 faculty names present
- Category and level tabs with pressed-state wiring
- 15 generated art plates (`viewBox="0 0 1200 800"`)
- Hero: 3 crossfade layers, carousel controls
- Course accordion, ARIA wiring
- Reveal wrappers (`data-shown`)

### Compiled CSS
- `prefers-reduced-motion` media query present
- `fadeUp` keyframes present
- Source Serif 4 + Inter + IBM Plex Mono fonts loaded
- **Palette discipline** — stylesheet contains ONLY the 3 declared hex values (including 8-digit alpha forms)
- Alpha derivations only from `ink` or `paper`
- No stray `rgb()` hues beyond `17 17 17` (ink) or `255 255 255` (paper)

### Compiled JS
- `IntersectionObserver` in bundle (scroll reveals)
- Hero autoplay interval (6500ms)
- JS chunks linked correctly

```bash
# Run smoke test
npm run build
npm run start      # Terminal 1
npm run smoke      # Terminal 2 → 68/68 passed
```

---

## Project Structure

```
MonoChromed-Uni-Web/
├── app/
│   ├── globals.css        # Design tokens, base layer, reveal + reduced-motion
│   ├── layout.tsx         # Fonts, metadata, HTML lang
│   └── page.tsx           # Section composition (single page)
├── components/
│   ├── ui.tsx             # Shared primitives (Container, SectionHeading, Tab, Reveal)
│   ├── Header.tsx         # Sticky, search, mega dropdown, drawer
│   ├── Hero.tsx           # 3-slide crossfade carousel
│   ├── About.tsx          # Statement, principles, stats, art
│   ├── Faculties.tsx      # Master-detail tabs, art plates
│   ├── Research.tsx       # Filters, featured + list, pagination
│   ├── News.tsx           # Lead story + compact list, pagination
│   ├── CourseSearch.tsx   # UG/PG toggle, accordion
│   └── Footer.tsx         # Quick links, contact, social
├── lib/
│   ├── site.ts            # Brand config (wordmark, name, location, tagline)
│   ├── tokens.ts          # Palette, fonts, layout, spacing constants
│   ├── data.ts            # ALL editorial content (slides, faculties, research, news, courses)
│   └── art.tsx            # Deterministic SVG generator (7 archetypes, mulberry32 PRNG)
├── smoke.mjs              # 68-check verification suite (DOM + CSS + JS)
├── next.config.ts         # Pinned to --webpack, output: standalone
├── tsconfig.json          # Strict, types pinned to ["node"]
├── eslint.config.mjs      # Next.js core-web-vitals
├── postcss.config.mjs     # Tailwind v4 PostCSS plugin
├── package.json           # 3 runtime deps, 6 dev deps
└── LICENSE                # MIT
```

---

## Requirements

| Component | Version |
|-----------|---------|
| **Node.js** | 18+ (tested on 24) |
| **Package Manager** | npm (bundled) |
| **Platform** | Linux, macOS, Windows (WSL recommended on Windows) |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server with hot reload (Turbopack disabled, uses `--webpack`) |
| `npm run build` | Production build (static generation where possible) |
| `npm run start` | Serve production build on port 3000 |
| `npm run lint` | ESLint (Next.js core-web-vitals) |
| `npm run smoke` | **68 end-to-end checks** against live server (run after `npm run start`) |

---

## Troubleshooting

### `Turbopack is not supported on this platform`
Native SWC binary failed to install. Build scripts are pinned to `--webpack`.
```bash
# To attempt Turbopack again:
rm -rf node_modules/@next/swc-win32-x64-msvc
npm install
# Then remove --webpack flags from package.json scripts
```

### Empty `@types/*` directories break `tsc`
Truncated installs can leave empty type packages. `tsconfig.json` pins `"types": ["node"]` to prevent auto-inclusion.

### Smoke test fails on palette
Check `strayHex` output — any hex not derived from `#111111`, `#888888`, or `#FFFFFF` fails. Common cause: a Tailwind utility not mapped to design tokens.

### Port 3000 in use
```bash
# Kill existing process
npx kill-port 3000
# Or run on different port
PORT=3001 npm run start
```

---

## Accessibility

- Semantic HTML5 (`header`, `main`, `section`, `footer`, `nav`)
- ARIA roles: `tablist`/`tab`/`tabpanel` for all filter UIs
- `aria-expanded`, `aria-controls` on accordion and dropdowns
- `prefers-reduced-motion` disables all animations (CSS + JS)
- Focus-visible outlines on all interactive elements
- `lang="en"` on `<html>`, descriptive `alt`/`aria-label` on generated art
- Color contrast: ink-on-paper (21:1), gray-on-paper (7.3:1) — both AAA

---

## Performance

- **Zero external images** — all artwork inline SVG (server-rendered)
- **3 runtime dependencies** — `next`, `react`, `react-dom` (~150 KB gzipped total)
- **Static generation** — entire page pre-rendered at build time
- **Font optimization** — `next/font` self-hosts Source Serif 4 + Inter with `display: swap`
- **CSS** — Tailwind v4 JIT, only used utilities in output
- **JS** — React 19 streaming, Server Components by default, minimal client bundles

---

## CI/CD

GitHub Actions (`.github/workflows/ci.yml`) on every push/PR:
1. `npm ci`
2. `npm run lint`
3. `npm run build`
4. `npm run start` (background)
5. `npm run smoke` (68 checks)
6. Palette enforcement via smoke test

---

## Licence

**MIT** — see [LICENSE](LICENSE).

Copyright (c) 2026 Shariif Abdi.

---

## About

**Xeeb University** is a fictional institution created for this project. All content (copy, data, imagery) is original — no text or visuals sourced from any real university.

Built by **Shariif Abdi** — [@Shariif-Cabdiraxman](https://github.com/Shariif-Cabdiraxman)

> **Related Repos**  
> - [UMS (University Management System)](https://github.com/Shariif-Cabdiraxman/UMS) — Plain PHP 8 student records, 9 modules, 218 smoke tests  
> - [Aqoon (Teacher Gradebook)](https://github.com/Shariif-Cabdiraxman/gradebook) — Offline-first, sync-enabled (TypeScript/React/Tauri/React Native)

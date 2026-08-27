# Central Asian Museum — Project Guidelines & Architecture

This document contains the foundational design and architectural guidelines for the Central Asian Museum web project. **All future development, AI prompts, and code modifications MUST adhere to these rules without exception.**

---

## 1. Architectural Principles

- **Component-Based Architecture**:
  - Every UI section and feature must be structured into reusable, modular components.
  - Repeated sections (Hero, About, Exhibition Cards, CTAs, Headers, Footers, Section Headings) must be defined once and reused with props.
  - **No Duplicate Section Code**: Never copy-paste section markup across multiple pages.

- **Folder Structure**:
  - `app/`: Next.js App Router pages and layouts (`app/page.tsx`, `app/about/page.tsx`, etc.).
  - `components/ui/`: Atomic primitives (`Button`, `Icon`, `Container`, `SectionHeading`, `Card`, `Badge`).
  - `components/layout/`: Global layout components (`Header`, `Footer`, `MobileNav`).
  - `components/home/`: Specific homepage composition blocks (e.g. `Hero`, `AboutSection`).
  - `components/about/`: Specific about page composition blocks.
  - `lib/`: Utility functions, navigation configurations, shared data types.
  - `public/`: Static assets, optimized images, SVGs.

- **Server vs. Client Components**:
  - Build pages and sections as React Server Components (RSC) by default for optimal performance and SEO.
  - Only use `"use client"` when interactive state, browser events, or hooks (`useState`, `useEffect`, click handlers) are strictly required.

---

## 2. Design System & CSS Variables

- **Strict Zero-Hardcoded Colors Rule**:
  - **NEVER** use raw hex colors or arbitrary tailwind color values (e.g. `#54333B` or `bg-[#54333B]`) in TSX components.
  - Always reference the CSS variables defined in `app/globals.css` (e.g., `var(--museum-btn-bg)` or `bg-museum-wine` / `text-museum-primary`).

### Official Color Palette Tokens (from Project Swatch)
| CSS Variable | Hex Code | Swatch Name | Role |
| :--- | :--- | :--- | :--- |
| `--palette-sand` | `#D6C9B3` | Silver / Sand | Warm stone, secondary background, delicate borders |
| `--palette-rose` | `#D3A7A8` | Tan / Dusty Rose | Desert clay accent, subtle badges, decorative elements |
| `--palette-sage` | `#AFA990` | Dark Gray / Sage | **Official Base Color**: Headers, secondary accents, borders |
| `--palette-moss` | `#8F917B` | Gray / Muted Moss | Earthy foliage, antique accents, muted borders |
| `--palette-amber` | `#D28541` | Peru / Amber | Silk Road gold/terracotta highlight, star elements |
| `--palette-lapis` | `#35638E` | Dark Slate Blue | Samarkand lapis tile blue, rich cultural accent |
| `--palette-wine` | `#54333B` | Saddle Brown / Wine | **Official Button Color**: Primary CTAs, high-contrast badges |

### Semantic CSS Tokens
- `--museum-base`: Base theme tone (`#AFA990`)
- `--museum-btn-bg`: Button background (`#54333B`)
- `--museum-btn-hover`: Button hover background (`#3D232A`)
- `--museum-btn-text`: Button text (`#FFFFFF`)
- `--museum-bg`: Main canvas background (`#FAF8F5`)
- `--museum-surface`: Elevated card surface (`#FFFFFF`)
- `--museum-heading`: Heading typography color (`#282421`)
- `--museum-body`: Body text color (`#514C47`)
- `--museum-muted`: Secondary/caption text color (`#7E776F`)
- `--museum-border`: Border line color (`rgba(175, 169, 144, 0.28)`)

---

## 3. Typography System

- **Heading Font**: `Cormorant Garamond` via `--font-cormorant` / `font-heading`.
- **Body Font**: `Manrope` via `--font-manrope` / `font-sans`.
- **Heading Styles**:
  - Always use proper heading hierarchy (`h1` -> `h2` -> `h3`).
  - Section kickers: Small uppercase tracking (`tracking-[0.2em] font-medium text-[11px] md:text-[12px]`).

---

## 4. Reusable Icon Component (`<Icon />`)

- All icons across the site must be rendered through `components/ui/Icon.tsx`.
- Never insert inline ad-hoc SVGs directly into sections or pages.
- Supported icons: `arrow-right`, `arrow-up-right`, `chevron-right`, `compass`, `landmark`, `sparkles`, `calendar`, `clock`, `map-pin`, `check`, `menu`, `close`, `museum`, `search`.

---

## 5. Responsive Design Standards

- **Mobile First & Fully Adaptive**:
  - Mobile: `< 640px` (Single column, generous touch targets >= 44px, legible 15px+ body).
  - Tablet: `640px - 1024px` (Balanced gutters, 2-column or adaptable grid layouts).
  - Desktop: `>= 1024px` (Full 1440px max-width container, generous museum whitespace, 2-column hero/about).

---

## 6. SEO & Accessibility Best Practices

- Every page must export descriptive `metadata` (`title`, `description`).
- Every image rendered via `next/image` must have meaningful `alt` text and responsive `sizes`.
- Interactive elements must support keyboard focus (`focus-visible:outline-2 focus-visible:outline-offset-2`).
- Semantic HTML tags (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`) must always be used.

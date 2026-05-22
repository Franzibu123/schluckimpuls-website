# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start Vite dev server on port 3000 (with --host)
pnpm build        # Build frontend with Vite + bundle server/index.ts with esbuild → dist/
pnpm start        # Run production build (NODE_ENV=production node dist/index.js)
pnpm check        # TypeScript type-check (no emit)
pnpm format       # Prettier format all files
```

No test runner is configured despite vitest being in devDependencies — there are no test files in this repo.

## Architecture

This is a **React SPA** for **Schluck.Impuls**, a German holistic oral-health brand by Franziska Bures, targeting parents in the DACH region.

**Runtime structure:**
- `client/` — Vite-built React frontend; `client/src/` is the source root, aliased as `@`
- `server/index.ts` — Minimal Express server that only serves the built static files and falls back to `index.html` for all routes (no API endpoints)
- `shared/` — Constants shared between client and server; aliased as `@shared`
- `dist/` — Build output: `dist/public/` for the frontend bundle, `dist/index.js` for the server

**Routing** uses `wouter` (a lightweight React Router alternative). The router is defined in `client/src/App.tsx`. Current routes:
- `/` → `VarianteC` (the active homepage design)
- `/ueber-mich` → `UeberMich` (about page)

`VarianteA.tsx`, `VarianteB.tsx`, and `VarianteD.tsx` exist as alternative homepage design explorations but are **not routed**. `VarianteC` is the chosen design ("Dezent + Stylisch mit Türkis"). See `ideas.md` for the design rationale.

The `wouter` package is patched (`patches/wouter@3.7.1.patch`) to expose all registered route paths on `window.__WOUTER_ROUTES__`.

**Component library:** shadcn/ui ("new-york" style) using Radix UI primitives. Components live in `client/src/components/ui/`. Add new shadcn components with:
```bash
pnpm dlx shadcn@latest add <component-name>
```

**Styling:** Tailwind CSS v4 (configured via `@tailwindcss/vite` plugin, no `tailwind.config.js`). Brand tokens are defined as CSS custom properties in `client/src/index.css` under `@theme inline`.

## Brand Design System

**Color palette** (used as hardcoded hex in page components — the CSS variables are for shadcn/ui defaults):
- Terrakotta Orange `#de6e27` / hover `#c55a18` — primary CTA, energy, boldness
- Türkis `#4fa8a0` / hover `#3d8a84` — secondary CTA, solution-oriented elements
- Salbei `#a2b8a2` — subtle accent, "breathing room"
- Cremeweiß `#faf8f5` — background base
- Statement Black `#1a1a1a` — dark text, dark sections

**Typography:**
- `font-serif` → Fraunces (Black weight for headlines) — loaded via Google Fonts
- Body → DM Sans — loaded via Google Fonts

**Animation pattern** used throughout pages:
```tsx
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" }
  }),
};
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };
// Use whileInView with viewport={{ once: true, margin: "-80px" }} for scroll reveals
```

**Images** are served from `/manus-storage/<filename>` (proxied to a remote CDN via the `vitePluginStorageProxy` in `vite.config.ts`) or external CloudFront URLs. The proxy requires `BUILT_IN_FORGE_API_URL` and `BUILT_IN_FORGE_API_KEY` environment variables in dev.

## Page Structure Convention

Both `VarianteC.tsx` and `UeberMich.tsx` follow the same pattern: each page section is a standalone function component defined in the same file and composed at the bottom in a default export. Navigation and footer are duplicated per page to avoid shared-state coupling. Sub-pages use `/#section-id` anchor hrefs to link back to homepage sections.

## ThemeProvider

`ThemeContext` supports dark mode but is initialized with `defaultTheme="light"` and `switchable={false}` in `App.tsx` — the toggle is intentionally disabled. The site is light-mode only.

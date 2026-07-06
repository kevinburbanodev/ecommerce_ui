# Shopfront

An e-commerce storefront UI built with Next.js, TypeScript, and the FakeStore API. Part of a personal portfolio. The UI follows a "curated catalog" visual design implemented from a Claude Design handoff.

## Features

- Product grid on the home page with category filtering and live search, backed by the FakeStore API
- Product detail page with a quantity selector and "add to cart" (price shown live in the button label)
- Cart with add/remove, per-line quantity controls, and a running subtotal — persisted to `localStorage` so it survives a refresh
- Checkout form (UI only — no real payment is processed) with field-level validation via React Hook Form + Zod, a numbered 3-step layout, and a sticky order summary sidebar
- Dark/light theme toggle (dark by default), persisted in `localStorage`
- Bilingual UI: English/Spanish toggle in the header, persisted in `localStorage` — covers all navigation, labels, buttons, and validation messages. Product titles and descriptions stay in English since they come live from the FakeStore API, which has no Spanish translations
- A bottom-center toast and cart-badge pop animation confirm every "add to cart"
- Responsive layout from mobile to desktop

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS v4 + React Hook Form + Zod, organized feature-first (`src/features/<name>/{api,components,store,types,schema}`, shared code in `src/shared/`).

No API key is required — the [FakeStore API](https://fakestoreapi.com/) is public and used directly. Product data is cached by Next.js for an hour (`next: { revalidate: 3600 }`) on the server-rendered routes.

## Getting started

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — start the Next.js dev server (Turbopack)
- `npm run build` — type-check and build for production
- `npm run start` — serve the production build locally
- `npm run lint` — run ESLint

## Project structure

```
src/
  app/                # routes: / (grid), /product/[id], /cart, /checkout
  features/
    products/          # FakeStore API client, product grid/detail components
    cart/               # localStorage-backed cart context + toast trigger
    checkout/           # Zod schema + React Hook Form checkout form
  shared/
    components/         # Header, Footer, Toast
    hooks/               # useTheme (dark/light)
    i18n/                # EN/ES dictionary + LanguageProvider
    lib/                 # currency formatting, order number generation
```

See [CLAUDE.md](CLAUDE.md) for a deeper architectural walkthrough.

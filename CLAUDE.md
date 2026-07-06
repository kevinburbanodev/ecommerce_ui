# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See also [AGENTS.md](AGENTS.md): this repo pins a very recent Next.js version, and its docs (bundled at `node_modules/next/dist/docs/`) may differ from training-data assumptions — check them before relying on API shape for App Router conventions.

## Commands

- `npm run dev` — start the Next.js dev server (Turbopack)
- `npm run build` — type-checks (`tsc`) then builds for production; both steps must pass
- `npm run start` — serve the production build locally
- `npm run lint` — run ESLint (flat config, `eslint-config-next` + `eslint-plugin-react-hooks`)

Type checking is part of `build` and is the only automated correctness check — there is no test runner.

## Environment

No API key is required — the [FakeStore API](https://fakestoreapi.com/) (`https://fakestoreapi.com`) is called directly from Server Components. Its base URL is hardcoded in `src/features/products/api/products.api.ts` since there's no need to swap providers.

## Architecture

Next.js App Router + TypeScript + Tailwind CSS v4 + React Hook Form + Zod. The path alias `@/` maps to `src/`.

### Layering: `features/` vs `shared/` vs `app/`

Code is organized by feature slice, not file type. `src/app/` holds only route files (`page.tsx`) that compose feature components — no business logic lives there. Feature-specific code lives in `src/features/<name>/` with subfolders `api/`, `components/`, `store/`, `types/`, `schema/` (only the folders each feature needs). Cross-feature primitives (Header, Footer, Toast, theme hook, i18n) live in `src/shared/`.

Three features: `products` (FakeStore API client, grid/detail/rating components), `cart` (localStorage-backed context + toast trigger, no API calls), `checkout` (Zod schema + form, no API calls — the submit handler is fully client-side).

### Data fetching: Server Components fetch, Client Components render + mutate

- `src/features/products/api/products.api.ts` is the only place `fetch` is called. Each function (`getProducts`, `getProduct`, `getCategories`) hits FakeStore directly and uses `next: { revalidate: 3600 }` so Next.js caches the response for an hour instead of refetching on every request.
- The home page (`src/app/page.tsx`) and product detail page (`src/app/product/[id]/page.tsx`) are `async` Server Components that call the API layer directly and pass plain data down as props — no client-side data fetching or loading states are needed for product data.
- Route `params` are promises (current Next.js convention) — always `await params` before using dynamic segment values.
- Because nearly every visible string needs the active theme/language from React context, the *entire* rendered view for a fetched entity is a `'use client'` component (`ProductBrowser` for the grid, `ProductDetailView` for a single product) that receives the Server-Component-fetched data as a plain prop. The route file stays a thin Server Component that only fetches and hands off — don't move the `fetch` calls into the client components.

### Cart: a single localStorage-backed context, not per-page state

`src/features/cart/store/cart.context.tsx` (`CartProvider`, wraps the whole app in `src/app/layout.tsx`) is the only source of truth for cart contents. It intentionally starts with an empty array and only reads `localStorage` inside a `useEffect` (guarded by a `hasLoaded` ref before it starts persisting writes) — this is required so the server-rendered HTML and the first client render match; reading `localStorage` during the initial render would cause a hydration mismatch. `addItem`/`removeItem`/`setQuantity`/`clear` all update React state, and a separate effect persists `items` back to `localStorage` on every change. `addItem` also bumps a `toastNonce` counter, which is the only signal `Toast.tsx` and the cart badge's pop animation need — see "Feedback is CSS-driven, not timer-driven" below.

### Checkout is intentionally UI-only

`src/features/checkout/schema/checkout.schema.ts` defines a Zod schema (name/email/address/card fields, including regex-validated card number/expiry/CVC) consumed by `CheckoutForm.tsx` via `react-hook-form` + `@hookform/resolvers/zod`. The Zod messages themselves are never shown — displayed error text comes from the active language dictionary instead (see i18n below), keyed by field name. Submitting never calls a network endpoint — it just waits briefly, clears the cart, and shows a confirmation screen with a randomly generated order number (`src/shared/lib/order.ts`). Don't wire this up to a real payment provider without the user explicitly asking; the point of this project is the form UX and validation, not payments.

### Feedback is CSS-driven, not timer-driven

Both the "added to cart" toast (`src/shared/components/Toast.tsx`) and the cart badge's pop animation are keyed by a value from `CartProvider` (`toastNonce`, `itemCount`) so that remounting the element on change replays a CSS animation — no `setTimeout` + `setState` pair is used to show/auto-hide them. This sidesteps `eslint-plugin-react-hooks`'s `set-state-in-effect` rule (which this repo enforces as an error) and is simpler: the toast's `@keyframes toastLifecycle` in `globals.css` fades in, holds, and fades out entirely in CSS over 1.9s, `animation-fill-mode: forwards` leaves it invisible (and `pointer-events-none`) afterwards. If you need another transient UI confirmation, follow this pattern instead of introducing a timer.

### Design system

This UI was implemented from a Claude Design handoff (a static HTML/CSS mockup export) — treat `src/app/globals.css` as the source of truth for tokens rather than introducing new ad hoc colors.

- **Theme mechanism**: CSS custom properties in `:root` (dark, default) and `[data-theme='light']` (override), toggled by `useTheme` (`src/shared/hooks/useTheme.ts`) setting `document.documentElement.dataset.theme`, persisted to `localStorage`. Tailwind v4's `@theme inline` block maps these to utility classes (`bg-bg-base`, `bg-bg-surface`, `text-text-hi`/`text-text-mid`/`text-text-lo`, `border-border`/`border-divider`, `bg-accent`/`text-accent-text`, `text-gold`, `text-danger`) — components use those utilities, not Tailwind's default palette, so colors stay correct across both themes automatically.
- **Fonts**: Space Grotesk (headings, nav, buttons) → `font-heading`; Hanken Grotesk (body text, the Tailwind default `font-sans`); Space Mono (all numbers — prices, quantities, category eyebrows, order numbers) → `font-mono`. Any new numeric value should use `font-mono`.
- Star ratings are rendered as literal `★`/`☆` glyphs colored with `text-gold`, not an SVG or icon component — matches the source design exactly and is simpler.
- Product photography still uses real FakeStore images on a white card background (not the mockup's tinted placeholder rectangles, which existed only because the static prototype had no real product data) — this is a deliberate adaptation, not a fidelity gap.
- The header's "Shop" text link is hidden below the `sm` breakpoint (`hidden sm:inline-block`) — at 375px width the full nav (theme toggle, language toggle, Shop link, cart) overflowed the viewport and clipped the cart icon; the source design was authored at a fixed 1200×900 preview and never accounted for narrow viewports.

### Internationalization: full chrome translation, English-only product data

`src/shared/i18n/translations.ts` + `language.context.tsx` (`LanguageProvider`, wraps the app, persists to `localStorage`, defaults to `'es'` per the source design) provide an EN/ES dictionary (`useLanguage().t`) covering every static string: navigation, buttons, section headers, form labels/placeholders/validation errors, empty states, and the FakeStore category names (`t.categories[rawCategory]`). Product **titles and descriptions are never translated** — they come live from the FakeStore API in English only, and there's no reliable source for accurate Spanish translations of arbitrary catalog text. If you add a new static string anywhere in the UI, add it to both `en` and `es` in `translations.ts` rather than hardcoding English.

### Routing

Four routes: `/` (product grid), `/product/[id]` (detail), `/cart`, `/checkout`. `/product/[id]` is server-rendered on demand (no `generateStaticParams`); the other three are statically prerendered.

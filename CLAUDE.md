# CLAUDE.md

Guidance for Claude Code when working in this repository.

See also [AGENTS.md](AGENTS.md): this repo pins a very recent Next.js version. Check the bundled docs in `node_modules/next/dist/docs/` before relying on App Router APIs.

## Commands

- `npm run dev`: start the dev server (Turbopack)
- `npm run build`: type-check and build (both must pass)
- `npm run lint`: ESLint, including `eslint-plugin-react-hooks`

There is no test runner.

## Architecture

Next.js App Router + TypeScript + Tailwind CSS v4 + React Hook Form + Zod. `@/` maps to `src/`. `src/app/` holds thin routes; features own the logic.

- `features/coffee`: `coffees.ts` is the whole catalogue (local data, bilingual text, two inks per coffee). `StampArt.tsx` draws the landscapes as engraved lines, `Stamp.tsx` the perforated stamp around them.
- `features/envelope`: `envelope.context.tsx` is the cart, saved in `localStorage` as `{ id, grind, quantity }` lines. Stored data is validated on load and the coffee is looked up by id, so prices never come from storage. `Envelope.tsx` draws the envelope, the address and the postmark.
- `features/checkout`: Zod schema and the address form. Messages come from the dictionary, keyed by field name.
- `shared`: header, footer, notice, i18n, formatting.

All pages are static; product pages use `generateStaticParams`.

## Rules worth knowing

- **Hydration:** the cart starts empty and reads `localStorage` in an effect. Reading it during render breaks hydration.
- **No card fields.** This is a public demo: never collect payment data or connect a payment provider.
- **The notice is CSS-driven** (`.toast`, keyed by a counter). The repo's `set-state-in-effect` lint rule rules out timer-based toasts.
- **SVG ids:** stamps repeat on a page, so every `clipPath` id is prefixed with `useId()`. Keep that when adding a landscape.
- **i18n:** every UI string goes in both `es` and `en` in `translations.ts`; product text lives in `coffees.ts`.
- The shop, products and prices are invented and labelled as a demo. Do not add ratings, reviews or cupping scores. See `PRODUCT.md`.

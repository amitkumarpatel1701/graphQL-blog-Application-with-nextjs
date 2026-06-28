# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Next.js 13.3 **blog application** using the **Pages Router** (not App Router). It consumes a **GraphQL CMS** backend (GraphCMS/Hygrate, via `graphql-request`) as its data source, with **Tailwind CSS** + **SCSS** for styling and **Sass** as the CSS preprocessor.

The app renders blog posts, post detail pages, categories, recent posts, and related/similar posts. Data is statically generated at build time via `getStaticProps`.

## Common Commands

```bash
npm run dev          # Start dev server at http://localhost:3000 (hot reload)
npm run build        # Production build
npm run start        # Start production server (requires build first)
npm run lint         # Next.js lint (next lint)
```

Note: there are **no tests configured** (no test framework in package.json).

## Architecture & Key Conventions

### Data Layer (`services/index.js`)
All GraphQL queries live here as exported async functions. They target a single endpoint and use the `graphql-request` library. The available fetchers are:
- `getPosts()` — full post connection (used by home page `getStaticProps`)
- `getRecentPost()` — last 3 posts by `createdAt_ASC`
- getSimiliarPosts(categories, slug)` — 3 posts sharing categories, excluding current slug (note: the exported name is misspelled as `getSimiliarPosts` — **do not "fix" references**; this name is wired into component props)
- `getCategories()` — all categories

**Important: all services read `NEXT_PUBLIC_GRAPHCMS_ENDPOINT` from `process.env`.** The actual endpoint is committed in `.env` (see Environment below). Do not hardcode URLs into components — always add a fetcher to `services/` and call it.

### Path Aliases
`jsconfig.json` defines `@/*` → `./*` (project root). All cross-cutting imports use the `@/` alias (`@/services`, `@/styles`, `@/components`), which is the established convention. Use it rather than relative `../../` for anything outside the current page/component directory.

### Styling
- Tailwind for utility classes (content paths scan `app/**`, `pages/**`, `components/**`, `src/**` in `tailwind.config.js` — the `app` and `src` paths don't exist in this project, so they do nothing; actual code lives under `pages/`).
- `styles/globals.scss` defines the site-wide fixed background image (`public/bg.jpg` via `url("../public/bg.jpg")`) plus resets and a few component-extra classes (`.text-shadow`, `.adjacent-post .arrow-btn`, `.react-multi-carousel-list .arrow-btn`).
- **The `full` background image is the page backdrop** — be careful adding overlay/opacity styles that would make unreadable; existing white cards (`.bg-white`) rely on this.

### Image Handling
- CMS-hosted images bypass Next's optimizer via a custom loader exported from the **root** `util.js`: `grpahCMSImageLoader = ({ src }) => src` (note misspelling is intentional/established — imported by `PostCard.jsx` as `../../util`). Pair it with `<Image unoptimized loader={grpahCMSImageLoader} ... />`.
- For local static assets under `public/`, use direct paths or `next/image` normally.

### Component Layout (`pages/components/`)
Barrel-exported from `pages/components/index.js`: `PostCard`, `PostWidget`, `Categories`, `Layout`, `Header`.
- `Layout` (`_app.js` wraps every page) injects `Header` above page content — global nav/categories live here.
- `PostWidget` has **dual behavior**: on a post detail page it accepts `slug` + `categories` props and shows "Related Posts"; without them it shows "Recent Posts". Calling code must pass the right props.
- Categories are fetched client-side in `useEffect` (Header and Categories both call `getCategories()` independently).

### Pages ↔ Data Contract
The home page (`pages/index.js`) maps `posts` (array of `{ node, cursor }` edges from `postsConnection`) to `PostCard`s and passes `post.node` to each card. **Every PostCard receives `post.node`, not the raw service result.** Keep this shape in mind when adding new list pages.

## Environment

`.env` commits `NEXT_PUBLIC_GRAPHCMS_ENDPOINT` — a public Hygraph/GraphCMS API URL (public client key, safe to expose via `NEXT_PUBLIC_` prefix). Do not add secret keys here; anything under `NEXT_PUBLIC_` is bundled into client JS.

## Gotchas / Non-Obvious Points
- The project is **Pages Router only** (`pages/_app.js`, `pages/_document.js`, per-page `getStaticProps`). Do not introduce `app/` directory conventions (route handlers, `layout.js`, Server Components) without confirming the user wants to migrate.
- `getSimiliarPosts` has a typo in both its definition and call site — it's the public interface of `services/`. Rename it only as an explicit refactor that touches every reference.
- `tailwind.config.js` content globs include `app/**` and `src/**` that don't exist in this project, so they do nothing. Real scanning targets are `pages/**`.
- Server-side data fetching currently only happens in `index.js` `getStaticProps`. Detail/category pages that don't exist yet would follow the same `getStaticProps` → service-fetcher pattern.

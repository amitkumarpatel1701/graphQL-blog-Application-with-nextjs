# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Next.js 13.3 **blog application** using the **Pages Router** (not App Router). It was built to consume a **GraphQL CMS** backend (GraphCMS/Hygraph, via `graphql-request`), but currently runs on **local mock data** so it works offline — see Data Layer below. Styled with **Tailwind CSS** + **SCSS** (**Sass** preprocessor).

The app renders a home page (post list), post detail pages, categories, recent posts, and related/similar posts. Data is statically generated at build time via `getStaticProps`.

## Common Commands

```bash
npm run dev          # Start dev server at http://localhost:3000 (hot reload)
npm run build        # Production build
npm run start        # Start production server (requires build first)
npm run lint         # Next.js lint (next lint)
```

Note: there are **no tests configured** (no test framework in package.json).

**Dev server note:** ports 2982–3081 and 3991–4090 are blocked on this Windows machine (Hyper-V reserved ranges). Use a different port, e.g. `npm run dev -- -p 4321`.

## Architecture & Key Conventions

### Data Layer (`services/index.js`)
Contains exported async fetchers. They currently return **local mock data** (no network calls) so the app runs offline. The mock data has 5 posts, 3 authors, and 3 categories. The available fetchers are:
- `getPosts()` — full post connection (used by home page `getStaticProps`)
- `getRecentPost()` — last 3 posts by `createdAt_ASC`
- `getSimiliarPosts(categories, slug)` — 3 posts sharing categories, excluding current slug (note: the exported name is misspelled as `getSimiliarPosts` — **do not "fix" references**; this name is wired into component props)
- `getCategories()` — all categories

**Note:** the CMS (`graphql-request` + `NEXT_PUBLIC_GRAPHCMS_ENDPOINT`) is no longer called. Mock images come from `https://picsum.photos/...`. If you reconnect the CMS later, swap the mock return values back to GraphQL queries. Do not hardcode data into components — always add a fetcher to `services/` and call it.

### Path Aliases
`jsconfig.json` defines `@/*` → `./*` (project root). All cross-cutting imports use the `@/` alias (`@/services`, `@/styles`, `@/components`), which is the established convention. Use it rather than relative `../../` for anything outside the current page/component directory.

### Styling
- Tailwind for utility classes (content paths scan `app/**`, `pages/**`, `components/**`, `src/**` in `tailwind.config.js` — the `app` and `src` paths don't exist in this project, so they do nothing; actual code lives under `pages/`).
- `styles/globals.scss` defines the site-wide fixed background image (`public/bg.jpg` via `url("../public/bg.jpg")`) plus resets and a few component-extra classes (`.text-shadow`, `.adjacent-post .arrow-btn`, `.react-multi-carousel-list .arrow-btn`).
- **The `full` background image is the page backdrop** — be careful adding overlay/opacity styles that would make unreadable; existing white cards (`.bg-white`) rely on this.

### Image Handling
- Post images come from `picsum.photos` in mock data and are loaded directly via `<img>` (`PostCard`, `PostWidget`, `PostDetail`) and `next/image` with `unoptimized` + the custom loader (`Header`/`PostCard` author photo). The custom loader is in the **root** `util.js`: `grpahCMSImageLoader = ({ src }) => src` (note misspelling is intentional/established). Pair it with `<Image unoptimized loader={grpahCMSImageLoader} ... />`.
- For local static assets under `public/`, use direct paths or `next/image` normally.

### Component Layout (`pages/components/`)
Barrel-exported from `pages/components/index.js`: `PostCard`, `PostWidget`, `Categories`, `Layout`, `Header`.
- `Layout` (`_app.js` wraps every page) injects `Header` above page content — global nav/categories live here.
- `PostWidget` has **dual behavior**: on a post detail page it would accept `slug` + `categories` props and show "Related Posts"; as now called (no props) it shows "Recent Posts".
- Categories are fetched client-side in `useEffect` (Header and Categories both call `getCategories()` independently).

### Pages
- `pages/index.js` — home page, lists all posts via `getPosts()` in `getStaticProps`.
- `pages/post/[slug].js` — post detail page. Uses `getStaticProps` (finds post by slug) and `getStaticPaths` (one path per post slug). Body content is lorem ipsum placeholder since the CMS only stored title/excerpt/metadata.

### Pages ↔ Data Contract
The home page (`pages/index.js`) maps `posts` (array of `{ node, cursor }` edges from `postsConnection`) to `PostCard`s and passes `post.node` to each card. **Every PostCard receives `post.node`, not the raw service result.** Keep this shape in mind when adding new list pages.

## Environment

`.env` commits `NEXT_PUBLIC_GRAPHCMS_ENDPOINT` — a public Hygraph/GraphCMS API URL (public client key, safe to expose via `NEXT_PUBLIC_` prefix). Do not add secret keys here; anything under `NEXT_PUBLIC_` is bundled into client JS.

## Gotchas / Non-Obvious Points
- The project is **Pages Router only** (`pages/_app.js`, `pages/_document.js`, per-page `getStaticProps`). Do not introduce `app/` directory conventions (route handlers, `layout.js`, Server Components) without confirming the user wants to migrate.
- `getSimiliarPosts` has a typo in both its definition and call site — it's the public interface of `services/`. Rename it only as an explicit refactor that touches every reference.
- `tailwind.config.js` content globs include `app/**` and `src/**` that don't exist in this project, so they do nothing. Real scanning targets are `pages/**`.
- `pages/components/Header.jsx` had a `<spna>` typo (now fixed) — watch for similar JSX typos when editing components.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The HARNESS Project is a sexual health education platform ("Fearless. Protected. Empowered.") featuring an interactive SafER sex toolkit with agreements builder, daily affirmations, trust-building journeys, and the MATCH puzzle chain framework. It's built as a static PWA with Capacitor for mobile app packaging.

**Domain:** theharnessproject.org (Vercel, auto-deploys from main branch)

## Commands

```bash
npm start                # Local dev server at http://localhost:3000 (uses npx serve)
npm run validate         # Validate HTML + JS (scripts/validate-js.js)
npm run validate:js      # JS validation only
npm run lint             # ESLint on js/*.js (no config file, uses CLI flags)
npm run build            # Validate + build check (scripts/build-check.js)
npm run build:prod       # Full production build validation
npm run mobile:build     # Build + Capacitor sync
npm run capacitor:sync   # Sync web assets to mobile projects
npm run capacitor:ios    # Open Xcode
npm run capacitor:android # Open Android Studio
npm run icons:generate   # Generate PWA icons (requires sharp)
```

No compilation step — edit files directly and test in browser. Zero npm dependencies (no `node_modules` needed for the site itself; `npx` commands install tools on-the-fly).

**What validation checks:**
- `validate:js` — Scans `js/*.js` for console statements (warn), merge conflict markers (error), debugger statements (error).
- `build:check` — Verifies critical files exist, scans HTML for merge conflicts, validates service worker precache references match real files, validates `manifest.json` fields.

## Architecture

**Stack:** Vanilla HTML/CSS/JavaScript — no framework, no bundler.

**Key Files:**
- `app.html` — Main interactive application (toolkit, affirmations, agreements builder, Lil Z chat)
- `index.html` — Landing page
- `toolkit.html` — Visual gallery with free/premium resource cards
- `js/toolkit.js` — Gallery logic (filtering, preview, download)
- `js/toolkit-data.js` — Content data (toolkit resources with external image URLs)
- `js/lil-z-chat.js` — AI companion chatbot with CDC/WHO guidelines knowledge base (version-tracked, review schedule built in)
- `service-worker.js` — PWA caching (cache-first for static assets, network-first for `/api/` and `/tables/`)
- `manifest.json` — PWA manifest (start_url: `/app.html`)
- `capacitor.config.json` — Mobile app config (appId: `com.harnessproject.app`)

**Two Navigation/Footer Loaders (use one per page, not both):**
1. `js/harness-global.js` — Preferred. Injects **footer only** (not nav) as inline HTML, loads `css/harness-components.css`. Usage: `<script src="js/harness-global.js" defer></script>`. Pages using this must include their own `<nav>` in the HTML.
2. `js/universal-loader.js` — Older approach. Fetches both `components/standard-nav.html` and `components/standard-footer.html` via fetch(), adjusts relative paths with regex. Note: `standard-nav.html` uses **absolute URLs** (theharnessproject.org) while the loader adjusts `../` prefixed paths only.

Both auto-detect page depth for correct relative paths (`./`, `../`, `../../`).

**CSS Variable System** (defined in `css/global.css`):
- Brand: `--harness-teal` (#00B0BD), `--harness-gold`, `--harness-magenta`
- App aliases: `--color-teal` (#00BDBD), `--color-gold` (#F6CC00), `--color-magenta` (#DD0E6E)
- Semantic: `--color-safe`, `--color-bold`, `--color-bg`, `--color-surface`, `--color-text`, `--color-border`
- Typography: Inter (body), Poppins (headings), Bree Serif (loaded via `css/fonts.css` for special use). All imported from Google Fonts + local base64 fallback for Bree Serif.

**Logger** (`js/logger.js`): Use `HARNESSLogger.log/error/warn/info/debug()`. Auto-suppresses non-error logs in production (detected by hostname !== localhost). `error()` always logs, even in production.

## Branding Colors

| Name | Hex | CSS Variable |
|------|-----|-------------|
| Primary Teal | `#00BDBD` | `--color-teal` |
| Gold | `#F6CC00` | `--color-gold` |
| Magenta | `#DD0E6E` | `--color-magenta` |
| Gray | `#737373` | `--color-gray` |
| Light Gray | `#F5F7FA` | `--color-bg` |

Note: `--harness-teal` (#00B0BD) differs slightly from `--color-teal` (#00BDBD). Use `--color-teal` for consistency.

## Service Worker

Cache version constant `CACHE_VERSION` in `service-worker.js` (currently `'harness-v1.0.0'`) must be bumped when updating cached assets. Precache list is hardcoded — add new critical assets to `PRECACHE_ASSETS` array.

## Python Utilities

Root-level Python scripts for batch operations: `audit_website.py`, `batch-update-pages.py`, `fix_navigation.py`, `find_issues.py`, `fix_all_issues.py`, `change-domain.py`. Run with `python <script>.py`. Note: `find_issues.py` has a hardcoded Linux path (`/home/ubuntu/theharnessproject`) that needs adjustment for local use.

## Notes

- Many `.md` files in root and `archive/` are session logs and documentation — not code. The `archive/session-logs/` directory is historical.
- Debug/test HTML files (`*-debug.html`, `*-test.html`) are excluded from crawling via `robots.txt`.
- `package-lock.json` is gitignored — no lock file is committed.
- No `.env` file is needed for basic development; only required if using MoltBook API integration.
- Some HTML files are very large (toolkit.html ~6 MB, participant-companion.html ~5.5 MB) due to inline content — avoid reading them in full when only modifying specific sections.

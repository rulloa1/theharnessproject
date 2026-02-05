# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The HARNESS Project is a sexual health education platform ("Fearless. Protected. Empowered.") featuring an interactive SafER sex toolkit with agreements builder, daily affirmations, trust-building journeys, and the MATCH puzzle chain framework. It's built as a static PWA with Capacitor for mobile app packaging.

## Architecture

**Stack:** Vanilla HTML/CSS/JavaScript - no build system or framework dependencies

**Key Files:**
- `app.html` - Main interactive application (toolkit, affirmations, agreements builder)
- `index.html` - Landing page
- `toolkit.html` - Visual gallery and resources
- `js/toolkit.js` - Core application logic
- `js/harness-global.js` - Universal navigation with path-aware component loading
- `js/toolkit-data.js` - Content data (MATCH puzzles, affirmations, resources)
- `service-worker.js` - PWA offline functionality and caching
- `capacitor.config.json` - Mobile app configuration

**Component System:**
Navigation and footer are loaded dynamically via `js/universal-loader.js` or `js/harness-global.js` from `components/`. Path detection auto-adjusts relative paths based on page depth:
```
Root level: ./components/
One level deep: ../components/
Two levels deep: ../../components/
```

**CSS Organization:**
Modular stylesheets in `/css/` - feature-specific files (e.g., `match-puzzle-chain.css`, `daily-affirmations.css`) plus core files (`styles.css`, `global.css`, `fonts.css`).

## Development

**No build commands** - edit files directly and test in browser.

**Local testing:** Serve with any static server (e.g., `python -m http.server` or VS Code Live Server)

**Mobile app commands (Capacitor):**
```bash
npx cap add ios
npx cap add android
npx cap sync
npx cap open ios
npx cap open android
```

**Deployment:** Vercel (auto-deploys from main branch to theharnessproject.org)

## Branding Colors

- Primary Teal: `#00BDBD`
- Gold: `#F6CC00`
- Magenta: `#DD0E6E`
- Gray: `#737373`
- Light Gray: `#F5F7FA`

## Python Utilities

Several Python scripts exist for batch operations:
- `audit_website.py` - Site audit
- `batch-update-pages.py` - Bulk page updates
- `fix_navigation.py` - Navigation link fixes
- `find_issues.py` / `fix_all_issues.py` - Issue detection and fixing

## Testing/Debug Files

Files like `app-debug.html`, `app-test.html`, `app-diagnostic.html` exist for debugging - these are excluded from search engine crawling via robots.txt.

# The Harness Project

A comprehensive sexual health education platform built for **Christopher Zacharie** and the Harness Project organization. Live at [theharnessproject.org](https://theharnessproject.org).

## Overview

The Harness Project empowers young people with fearless, aware, and protected sexual health education. This repository contains the full static PWA website including interactive toolkit, e-book, curriculum resources, and the Lil Z AI chat assistant.

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Homepage / landing |
| `about.html` | About the organization |
| `app.html` | Main interactive app |
| `toolkit.html` | Full educator toolkit |
| `toolkit-mobile.html` | Mobile-optimized toolkit |
| `curriculum-landing.html` | Curriculum resources |
| `ebook-complete.html` | Full digital e-book |
| `ebook-access.html` | E-book access page |
| `educator-package-complete.html` | Complete educator package |
| `participant-companion.html` | Participant companion guide |
| `pricing.html` | Pricing & packages |
| `checkout.html` | Checkout flow |
| `contact.html` | Contact page |
| `infographic-gallery.html` | Infographic gallery |
| `interactive-hub.html` | Interactive learning hub |
| `newsletter.html` | Newsletter signup |

## Tech Stack

- **Frontend**: Vanilla HTML/CSS/JavaScript
- **PWA**: Service worker + manifest for offline support
- **AI**: Lil Z chat assistant (OpenAI-powered)
- **Mobile**: Capacitor config for native app wrapping
- **Payments**: Stripe checkout integration

## Structure

```
├── index.html          # Homepage
├── js/                 # JavaScript modules
│   ├── harness-global.js
│   ├── seo-optimizer.js
│   └── ...
├── css/                # Stylesheets
├── images/             # Image assets
├── icons/              # PWA icons
├── components/         # Shared HTML components
├── scripts/            # Build/utility scripts
├── docs/               # Documentation & guides
└── manifest.json       # PWA manifest
```

## Development

This is a static site — open any `.html` file directly in a browser, or run a local server:

```bash
npm install
npm start
```

## Documentation

All planning docs, guides, and changelogs are in the `/docs` folder.

## License

© The Harness Project. All rights reserved.

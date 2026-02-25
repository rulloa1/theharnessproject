# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A self-contained static web page for "NEXUS - Precision Engineered Spaces" (an architecture portfolio concept). No build step, no package manager, no dependencies to install. Open `index.html` directly in a browser or serve it with any static file server.

## How to Run

```bash
# Quickest way (Python, no install needed)
python -m http.server 8000
# Then open http://localhost:8000
```

The page loads `ezgif-frame-001.jpg` through `ezgif-frame-300.jpg` from the same directory, so it **must** be served — file:// won't load the frames due to browser CORS restrictions.

## Architecture

Everything lives in `index.html`. No external JS files. Dependencies loaded from CDN:

- **Tailwind CSS** (via CDN `<script>`) — utility classes for layout/typography
- **GSAP 3.12 + ScrollTrigger** — drives the scroll-scrub animation
- **Google Fonts** — Inter typeface

### Scroll Animation Flow

A single GSAP timeline is pinned to `#CanvasSection` for 400% of viewport height (`end: "+=400%"`). While pinned, three things happen simultaneously:

1. **Frame sequence** — `imageSeq.frame` tweens 0→299; each `onUpdate` calls `render()` which draws the current frame to `<canvas>` with cover-fit scaling.
2. **Text overlays** — Three `<div>` elements (`#text1`, `#text2`, `#text3`) fade in/out at fixed scroll percentages (0–25%, 33–58%, 66–90%).

Below the canvas: a static portfolio grid (Unsplash images), a contact form, and a footer — all plain HTML/Tailwind, no JS.

## Frame Assets

300 JPEGs named `ezgif-frame-001.jpg` to `ezgif-frame-300.jpg`. These are the only assets besides `index.html`. Do not rename or renumber them without updating the `pad()` function and `frameCount` constant in the script.

# Universal Components Loader - Batch Update Guide

## Pages Updated So Far

✅ index.html
✅ about.html  
✅ contact.html
✅ curriculum/CURRICULUM-INDEX.html

## Remaining Pages by Category

### Root Level Pages (use `js/universal-components-loader.js`)
- [ ] app.html
- [ ] app-fixed.html
- [ ] app-test-no-affirmations.html
- [ ] toolkit.html
- [ ] toolkit-mobile.html
- [ ] pricing.html
- [ ] newsletter.html
- [ ] checkout.html
- [ ] order-confirmation.html
- [ ] all-logos-reference.html
- [ ] curriculum-landing.html
- [ ] educator-package-simple.html
- [ ] educator-package-complete.html
- [ ] participant-companion.html
- [ ] facilitator-guide.html
- [ ] facilitator-guide-complete.html
- [ ] HARNESS-Facilitator-Guide-Complete.html
- [ ] quick-start-guide.html
- [ ] interactive-hub.html
- [ ] infographic-gallery.html

### Blog Pages (use `../js/universal-components-loader.js`)
- [ ] blog/index.html
- [ ] blog/what-is-prep-complete-guide.html
- [ ] blog/how-to-talk-about-sti-testing.html
- [ ] blog/polyamory-vs-open-relationship.html

### Educator Pages (use `../js/universal-components-loader.js`)
- [ ] educator/index.html
- [ ] educator/resources.html
- [ ] educator/facilitator-guide.html
- [ ] educator/participant-guide.html
- [ ] educator/ebook.html
- [ ] educator/ebook-reader.html
- [ ] educator/ebook-reader-FULL-ACCESS.html
- [ ] educator/facilitator-slideshow.html
- [ ] educator/fearless-foundations.html
- [ ] educator/match-framework.html
- [ ] educator/fearless-quick-start.html

### Workshop & Presentation Pages (use `../js/universal-components-loader.js`)
- [ ] workshops/workshop-page.html
- [ ] workshops/HARNESS-Workshop-Formats-ALL.html
- [ ] presentations/index.html
- [ ] presentations/90-minute-workshop-slides.html
- [ ] presentations/half-day-workshop-slides.html
- [ ] presentations/full-day-workshop-slides.html
- [ ] presentations/90-minute-workshop-slides-FULL.html
- [ ] presentations/half-day-workshop-slides-FULL.html
- [ ] presentations/full-day-workshop-slides-FULL.html

### Curriculum Chapters (use `../js/universal-components-loader.js`)
- [ ] curriculum/chapter-03-condoms-the-frontline.html
- [ ] curriculum/chapter-04-safer-oral-pleasure.html
- [ ] curriculum/chapter-05-lube-and-toys.html
- [ ] curriculum/chapter-06-prep-prevention.html
- [ ] curriculum/chapter-07-pep-emergency.html
- [ ] curriculum/chapters-08-12-COMPLETE.html

### Legal Pages (use `../js/universal-components-loader.js`)
- [ ] legal/terms.html
- [ ] legal/privacy.html
- [ ] legal/disclaimer.html
- [ ] legal/copyright.html
- [ ] legal/cookies.html

## Standard Pattern to Add

### For Root Level Pages:
```html
<!-- Universal Components Loader -->
<script src="js/universal-components-loader.js" defer></script>
```

### For Subfolder Pages:
```html
<!-- Universal Components Loader -->
<script src="../js/universal-components-loader.js" defer></script>
```

## Where to Insert

Add immediately after the last `<script>` tag in the `<head>` section, typically after:
- `seo-optimizer.js`
- `harness-global.js`
- `accessibility-enhancements.js`
- `schema-structured-data.js`
- `lazy-loading.js`

## Example Before/After

### BEFORE:
```html
<script src="js/seo-optimizer.js"></script>
<script src="js/harness-global.js" defer></script>
<script src="js/lazy-loading.js" defer></script>
</head>
```

### AFTER:
```html
<script src="js/seo-optimizer.js"></script>
<script src="js/harness-global.js" defer></script>
<script src="js/lazy-loading.js" defer></script>

<!-- Universal Components Loader -->
<script src="js/universal-components-loader.js" defer></script>
</head>
```

## Progress Tracking

**Total Pages:** 73
**Completed:** 4
**Remaining:** 69

I'm continuing to add these systematically...

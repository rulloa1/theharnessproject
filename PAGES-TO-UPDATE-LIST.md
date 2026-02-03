# Script to Add Universal Components Loader to All HTML Pages

This document lists all HTML pages that need the universal components loader added.

## Implementation Pattern

Add this line to the `<head>` section of each page (adjust path based on folder depth):

```html
<!-- Universal Components Loader -->
<script src="[PATH]/js/universal-components-loader.js" defer></script>
```

## Path Guide by Folder Depth

- **Root level** (`/`): `js/universal-components-loader.js`
- **One level deep** (`/folder/`): `../js/universal-components-loader.js`
- **Two levels deep** (`/folder/subfolder/`): `../../js/universal-components-loader.js`

## Pages List (81 total)

### Root Level Pages (use `js/`)
- [x] index.html - ADDED
- [ ] about.html
- [ ] contact.html
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
- [ ] educator-package-complete.html
- [ ] educator-package-simple.html

### Blog Pages (use `../js/`)
- [ ] blog/index.html
- [ ] blog/what-is-prep-complete-guide.html
- [ ] blog/how-to-talk-about-sti-testing.html
- [ ] blog/polyamory-vs-open-relationship.html

### Educator Pages (use `../js/`)
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

### Workshops Pages (use `../js/`)
- [ ] workshops/workshop-page.html
- [ ] workshops/HARNESS-Workshop-Formats-ALL.html

### Presentations Pages (use `../js/`)
- [ ] presentations/index.html
- [ ] presentations/90-minute-workshop-slides.html
- [ ] presentations/half-day-workshop-slides.html
- [ ] presentations/full-day-workshop-slides.html
- [ ] presentations/90-minute-workshop-slides-FULL.html
- [ ] presentations/half-day-workshop-slides-FULL.html
- [ ] presentations/full-day-workshop-slides-FULL.html

### Curriculum Pages (use `../js/`)
- [ ] curriculum/CURRICULUM-INDEX.html (Master Curriculum - being rebuilt)
- [ ] curriculum/chapter-03-condoms-the-frontline.html
- [ ] curriculum/chapter-04-safer-oral-pleasure.html
- [ ] curriculum/chapter-05-lube-and-toys.html
- [ ] curriculum/chapter-06-prep-prevention.html
- [ ] curriculum/chapter-07-pep-emergency.html
- [ ] curriculum/chapters-08-12-COMPLETE.html

### Legal Pages (use `../js/`)
- [ ] legal/terms.html
- [ ] legal/privacy.html
- [ ] legal/disclaimer.html
- [ ] legal/copyright.html
- [ ] legal/cookies.html

### Interactive Pages (use `../js/`)
- [ ] interactive/safer-sex-cantina.html
- [ ] interactive/my-condom-plan.html
- [ ] interactive/sos-emergency-guide.html
- [ ] interactive/conversation-starters.html
- [ ] interactive/pocket-scripts.html
- [ ] interactive/risk-continuum.html
- [ ] interactive/myth-busting-cards.html

### Worksheets Pages (use `../js/`)
- [ ] worksheets/partner-communication-agreement.html
- [ ] worksheets/sexual-health-communication-agreement.html
- [ ] worksheets/boundary-setting-worksheet.html
- [ ] worksheets/fearless-foundations-interactive.html
- [ ] worksheets/fearless-foundations-printable.html
- [ ] worksheets/match-framework-interactive.html
- [ ] worksheets/quick-start-guide-interactive.html

### FAP Ebook Pages (use `../js/`)
- [ ] fap-ebook/index.html
- [ ] fap-ebook/ebook.html
- [ ] fap-ebook/ebook-integrated.html
- [ ] fap-ebook/reader.html
- [ ] fap-ebook/tools.html
- [ ] fap-ebook/resources.html
- [ ] fap-ebook/charts.html
- [ ] fap-ebook/glossary.html
- [ ] fap-ebook/quick-start.html
- [ ] fap-ebook/match-framework.html
- [ ] fap-ebook/participants-guide.html
- [ ] fap-ebook/progress.html
- [ ] fap-ebook/journal.html
- [ ] fap-ebook/testing-calculator.html
- [ ] fap-ebook/risk-calculator.html
- [ ] fap-ebook/scripts.html
- [ ] fap-ebook/myths.html
- [ ] fap-ebook/quizzes.html
- [ ] fap-ebook/test-chapters.html

### Infographics Pages (use `../js/`)
- [ ] infographics/personal-lubricant-guide.html
- [ ] infographics/relationship-types.html

### Branding Pages (use `../js/`)
- [ ] branding/ebook-logo.html
- [ ] branding/harness-workshop-logo.html

### Components (Skip - these are included files, not standalone pages)
- components/navigation.html
- components/footer.html
- components/standard-nav.html
- components/standard-footer.html
- components/google-analytics.html
- components/support-donation-button.html
- components/universal-navigation.html
- components/universal-footer.html

## Total Count
- Total HTML files: 81
- Component files (skip): 8
- Pages to update: 73
- Completed: 1
- Remaining: 72

## Next Steps

Due to the large number of pages, I recommend:

1. **Priority 1 (High Traffic):** Main pages, educator hub, blog, workshops
2. **Priority 2 (Moderate Traffic):** Curriculum chapters, presentations
3. **Priority 3 (Lower Traffic):** Interactive tools, worksheets, infographics

I can batch-update these systematically. Would you like me to proceed with all pages or focus on high-priority ones first?

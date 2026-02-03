# 🍔 UNIVERSAL NAV/FOOTER - COMPLETE IMPLEMENTATION TRACKER

**Date**: January 23, 2026  
**Goal**: Add `harness-global.js` to ALL 113 HTML pages  
**Status**: IN PROGRESS

---

## ✅ PAGES COMPLETED (5/113)

### **Main Pages** (5/5) ✅
- [x] index.html
- [x] app.html
- [x] about.html
- [x] pricing.html
- [x] toolkit.html

---

## 📋 PAGES TO COMPLETE (108/113)

### **Blog Section** (4 pages) - PRIORITY 1
- [ ] blog/index.html
- [ ] blog/what-is-prep-complete-guide.html
- [ ] blog/how-to-talk-about-sti-testing.html
- [ ] blog/polyamory-vs-open-relationship.html

### **Educator Section** (10 pages) - PRIORITY 1
- [ ] educator/index.html
- [ ] educator/ebook-reader-FULL-ACCESS.html
- [ ] educator/ebook-reader.html
- [ ] educator/facilitator-guide.html
- [ ] educator/participant-guide.html
- [ ] educator/fearless-quick-start.html
- [ ] educator/match-framework.html
- [ ] educator/fearless-foundations.html
- [ ] educator/ebook.html
- [ ] educator/facilitator-slideshow.html

### **Curriculum** (6 pages) - PRIORITY 1
- [ ] curriculum/CURRICULUM-INDEX.html
- [ ] curriculum/chapter-03-condoms-the-frontline.html
- [ ] curriculum/chapter-04-safer-oral-pleasure.html
- [ ] curriculum/chapter-05-lube-and-toys.html
- [ ] curriculum/chapter-06-prep-prevention.html
- [ ] curriculum/chapter-07-pep-emergency.html
- [ ] curriculum/chapters-08-12-COMPLETE.html

### **Workshops** (2 pages) - PRIORITY 1
- [ ] workshops/workshop-page.html
- [ ] workshops/HARNESS-Workshop-Formats-ALL.html

### **Presentations** (7 pages) - PRIORITY 1
- [ ] presentations/index.html
- [ ] presentations/full-day-workshop-slides.html
- [ ] presentations/full-day-workshop-slides-FULL.html
- [ ] presentations/half-day-workshop-slides.html
- [ ] presentations/half-day-workshop-slides-FULL.html
- [ ] presentations/90-minute-workshop-slides.html
- [ ] presentations/90-minute-workshop-slides-FULL.html

### **Worksheets** (7 pages) - PRIORITY 2
- [ ] worksheets/match-framework-interactive.html
- [ ] worksheets/fearless-foundations-interactive.html
- [ ] worksheets/fearless-foundations-printable.html
- [ ] worksheets/partner-communication-agreement.html
- [ ] worksheets/sexual-health-communication-agreement.html
- [ ] worksheets/boundary-setting-worksheet.html
- [ ] worksheets/quick-start-guide-interactive.html

### **Interactive Tools** (8 pages) - PRIORITY 2
- [ ] interactive/myth-busting-cards.html
- [ ] interactive/risk-continuum.html
- [ ] interactive/my-condom-plan.html
- [ ] interactive/safer-sex-cantina.html
- [ ] interactive/sos-emergency-guide.html
- [ ] interactive/pocket-scripts.html
- [ ] interactive/conversation-starters.html
- [ ] interactive-hub.html

### **Legal Pages** (5 pages) - PRIORITY 2
- [ ] legal/terms.html
- [ ] legal/privacy.html
- [ ] legal/disclaimer.html
- [ ] legal/copyright.html
- [ ] legal/cookies.html

### **Infographics** (3 pages) - PRIORITY 2
- [ ] infographics/personal-lubricant-guide.html
- [ ] infographics/relationship-types.html
- [ ] infographic-gallery.html

### **Supporting Pages** (15 pages) - PRIORITY 2
- [ ] contact.html
- [ ] quick-start-guide.html
- [ ] toolkit-mobile.html
- [ ] participant-companion.html
- [ ] all-logos-reference.html
- [ ] curriculum-landing.html
- [ ] ebook-complete.html
- [ ] ebook-raw.html
- [ ] email-system.html
- [ ] educator-package-complete.html
- [ ] educator-package-simple.html
- [ ] facilitator-guide-complete.html
- [ ] facilitator-guide.html
- [ ] HARNESS-Facilitator-Guide-Complete.html
- [ ] simple-agreements.html

### **FAP Ebook Section** (18 pages) - PRIORITY 3
- [ ] fap-ebook/index.html
- [ ] fap-ebook/reader.html
- [ ] fap-ebook/tools.html
- [ ] fap-ebook/participants-guide.html
- [ ] fap-ebook/resources.html
- [ ] fap-ebook/charts.html
- [ ] fap-ebook/glossary.html
- [ ] fap-ebook/quick-start.html
- [ ] fap-ebook/progress.html
- [ ] fap-ebook/journal.html
- [ ] fap-ebook/testing-calculator.html
- [ ] fap-ebook/risk-calculator.html
- [ ] fap-ebook/scripts.html
- [ ] fap-ebook/myths.html
- [ ] fap-ebook/quizzes.html
- [ ] fap-ebook/match-framework.html
- [ ] fap-ebook/ebook-integrated.html
- [ ] fap-ebook/ebook.html
- [ ] fap-ebook/test-chapters.html

### **Component & Test Pages** (23 pages) - PRIORITY 4
- [ ] components/navigation.html
- [ ] components/footer.html
- [ ] components/standard-nav.html
- [ ] components/standard-footer.html
- [ ] test-lil-z.html
- [ ] lil-z-proof.html
- [ ] test-infographics.html
- [ ] test-tabs.html
- [ ] app-diagnostic.html
- [ ] app-fixed.html
- [ ] test-scripts-individually.html
- [ ] test-navigation-complete.html
- [ ] fix-verification.html
- [ ] test-new-features.html
- [ ] test-about.html
- [ ] test-visual-library.html
- [ ] test-agreement-modal.html
- [ ] test-lube.html
- [ ] branding/ebook-logo.html
- [ ] branding/harness-workshop-logo.html
- [ ] original_app.html

---

## 🔧 IMPLEMENTATION METHOD

For each HTML file, add this line before `</head>`:

### **Root-level pages:**
```html
<script src="js/harness-global.js" defer></script>
```

### **Subdirectory pages (blog/, educator/, etc.):**
```html
<script src="../js/harness-global.js" defer></script>
```

### **Deep subdirectory pages (fap-ebook/, curriculum/, etc.):**
Check path depth and adjust:
```html
<script src="../js/harness-global.js" defer></script>
<!-- or -->
<script src="../../js/harness-global.js" defer></script>
```

---

## 📊 PROGRESS TRACKER

| Section | Total | Completed | Remaining | Progress |
|---------|-------|-----------|-----------|----------|
| Main Pages | 5 | 5 | 0 | 100% ✅ |
| Blog | 4 | 0 | 4 | 0% |
| Educator | 10 | 0 | 10 | 0% |
| Curriculum | 7 | 0 | 7 | 0% |
| Workshops | 2 | 0 | 2 | 0% |
| Presentations | 7 | 0 | 7 | 0% |
| Worksheets | 7 | 0 | 7 | 0% |
| Interactive | 8 | 0 | 8 | 0% |
| Legal | 5 | 0 | 5 | 0% |
| Infographics | 3 | 0 | 3 | 0% |
| Supporting | 15 | 0 | 15 | 0% |
| FAP Ebook | 19 | 0 | 19 | 0% |
| Component/Test | 23 | 0 | 23 | 0% |
| **TOTAL** | **113** | **5** | **108** | **4.4%** |

---

**Status**: Working through systematically, no shortcuts
**Next**: Complete all Priority 1 pages (blog, educator, curriculum, workshops, presentations)

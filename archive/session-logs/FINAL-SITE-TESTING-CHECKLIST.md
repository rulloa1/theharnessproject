# ✅ FINAL SITE TESTING CHECKLIST
**The HARNESS Project - Manual Testing Guide**  
**Date**: January 23, 2026  

This is a comprehensive, step-by-step checklist to verify every click, link, and function on the site works correctly.

---

## 🎯 TESTING INSTRUCTIONS

### How to Use This Checklist
1. ✅ Mark each item as you test it
2. 🔄 Note any issues in the "Issues Found" section at the bottom
3. Test on multiple devices (desktop, tablet, mobile)
4. Test in multiple browsers (Chrome, Safari, Firefox, Edge)

---

## 📱 HOMEPAGE (index.html)

### Visual Verification
- [ ] Page loads without errors
- [ ] Hero logo displays with transparent background
- [ ] Gradient background renders correctly
- [ ] All images load (no broken image icons)
- [ ] Navigation bar appears at top
- [ ] Navigation becomes white/blurred on scroll
- [ ] Footer appears at bottom

### Navigation Links (Top Nav)
- [ ] Click "Home" → Should stay on index.html
- [ ] Click "About" → Should go to about.html
- [ ] Click "App" → Should go to app.html
- [ ] Click "Educator Hub" → Should go to educator/index.html
- [ ] Click "Toolkit" → Should go to toolkit.html
- [ ] Click "Blog" → Should go to blog/index.html
- [ ] Click "Pricing" → Should go to pricing.html

### Hamburger Menu (Mobile)
- [ ] Resize browser to mobile width (< 768px)
- [ ] Hamburger icon (☰) appears
- [ ] Click hamburger → Menu slides in from side
- [ ] All menu links work
- [ ] Click outside menu → Menu closes
- [ ] Click X button → Menu closes

### Footer Links
- [ ] All social media icons present
- [ ] Footer links work (About, Contact, Terms, Privacy)
- [ ] Copyright year is current (2026)

---

## 🚀 APP (app.html)

### Initial Load
- [ ] Splash screen appears first
- [ ] Splash logo displays correctly
- [ ] "Begin Your Journey" button visible

### Splash Screen
- [ ] Click "Begin Your Journey" → Onboarding appears
- [ ] Splash screen fades out smoothly

### Onboarding
- [ ] "Choose Your Journey" header displays
- [ ] 3 journey cards display:
  - [ ] 🌟 Exploring for Myself
  - [ ] 💕 With a Partner
  - [ ] 🎓 Educator/Guide
- [ ] Click each journey card → Should select journey and proceed

### Top Header Navigation
- [ ] Header displays with transparent background
- [ ] HARNESS logo displays
- [ ] Hamburger menu icon visible (☰)
- [ ] Click hamburger → Side menu opens
- [ ] Side menu links:
  - [ ] 🏠 Home → index.html
  - [ ] 📚 Educator Hub → educator/index.html
  - [ ] 📖 Ebook → index.html#ebook
  - [ ] 🎓 Curriculum → index.html#curriculum
  - [ ] 👥 Workshops → index.html#workshops

### Home View (After Onboarding)
- [ ] Value selection panel displays
- [ ] 6 value cards visible:
  - [ ] Honesty
  - [ ] Clarity
  - [ ] Curiosity
  - [ ] Safety
  - [ ] Empowerment
  - [ ] Connection
- [ ] Click each value card → Card toggles selected/unselected
- [ ] Selected values show visual feedback (color change/checkmark)

### Featured Tools Section
- [ ] "Emergency Support" card displays
- [ ] Click Emergency Support → Opens emergency guide modal
- [ ] "Daily Affirmation" card displays
- [ ] Click Daily Affirmation → Opens affirmation
- [ ] "MATCH Journey" card displays
- [ ] Click MATCH Journey → Navigates to MATCH view
- [ ] "Create Agreement" card displays
- [ ] Click Create Agreement → Navigates to agreements view

### Bottom Navigation Bar
- [ ] All 6 nav icons visible:
  - [ ] 🏠 Home
  - [ ] ⚡ Quick Start
  - [ ] 🗺️ MATCH Map
  - [ ] 📝 Agreements
  - [ ] 📚 Library
  - [ ] 👤 Me
- [ ] Click Home → Shows home view
- [ ] Click Quick Start → Shows fearless quick start
- [ ] Click MATCH Map → Shows MATCH journey
- [ ] Click Agreements → Shows agreements builder
- [ ] Click Library → Shows visual library
- [ ] Click Me → Shows profile/settings

### MATCH Journey (match view)
- [ ] MATCH logo/header displays
- [ ] Welcome screen appears
- [ ] Interactive journey begins
- [ ] Can navigate through MATCH stages:
  - [ ] Meet
  - [ ] Ask
  - [ ] Talk
  - [ ] Check
  - [ ] Hold
- [ ] Lil Z companion appears
- [ ] Progress saves as you navigate

### Agreements Builder
- [ ] Agreements builder interface loads
- [ ] Can create new agreement
- [ ] Form fields functional:
  - [ ] Partner name
  - [ ] Relationship type
  - [ ] Boundaries
  - [ ] Testing frequency
  - [ ] Protection methods
- [ ] Save button works
- [ ] Saved agreements display in list
- [ ] Can edit existing agreements
- [ ] Can delete agreements

### Visual Library
- [ ] Library view loads
- [ ] 41+ infographics display
- [ ] Infographic thumbnails load
- [ ] Click infographic → Opens full view
- [ ] Can zoom infographic
- [ ] Can download/share infographic
- [ ] Category filters work
- [ ] Search function works

### Profile/Me View
- [ ] Profile screen loads
- [ ] User stats display
- [ ] Achievements section visible
- [ ] Settings accessible
- [ ] Can edit profile info
- [ ] Logout/reset options work

---

## 🎓 EDUCATOR HUB (educator/index.html)

### Page Load
- [ ] Page loads without errors
- [ ] Curriculum logo displays with transparency
- [ ] Hero section displays correctly
- [ ] Navigation bar functional

### Top Navigation
- [ ] Home → educator/index.html
- [ ] Ebook → ebook-reader-FULL-ACCESS.html
- [ ] Curriculum → ../curriculum/CURRICULUM-INDEX.html
- [ ] Facilitator Guide → facilitator-guide.html
- [ ] Presentations → ../presentations/index.html
- [ ] Workshops → ../workshops/workshop-page.html
- [ ] Try App → ../app.html

### Hero Section
- [ ] 3 prominent buttons:
  - [ ] 📚 Read the Ebook
  - [ ] 🎓 Get Facilitator Guide
  - [ ] 🚀 Try the App
- [ ] All buttons link correctly

### Mission Section
- [ ] Mission cards display
- [ ] 3 value cards visible:
  - [ ] 💪 Fearless
  - [ ] 🧠 Aware
  - [ ] 🛡️ Protected
- [ ] Cards have hover effects

### Resources Section
- [ ] Resource cards display
- [ ] Each resource links correctly:
  - [ ] Interactive Ebook
  - [ ] Facilitator Guide
  - [ ] Participant Guide
  - [ ] PowerPoint Presentations
  - [ ] Visual Toolkit
  - [ ] Workshops

### Ebook Reader (ebook-reader-FULL-ACCESS.html)
- [ ] Ebook reader loads
- [ ] Table of contents displays
- [ ] Can navigate chapters
- [ ] Text readable and formatted
- [ ] Can search within ebook
- [ ] Print functionality works
- [ ] Bookmark feature works

### Facilitator Guide (facilitator-guide.html)
- [ ] Guide loads correctly
- [ ] 5 modules display:
  - [ ] Module 1: Mindset of Protection
  - [ ] Module 2: Medical Shields
  - [ ] Module 3: Real Talk
  - [ ] Module 4: Building Your Plan
  - [ ] Module 5: Beyond the Basics
- [ ] Each module expandable
- [ ] Content readable
- [ ] Print-friendly format
- [ ] Download buttons work

### Participant Guide (participant-guide.html)
- [ ] Guide loads correctly
- [ ] Worksheets display
- [ ] Fill-in fields functional
- [ ] Can save progress (localStorage)
- [ ] Can print completed guide
- [ ] Can reset/clear form

---

## 📊 PRESENTATIONS (presentations/index.html)

### Page Load
- [ ] Presentations landing page loads
- [ ] Presentation thumbnails display
- [ ] Description text readable

### Presentation Links
- [ ] 90-Minute Workshop → 90-minute-workshop-slides.html
- [ ] Half-Day Workshop → half-day-workshop-slides.html
- [ ] Full-Day Workshop → full-day-workshop-slides.html
- [ ] Each presentation page loads
- [ ] Slides display correctly
- [ ] Can navigate through slides (arrow keys or buttons)
- [ ] Full-screen mode works
- [ ] Print slides works
- [ ] Download PowerPoint option available

---

## 🎨 VISUAL TOOLKIT (toolkit.html)

### Page Load
- [ ] Toolkit page loads
- [ ] Hero banner displays
- [ ] Infographic grid displays
- [ ] All infographic thumbnails load

### Infographic Categories
- [ ] Categories display correctly
- [ ] Can filter by category
- [ ] Category buttons functional

### Individual Infographics
- [ ] Click infographic → Opens larger view/detail page
- [ ] Can download infographic
- [ ] Download button works (initiates download)
- [ ] Preview displays correctly
- [ ] Close button returns to grid

### Purchase Flow
- [ ] "Get Full Toolkit" button visible
- [ ] Click button → Pricing/purchase info displays
- [ ] Price clearly stated ($99)
- [ ] Purchase options available

---

## 👥 WORKSHOPS (workshops/workshop-page.html)

### Page Load
- [ ] Workshop page loads
- [ ] Workshop logo displays with transparency
- [ ] Hero gradient background displays
- [ ] Workshop listings display

### Workshop Information
- [ ] Workshop descriptions readable
- [ ] Workshop formats listed:
  - [ ] 90-minute workshop
  - [ ] Half-day workshop
  - [ ] Full-day workshop
  - [ ] Custom workshops
- [ ] Contact/booking information available
- [ ] Pricing information (if applicable)

### Workshop Links
- [ ] Links to presentation slides work
- [ ] Links to facilitator resources work
- [ ] Contact buttons functional

---

## 📝 BLOG (blog/index.html)

### Page Load
- [ ] Blog landing page loads
- [ ] Blog logo displays
- [ ] Article listings display
- [ ] Featured articles highlighted

### Article Grid
- [ ] Articles display in grid/list
- [ ] Article thumbnails load
- [ ] Article titles/excerpts visible
- [ ] Click article → Opens full article

### Individual Articles
- [ ] Articles tested:
  - [ ] what-is-prep-complete-guide.html
  - [ ] how-to-talk-about-sti-testing.html
  - [ ] polyamory-vs-open-relationship.html
- [ ] Article content displays correctly
- [ ] Images in articles load
- [ ] Breadcrumb navigation works (Home / Blog / Article)
- [ ] Related articles display
- [ ] Share buttons functional

### Blog Navigation
- [ ] Can navigate back to blog index
- [ ] Search function works (if present)
- [ ] Category filters work (if present)
- [ ] Tags functional (if present)

---

## 💰 PRICING (pricing.html)

### Page Load
- [ ] Pricing page loads
- [ ] Pricing tables display
- [ ] All prices clearly visible

### Pricing Tiers
- [ ] Free resources section displays
- [ ] Paid toolkit section displays ($99)
- [ ] Enterprise/custom pricing info (if applicable)
- [ ] Feature comparison visible

### Pricing Links
- [ ] "Get Started" buttons work
- [ ] Links to purchase flow functional
- [ ] Links to free resources work
- [ ] FAQ section (if present)

---

## ℹ️ ABOUT (about.html)

### Page Load
- [ ] About page loads
- [ ] Author photo displays (images/christopher-zacharie.png)
- [ ] Text content readable
- [ ] Page formatting correct

### Content Sections
- [ ] About Christopher Zacharie section
- [ ] Mission/vision section
- [ ] Project history
- [ ] Contact information
- [ ] Social media links

### Links
- [ ] External links work (social media, etc.)
- [ ] Internal links functional
- [ ] Email contact link works (mailto:)

---

## ⚖️ LEGAL PAGES

### Terms of Service (legal/terms.html)
- [ ] Page loads
- [ ] Content readable
- [ ] Links functional:
  - [ ] Contact Us
  - [ ] Back to Home → /index.html

### Privacy Policy (legal/privacy.html)
- [ ] Page loads
- [ ] Content readable
- [ ] Links functional

### Disclaimer (legal/disclaimer.html)
- [ ] Page loads
- [ ] Content readable
- [ ] Links functional

### Copyright (legal/copyright.html)
- [ ] Page loads
- [ ] Content readable
- [ ] Links functional

---

## 📚 CURRICULUM (curriculum/CURRICULUM-INDEX.html)

### Index Page
- [ ] Curriculum index loads
- [ ] Chapter listings display
- [ ] Chapters navigate correctly:
  - [ ] Chapter 3: Condoms
  - [ ] Chapter 4: Oral Pleasure
  - [ ] Chapter 5: Lube and Toys
  - [ ] Chapter 6: PrEP
  - [ ] Chapter 7: PEP
  - [ ] Chapters 8-12 Complete

### Individual Chapters
- [ ] Each chapter page loads
- [ ] Content formatted correctly
- [ ] Images/diagrams display
- [ ] Navigation between chapters works
- [ ] Back to index link works
- [ ] Print functionality works

---

## 📱 PWA (PROGRESSIVE WEB APP) TESTING

### Installation
- [ ] Visit app.html on mobile device
- [ ] PWA install prompt appears
- [ ] Tap "Add to Home Screen" or "Install"
- [ ] App icon appears on home screen
- [ ] Tap icon → App launches in standalone mode (no browser UI)

### Offline Functionality
- [ ] Open app with internet
- [ ] Navigate around to cache pages
- [ ] Turn off internet/enable airplane mode
- [ ] Refresh app → Still works
- [ ] offline.html displays when appropriate
- [ ] Cached pages load offline
- [ ] Non-cached pages show offline message

### Service Worker
- [ ] Open browser DevTools → Application tab → Service Workers
- [ ] Service worker registered successfully
- [ ] Service worker activating/activated
- [ ] Cache storage populated with assets
- [ ] Background sync queue works (when back online)

### Push Notifications (if supported)
- [ ] Permission prompt appears (or can be triggered)
- [ ] Grant notification permission
- [ ] Test notification received
- [ ] Notification click opens app

---

## 📱 MOBILE RESPONSIVENESS

### Screen Sizes
Test at these breakpoints:
- [ ] 320px (iPhone SE)
- [ ] 375px (iPhone standard)
- [ ] 414px (iPhone Plus)
- [ ] 768px (iPad portrait)
- [ ] 1024px (iPad landscape)
- [ ] 1280px (Desktop)
- [ ] 1920px (Large desktop)

### Mobile Features
- [ ] Touch targets at least 44x44px
- [ ] Text readable without zooming
- [ ] No horizontal scrolling
- [ ] Images scale properly
- [ ] Navigation accessible
- [ ] Forms usable on mobile
- [ ] Buttons easy to tap

### Mobile Gestures (app.html)
- [ ] Swipe left → Navigate (if applicable)
- [ ] Swipe right → Navigate back (if applicable)
- [ ] Pull down → Refresh (pull-to-refresh)
- [ ] Long press → Context menu (if applicable)
- [ ] Double tap → Zoom (if applicable)
- [ ] Pinch → Zoom in/out

### Touch Interactions
- [ ] All buttons respond to touch
- [ ] No accidental taps
- [ ] Haptic feedback works (vibration)
- [ ] Touch feedback visual (ripple/highlight)

---

## 🔍 BROWSER COMPATIBILITY

### Chrome/Chromium
- [ ] All pages load
- [ ] No console errors
- [ ] All features functional
- [ ] PWA installable

### Firefox
- [ ] All pages load
- [ ] No console errors
- [ ] All features functional

### Safari (macOS/iOS)
- [ ] All pages load
- [ ] No console errors
- [ ] All features functional
- [ ] PWA installable on iOS

### Edge
- [ ] All pages load
- [ ] No console errors
- [ ] All features functional

---

## 🎨 VISUAL TESTING

### Logo Transparency
- [ ] index.html → Hero logo transparent on white gradient
- [ ] app.html → Header logo transparent
- [ ] educator/index.html → Hero logo transparent
- [ ] toolkit.html → Nav logo transparent
- [ ] pricing.html → Nav logo transparent
- [ ] about.html → Nav logo transparent
- [ ] blog/index.html → Header logo transparent
- [ ] workshops/workshop-page.html → Hero logo transparent

### CSS Loaded
- [ ] transparent-headers.css loaded on all pages
- [ ] standardized-logo-sizes.css loaded on all pages
- [ ] mobile-enhancements.css loaded on app.html
- [ ] No 404 errors in Network tab for CSS files

### Animations
- [ ] Splash screen fade animation
- [ ] Navigation slide-in animation
- [ ] Hover effects on buttons
- [ ] Loading skeletons display correctly
- [ ] Toast notifications animate properly
- [ ] Bottom sheets slide up smoothly

---

## 🔒 DATA PERSISTENCE

### LocalStorage
- [ ] Open app.html
- [ ] Complete onboarding
- [ ] Select values
- [ ] Create agreement
- [ ] Close browser
- [ ] Reopen app.html → Data persists

### IndexedDB
- [ ] Open DevTools → Application → IndexedDB
- [ ] Database "HARNESSOfflineDB" exists
- [ ] Stores present:
  - [ ] agreements
  - [ ] favorites
  - [ ] progress
  - [ ] affirmations
  - [ ] library
  - [ ] syncQueue
  - [ ] cache
- [ ] Data saves to stores
- [ ] Data retrieves from stores

### Offline Queue
- [ ] Make changes while offline
- [ ] Changes added to sync queue
- [ ] Go back online
- [ ] Queue syncs automatically
- [ ] Changes persisted

---

## 🐛 ERROR HANDLING

### Console Errors
- [ ] Open DevTools → Console
- [ ] Navigate entire site
- [ ] No JavaScript errors
- [ ] No 404 errors for resources
- [ ] No CORS errors
- [ ] Warnings acceptable (document CSS warnings, etc.)

### Broken Links
- [ ] No broken links (404 pages)
- [ ] All images load (no broken image icons)
- [ ] All CSS files load
- [ ] All JS files load
- [ ] All fonts load

### Edge Cases
- [ ] Navigate to non-existent page → Shows 404 or redirects
- [ ] Invalid form input → Shows validation error
- [ ] Network failure → Shows offline message
- [ ] Long text input → Doesn't break layout
- [ ] Special characters → Handled correctly

---

## ⚡ PERFORMANCE

### Load Times
- [ ] index.html loads < 3 seconds
- [ ] app.html loads < 3 seconds
- [ ] Images load progressively
- [ ] No layout shift (CLS < 0.1)
- [ ] Interactive quickly (TTI < 3s)

### Lighthouse Scores (Optional)
Run Lighthouse audit in Chrome DevTools:
- [ ] Performance > 80
- [ ] Accessibility > 90
- [ ] Best Practices > 90
- [ ] SEO > 90
- [ ] PWA checkmarks pass

---

## 📊 SEO VERIFICATION

### Meta Tags
Check each major page has:
- [ ] `<title>` tag (unique per page)
- [ ] Meta description
- [ ] Meta keywords
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] Twitter card tags
- [ ] Canonical URL

### Structured Data
- [ ] Schema.org markup present (if applicable)
- [ ] Validate with Google Rich Results Test

### Sitemap
- [ ] sitemap.xml exists
- [ ] Sitemap contains all major pages
- [ ] Sitemap accessible at /sitemap.xml

---

## ✅ FINAL CHECKS

### All Systems Verified
- [ ] All pages load
- [ ] All links work
- [ ] All images display
- [ ] All CSS files load
- [ ] All JS files load
- [ ] Logo transparency works
- [ ] Navigation functional
- [ ] Mobile responsive
- [ ] PWA installable
- [ ] Offline mode works
- [ ] No console errors
- [ ] Cross-browser compatible

---

## 🔥 ISSUES FOUND

**Use this section to document any issues discovered during testing:**

### Critical Issues (Must Fix)
1. 
2. 
3. 

### Medium Issues (Should Fix)
1. 
2. 
3. 

### Low Priority Issues (Nice to Fix)
1. 
2. 
3. 

### Notes
- 
- 
- 

---

## 🏆 TESTING COMPLETION

**Tester Name**: ________________________  
**Date Tested**: ________________________  
**Browser Used**: ________________________  
**Device Used**: ________________________  
**Overall Status**: ⬜ PASS | ⬜ FAIL | ⬜ PASS WITH NOTES

**Signature**: ________________________

---

**Testing Complete!** 🎉

If all checkboxes above are checked with no critical issues, the site is **PRODUCTION READY** and can be deployed via the **Publish tab**.

*HARNESS Project - Fearless. Protected. Empowered.*

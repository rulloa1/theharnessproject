# HARNESS App - Home Section Update
**Updated:** Jan 5, 2026

## What Changed

### New "Quick Tools" Section Added
The home screen now features a dedicated **Quick Tools** section positioned prominently above Interactive Worksheets.

## Home Screen Structure (Updated)

### 1. Hero Section
- Welcome message with personalized username
- HARNESS logo and branding
- HARNESS framework acronym image

### 2. Alert Cards
- 🆘 Emergency Alert ("What To Do Now")
- ✨ Daily Affirmation banner

### 3. Feature Grid (Core Features)
- 🧭 MATCH Journey
- 🛡️ SafER Sex Agreements
- ✨ Daily Affirmations
- 🎯 My Condom Plan

### 4. 🎯 Quick Tools (NEW!)
Three instantly accessible calculators:

1. **🚦 Testing Frequency Calculator** 
   - Badge: 🔥 NEW
   - Opens modal calculator
   - Personalized testing schedule
   - Gradient background (teal accent)
   
2. **📊 Risk Continuum**
   - Opens in new tab
   - Visual 8-level risk assessment
   - Interactive guide
   
3. **💡 Myth-Busting Cards**
   - Badge: NEW
   - Opens in new tab
   - 20 flippable fact cards
   - Evidence-based education

### 5. 📝 Interactive Worksheets
Three fillable forms:
- 🛡️ Boundary Worksheet
- 💕 Health Agreement
- 🤝 Communication Agreement

## Access Points

### Testing Frequency Calculator
- **Home Screen**: Tap "🚦 Testing Frequency Calculator" card in Quick Tools section
- **Library Tab**: Navigate to Library → Interactive Worksheets → Testing Frequency
- **Function**: `openTestingCalculator()` (defined in js/knowledge-center.js)

### Risk Continuum
- **Home Screen**: Tap "📊 Risk Continuum" in Quick Tools
- **Interactive Hub**: Access from interactive-hub.html
- **Direct URL**: interactive/risk-continuum.html

### Myth-Busting Cards
- **Home Screen**: Tap "💡 Myth-Busting Cards" in Quick Tools
- **Interactive Hub**: Listed under Calculators & Assessments
- **Direct URL**: interactive/myth-busting-cards.html

## User Experience Flow

1. **Open App** → Greeted by hero section
2. **Scroll Down** → See emergency alert and daily affirmation
3. **Core Features** → Access main app sections
4. **Quick Tools** → Instant calculators (NEW section!)
5. **Worksheets** → Long-form fillable documents

## Visual Design

### Quick Tools Section
- **Gradient backgrounds** on select cards (teal for calculator)
- **NEW badges** on recent additions
- **Color-coded borders** (teal, pink, gold)
- **Emoji icons** for quick recognition

### Card Hierarchy
1. Testing Calculator (most prominent - gradient + NEW badge)
2. Risk Continuum (standard card)
3. Myth Cards (standard card + NEW badge)

## Why This Works

### Progressive Disclosure
- Quick tools appear before detailed worksheets
- Fast access to calculators without deep navigation
- Educational content readily available

### Visual Hierarchy
- NEW badges draw attention
- Gradient background highlights priority tool
- Consistent with HARNESS brand colors

### Mobile-First
- Cards stack vertically on mobile
- Large tap targets
- No horizontal scrolling needed

## Technical Implementation

### Files Modified
- `js/views.js` - Added Quick Tools section to `getHomeView()`

### Dependencies
- `openTestingCalculator()` from js/knowledge-center.js
- `interactive/risk-continuum.html`
- `interactive/myth-busting-cards.html`

### Styling
Uses existing CSS classes:
- `.section-header`
- `.feature-grid`
- `.feature-card`
- Inline styles for NEW badges and gradients

## Next Steps

Could enhance with:
- [ ] Animation on scroll-into-view
- [ ] Badge counts (e.g., "20 cards")
- [ ] Recently used tools section
- [ ] Favorites/bookmarking system
- [ ] Quick access to recently calculated results

## Impact

**Before**: Users had to navigate to Library or Interactive Hub to find calculators

**After**: Testing Calculator, Risk Continuum, and Myth Cards are one tap away from home screen

**Result**: 
- Faster access to educational tools
- Higher visibility for new features
- Better user engagement
- Clear call-to-action with NEW badges

# Roy's Company - AI Automation Agency Website

## 🤖 Overview
A modern, professional website for Roy's Company - an AI automation agency specializing in chatbots, workflow automation, data analytics, and custom AI solutions.

## 🎨 Design Features
- **Color Scheme**: Black (#0A0A0A, #1A1A1A), Red (#FF0000, #CC0000), White (#FFFFFF), Grey (#333-#CCC)
- **Style**: Modern, techy, creative, and professional
- **Responsive**: Fully responsive design for mobile, tablet, and desktop
- **Interactive**: Smooth animations, particle effects, and hover interactions
- **Dark Theme**: Professional dark theme optimized for tech audiences

## 📁 Project Structure
```
royscompany/
├── index.html              # Homepage with hero, services preview, process
├── about.html              # About page with mission, values, team
├── services.html           # Detailed services (Chatbots, Workflow, Analytics, Custom)
├── contact.html            # Contact form and information
├── pricing.html            # Pricing packages and comparison
├── css/
│   ├── global.css          # Base global styles
│   ├── royscompany.css     # Main custom styles for Roy's Company
│   ├── fonts.css           # Font definitions
│   └── layout-fixes.css    # Layout utilities
├── js/
│   └── royscompany.js      # Interactive features and animations
└── images/
    └── logo.png            # Company logo (ADD YOUR LOGO HERE)
```

## 🚀 Pages Included
1. **Home** (`index.html`) - Hero section with animated particles, services preview, process timeline, stats, CTA
2. **About** (`about.html`) - Mission, vision, values, team expertise, company stats
3. **Services** (`services.html`) - AI Chatbots, Workflow Automation, Data Analytics, Custom Solutions with detailed features
4. **Contact** (`contact.html`) - Contact form, company info, FAQ section
5. **Pricing** (`pricing.html`) - Three pricing tiers (Starter, Professional, Enterprise), add-ons, comparison table

## 🎯 Key Features

### Navigation
- Sticky navigation with transparent background
- Hamburger menu for mobile
- Smooth scroll animations
- Active page indicators

### Hero Section
- Animated grid overlay background
- Floating particle effects
- Gradient text effects
- Statistics counter animations
- Call-to-action buttons with ripple effects

### Interactive Elements
- Custom cursor effect (desktop only)
- Hover animations on cards
- Scroll-triggered fade-in animations
- Button ripple effects
- Form validation

### Services
- Four main service categories
- Detailed feature lists
- Integration showcase
- Use case examples

### Pricing
- Three pricing tiers
- Feature comparison table
- Add-on services
- FAQ section

## 📝 Setup Instructions

### 1. Add Your Logo
Replace the placeholder in `images/logo.png` with your company logo:
- **Recommended size**: 200x200px or larger
- **Format**: PNG with transparent background
- **Aspect ratio**: Square or horizontal
- **Style**: Should work on dark backgrounds

### 2. Update Contact Information
Search and replace throughout all HTML files:
- Email: `info@royscompany.com` → your email
- Phone: `+1 (234) 567-890` → your phone number
- Social media links (LinkedIn, Twitter/X, GitHub)

### 3. Customize Content
Edit the following in each HTML file:
- Company description
- Service details
- Team information
- Pricing amounts
- FAQ answers

### 4. Configure Forms
The contact form in `contact.html` currently shows an alert on submission. To make it functional:
- Connect to a backend API (e.g., FormSpree, Netlify Forms)
- Add email integration
- Set up form validation
- Configure success/error messages

### 5. Deploy
Upload the entire `royscompany` folder to your web host:
- Traditional hosting (cPanel, FTP)
- Static site hosting (Netlify, Vercel, GitHub Pages)
- Cloud hosting (AWS S3, Azure, Google Cloud)

## 🛠️ Customization Guide

### Colors
To change colors, edit CSS variables in `css/royscompany.css`:
```css
:root {
    --color-primary: #FF0000;        /* Main red color */
    --color-secondary: #1A1A1A;      /* Dark grey */
    --color-dark: #0A0A0A;           /* Almost black */
    /* Add more custom colors */
}
```

### Typography
Fonts are defined in `:root` section:
```css
--font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto...;
```

### Animations
Control animation speed in CSS variables:
```css
--transition-fast: 0.2s ease;
--transition-base: 0.3s ease;
--transition-slow: 0.5s ease;
```

### Particle Effects
Adjust particle count in `js/royscompany.js`:
```javascript
const particleCount = 50; // Change this number
```

## 🔧 Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints
- Desktop: 1400px+
- Tablet: 768px - 1399px
- Mobile: < 768px

## ⚡ Performance
- Minimal external dependencies
- Optimized CSS and JavaScript
- Lazy-loaded animations
- Efficient particle system
- Compressed assets

## 🎨 Design Credits
- Color Palette: Black, Red, White, Grey tech theme
- Icons: Unicode emojis (no external dependencies)
- Animations: Custom CSS and JavaScript
- Layout: CSS Grid and Flexbox

## 📄 License
This website is created for Roy's Company. All rights reserved.

## 🆘 Support
For customization help or questions:
- Email: info@royscompany.com
- Review code comments in CSS and JS files
- Check browser console for any errors

## 🔄 Future Enhancements
Consider adding:
- Blog section
- Case studies/portfolio
- Client testimonials with photos
- Video backgrounds
- Chat widget integration
- Newsletter signup
- Multi-language support
- Dark/light theme toggle

## ✅ Launch Checklist
- [ ] Add company logo to `images/logo.png`
- [ ] Update all contact information
- [ ] Customize service descriptions
- [ ] Set pricing amounts
- [ ] Configure contact form backend
- [ ] Test all links and buttons
- [ ] Test on mobile devices
- [ ] Check all pages load correctly
- [ ] Verify SEO meta tags
- [ ] Set up analytics (Google Analytics, etc.)
- [ ] Configure domain name
- [ ] Set up SSL certificate
- [ ] Create favicon variations
- [ ] Test form submissions
- [ ] Optimize images
- [ ] Deploy to production

---

**Built with ❤️ for Roy's Company - Leading the future of AI automation**

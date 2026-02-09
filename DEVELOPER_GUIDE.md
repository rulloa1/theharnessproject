# 👨‍💻 HARNESS Project - Developer Guide

## Quick Start

```bash
# Install dependencies (optional - only for build tools)
npm install

# Start local development server
npm start
# OR
npm run serve

# View at http://localhost:3000
```

---

## 🏗️ Project Structure

```
theharnessproject/
├── css/                  # Modular stylesheets (24 files)
│   ├── global.css        # Global styles and variables
│   ├── styles.css        # Main app styles
│   └── *.css             # Feature-specific styles
│
├── js/                   # JavaScript modules (11 files)
│   ├── harness-global.js # Universal navigation system
│   ├── toolkit.js        # Core app logic
│   ├── toolkit-data.js   # Content data
│   ├── lil-z-chat.js     # AI chatbot
│   ├── logger.js         # Production logger (NEW)
│   └── *.js              # Utility modules
│
├── components/           # Reusable HTML components
│   ├── standard-nav.html # Navigation component
│   └── standard-footer.html
│
├── images/               # Image assets
│   ├── harness.png       # Main logo
│   └── harness_hero_logo.png
│
├── icons/                # PWA icons (generate with npm run icons:generate)
│
├── scripts/              # Build and utility scripts
│   ├── validate-js.js
│   ├── build-check.js
│   ├── generate-pwa-icons.js
│   └── generate-icons-simple.html
│
├── app.html              # Main interactive app
├── index.html            # Landing page
├── manifest.json         # PWA manifest
├── service-worker.js     # PWA service worker
└── capacitor.config.json # Mobile app config
```

---

## 🎨 Branding Guidelines

### Color Palette

```css
--color-teal: #00BDBD;      /* Primary brand color */
--color-gold: #F6CC00;       /* Accent color */
--color-magenta: #DD0E6E;    /* Highlight color */
--color-gray: #737373;       /* Neutral */
```

### Typography

- **Primary Font**: Bree Serif
- **Fallback**: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial)

---

## 🔨 Development Commands

### Testing & Validation

```bash
# Validate all code
npm run validate

# Validate JavaScript
npm run validate:js

# Lint JavaScript
npm run lint
```

### Building

```bash
# Development build check
npm run build

# Production build
npm run build:prod
```

### PWA Icon Generation

```bash
# Method 1: Node.js script (requires sharp package)
npm install sharp --save-dev
npm run icons:generate

# Method 2: Browser-based tool
npm run icons:manual
# Then open scripts/generate-icons-simple.html in browser
```

### Mobile App (Capacitor)

```bash
# Sync web assets to mobile
npm run capacitor:sync

# Open iOS project in Xcode
npm run capacitor:ios

# Open Android project in Android Studio
npm run capacitor:android

# Build for mobile
npm run mobile:build
```

---

## 🔐 Security Best Practices

### Environment Setup

1. **Never commit credentials**
   - All sensitive files are gitignored
   - Use `*.example` files as templates

2. **API Keys**
   ```bash
   # Create local credentials file
   cp moltbook_credentials.json.example moltbook_credentials.json

   # Add your actual credentials
   # This file is automatically gitignored
   ```

3. **Check before committing**
   ```bash
   git status
   # Ensure no .env, *.credentials.json, or *.key files are staged
   ```

See `SECURITY.md` for complete guidelines.

---

## 📝 Logging

### Using the Logger

```javascript
// Load logger (add to HTML <head>)
<script src="js/logger.js"></script>

// Use in your code
HARNESSLogger.log('Debug message');          // Development only
HARNESSLogger.error('Error message');        // Always shown
HARNESSLogger.warn('Warning message');       // Development only
HARNESSLogger.info('Info message');          // Development only
HARNESSLogger.debug('Debug info');           // Development only

// Check environment
if (HARNESSLogger.isEnabled()) {
    // Development-only code
}
```

### Environment Detection

Logger automatically detects production when:
- `HARNESS_ENV === 'production'` is set, OR
- Hostname is NOT localhost/127.0.0.1

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Navigation works across all pages
- [ ] PWA installs correctly (after icons generated)
- [ ] Service worker caches assets
- [ ] Offline mode functions
- [ ] Contact form submits (after Formspree config)
- [ ] Mobile responsive design
- [ ] Lil Z chatbot loads

### Browser Testing

Test in:
- Chrome/Edge (primary)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Android)

---

## 🚀 Deployment

### Vercel (Automatic)

Pushes to `main` branch auto-deploy to theharnessproject.org

### Pre-Deployment Checklist

- [ ] Run `npm run build:prod`
- [ ] Generate PWA icons
- [ ] Test locally
- [ ] Verify no credentials in code
- [ ] Check service worker cache version
- [ ] Update CACHE_VERSION in service-worker.js if needed

---

## 📦 Dependencies

### Required (Runtime)
None - Pure vanilla HTML/CSS/JavaScript

### Optional (Development)
- `serve` - Local development server (auto-installed via npx)
- `eslint` - Code linting (auto-installed via npx)
- `sharp` - Image processing for icon generation

### Optional (Mobile)
- `@capacitor/core` - Capacitor runtime
- `@capacitor/ios` - iOS platform
- `@capacitor/android` - Android platform

---

## 🐛 Common Issues

### Issue: Icons not showing in PWA install
**Solution**: Generate icons with `npm run icons:generate`

### Issue: Contact form not working
**Solution**: Configure Formspree ID in `contact.html:389`

### Issue: Console warnings in production
**Solution**: Migrate to use HARNESSLogger instead of console.*

### Issue: Service worker not updating
**Solution**: Increment CACHE_VERSION in `service-worker.js:6`

---

## 📚 Additional Resources

- **Project Overview**: `CLAUDE.md`
- **Security Guidelines**: `SECURITY.md`
- **Improvements Log**: `IMPROVEMENTS.md`
- **Package Scripts**: `package.json`

---

## 🤝 Contributing

When making changes:
1. Follow existing code style
2. Test across browsers
3. Update CACHE_VERSION if changing cached files
4. Use logger instead of console.*
5. Never commit credentials

---

## 📞 Support

For technical questions:
- Review documentation in project root
- Check `IMPROVEMENTS.md` for recent changes
- Refer to `SECURITY.md` for security concerns

---

Last updated: 2026-02-09

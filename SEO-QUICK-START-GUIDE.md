# 🚀 HARNESS Project - SEO Quick Start Guide

**Fast Reference for SEO Implementation**  
**Date**: January 23, 2026

---

## ⚡ 60-Second SEO Checklist

Every new page needs these **5 essential elements**:

### 1️⃣ **Title Tag** (50-60 characters)
```html
<title>Page Name - The HARNESS Project</title>
```

### 2️⃣ **Meta Description** (150-160 characters)
```html
<meta name="description" content="Your compelling page description here for search results.">
```

### 3️⃣ **Canonical URL**
```html
<link rel="canonical" href="https://harnessproject.com/your-page.html">
```

### 4️⃣ **Open Graph Image**
```html
<meta property="og:image" content="https://harnessproject.com/images/og-image.png">
```

### 5️⃣ **SEO Script**
```html
<script src="/js/seo-optimizer.js"></script>
```

---

## 📋 Copy-Paste Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[YOUR TITLE] - The HARNESS Project</title>
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="[150-160 CHAR DESCRIPTION]">
    <meta name="keywords" content="[keyword1, keyword2, keyword3]">
    <meta name="author" content="Christopher Zacharie">
    <meta name="robots" content="index, follow, max-image-preview:large">
    
    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://harnessproject.com/[PAGE]">
    <meta property="og:title" content="[YOUR TITLE]">
    <meta property="og:description" content="[DESCRIPTION]">
    <meta property="og:image" content="https://harnessproject.com/images/[IMAGE].png">
    <meta property="og:site_name" content="The HARNESS Project">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="[YOUR TITLE]">
    <meta name="twitter:description" content="[DESCRIPTION]">
    <meta name="twitter:image" content="https://harnessproject.com/images/[IMAGE].png">
    
    <!-- Canonical -->
    <link rel="canonical" href="https://harnessproject.com/[PAGE]">
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/images/harness-app-logo.png">
    
    <!-- Scripts -->
    <script src="/js/seo-optimizer.js"></script>
</head>
```

---

## 🎯 Title Tag Examples

| Page Type | Title Format | Example |
|-----------|--------------|---------|
| Homepage | Project Name - Main Value Prop | The HARNESS Project - Transforming Sexual Health Education |
| Content | Page Name - Project Name | Visual Toolkit - The HARNESS Project |
| Blog Post | Post Title \| Project Name | What is PrEP? Complete Guide \| HARNESS |
| Product | Product Name - Value Prop | HARNESS Visual Toolkit - 59 Professional Infographics |

**Rules:**
- 50-60 characters total
- Include primary keyword
- Brand name at end
- Make it clickable/compelling

---

## 📝 Meta Description Examples

| Page Type | Description Format |
|-----------|-------------------|
| Homepage | "Comprehensive sexual health education platform with interactive tools, professional educator resources, and evidence-based content. Empowering individuals with practical SafER sex strategies." |
| Toolkit | "Download 59 professional infographics, posters, and visual guides for comprehensive SafER sex education. HARNESS Visual Toolkit for educators, facilitators, and health professionals." |
| Blog Post | "PrEP (Pre-Exposure Prophylaxis) prevents HIV with 99% effectiveness. Learn who should take PrEP, how it works, side effects, cost, where to get it, and answers to common questions." |

**Rules:**
- 150-160 characters
- Include primary keyword naturally
- Compelling call-to-action
- Match search intent

---

## 🖼️ Image SEO

### **Logo Alt Text**
```html
<!-- Hero Logos -->
<img src="images/harness-landing-hero-logo.png" 
     alt="The HARNESS Project - Fearless, Aware, and Protected">

<!-- Nav Logos -->
<img src="images/harness-logo-nav.png" 
     alt="HARNESS Logo">
```

### **Infographic Alt Text**
```html
<img src="images/infographics/prep-guide.png" 
     alt="Comprehensive guide to PrEP: what it is, how it works, and where to get it">
```

**Rules:**
- Descriptive and specific
- Include keywords naturally
- Don't start with "Image of..."
- Keep under 125 characters

---

## 🗺️ Sitemap Update

When adding a new page, add to `sitemap.xml`:

```xml
<url>
    <loc>https://harnessproject.com/new-page.html</loc>
    <lastmod>2026-01-23</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
</url>
```

**Priority Levels:**
- 1.0 = Homepage
- 0.9 = Main sections (App, Toolkit, Educator Hub)
- 0.8 = Important resources, blog posts
- 0.7 = Secondary pages
- 0.6 = Legal, footer pages

---

## 🎯 Keywords by Section

### **Sexual Health Education**
- Primary: "sexual health education"
- Related: "sex education", "SafER sex education", "comprehensive sex ed"

### **Toolkit/Resources**
- Primary: "sexual health toolkit"
- Related: "sex education infographics", "visual teaching resources", "downloadable worksheets"

### **Educator**
- Primary: "sexual health curriculum"
- Related: "sex education lesson plans", "facilitator guide", "educator resources"

### **Blog/Content**
- Primary: "sexual health blog"
- Related: "PrEP information", "STI prevention", "consent education"

### **App/Tools**
- Primary: "sexual health app"
- Related: "interactive toolkit", "MATCH framework", "SafER sex planner"

---

## ✅ Pre-Launch Checklist

Before publishing a new page:

- [ ] Title tag unique and optimized (50-60 chars)
- [ ] Meta description compelling (150-160 chars)
- [ ] All images have alt text
- [ ] H1 tag present (only one per page)
- [ ] Internal links to related pages
- [ ] External links open in new tab
- [ ] Mobile responsive confirmed
- [ ] Fast load time (<3 seconds)
- [ ] No broken links
- [ ] Canonical URL set
- [ ] Added to sitemap.xml
- [ ] Open Graph image exists (1200x630px)
- [ ] Twitter Card image exists
- [ ] SEO script included

---

## 🧪 Testing Tools

### **Before Publishing**
1. **HTML Validator**: https://validator.w3.org/
2. **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
3. **Page Speed Insights**: https://pagespeed.web.dev/

### **After Publishing**
1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
3. **Twitter Card Validator**: https://cards-dev.twitter.com/validator

---

## 📈 Monitoring

### **Weekly Tasks**
- Check Google Search Console for errors
- Monitor keyword rankings
- Review traffic patterns

### **Monthly Tasks**
- Add 2-4 new blog posts
- Update older content
- Build 5-10 backlinks
- Review and respond to comments

### **Quarterly Tasks**
- Full SEO audit
- Competitor analysis
- Adjust keyword strategy
- Review analytics goals

---

## 🆘 Common Issues & Fixes

### **Issue**: Page not indexed
**Fix**: Submit URL in Google Search Console

### **Issue**: Low click-through rate
**Fix**: Improve title tag and meta description

### **Issue**: High bounce rate
**Fix**: Improve page speed, add internal links, match search intent

### **Issue**: Poor mobile performance
**Fix**: Optimize images, minify CSS/JS, use responsive design

### **Issue**: Duplicate content
**Fix**: Set canonical URLs, use 301 redirects

---

## 🎯 Quick Wins for Immediate Impact

### **Week 1**
1. Submit sitemap to Google Search Console
2. Submit sitemap to Bing Webmaster Tools
3. Add Google Analytics 4
4. Fix any broken links

### **Week 2**
5. Optimize all image alt text
6. Add internal links between related pages
7. Improve page load speeds
8. Create 2 new blog posts

### **Week 3**
9. Build 10 high-quality backlinks
10. Submit to relevant directories
11. Share content on social media
12. Add FAQ sections to main pages

### **Week 4**
13. Create video content with transcripts
14. Develop comprehensive guides (2000+ words)
15. Partner with related websites
16. Start email newsletter

---

## 📞 Need Help?

**Full Documentation**: See `SEO-COMPLETE-IMPLEMENTATION.md`

**Quick Questions**:
- Title too long? Aim for 50-60 characters
- Description too short? Aim for 150-160 characters
- Missing canonical? Always set canonical URL
- No OG image? Use `harness-main-logo.png` (1200x630 minimum)

---

## 🏆 Success Metrics

### **Good SEO Performance**
- ✅ All pages indexed in Google
- ✅ Average position <20 for target keywords
- ✅ CTR >2% from search results
- ✅ Bounce rate <60%
- ✅ Page speed score >90

### **Excellent SEO Performance**
- 🎯 All pages indexed within 24 hours
- 🎯 Average position <10 for target keywords
- 🎯 CTR >5% from search results
- 🎯 Bounce rate <40%
- 🎯 Page speed score >95

---

*The HARNESS Project - Fearless, Aware, and Protected*  
*Created: January 23, 2026*

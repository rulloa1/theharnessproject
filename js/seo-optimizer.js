/**
 * HARNESS Project - SEO Optimization System
 * Automatically adds comprehensive SEO meta tags to any page
 * Created: January 22, 2026
 * 
 * USAGE: Add to <head> of any page:
 * <script src="js/seo-optimizer.js"></script>
 */

(function () {
    'use strict';

    // SEO Configuration for different page types
    const SEO_CONFIG = {
        // Default/Fallback values
        default: {
            siteName: 'The HARNESS Project',
            author: 'Christopher Zacharie',
            keywords: 'sexual health education, SafER sex, PrEP, HIV prevention, STI prevention, sex education, consent, safer sex toolkit, LGBTQ health, harm reduction',
            ogType: 'website',
            twitterCard: 'summary_large_image',
            twitterSite: '@HARNESSProject',
            locale: 'en_US',
            image: '/images/harness-main-hero-logo.png',
            imageAlt: 'The HARNESS Project - Empowering Sexual Health Education'
        },

        // Page-specific configurations
        '/index.html': {
            title: 'The HARNESS Project - Transforming Sexual Health Education',
            description: 'Comprehensive sexual health education platform with interactive tools, professional educator resources, and evidence-based content. Empowering individuals with practical SafER sex strategies.',
            keywords: 'sexual health education, SafER sex, HIV prevention, STI prevention, sex education platform, educator resources, PrEP education, consent framework',
            canonical: 'https://www.theharnessproject.org/'
        },

        '/app.html': {
            title: 'HARNESS App - Interactive SafER Sex Toolkit',
            description: 'Personalized SafER sex toolkit featuring agreements builder, daily affirmations, MATCH framework, Lil Z AI companion, and 15+ interactive tools for sexual health empowerment.',
            keywords: 'sexual health app, SafER sex toolkit, agreements builder, HIV prevention tools, PrEP tracker, testing calculator, sex education interactive',
            canonical: 'https://www.theharnessproject.org/app.html'
        },

        '/about.html': {
            title: 'About The HARNESS Project - Mission & Creator',
            description: 'Learn about The HARNESS Project mission, Christopher Zacharie\'s vision for stigma-free sexual health education, and our evidence-based, sex-positive approach to empowerment.',
            keywords: 'Christopher Zacharie, HARNESS Project mission, sex-positive education, sexual health advocacy, educator biography',
            canonical: 'https://www.theharnessproject.org/about.html'
        },

        '/pricing.html': {
            title: 'Pricing - HARNESS Educator Resources & Visual Toolkit',
            description: 'Access comprehensive educator packages, visual toolkits with 59 infographics, complete curriculum, workshop formats, and professional resources. Free and premium options available.',
            keywords: 'sex education resources, educator toolkit pricing, sexual health infographics, curriculum purchase, workshop materials',
            canonical: 'https://www.theharnessproject.org/pricing.html'
        },

        '/toolkit.html': {
            title: 'Visual Toolkit - 59 Professional SafER Sex Infographics',
            description: '59 professionally designed sexual health infographics covering HIV prevention, PrEP/PEP, condoms, communication, MATCH framework, and harm reduction. High-resolution downloads for educators.',
            keywords: 'sex education infographics, sexual health posters, HIV prevention graphics, PrEP infographics, safe sex visual resources, educator materials',
            canonical: 'https://www.theharnessproject.org/toolkit.html'
        },

        '/educator/index.html': {
            title: 'Educator Hub - Comprehensive Sexual Health Education Resources',
            description: 'Complete educator resource center featuring 13-chapter ebook, facilitator guides, participant guides, curriculum, presentations, and workshop formats for sexual health education.',
            keywords: 'sex education curriculum, educator resources, sexual health teaching materials, workshop guides, facilitator training',
            canonical: 'https://www.theharnessproject.org/educator/'
        },

        '/blog/index.html': {
            title: 'HARNESS Blog - Expert Sexual Health Education Insights',
            description: 'Evidence-based articles on PrEP, STI testing, communication, consent, harm reduction, and relationship health. Practical advice from certified sexual health educators.',
            keywords: 'sexual health blog, PrEP information, STI prevention articles, consent education, sex education blog, LGBTQ health',
            canonical: 'https://www.theharnessproject.org/blog/'
        }
    };

    // Get current page path
    function getCurrentPath() {
        let path = window.location.pathname;
        // Normalize root paths
        if (path === '/' || path === '') {
            path = '/index.html';
        }
        return path;
    }

    // Get SEO config for current page
    function getPageConfig() {
        const path = getCurrentPath();
        const config = SEO_CONFIG[path] || {};
        return { ...SEO_CONFIG.default, ...config };
    }

    // Check if meta tag already exists
    function metaExists(name, property) {
        if (name) {
            return document.querySelector(`meta[name="${name}"]`) !== null;
        }
        if (property) {
            return document.querySelector(`meta[property="${property}"]`) !== null;
        }
        return false;
    }

    // Add meta tag if it doesn't exist
    function addMetaTag(attributes) {
        const checkAttr = attributes.name ? 'name' : 'property';
        const checkValue = attributes.name || attributes.property;

        if (!metaExists(attributes.name, attributes.property)) {
            const meta = document.createElement('meta');
            Object.keys(attributes).forEach(key => {
                meta.setAttribute(key, attributes[key]);
            });
            document.head.appendChild(meta);
        }
    }

    // Add link tag if it doesn't exist
    function addLinkTag(attributes) {
        const existing = document.querySelector(`link[rel="${attributes.rel}"]`);
        if (!existing) {
            const link = document.createElement('link');
            Object.keys(attributes).forEach(key => {
                link.setAttribute(key, attributes[key]);
            });
            document.head.appendChild(link);
        }
    }

    // Generate full URL from relative path
    function getFullUrl(path) {
        const base = window.location.origin;
        return base + path;
    }

    // Inject all SEO tags
    function injectSEOTags() {
        const config = getPageConfig();
        const currentUrl = getFullUrl(getCurrentPath());
        const canonicalUrl = config.canonical || currentUrl;

        // Basic Meta Tags
        if (!metaExists('description')) {
            addMetaTag({
                name: 'description',
                content: config.description || 'The HARNESS Project - Comprehensive sexual health education platform'
            });
        }

        if (!metaExists('keywords')) {
            addMetaTag({
                name: 'keywords',
                content: config.keywords || SEO_CONFIG.default.keywords
            });
        }

        if (!metaExists('author')) {
            addMetaTag({
                name: 'author',
                content: config.author || SEO_CONFIG.default.author
            });
        }

        // Open Graph Tags
        if (!metaExists(null, 'og:site_name')) {
            addMetaTag({
                property: 'og:site_name',
                content: config.siteName || SEO_CONFIG.default.siteName
            });
        }

        if (!metaExists(null, 'og:title')) {
            addMetaTag({
                property: 'og:title',
                content: config.title || document.title
            });
        }

        if (!metaExists(null, 'og:description')) {
            addMetaTag({
                property: 'og:description',
                content: config.description || 'The HARNESS Project - Comprehensive sexual health education'
            });
        }

        if (!metaExists(null, 'og:url')) {
            addMetaTag({
                property: 'og:url',
                content: canonicalUrl
            });
        }

        if (!metaExists(null, 'og:type')) {
            addMetaTag({
                property: 'og:type',
                content: config.ogType || SEO_CONFIG.default.ogType
            });
        }

        if (!metaExists(null, 'og:image')) {
            addMetaTag({
                property: 'og:image',
                content: getFullUrl(config.image || SEO_CONFIG.default.image)
            });
        }

        if (!metaExists(null, 'og:image:alt')) {
            addMetaTag({
                property: 'og:image:alt',
                content: config.imageAlt || SEO_CONFIG.default.imageAlt
            });
        }

        if (!metaExists(null, 'og:locale')) {
            addMetaTag({
                property: 'og:locale',
                content: config.locale || SEO_CONFIG.default.locale
            });
        }

        // Twitter Card Tags
        if (!metaExists('twitter:card')) {
            addMetaTag({
                name: 'twitter:card',
                content: config.twitterCard || SEO_CONFIG.default.twitterCard
            });
        }

        if (!metaExists('twitter:site')) {
            addMetaTag({
                name: 'twitter:site',
                content: config.twitterSite || SEO_CONFIG.default.twitterSite
            });
        }

        if (!metaExists('twitter:title')) {
            addMetaTag({
                name: 'twitter:title',
                content: config.title || document.title
            });
        }

        if (!metaExists('twitter:description')) {
            addMetaTag({
                name: 'twitter:description',
                content: config.description || 'The HARNESS Project - Comprehensive sexual health education'
            });
        }

        if (!metaExists('twitter:image')) {
            addMetaTag({
                name: 'twitter:image',
                content: getFullUrl(config.image || SEO_CONFIG.default.image)
            });
        }

        // Canonical URL
        if (!document.querySelector('link[rel="canonical"]')) {
            addLinkTag({
                rel: 'canonical',
                href: canonicalUrl
            });
        }

        // Robots meta (allow indexing by default)
        if (!metaExists('robots')) {
            addMetaTag({
                name: 'robots',
                content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
            });
        }

        // Language
        if (!document.documentElement.hasAttribute('lang')) {
            document.documentElement.setAttribute('lang', 'en');
        }

        console.log('[HARNESS SEO] Meta tags injected for:', getCurrentPath());
    }

    // Add structured data (Schema.org JSON-LD)
    function addStructuredData() {
        // Check if structured data already exists
        if (document.querySelector('script[type="application/ld+json"]')) {
            return;
        }

        const config = getPageConfig();

        const structuredData = {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "The HARNESS Project",
            "description": "Comprehensive sexual health education platform providing evidence-based resources, interactive tools, and professional educator materials.",
            "url": "https://harnessproject.com",
            "logo": "https://www.theharnessproject.org/images/harness-main-logo.png",
            "foundingDate": "2025",
            "founder": {
                "@type": "Person",
                "name": "Christopher Zacharie"
            },
            "sameAs": [
                "https://twitter.com/HARNESSProject",
                "https://facebook.com/HARNESSProject",
                "https://instagram.com/HARNESSProject"
            ],
            "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Support",
                "email": "support@theharnessproject.org"
            },
            "areaServed": "Worldwide",
            "availableLanguage": "English"
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData, null, 2);
        document.head.appendChild(script);

        console.log('[HARNESS SEO] Structured data added');
    }

    // Initialize SEO
    function initSEO() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                injectSEOTags();
                addStructuredData();
            });
        } else {
            injectSEOTags();
            addStructuredData();
        }
    }

    // Start SEO optimization
    initSEO();
})();

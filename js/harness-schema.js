/**
 * HARNESS Schema Generator
 * Centralized Schema.org data for the project
 */

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "The HARNESS Project",
    "url": "https://www.theharnessproject.org",
    "logo": "https://www.theharnessproject.org/images/harness_logo.jpg",
    "description": "Comprehensive Sexual Health Education Framework focusing on Fearless, Aware, and Protected outcomes.",
    "sameAs": [
        "https://www.facebook.com/theharnessproject",
        "https://www.instagram.com/theharnessproject",
        "https://www.linkedin.com/company/the-harness-project"
    ]
};

const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "HARNESS Sexual Health Curriculum",
    "description": "Evidence-based sexual health education curriculum for facilitators and educators.",
    "provider": {
        "@type": "Organization",
        "name": "The HARNESS Project",
        "sameAs": "https://www.theharnessproject.org"
    }
};

const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "HARNESS Web App",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "All",
    "description": "Interactive sexual health education tools and resources directly in your browser."
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is PrEP?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "PrEP (Pre-Exposure Prophylaxis) is a daily medication that prevents HIV infection before exposure. When taken consistently, PrEP reduces the risk of getting HIV from sex by about 99%."
            }
        },
        {
            "@type": "Question",
            "name": "What is the HARNESS Framework?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "HARNESS stands for Fearless, Aware, and Protected. It's a comprehensive sexual health education framework that combines the MATCH journey (Meet, Ask, Talk, Check, Hold) with practical tools, resources, and evidence-based strategies."
            }
        },
        {
            "@type": "Question",
            "name": "Is the HARNESS curriculum free?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! The HARNESS curriculum and core resources are completely free for educators and individuals. We believe everyone deserves access to comprehensive sexual health education."
            }
        }
    ]
};

// ===== INSERT SCHEMA INTO PAGE =====
function insertSchema(schemaObject, id = null) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemaObject, null, 2);
    if (id) script.id = id;
    document.head.appendChild(script);
}

// ===== GENERATE BREADCRUMBS FROM CURRENT PATH =====
function generateBreadcrumbsFromPath() {
    const path = window.location.pathname;
    const segments = path.split('/').filter(s => s);
    const breadcrumbs = [{ name: 'Home', url: 'https://www.theharnessproject.org/' }];

    let currentPath = 'https://www.theharnessproject.org';
    segments.forEach((segment, index) => {
        currentPath += '/' + segment;
        const name = segment
            .replace('.html', '')
            .replace(/-/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        breadcrumbs.push({
            name: name,
            url: currentPath
        });
    });

    return breadcrumbs;
}

// ===== GENERATE BREADCRUMB SCHEMA OBJECT =====
function generateBreadcrumbSchema(breadcrumbs) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": crumb.name,
            "item": crumb.url
        }))
    };
}

// ===== AUTO-DETECT AND INSERT APPROPRIATE SCHEMAS =====
function initSchemaMarkup() {
    const currentPath = window.location.pathname;

    // Always add organization schema
    insertSchema(organizationSchema, 'schema-organization');

    // Add course schema on curriculum/educator pages
    if (currentPath.includes('/educator/') || currentPath.includes('/curriculum/')) {
        insertSchema(courseSchema, 'schema-course');
    }

    // Add web application schema on app page
    if (currentPath.includes('/app.html')) {
        insertSchema(webApplicationSchema, 'schema-webapp');
    }

    // Generate breadcrumb schema
    const breadcrumbs = generateBreadcrumbsFromPath();
    if (breadcrumbs.length > 1) {
        insertSchema(generateBreadcrumbSchema(breadcrumbs), 'schema-breadcrumb');
    }

    // Add FAQ schema on specific pages
    if (currentPath === '/' || currentPath.includes('index.html') || currentPath.includes('/about.html')) {
        insertSchema(faqSchema, 'schema-faq');
    }
}

// Export for manual use
window.HARNESS_Schema = {
    insertSchema,
    organizationSchema,
    courseSchema,
    webApplicationSchema,
    generateBreadcrumbSchema,
    faqSchema
};

// ===== AUTO-INITIALIZE =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSchemaMarkup);
} else {
    initSchemaMarkup();
}

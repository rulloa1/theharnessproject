/**
 * HARNESS Project - Schema.org Structured Data
 * SEO enhancement with JSON-LD markup
 * Created: January 24, 2026
 */

// ===== ORGANIZATION SCHEMA =====
const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "The HARNESS Project",
    "alternateName": "HARNESS - Fearless, Aware, and Protected",
    "url": "https://www.theharnessproject.org",
    "logo": "https://www.theharnessproject.org/images/harness-main-logo.png",
    "description": "Comprehensive sexual health education platform providing evidence-based resources, interactive tools, and professional curriculum for educators and individuals.",
    "foundingDate": "2025",
    "founder": {
        "@type": "Person",
        "name": "Christopher Zacharie"
    },
    "sameAs": [
        "https://twitter.com/HARNESSProject",
        "https://facebook.com/HARNESSProject"
    ],
    "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "email": "info@theharnessproject.org"
    }
};

// ===== EDUCATIONAL COURSE SCHEMA =====
const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Fearless, Aware, and Protected - Comprehensive Sexual Health Curriculum",
    "description": "Evidence-based sexual health education curriculum with 5 modules covering HIV prevention, PrEP, consent, communication, and safer sex strategies.",
    "provider": {
        "@type": "EducationalOrganization",
        "name": "The HARNESS Project",
        "url": "https://www.theharnessproject.org"
    },
    "courseCode": "HARNESS-FAP-CURRICULUM",
    "educationalLevel": "High School, College, Adult Education",
    "teaches": [
        "HIV Prevention",
        "PrEP and PEP Education",
        "Consent and Communication",
        "Safer Sex Strategies",
        "STI Prevention"
    ],
    "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "online",
        "courseWorkload": "PT5H"
    },
    "isAccessibleForFree": true,
    "educationalUse": "Curriculum",
    "audience": {
        "@type": "EducationalAudience",
        "educationalRole": "student"
    }
};

// ===== WEB APPLICATION SCHEMA =====
const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "HARNESS Interactive App",
    "url": "https://www.theharnessproject.org/app.html",
    "description": "Interactive sexual health toolkit with daily affirmations, agreement builder, MATCH framework journey, and comprehensive visual library.",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web Browser",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "featureList": [
        "Daily Affirmations",
        "Sexual Health Agreements Builder",
        "MATCH Framework Journey",
        "Visual Library with 40+ Infographics",
        "Emergency SOS Guide",
        "Condom Plan Tool"
    ]
};

// ===== BREADCRUMB SCHEMA =====
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

// ===== FAQ SCHEMA =====
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

    console.log('[SEO] ✅ Schema.org structured data inserted');
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

// ===== AUTO-INITIALIZE =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSchemaMarkup);
} else {
    initSchemaMarkup();
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

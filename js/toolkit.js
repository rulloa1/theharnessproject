/**
 * HARNESS Visual Toolkit - Interactive Gallery
 * Handles filtering, preview, download, and navigation
 */

// ===== INITIALIZE TOOLKIT ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    populateToolkitGalleries();
});

// ===== POPULATE GALLERIES FROM DATA =====
function populateToolkitGalleries() {
    const freeSamplesGrid = document.getElementById('freeSamplesGrid');
    const premiumToolkitGrid = document.getElementById('premiumToolkitGrid');

    if (!toolkitResources) {
        console.error('Toolkit data not loaded!');
        return;
    }

    // Populate free samples
    if (freeSamplesGrid && toolkitResources.freeSamples) {
        freeSamplesGrid.innerHTML = toolkitResources.freeSamples.map(resource =>
            createResourceCard(resource, true)
        ).join('');
    }

    // Populate premium resources
    if (premiumToolkitGrid && toolkitResources.premiumResources) {
        premiumToolkitGrid.innerHTML = toolkitResources.premiumResources.map(resource =>
            createResourceCard(resource, false)
        ).join('');
    }
}

function createResourceCard(resource, isFree) {
    const badgeClass = isFree ? 'free' : 'premium';
    const badgeText = isFree ? 'FREE' : 'PREMIUM';

    return `
        <div class="gallery-item" data-category="${resource.category}">
            <div class="item-badge ${badgeClass}">${badgeText}</div>
            <div class="item-image">
                <img src="${resource.image}" alt="${resource.title}" loading="lazy">
            </div>
            <div class="item-content">
                <h3>${resource.title}</h3>
                <p class="item-description">${resource.description}</p>
                <div class="item-meta">
                    <span class="meta-tag"><i class="fas fa-tag"></i> ${resource.format}</span>
                    ${resource.printable ? '<span class="meta-tag"><i class="fas fa-print"></i> Printable</span>' : ''}
                </div>
                <div class="item-actions">
                    <button class="btn btn-secondary" onclick="previewImage(this)">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                    ${isFree ? `
                        <button class="btn btn-primary" onclick="downloadImage(this)">
                            <i class="fas fa-download"></i> Download
                        </button>
                    ` : `
                        <a href="pricing.html#toolkit" class="btn btn-primary">
                            <i class="fas fa-unlock"></i> Unlock
                        </a>
                    `}
                </div>
            </div>
        </div>
    `;
}

// ===== NAVIGATION MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const footerHamburger = document.getElementById('footerHamburger');
const mobileFooterMenu = document.getElementById('mobileFooterMenu');
const closeFooterMenu = document.getElementById('closeFooterMenu');

// Header menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });
}

if (closeMenu) {
    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
}

// Footer menu toggle
if (footerHamburger) {
    footerHamburger.addEventListener('click', () => {
        mobileFooterMenu.classList.add('active');
    });
}

if (closeFooterMenu) {
    closeFooterMenu.addEventListener('click', () => {
        mobileFooterMenu.classList.remove('active');
    });
}

// Close menus when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenu && !mobileMenu.contains(e.target) && e.target !== hamburger && !hamburger.contains(e.target)) {
        mobileMenu.classList.remove('active');
    }
    if (mobileFooterMenu && !mobileFooterMenu.contains(e.target) && e.target !== footerHamburger && !footerHamburger.contains(e.target)) {
        mobileFooterMenu.classList.remove('active');
    }
});

// ===== FILTER FUNCTIONALITY =====
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Get the selected category
        const category = button.getAttribute('data-category');

        // Filter gallery items
        galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');

            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                // Add fade-in animation
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// ===== IMAGE PREVIEW MODAL =====
const previewModal = document.getElementById('previewModal');
const previewImageElement = document.getElementById('previewImage');
let currentImageSrc = '';

function previewImage(button) {
    const galleryItem = button.closest('.gallery-item');
    const img = galleryItem.querySelector('.item-image img');
    currentImageSrc = img.src;

    previewImageElement.src = currentImageSrc;
    previewModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closePreviewModal() {
    previewModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

function downloadFromModal() {
    downloadImageFile(currentImageSrc);
}

// Close modal when clicking outside
previewModal?.addEventListener('click', (e) => {
    if (e.target === previewModal) {
        closePreviewModal();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && previewModal.classList.contains('active')) {
        closePreviewModal();
    }
});

// ===== DOWNLOAD FUNCTIONALITY =====
function downloadImage(button) {
    const galleryItem = button.closest('.gallery-item');
    const img = galleryItem.querySelector('.item-image img');
    const imageSrc = img.src;

    downloadImageFile(imageSrc);
}

function downloadImageFile(imageSrc) {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = imageSrc;

    // Extract filename from URL or use default
    const filename = imageSrc.split('/').pop() || 'harness-toolkit-resource.jpg';
    link.download = filename;

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show download notification
    showNotification('Download started! Check your downloads folder.');
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'success') {
    // Check if notification container exists
    let notificationContainer = document.getElementById('notificationContainer');

    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notificationContainer';
        notificationContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 4000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(notificationContainer);
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        background: ${type === 'success' ? '#00B0BD' : '#DD0E6E'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideIn 0.3s ease;
        min-width: 250px;
        font-weight: 500;
    `;

    notificationContainer.appendChild(notification);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notificationContainer.removeChild(notification);

            // Remove container if empty
            if (notificationContainer.children.length === 0) {
                document.body.removeChild(notificationContainer);
            }
        }, 300);
    }, 3000);
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ANIMATIONS ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    observer.observe(item);
});

// ===== CSS ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
            transform: translateX(0);
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== DYNAMIC CONTENT LOADING =====
// This function will be called to populate the gallery with actual images
function loadToolkitGallery() {
    // Free samples grid
    const freeSamplesGrid = document.getElementById('freeSamplesGrid');
    if (freeSamplesGrid && toolkitResources.freeSamples.length > 0) {
        freeSamplesGrid.innerHTML = '';

        toolkitResources.freeSamples.forEach(resource => {
            const item = createGalleryItem(resource, true);
            freeSamplesGrid.appendChild(item);
        });
    }

    // Premium resources grid
    const premiumToolkitGrid = document.getElementById('premiumToolkitGrid');
    if (premiumToolkitGrid && toolkitResources.premiumResources.length > 0) {
        premiumToolkitGrid.innerHTML = '';

        toolkitResources.premiumResources.forEach(resource => {
            const item = createGalleryItem(resource, false);
            premiumToolkitGrid.appendChild(item);
        });
    }
}

function createGalleryItem(resource, isFree) {
    const item = document.createElement('div');
    item.className = `gallery-item ${isFree ? 'free-sample' : 'premium-locked'}`;
    item.setAttribute('data-category', resource.category);

    item.innerHTML = `
        <div class="item-badge ${isFree ? 'free' : 'premium'}">${isFree ? 'FREE' : 'PREMIUM'}</div>
        <div class="item-image ${isFree ? '' : 'locked'}">
            <img src="${resource.image}" alt="${resource.title}" loading="lazy">
            ${isFree ? `
                <div class="item-overlay">
                    <button class="btn-preview" onclick="previewImage(this)">
                        <i class="fas fa-search-plus"></i> Preview
                    </button>
                    <button class="btn-download" onclick="downloadImage(this)">
                        <i class="fas fa-download"></i> Download
                    </button>
                </div>
            ` : `
                <div class="locked-overlay">
                    <i class="fas fa-lock"></i>
                    <p>Unlock with Complete Toolkit</p>
                </div>
            `}
        </div>
        <div class="item-details">
            <h3>${resource.title}</h3>
            <p class="item-category">
                <i class="fas fa-tag"></i> 
                ${getCategoryName(resource.category)}
            </p>
            <p class="item-description">${resource.description}</p>
        </div>
    `;

    return item;
}

function getCategoryName(category) {
    const categoryNames = {
        'guides': 'SafER Sex Guides',
        'communication': 'Communication Tools',
        'risk': 'Risk Assessment',
        'posters': 'Educational Posters',
        'worksheets': 'Worksheets'
    };

    return categoryNames[category] || category;
}

// Load gallery with real content
loadToolkitGallery();

// Update category counts
Object.keys(categories).forEach(key => {
    const filterBtn = document.querySelector(`[data-category="${key}"]`);
    if (filterBtn && key !== 'all') {
        const count = categories[key].count;
        const currentText = filterBtn.textContent;
        if (!currentText.includes('(')) {
            filterBtn.innerHTML += ` <span style="opacity:0.7; font-size:0.9em;">(${count})</span>`;
        }
    }
});

// ===== LIL Z - Universal Chat Companion =====
// Your expert guide and tour companion across the entire HARNESS Project
// Created by Christopher Zacharie

// ===== LIL Z VERSION & GUIDELINES TRACKING =====
const LIL_Z_VERSION = {
    version: '2.0.0',
    lastUpdated: '2026-01-24',
    guidelinesVersion: {
        cdc: {
            prep: '2024', // CDC PrEP Guidelines (Updated 2024)
            pep: '2024', // CDC PEP Guidelines (Updated 2024)
            doxypep: '2024', // CDC Doxy-PEP Guidelines (Published June 2024)
            testing: '2024', // CDC HIV Testing Guidelines
            sti: '2024' // CDC STI Treatment Guidelines
        },
        who: '2024', // WHO Guidelines
        lastReview: '2026-01-24',
        nextReview: '2026-07-24' // Review every 6 months
    },
    checkForUpdates: function () {
        const today = new Date();
        const nextReview = new Date(this.guidelinesVersion.nextReview);

        if (today >= nextReview) {
            console.warn('[LIL Z] ⚠️ Guidelines review is due! Check for updates at:');
            console.warn('• CDC PrEP: https://www.cdc.gov/hiv/risk/prep/');
            console.warn('• CDC PEP: https://www.cdc.gov/hiv/risk/pep/');
            console.warn('• CDC Doxy-PEP: https://www.cdc.gov/std/doxypep/');
            console.warn('• CDC Testing: https://www.cdc.gov/hiv/testing/');
            console.warn('• CDC STI Treatment: https://www.cdc.gov/std/treatment-guidelines/');
            return false; // Needs update
        }
        return true; // Up to date
    },
    getVersionInfo: function () {
        return `<strong>Lil Z Knowledge Base</strong><br>
                Version: ${this.version}<br>
                Last Updated: ${this.lastUpdated}<br>
                Guidelines: CDC ${this.guidelinesVersion.cdc.prep} (PrEP), CDC ${this.guidelinesVersion.cdc.doxypep} (Doxy-PEP)<br>
                Next Review: ${this.guidelinesVersion.nextReview}`;
    }
};

// Auto-check on load
LIL_Z_VERSION.checkForUpdates();

// ===== LIL Z AVATAR LIBRARY =====
// Multiple expressive bitmoji avatars for different contexts
const LIL_Z_AVATARS = {
    // Core avatars - used for different contexts
    cool: 'images/avatars/lil-z-cool.png',           // Confident vibes (with sunglasses)
    excited: 'images/avatars/lil-z-excited.png',     // Welcoming energy (arms wide)
    hello: 'images/avatars/lil-z-hello.png',         // International greeting
    portrait: 'images/avatars/lil-z-portrait.png',   // Friendly face
    headshot: 'images/avatars/lil-z-headshot.png',   // Professional educator
    help: 'images/avatars/lil-z-help.png',           // Ready to assist (with tools)
    presenting: 'images/avatars/lil-z-presenting.png', // Explaining concepts
    highfive: 'images/avatars/lil-z-highfive.png',   // Celebrating wins
    support: 'images/avatars/lil-z-support.png',     // Caring and empathetic

    // Fallback if specific avatars aren't uploaded yet
    main: 'images/lil-z-avatar.png',                 // Default friendly face

    // Get avatar based on context
    getAvatar: function (context = 'default') {
        const contextMap = {
            'welcome': this.excited,
            'greeting': this.hello,
            'teaching': this.presenting,
            'helpful': this.help,
            'supportive': this.support,
            'celebrating': this.highfive,
            'confident': this.cool,
            'professional': this.headshot,
            'friendly': this.portrait,
            'default': this.portrait
        };

        // Return context-specific avatar, or fall back to main if file doesn't exist
        return contextMap[context] || this.main;
    },

    // Get random avatar for variety
    getRandom: function () {
        const avatarList = [
            this.cool, this.excited, this.hello, this.portrait,
            this.headshot, this.help, this.presenting, this.highfive, this.support
        ];
        return avatarList[Math.floor(Math.random() * avatarList.length)];
    },

    // Preload avatar with fallback to main if it doesn't exist
    loadWithFallback: function (avatarPath) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(avatarPath);
            img.onerror = () => resolve(this.main); // Fallback to main avatar
            img.src = avatarPath;
        });
    }
};

// ===== AVATAR FALLBACK SYSTEM =====
// If new avatars don't exist, use main avatar as fallback
(function setupAvatarFallbacks() {
    // Test if each avatar exists, if not, point to main
    Object.keys(LIL_Z_AVATARS).forEach(key => {
        if (key !== 'main' && key !== 'getAvatar' && key !== 'getRandom' && key !== 'loadWithFallback') {
            const avatarPath = LIL_Z_AVATARS[key];
            const img = new Image();
            img.onerror = () => {
                // If image fails to load, use main avatar
                LIL_Z_AVATARS[key] = LIL_Z_AVATARS.main;
            };
            img.src = avatarPath;
        }
    });
})();

// ===== LIL Z PERSONALITY & KNOWLEDGE =====
const LIL_Z_PERSONALITY = {
    name: "Lil Z",
    role: "Sexual Health Expert & Your Personal Guide",
    tone: "friendly, knowledgeable, non-judgmental, empowering",
    expertise: [
        "HIV prevention & education",
        "PrEP, PEP, and Doxy-PEP guidance",
        "SafER sex strategies",
        "Communication & consent scripts",
        "HARNESS app navigation",
        "Sexual health empowerment"
    ]
};

// ===== LIL Z KNOWLEDGE BASE =====
const LIL_Z_KNOWLEDGE = {
    // HIV & Prevention
    hiv: {
        keywords: ['hiv', 'aids', 'virus', 'infection', 'transmission', 'undetectable', 'u=u', 'viral load', 'cd4', 'art', 'antiretroviral'],
        responses: [
            {
                topic: 'What is HIV?',
                answer: 'HIV (Human Immunodeficiency Virus) is a virus that attacks the body\'s immune system, specifically CD4 cells (T cells). Here\'s the empowering truth: with proper treatment (ART - Antiretroviral Therapy), people with HIV can live long, healthy lives and cannot transmit the virus sexually when they\'re undetectable. This is called U=U - Undetectable = Untransmittable! Modern medicine has transformed HIV from a death sentence to a manageable chronic condition. 💪✨'
            },
            {
                topic: 'U=U (Undetectable = Untransmittable)',
                answer: 'U=U is one of the most revolutionary discoveries in HIV prevention! When someone living with HIV takes their medication consistently and maintains an undetectable viral load (less than 200 copies/mL), they CANNOT sexually transmit HIV to their partners. Zero risk. This has been proven by major studies (PARTNER, PARTNER2, Opposites Attract) involving thousands of couples and over 100,000 condomless sex acts. Science is powerful! 🎉💉'
            },
            {
                topic: 'How is HIV transmitted?',
                answer: 'HIV is transmitted through: 1) <strong>Unprotected anal or vaginal sex</strong> (receptive anal sex is highest risk), 2) <strong>Sharing needles/syringes</strong> for drugs, hormones, or steroids, 3) <strong>Mother to child</strong> during pregnancy, birth, or breastfeeding (preventable with treatment!), 4) <strong>Blood transfusions</strong> (extremely rare in countries with screened blood). Good news: HIV is NOT transmitted through kissing, hugging, sharing food/drinks, toilet seats, mosquitoes, or casual contact. Knowledge is protection! 🛡️'
            },
            {
                topic: 'HIV Risk Hierarchy',
                answer: 'Understanding risk helps you make informed choices!<br><br><strong>Highest Risk:</strong><br>• Receptive anal sex without condoms/PrEP<br>• Sharing needles<br><br><strong>Medium Risk:</strong><br>• Insertive anal sex without protection<br>• Receptive vaginal sex without protection<br><br><strong>Lower Risk:</strong><br>• Insertive vaginal sex<br>• Oral sex (very low but not zero)<br><br><strong>No Risk:</strong><br>• Kissing, touching, mutual masturbation<br>• Sex with someone who is U=U<br>• Sex with condoms + PrEP (layered protection!)<br><br>Layer your prevention like a boss! 🛡️🛡️🛡️'
            },
            {
                topic: 'What is ART (Antiretroviral Therapy)?',
                answer: 'ART is life-changing medication for people living with HIV! It works by blocking HIV from copying itself, allowing your immune system to recover and stay strong. Benefits: 1) Achieves undetectable viral load (U=U!), 2) Prevents AIDS, 3) Allows long, healthy life, 4) Prevents transmission to partners & babies. Modern ART is usually 1-3 pills daily with minimal side effects. Start early, stay consistent, thrive! 💊✨'
            }
        ]
    },

    // PrEP
    prep: {
        keywords: ['prep', 'pre-exposure', 'prevention', 'daily pill', 'truvada', 'descovy', 'before exposure', 'cabotegravir', 'apretude', 'injectable'],
        responses: [
            {
                topic: 'What is PrEP?',
                answer: 'PrEP (Pre-Exposure Prophylaxis) is a game-changer! It\'s medication that prevents HIV infection BEFORE exposure. When taken consistently, PrEP reduces the risk of getting HIV from sex by about 99% and from injection drug use by about 74%. Available as: 1) <strong>Daily pills</strong> (Truvada, Descovy - taken every day), 2) <strong>On-demand/2-1-1</strong> (2 pills 2-24 hrs before, 1 pill 24 hrs after, 1 pill 48 hrs after), 3) <strong>Injectable Cabotegravir (Apretude)</strong> (shot every 2 months). Think of it as your daily shield! 🛡️💊'
            },
            {
                topic: 'Who should consider PrEP?',
                answer: 'PrEP is for anyone who wants extra HIV protection! Especially recommended if you: 1) Have an HIV-positive sexual partner (not U=U yet), 2) Have multiple sexual partners or anonymous partners, 3) Don\'t always use condoms consistently, 4) Have recently had bacterial STIs (syphilis, gonorrhea, chlamydia), 5) Share needles/syringes, 6) Have a partner who injects drugs or has unknown HIV status. But honestly? <strong>Anyone who wants protection can talk to their doctor about PrEP.</strong> You deserve to feel fearless! ⚡✨'
            },
            {
                topic: 'How effective is PrEP?',
                answer: 'PrEP is incredibly effective when taken as prescribed! 📊<br><br><strong>Daily Pills:</strong> About 99% effective for HIV prevention from sex. Reaches maximum protection in: 7 days for anal sex, 21 days for vaginal sex.<br><br><strong>On-Demand (2-1-1):</strong> 86% effective, but only studied for anal sex.<br><br><strong>Injectable (Apretude):</strong> 69% MORE effective than daily pills!<br><br>The secret? <strong>CONSISTENCY!</strong> Take it daily (or follow 2-1-1 protocol), and you\'re protected. Missed doses = reduced protection. Set alarms, use pill organizers, link it to daily routines. You\'ve got this! 📅✅'
            },
            {
                topic: 'PrEP Side Effects',
                answer: 'Most people have NO side effects or only mild ones that go away! 💪<br><br><strong>Common (first few weeks):</strong><br>• Nausea, diarrhea, headache, fatigue<br>• Usually resolve within 2-4 weeks<br><br><strong>Rare but monitored:</strong><br>• Kidney function changes (monitored every 3-6 months)<br>• Bone density decrease (rare, stabilizes over time)<br><br><strong>Pro tip:</strong> Take with food if you get nausea! And remember: side effects don\'t mean it\'s not working. Give your body 2-4 weeks to adjust. Your healthcare provider will monitor you regularly. 🩺✅'
            },
            {
                topic: 'PrEP Cost & Access',
                answer: 'PrEP should be FREE or very affordable! Here\'s how: 🎯<br><br><strong>Insurance:</strong> Most plans cover PrEP 100% under ACA<br><br><strong>Manufacturer programs:</strong><br>• Gilead Advancing Access (co-pay cards, free if uninsured)<br>• No-cost PrEP for eligible patients<br><br><strong>Find PrEP near you:</strong><br>• PleasePrEPMe.org<br>• GetYourPrEP.com<br>• Local health department/community clinics<br>• Telehealth (Nurx, MISTR, Folx, etc.)<br><br><strong>Even if uninsured</strong>, you can likely get PrEP for free through patient assistance programs. Don\'t let cost stop you! 💰✅'
            }
        ]
    },

    // PEP
    pep: {
        keywords: ['pep', 'post-exposure', 'emergency', '72 hours', 'after exposure', 'morning after', 'exposed', 'emergency hiv'],
        responses: [
            {
                topic: 'What is PEP?',
                answer: 'PEP (Post-Exposure Prophylaxis) is <strong>emergency HIV prevention</strong> taken AFTER a potential exposure. ⏰🚨<br><br><strong>Timeline:</strong> Must start within 72 hours (3 days) - the sooner, the better! Ideally within 24 hours for maximum effectiveness.<br><br><strong>Treatment:</strong> 28-day course of HIV medications (usually 1-3 pills daily).<br><br><strong>Think of it like:</strong> The "morning after pill" for HIV prevention. But remember - PEP is for emergencies, NOT regular prevention. If you need PEP more than once, talk to your doctor about PrEP instead! Time matters, so act FAST! ⚡🏥'
            },
            {
                topic: 'When should I take PEP?',
                answer: 'Get PEP immediately if you: 🚨<br><br>1) <strong>Had condomless sex</strong> with someone who might have HIV or unknown status<br>2) <strong>Condom broke</strong> during sex<br>3) <strong>Shared needles/syringes</strong><br>4) <strong>Were sexually assaulted</strong><br>5) <strong>Occupational exposure</strong> (healthcare, first responder)<br><br><strong>START WITHIN 72 HOURS</strong> - Ideally within 24 hours! Don\'t wait to test the other person first - time is critical!<br><br><strong>Where to go:</strong> ER, sexual health clinic, primary care, Planned Parenthood. They can start you immediately. 🏥💨'
            },
            {
                topic: 'PEP effectiveness',
                answer: 'PEP is <strong>highly effective</strong> when started quickly and taken consistently for all 28 days! 💪<br><br><strong>Effectiveness:</strong> Reduces HIV risk by more than 80% when started within 72 hours.<br><br><strong>Keys to success:</strong><br>1) Start as soon as possible (within 24-72 hours)<br>2) Take EVERY dose for full 28 days<br>3) Don\'t skip or stop early<br>4) Follow up with HIV testing at 6 weeks, 3 months, 6 months<br><br><strong>Side effects?</strong> Similar to PrEP - usually mild and temporary. Don\'t let nausea stop you! Your health is worth it. 💊✅'
            },
            {
                topic: 'PEP vs PrEP - What\'s the difference?',
                answer: 'Both prevent HIV, but timing is everything! ⏰<br><br><strong>PEP (After exposure):</strong><br>• Emergency prevention<br>• Start within 72 hours AFTER exposure<br>• Take for 28 days<br>• For one-time exposures<br><br><strong>PrEP (Before exposure):</strong><br>• Ongoing prevention<br>• Take daily (or on-demand) BEFORE exposure<br>• Long-term protection<br>• For ongoing risk reduction<br><br><strong>Pro tip:</strong> If you\'ve needed PEP more than once, or have ongoing HIV risk, consider switching to PrEP for continuous protection! Talk to your doctor. 🛡️✨'
            }
        ]
    },

// Doxy-PEP
doxypep: {
    keywords: ['doxy', 'doxypep', 'doxy-pep', 'doxycycline', 'sti', 'bacterial', 'syphilis', 'chlamydia', 'gonorrhea', 'morning after'],
        responses: [
            {
                topic: 'What is Doxy-PEP?',
                answer: 'Doxy-PEP (Doxycycline Post-Exposure Prophylaxis) is the <strong>newest tool</strong> in your prevention toolkit! 🦠💊<br><br>It\'s a dose of antibiotic (doxycycline 200mg) taken within 24-72 hours after sex to prevent bacterial STIs:<br>• <strong>Syphilis</strong> (up to 87% reduction)<br>• <strong>Chlamydia</strong> (up to 88% reduction)<br>• <strong>Gonorrhea</strong> (about 55% reduction)<br><br>Think of it as the "morning after pill" for bacterial STIs. CDC updated guidelines in 2024 recommending it for high-risk groups! 🎉📋'
            },
            {
                topic: 'How do I take Doxy-PEP?',
                answer: 'Simple protocol! 📋💊<br><br><strong>Dose:</strong> 200mg doxycycline (usually 2 pills of 100mg each)<br><br><strong>When:</strong> Within 24-72 hours after sex (ideally within 24 hours)<br><br><strong>How often:</strong> No more than once per day (even if you have sex multiple times)<br><br><strong>With:</strong> Food and plenty of water to prevent nausea<br><br><strong>Sun protection:</strong> Doxycycline makes you sun-sensitive - wear SPF!<br><br><strong>Pro tip:</strong> Keep some at home so you have it when you need it! Some doctors will prescribe a supply in advance. ✅☀️'
            },
            {
                topic: 'Does Doxy-PEP prevent HIV?',
                answer: 'NO - Doxy-PEP does NOT prevent HIV! 🚫<br><br><strong>What it DOES prevent:</strong><br>• Syphilis ✅<br>• Chlamydia ✅<br>• Gonorrhea ✅<br>• (Bacterial STIs only!)<br><br><strong>What it does NOT prevent:</strong><br>• HIV ❌<br>• Herpes ❌<br>• HPV ❌<br>• Hepatitis B/C ❌<br><br><strong>For comprehensive protection:</strong> Use Doxy-PEP + PrEP + condoms! Layer your prevention like a boss. You can absolutely use Doxy-PEP alongside PrEP - they work together perfectly! 🛡️🛡️🛡️'
            },
            {
                topic: 'Who should use Doxy-PEP?',
                answer: 'CDC recommends Doxy-PEP for: 🎯<br><br>• <strong>Gay/bi men and trans women</strong> assigned male at birth<br>• <strong>Anyone</strong> with recent bacterial STI (syphilis, gonorrhea, chlamydia)<br>• <strong>Multiple partners</strong> or anonymous sex<br>• <strong>Group sex</strong> or sex parties<br>• <strong>People on PrEP</strong> who want extra protection<br><br><strong>Not recommended for:</strong><br>• Those taking tetracyclines for other reasons<br>• Allergic to doxycycline<br>• Pregnant individuals<br><br>Talk to your healthcare provider about whether Doxy-PEP is right for you! 💬✅'
            },
            {
                topic: 'Doxy-PEP and antibiotic resistance',
                answer: 'Valid concern! Here\'s what we know: 🔬<br><br><strong>Research so far:</strong> Studies haven\'t shown significant increases in antibiotic-resistant gonorrhea or chlamydia. Syphilis isn\'t showing resistance issues.<br><br><strong>Why it\'s okay:</strong> You\'re using it AFTER exposure (post-exposure), not continuously (like daily PrEP). Occasional use has lower resistance risk than continuous antibiotics.<br><br><strong>Being responsible:</strong><br>• Only use after actual exposures<br>• Don\'t use daily preventively<br>• Still get tested regularly<br>• Use condoms when you can<br><br>Science and public health orgs support it! Trust the research. 📊✅'
            }
        ]
},

// Testing
testing: {
    keywords: ['test', 'testing', 'window period', 'results', 'screening', 'how often', 'when', 'frequency', 'sti test', 'hiv test', 'blood test'],
        responses: [
            {
                topic: 'How often should I test?',
                answer: 'Testing frequency depends on your risk! 🧪<br><br><strong>Every 3 months:</strong><br>• Multiple partners or anonymous sex<br>• Don\'t use condoms consistently<br>• Recent STI diagnosis<br>• Partner with HIV (not U=U yet)<br><br><strong>Every 6 months:</strong><br>• Monogamous partners who test together<br>• Moderate sexual activity<br><br><strong>Annually (minimum):</strong><br>• All sexually active people<br><br><strong>On PrEP:</strong> HIV test every 3 months (required), STI test every 3-6 months<br><br>Testing = Empowerment! Knowledge is power. 💪✨'
            },
            {
                topic: 'Window period explained',
                answer: 'The window period is the time between HIV exposure and when a test can detect it. ⏳<br><br><strong>HIV Test Types & Windows:</strong><br>• <strong>4th generation (lab)</strong>: 18-45 days (most common)<br>• <strong>Rapid test</strong>: 18-90 days<br>• <strong>Antibody-only test</strong>: 23-90 days<br>• <strong>RNA test (PCR)</strong>: 10-33 days (most sensitive, rarely used for screening)<br><br><strong>Full confidence?</strong> Test again at 3 months (90 days) after exposure. Most people will test positive by 45 days if infected.<br><br>Patience pays off! Early testing gives you a head start, but 3-month follow-up confirms. 📅✅'
            },
            {
                topic: 'Types of HIV tests',
                answer: 'Choose the right test for your needs! 💉<br><br><strong>1) 4th Gen Lab Test (best!):</strong><br>• Blood draw at clinic/lab<br>• Detects antibodies + p24 antigen<br>• Window: 18-45 days<br>• Most accurate<br><br><strong>2) Rapid Tests:</strong><br>• Finger prick or oral swab<br>• Results in 20 minutes<br>• Window: 18-90 days<br>• Good for quick screening<br><br><strong>3) Home Tests:</strong><br>• OraQuick (oral, 20 min)<br>• Mail-in tests (blood sample)<br>• Convenient & private<br><br>Talk to a healthcare provider about which works best for you! All are accurate when used during the correct window period. 🧪✅'
            },
            {
                topic: 'What to test for?',
                answer: 'Comprehensive sexual health screening includes: 📋<br><br><strong>HIV:</strong> Blood test<br><strong>Syphilis:</strong> Blood test<br><strong>Gonorrhea & Chlamydia:</strong> Urine + throat/rectal swabs (depends on your anatomy & activities)<br><strong>Hepatitis B & C:</strong> Blood test (get vaccinated for Hep B!)<br><strong>Herpes (HSV):</strong> Only test if you have symptoms (blood tests aren\'t reliable for screening)<br><strong>HPV:</strong> Pap smear for those with a cervix<br><br><strong>Pro tip:</strong> Be honest with your provider about which body parts you use for sex! Throats and anuses need testing too. 🩺✅'
            },
            {
                topic: 'Positive test result - what now?',
                answer: 'First: breathe. You\'ve got this. 💙<br><br><strong>If HIV positive:</strong><br>1) Start ART (treatment) ASAP - life expectancy is nearly normal!<br>2) Achieve undetectable = can\'t transmit (U=U)<br>3) Connect with HIV specialist/clinic<br>4) Join support groups<br><br><strong>If bacterial STI positive:</strong><br>• Treatment is usually simple antibiotics<br>• Notify recent partners (clinic can help)<br>• Retest 3 months after treatment<br><br><strong>Remember:</strong> STIs are common and treatable. HIV is manageable. You deserve care, not judgment. You\'re taking care of your health - that\'s powerful! 💪✨'
            }
        ]
},

// Condoms & Barriers
condoms: {
    keywords: ['condom', 'barrier', 'protection', 'latex', 'safe sex', 'safer sex', 'dental dam', 'gloves', 'lube', 'lubricant', 'polyurethane', 'internal condom', 'female condom'],
        responses: [
            {
                topic: 'Condom effectiveness',
                answer: 'When used correctly and consistently, condoms are HIGHLY effective! 🛡️📊<br><br><strong>External ("male") condoms:</strong><br>• 98% effective with perfect use<br>• 87% effective with typical use<br>• Prevents HIV, gonorrhea, chlamydia, most STIs<br><br><strong>Internal ("female") condoms:</strong><br>• 95% effective with perfect use<br>• 79% effective with typical use<br>• More surface coverage = great STI protection<br><br>The secret sauce? Use them EVERY TIME and use them CORRECTLY. Check our Visual Library for step-by-step guides! 🎯📚'
            },
            {
                topic: 'How to use condoms correctly',
                answer: 'Master the art of condom use! 🎓🛡️<br><br><strong>External condoms:</strong><br>1) Check expiration date & feel for air bubble<br>2) Open carefully (no teeth, keys, or nails!)<br>3) Pinch tip to leave room<br>4) Roll down to base<br>5) ADD LUBE! (water or silicone-based only)<br>6) Hold base when pulling out<br>7) Use a new one each time<br><br><strong>Pro tips:</strong><br>• Practice solo first!<br>• Store properly (not in wallet/car)<br>• One condom only (don\'t double up)<br><br>Want a detailed guide? Check "My Condom Plan" in the app! 🎯✅'
            },
            {
                topic: 'What if a condom breaks?',
                answer: 'Don\'t panic - act smart and fast! ⚡🩺<br><br><strong>Immediate steps:</strong><br>1) Stop immediately<br>2) Urinate & wash with soap/water<br>3) Consider PEP if within 72 hours (especially if partner\'s HIV status unknown)<br><br><strong>Follow-up:</strong><br>• Get tested: 2 weeks, 6 weeks, 3 months<br>• Consider emergency contraception (if pregnancy risk)<br>• Think about Doxy-PEP (if at STI risk)<br>• Consider starting PrEP for future protection<br><br><strong>Prevention:</strong> Use lube, check expiration dates, store properly. Knowledge = Power! 💪✅'
            },
            {
                topic: 'Condom types & materials',
                answer: 'Not all condoms are the same! Choose what works for you: 🛡️<br><br><strong>Latex:</strong> Most common, effective, affordable<br><strong>Polyurethane:</strong> Latex-free, good heat transfer<br><strong>Polyisoprene:</strong> Latex-free, more elastic<br><strong>Lambskin:</strong> Natural feel BUT doesn\'t prevent STIs! (pregnancy only)<br><br><strong>Sizes matter:</strong><br>• Too tight = breaks<br>• Too loose = slips<br>• Measure & find your fit!<br><br><strong>Lube compatibility:</strong><br>• Water-based: Works with ALL condoms<br>• Silicone: Safe for ALL condoms<br>• Oil-based: ONLY with polyurethane (breaks latex!)<br><br>Experiment and find what feels best! 🎯✨'
            },
            {
                topic: 'Dental dams & other barriers',
                answer: 'Oral sex deserves protection too! 👅🛡️<br><br><strong>Dental dams:</strong><br>• Latex/polyurethane sheet for oral-vaginal or oral-anal<br>• Use lube on receiving side<br>• Hold edges, don\'t flip over<br>• One side only!<br><br><strong>DIY dental dam:</strong><br>• Cut open a condom lengthwise<br>• Use plastic wrap (unlubricated)<br><br><strong>Gloves:</strong><br>• For fingering, fisting, manual stimulation<br>• Nitrile (latex-free) or latex<br>• Use lube generously!<br><br><strong>Remember:</strong> Oral transmission of HIV is VERY low risk, but gonorrhea, syphilis, herpes, and HPV can transmit through oral sex. Protection = peace of mind! 💙✅'
            }
        ]
},

// STIs (Sexually Transmitted Infections)
stis: {
    keywords: ['sti', 'std', 'sexually transmitted', 'herpes', 'hsv', 'hpv', 'warts', 'genital warts', 'hepatitis', 'trichomoniasis', 'trich', 'mpox', 'monkeypox', 'scabies', 'crabs', 'pubic lice'],
        responses: [
            {
                topic: 'Common STIs overview',
                answer: 'STIs are super common - most sexually active people will get one in their lifetime! Knowledge = power. 💪<br><br><strong>Bacterial (curable with antibiotics):</strong><br>• Chlamydia, Gonorrhea, Syphilis, Trichomoniasis<br><br><strong>Viral (manageable, not curable):</strong><br>• HIV, Herpes (HSV-1, HSV-2), HPV, Hepatitis B/C<br><br><strong>Other:</strong><br>• Scabies, Pubic lice ("crabs"), Mpox<br><br><strong>Most have NO symptoms!</strong> That\'s why regular testing matters. You can have an STI and feel perfectly fine. Get tested regularly! 🧪✅'
            },
            {
                topic: 'Herpes (HSV) facts',
                answer: 'Let\'s talk herpes - super common and manageable! 💙<br><br><strong>The stats:</strong><br>• HSV-1 (oral): ~67% of adults worldwide<br>• HSV-2 (genital): ~11% of adults<br>• Most people have NO symptoms or very mild ones<br><br><strong>Transmission:</strong><br>• Skin-to-skin contact during outbreaks<br>• Can transmit even without visible sores (rare)<br>• Condoms reduce risk but don\'t eliminate it<br><br><strong>Management:</strong><br>• Daily antiviral medication (suppressive therapy)<br>• Reduces outbreaks by 70-80%<br>• Reduces transmission risk by 50%<br><br><strong>Truth bomb:</strong> Having herpes doesn\'t make you "dirty" or unlovable. It\'s a skin condition. Period. 💎✨'
            },
            {
                topic: 'HPV & Vaccination',
                answer: 'HPV (Human Papillomavirus) - let\'s get vaccinated! 💉<br><br><strong>The facts:</strong><br>• 80% of sexually active people get HPV in their lifetime<br>• 200+ types, ~40 affect genitals<br>• Most clear on their own in 1-2 years<br>• Some cause genital warts, some cause cancer<br><br><strong>Gardasil 9 vaccine prevents:</strong><br>• 90% of cervical cancers<br>• 90% of genital warts<br>• Anal, throat, penile cancers<br><br><strong>Who should get it?</strong><br>• Ages 9-26: Strongly recommended<br>• Ages 27-45: Talk to your doctor<br>• Best before sexual activity starts, but still beneficial after!<br><br>Vaccination = cancer prevention. Get it! 🛡️💪'
            },
            {
                topic: 'Syphilis stages & treatment',
                answer: 'Syphilis is on the rise - but it\'s totally treatable! 🩺<br><br><strong>Stages:</strong><br><br><strong>Primary:</strong> Painless sore (chancre) at infection site - heals in 3-6 weeks<br><br><strong>Secondary:</strong> Rash (palms/soles), flu-like symptoms, mucous patches - weeks to months later<br><br><strong>Latent:</strong> No symptoms, but infection persists<br><br><strong>Tertiary:</strong> Heart, brain, organ damage (rare with modern treatment)<br><br><strong>Treatment:</strong><br>• Penicillin injection (one shot for early syphilis!)<br>• Follow-up blood tests to confirm cure<br><br><strong>Catch it early!</strong> Test every 3 months if at risk. Untreated syphilis can be serious, but treatment is simple and effective. 💊✅'
            },
            {
                topic: 'Hepatitis B & C',
                answer: 'Protect your liver! 🩺💊<br><br><strong>Hepatitis B:</strong><br>• Transmitted: Sex, blood, needles, childbirth<br>• Vaccine available! (3-dose series)<br>• Chronic infection can cause liver disease/cancer<br>• Treatment: Antivirals for chronic cases<br><br><strong>Hepatitis C:</strong><br>• Transmitted: Blood, needles (less common through sex)<br>• NO vaccine yet<br>• Curable with 8-12 weeks of pills (95%+ cure rate!)<br>• Test if you\'ve shared needles, gotten tattoos with unsterile equipment<br><br><strong>Action steps:</strong><br>1) Get vaccinated for Hep B!<br>2) Get tested for Hep C (one-time screening for all adults)<br>3) Don\'t share needles, razors, toothbrushes<br><br>Your liver will thank you! 💚✅'
            }
        ]
},

// Relationships & Communication
relationships: {
    keywords: ['relationship', 'partner', 'dating', 'open relationship', 'polyamory', 'monogamy', 'jealousy', 'trust', 'cheating', 'agreement', 'boundaries', 'negotiate'],
        responses: [
            {
                topic: 'Relationship structures',
                answer: 'There\'s no one "right" way to do relationships! 💕<br><br><strong>Monogamy:</strong> One partner, mutual exclusivity<br><br><strong>Open Relationship:</strong> Committed couple + outside sexual partners<br><br><strong>Polyamory:</strong> Multiple romantic/emotional relationships with consent<br><br><strong>Don\'t Ask Don\'t Tell:</strong> Permission for outside sex, but don\'t share details<br><br><strong>Relationship Anarchy:</strong> No hierarchy, all connections valued equally<br><br><strong>The key?</strong> Clear communication, mutual agreements, and regular check-ins. What works for one couple might not work for another. Honor YOUR needs! 💬✨'
            },
            {
                topic: 'Building sexual agreements',
                answer: 'Agreements = clarity = less drama! 🛡️📋<br><br><strong>What to discuss:</strong><br>• Condom use: Always? Sometimes? Never?<br>• Testing frequency: How often? Together?<br>• PrEP/prevention: Who\'s on what?<br>• Types of sex allowed: What\'s okay? What\'s off-limits?<br>• Communication: How much detail? Check-ins?<br>• Emotional boundaries: Just sex? Feelings okay?<br><br><strong>Tips:</strong><br>• Write it down! (Use our Agreements tool!)<br>• Revisit every 3-6 months<br>• Adjust as needed - they\'re not set in stone<br>• Be honest about what you need<br><br>Agreements aren\'t about control - they\'re about trust and respect. 💪💙'
            },
            {
                topic: 'Navigating jealousy',
                answer: 'Jealousy is normal - it\'s what you DO with it that matters! 💚<br><br><strong>Where it comes from:</strong><br>• Fear of loss<br>• Insecurity<br>• Unmet needs<br>• Comparison<br><br><strong>Healthy responses:</strong><br>1) <strong>Name it:</strong> "I\'m feeling jealous right now"<br>2) <strong>Explore it:</strong> What am I actually afraid of?<br>3) <strong>Communicate:</strong> Share feelings without blame<br>4) <strong>Address needs:</strong> What do I need to feel secure?<br><br><strong>Remember:</strong> Jealousy doesn\'t mean you\'re doing relationships "wrong." It\'s information about your needs. Process it with curiosity, not judgment. 💬✨'
            },
            {
                topic: 'Difficult conversations',
                answer: 'Hard talks build stronger relationships! 💪💬<br><br><strong>Before the conversation:</strong><br>• Pick a good time (not during/after sex!)<br>• Know what you need<br>• Expect discomfort - it\'s okay!<br><br><strong>During:</strong><br>• Use "I feel..." not "You always..."<br>• Listen actively without interrupting<br>• Ask clarifying questions<br>• Take breaks if needed<br><br><strong>Topics to tackle:</strong><br>• HIV/STI status disclosure<br>• Changing agreements<br>• Unmet needs<br>• Boundary violations<br>• Safer sex negotiations<br><br><strong>Pro tip:</strong> Check out our Conversation Scripts in the Visual Library for ready-made templates! 📚✨'
            }
        ]
},

// Mental Health & Wellbeing
mental_health: {
    keywords: ['anxiety', 'depression', 'mental health', 'stress', 'shame', 'stigma', 'self-care', 'therapy', 'support', 'emotional', 'feelings', 'wellness'],
        responses: [
            {
                topic: 'Sexual health stigma',
                answer: 'Stigma is real, but YOU are not defined by it! 💙<br><br><strong>Common stigmas:</strong><br>• HIV/STI status<br>• Number of partners<br>• Type of sex you have<br>• Relationship structure<br>• Using PrEP ("Truvada whore")<br><br><strong>Fighting internalized stigma:</strong><br>1) Challenge negative self-talk<br>2) Connect with supportive communities<br>3) Educate yourself (you\'re doing it now!)<br>4) Remember: Your sexual health choices are YOURS<br>5) Seek therapy if shame feels heavy<br><br><strong>Truth:</strong> Taking care of your sexual health is responsible and brave. You deserve respect, not judgment. 💪✨'
            },
            {
                topic: 'Dealing with diagnosis anxiety',
                answer: 'Waiting for test results or processing a diagnosis is HARD. You\'re not alone. 💙<br><br><strong>While waiting:</strong><br>• Limit Dr. Google (anxiety spiral!)<br>• Practice self-compassion<br>• Distract with activities you enjoy<br>• Talk to trusted friends/therapist<br>• Remember: Most STIs are treatable!<br><br><strong>If positive:</strong><br>• Breathe - you\'ve got this<br>• Treatment is available<br>• You\'re not "dirty" or "bad"<br>• Connect with support groups<br>• Give yourself time to process<br><br><strong>Resources:</strong><br>• Crisis Text Line: Text START to 678678<br>• The Trevor Project: 1-866-488-7386<br>• Your healthcare provider<br><br>You deserve support and compassion. 💚🛡️'
            },
            {
                topic: 'Self-care practices',
                answer: 'Sexual health is more than pills and tests - it\'s holistic! ✨<br><br><strong>Physical self-care:</strong><br>• Regular testing<br>• Taking meds consistently<br>• Sleep, nutrition, exercise<br>• Limiting alcohol/drugs<br><br><strong>Emotional self-care:</strong><br>• Setting boundaries<br>• Processing feelings (journal, therapy)<br>• Celebrating your wins<br>• Releasing shame<br><br><strong>Social self-care:</strong><br>• Connecting with community<br>• Choosing supportive friends<br>• Asking for help when needed<br>• Use our app: Daily Affirmations, Achievements, Resources'
            }
        ]
},

// Communication & Consent
communication: {
    keywords: ['talk', 'communicate', 'conversation', 'disclosure', 'tell', 'share', 'status', 'consent', 'boundaries', 'permission'],
        responses: [
            {
                topic: 'Starting a sexual health conversation',
                answer: 'The best time? BEFORE things get hot and heavy! Try: "Before we go further, I\'d love to talk about sexual health. When were you last tested? I test regularly every 3 months and my status is [X]." Being direct shows confidence and care. You\'ve got this! 💬✨'
            },
            {
                topic: 'Disclosing HIV status',
                answer: 'Disclosing can feel scary, but you\'re brave! Try: "I want to share something important. I\'m HIV-positive and undetectable, which means I can\'t transmit the virus sexually. I\'m on treatment and my health is great. Happy to answer any questions!" Your status doesn\'t define you. 💎'
            },
            {
                topic: 'Setting boundaries',
                answer: 'Boundaries = Self-respect! Try: "I need us to [specific boundary] for me to feel comfortable. This is important to me. What are your boundaries?" Remember: "No" is a complete sentence. You don\'t owe anyone explanations. Your comfort matters! 🚧💪'
            },
            {
                topic: 'Asking for consent',
                answer: 'Consent is sexy! Try: "Can I kiss you?" or "Is this okay?" or "Do you want to keep going?" Check in regularly. Consent is ongoing, enthusiastic, and can be withdrawn anytime. When in doubt, ask! Communication is connection. 💕✅'
            }
        ]
},

// HARNESS App Navigation
navigation: {
    keywords: ['how to use', 'navigate', 'app', 'features', 'where', 'find', 'help', 'guide', 'tour', 'what can'],
        responses: [
            {
                topic: 'How to use the HARNESS app',
                answer: 'Welcome to HARNESS! 🎉 Here\'s what I can help you with:<br><br>🧩 <strong>MATCH Journey</strong> - Guided 5-step journey (Meet, Ask, Talk, Check, Hold)<br>🛡️ <strong>Agreements</strong> - Build personalized SafER sex agreements<br>✨ <strong>Affirmations</strong> - Daily empowerment (morning, midday, evening)<br>📚 <strong>Library</strong> - Visual resources, infographics, conversation scripts<br>⚙️ <strong>Profile</strong> - Achievements, favorites, settings<br><br>Where would you like to start?'
            },
            {
                topic: 'Visual Library resources',
                answer: 'Our Visual Library is 🔥! You\'ll find:<br><br>📊 41+ professional infographics (harm reduction, PrEP, PEP, barriers)<br>🃏 18-piece Ritual Card Deck<br>💬 Conversation Scripts & Pocket Scripts<br>🧪 My Condom Plan<br>💊 Lube Recommender<br>🆘 Emergency SOS Guide<br><br>Some are FREE, others are part of our Visual Toolkit ($99). Explore and empower yourself! 💪'
            }
        ]
},

// General Support
general: {
    keywords: ['help', 'support', 'scared', 'nervous', 'anxious', 'worried', 'afraid', 'confused'],
        responses: [
            {
                topic: 'You\'re not alone',
                answer: 'Hey, I see you. Sexual health can feel overwhelming sometimes, and that\'s completely normal. Remember: asking questions is brave, seeking information is powerful, and taking control of your health is badass. You\'re here, you\'re learning, and that\'s what matters. I\'m here to guide you every step of the way. 💙🛡️'
            },
            {
                topic: 'Where to get help',
                answer: 'Need immediate support? Here are your options:<br><br>🏥 <strong>Find PrEP/PEP</strong>: PleasePrEPMe.org<br>🧪 <strong>Find testing</strong>: GetTested.CDC.gov<br>📞 <strong>HIV Hotline</strong>: 1-800-CDC-INFO<br>💬 <strong>Crisis support</strong>: Text "START" to 678-678<br>🌐 <strong>Local resources</strong>: Ask me about services in your area<br><br>You deserve care, support, and respect. Always. 💪✨'
            }
        ]
}
};

// ===== LIL Z RESPONSE GENERATOR =====
function generateLilZResponse(question) {
    const lowerQuestion = question.toLowerCase();

    // console.log removed
    // Validate question
    if (!question || typeof question !== 'string') {
        console.error('🐾 Invalid question:', question);
        return getDefaultResponse();
    }

    // Check if knowledge base exists
    if (typeof LIL_Z_KNOWLEDGE === 'undefined' || !LIL_Z_KNOWLEDGE) {
        console.error('🐾 LIL_Z_KNOWLEDGE not defined!');
        return getDefaultResponse();
    }

    // Search through knowledge base
    for (const [category, data] of Object.entries(LIL_Z_KNOWLEDGE)) {
        if (!data || !data.keywords || !data.responses) continue;

        // Check if question matches keywords
        const matchesKeyword = data.keywords.some(keyword => lowerQuestion.includes(keyword));

        if (matchesKeyword) {
            // Find best matching response
            for (const response of data.responses) {
                if (!response || !response.topic || !response.answer) continue;

                const topicWords = response.topic.toLowerCase().split(' ');
                if (topicWords.some(word => lowerQuestion.includes(word))) {
                    // console.log removed
                    return `<strong>${response.topic}</strong><br><br>${response.answer}`;
                }
            }
            // Return first response if no specific match
            const firstResponse = data.responses[0];
            if (firstResponse && firstResponse.topic && firstResponse.answer) {
                // console.log removed
                return `<strong>${firstResponse.topic}</strong><br><br>${firstResponse.answer}`;
            }
        }
    }

    // Default helpful response
    // console.log removed
    return getDefaultResponse();
}

function getDefaultResponse() {
    return `<strong>Hey! I'm Lil Z, your guide through the HARNESS Project! 🌟</strong><br><br>
        I can help you with:<br><br>
        🦠 <strong>HIV & U=U</strong> - Understanding transmission, treatment, and living fearlessly<br>
        💊 <strong>PrEP & PEP</strong> - Prevention before and after exposure<br>
        💊 <strong>Doxy-PEP</strong> - Preventing bacterial STIs<br>
        🧪 <strong>Testing</strong> - When, how often, and what to expect<br>
        🛡️ <strong>Barriers</strong> - Condoms, dental dams, and safer sex strategies<br>
        💬 <strong>Communication</strong> - Scripts for disclosure, consent, and boundaries<br>
        📱 <strong>App navigation</strong> - Getting the most from HARNESS<br><br>
        What would you like to know? Ask me anything! 💪✨`;
}

// ===== LIL Z CHAT INTERFACE =====
function openLilZChat(context = 'general') {
    // Check if createModal function exists
    if (typeof createModal !== 'function') {
        console.error('🐾 Lil Z Error: createModal function not found!');
        alert('Lil Z is still loading... Please wait a moment and try again.');
        return;
    }

    // Use context-appropriate avatars
    let headerAvatar = LIL_Z_AVATARS.getAvatar('professional');
    let welcomeAvatar = LIL_Z_AVATARS.getAvatar('greeting');

    if (context === 'welcome') {
        headerAvatar = LIL_Z_AVATARS.getAvatar('excited');
        welcomeAvatar = LIL_Z_AVATARS.getAvatar('excited');
    } else if (context === 'educator') {
        headerAvatar = LIL_Z_AVATARS.getAvatar('professional');
        welcomeAvatar = LIL_Z_AVATARS.getAvatar('teaching');
    }

    // console.log removed
    const chatHTML = `
        <div class="lil-z-chat-companion">
            <div class="lil-z-chat-header">
                <div class="lil-z-avatar">
                    <img src="${headerAvatar}" alt="Lil Z" class="avatar-img">
                </div>
                <div class="lil-z-title">
                    <h3>Lil Z</h3>
                    <p class="lil-z-subtitle">Your Sexual Health Expert & Personal Guide</p>
                </div>
            </div>
            
            <div class="lil-z-messages" id="lil-z-messages">
                <div class="lil-z-message bot-message">
                    <div class="message-avatar">
                        <img src="${welcomeAvatar}" alt="Lil Z" class="avatar-img">
                    </div>
                    <div class="message-content">
                        <p><strong>Hey there! I'm Lil Z! 👋</strong></p>
                        <p>I'm your personal guide through the HARNESS Project. Think of me as your knowledgeable friend who's here to answer questions about sexual health, prevention, and navigating this platform.</p>
                        <p><strong>I can help you with:</strong></p>
                        <ul class="topic-list">
                            <li>🦠 HIV prevention & education (PrEP, PEP, U=U)</li>
                            <li>💊 Doxy-PEP & STI prevention</li>
                            <li>🧪 Testing guidance</li>
                            <li>🛡️ Barrier methods & SafER sex</li>
                            <li>💬 Communication scripts</li>
                            <li>📱 Using the HARNESS app</li>
                        </ul>
                        <p><strong>What would you like to know?</strong> 🌟</p>
                    </div>
                </div>
            </div>
            
            <div class="lil-z-suggestions" id="lil-z-suggestions">
                <button class="suggestion-chip" onclick="askLilZ('What is PrEP?')">What is PrEP?</button>
                <button class="suggestion-chip" onclick="askLilZ('Tell me about U=U')">What is U=U?</button>
                <button class="suggestion-chip" onclick="askLilZ('How do I use this app?')">How to use app</button>
                <button class="suggestion-chip" onclick="askLilZ('How often should I test?')">Testing frequency</button>
            </div>
            
            <div class="lil-z-input-container">
                <input 
                    type="text" 
                    class="lil-z-input" 
                    id="lil-z-input" 
                    placeholder="Ask Lil Z anything..."
                    onkeypress="handleLilZEnter(event)"
                >
                <button class="lil-z-send-btn" onclick="sendLilZMessage()">
                    <span class="send-icon">➤</span>
                </button>
            </div>
            
            <div class="lil-z-footer">
                <small>💡 Educational information only. Always consult healthcare providers for medical advice.</small>
                <div class="lil-z-version-info">
                    <small>📋 Based on CDC ${LIL_Z_VERSION.guidelinesVersion.cdc.prep} Guidelines | Last updated: ${LIL_Z_VERSION.lastUpdated}</small>
                </div>
            </div>
        </div>
    `;

    const modal = createModal(chatHTML);
    document.body.appendChild(modal);
}

// ===== LIL Z CHAT FUNCTIONS =====
function askLilZ(question) {
    const input = document.getElementById('lil-z-input');
    if (input) {
        input.value = question;
        sendLilZMessage();
    }
}

function handleLilZEnter(event) {
    if (event.key === 'Enter') {
        sendLilZMessage();
    }
}

function sendLilZMessage() {
    const input = document.getElementById('lil-z-input');
    const question = input.value.trim();

    if (!question) return;

    // Add user message
    addLilZMessage(question, 'user');
    input.value = '';

    // Hide suggestions after first message
    const suggestions = document.getElementById('lil-z-suggestions');
    if (suggestions) suggestions.style.display = 'none';

    // Generate response with slight delay for natural feel
    setTimeout(() => {
        const response = generateLilZResponse(question);
        addLilZMessage(response, 'bot');
    }, 600);
}

function addLilZMessage(message, type) {
    const container = document.getElementById('lil-z-messages');
    if (!container) {
        console.error('🐾 Lil Z Error: Messages container not found');
        return;
    }

    // Validate message
    if (!message || message === 'undefined' || typeof message === 'undefined') {
        console.error('🐾 Lil Z Error: Invalid message:', message);
        message = '<strong>Oops!</strong><br><br>Something went wrong. Please try asking your question again! 💪';
    }

    // Select avatar based on message type and content
    let avatarSrc;
    if (type === 'user') {
        // User avatar (friendly face)
        avatarSrc = LIL_Z_AVATARS.getAvatar('friendly');
    } else {
        // Lil Z responses - vary based on message content
        const messageLower = message.toLowerCase();

        // Context-based avatar selection
        if (messageLower.includes('congratulations') || messageLower.includes('great job') || messageLower.includes('🎉')) {
            avatarSrc = LIL_Z_AVATARS.getAvatar('celebrating');
        } else if (messageLower.includes('help') || messageLower.includes('support') || messageLower.includes('here for you')) {
            avatarSrc = LIL_Z_AVATARS.getAvatar('supportive');
        } else if (messageLower.includes('prep') || messageLower.includes('pep') || messageLower.includes('condom')) {
            avatarSrc = LIL_Z_AVATARS.getAvatar('teaching');
        } else if (messageLower.includes('confidence') || messageLower.includes('power') || messageLower.includes('boss')) {
            avatarSrc = LIL_Z_AVATARS.getAvatar('confident');
        } else if (messageLower.includes('scared') || messageLower.includes('worried') || messageLower.includes('anxious')) {
            avatarSrc = LIL_Z_AVATARS.getAvatar('supportive');
        } else {
            // Use random avatar for variety
            avatarSrc = LIL_Z_AVATARS.getRandom();
        }
    }

    // console.log removed
    // }); // removed stray bracket

    const messageDiv = document.createElement('div');
    messageDiv.className = `lil-z-message ${type}-message fade-in`;
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <img src="${avatarSrc}" alt="${type === 'user' ? 'You' : 'Lil Z'}" class="avatar-img">
        </div>
        <div class="message-content">
            ${message}
        </div>
    `;

    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

// ===== LIL Z FLOATING BUTTON (for all pages) =====
function addLilZFloatingButton() {
    const existingButton = document.getElementById('lil-z-float-btn');
    if (existingButton) {
        // console.log removed
        return; // Don't add duplicate
    }

    const floatingBtn = document.createElement('div');
    floatingBtn.id = 'lil-z-float-btn';
    floatingBtn.className = 'lil-z-floating-btn';
    floatingBtn.innerHTML = `
        <img src="${LIL_Z_AVATARS.getAvatar('cool')}" alt="Ask Lil Z" class="lil-z-float-avatar">
        <div class="lil-z-float-tooltip">Ask Lil Z!</div>
    `;
    floatingBtn.onclick = () => openLilZChat('general');

    document.body.appendChild(floatingBtn);
    // console.log removed
}

// ===== LIL Z STYLES =====
const lilZStyles = document.createElement('style');
lilZStyles.textContent = `
    /* Floating Button */
    .lil-z-floating-btn {
        position: fixed;
        bottom: 90px; /* Above bottom nav (which is ~60-70px tall) */
        right: 20px;
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, #00BDBD, #FFB627);
        border-radius: 50%;
        box-shadow: 0 4px 20px rgba(0, 189, 189, 0.4);
        cursor: pointer;
        z-index: 9999;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4px;
        animation: pulse 2s infinite;
    }
    
    .lil-z-floating-btn:hover {
        transform: scale(1.1) translateY(-3px);
        box-shadow: 0 6px 30px rgba(0, 189, 189, 0.6);
    }
    
    .lil-z-float-avatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid white;
    }
    
    .lil-z-float-tooltip {
        position: absolute;
        bottom: 80px;
        right: 0;
        background: #2C3E50;
        color: white;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }
    
    .lil-z-float-tooltip::after {
        content: '';
        position: absolute;
        bottom: -6px;
        right: 20px;
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid #2C3E50;
    }
    
    .lil-z-floating-btn:hover .lil-z-float-tooltip {
        opacity: 1;
    }
    
    @keyframes pulse {
        0%, 100% { box-shadow: 0 4px 20px rgba(0, 189, 189, 0.4); }
        50% { box-shadow: 0 4px 30px rgba(255, 182, 39, 0.6); }
    }
    
    /* Chat Interface */
    .lil-z-chat-companion {
        max-width: 600px;
        width: 95%;
        max-height: 80vh;
        display: flex;
        flex-direction: column;
        background: white;
        border-radius: 16px;
        overflow: hidden;
    }
    
    .lil-z-chat-header {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 20px;
        background: linear-gradient(135deg, #00BDBD, #FFB627);
        color: white;
    }
    
    .lil-z-avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        border: 3px solid rgba(255,255,255,0.8);
        background: white;
        flex-shrink: 0;
    }
    
    .lil-z-avatar .avatar-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .lil-z-title h3 {
        margin: 0;
        font-size: 22px;
        font-weight: 700;
        font-family: 'Bree Serif', serif;
    }
    
    .lil-z-subtitle {
        margin: 4px 0 0;
        font-size: 13px;
        opacity: 0.95;
        font-weight: 500;
    }
    
    .lil-z-messages {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        background: #F5F7FA;
        min-height: 300px;
        max-height: 400px;
    }
    
    .lil-z-message {
        display: flex;
        gap: 12px;
        margin-bottom: 16px;
        animation: fadeIn 0.3s ease;
    }
    
    .message-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        flex-shrink: 0;
        overflow: hidden;
        border: 2px solid #e0e0e0;
        background: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .message-avatar .avatar-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .bot-message {
        flex-direction: row;
    }
    
    .user-message {
        flex-direction: row-reverse;
    }
    
    .message-content {
        background: white;
        padding: 12px 16px;
        border-radius: 16px;
        max-width: 80%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        line-height: 1.6;
        font-size: 14px;
    }
    
    .user-message .message-content {
        background: linear-gradient(135deg, #00BDBD, #FFB627);
        color: white;
    }
    
    .message-content strong {
        display: block;
        margin-bottom: 8px;
    }
    
    .topic-list {
        margin: 12px 0;
        padding-left: 20px;
    }
    
    .topic-list li {
        margin: 6px 0;
    }
    
    .lil-z-suggestions {
        padding: 12px 20px;
        background: white;
        border-top: 1px solid #E0E6ED;
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    }
    
    .suggestion-chip {
        padding: 8px 16px;
        background: #E8F4F8;
        border: 1px solid #00BDBD;
        border-radius: 20px;
        font-size: 13px;
        color: #00BDBD;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: 'Bree Serif', serif;
        font-weight: 500;
    }
    
    .suggestion-chip:hover {
        background: #00BDBD;
        color: white;
        transform: translateY(-2px);
    }
    
    .lil-z-input-container {
        display: flex;
        gap: 8px;
        padding: 16px 20px;
        background: white;
        border-top: 1px solid #E0E6ED;
    }
    
    .lil-z-input {
        flex: 1;
        padding: 12px 16px;
        border: 2px solid #E0E6ED;
        border-radius: 24px;
        font-family: inherit;
        font-size: 14px;
        transition: border-color 0.2s ease;
    }
    
    .lil-z-input:focus {
        outline: none;
        border-color: #00BDBD;
    }
    
    .lil-z-send-btn {
        width: 44px;
        height: 44px;
        background: linear-gradient(135deg, #00BDBD, #FFB627);
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: transform 0.2s ease;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .lil-z-send-btn:hover {
        transform: scale(1.1);
    }
    
    .send-icon {
        color: white;
        font-size: 20px;
        font-weight: bold;
    }
    
    .lil-z-footer {
        padding: 12px 20px;
        background: #FFF9E6;
        text-align: center;
        color: #7F8C8D;
        font-size: 12px;
        line-height: 1.4;
    }
    
    .lil-z-version-info {
        margin-top: 6px;
        padding-top: 6px;
        border-top: 1px solid rgba(0,0,0,0.1);
        font-size: 11px;
        color: #95A5A6;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @media (max-width: 640px) {
        .lil-z-floating-btn {
            width: 70px;
            height: 70px;
            bottom: 20px;
            right: 20px;
        }
        
        .lil-z-avatar {
            width: 80px;
            height: 80px;
        }
        
        .message-avatar {
            width: 50px;
            height: 50px;
        }
        
        .lil-z-chat-companion {
            width: 100%;
            max-height: 90vh;
        }
        
        .message-content {
            max-width: 75%;
            font-size: 13px;
        }
        
        .suggestion-chip {
            font-size: 12px;
            padding: 6px 12px;
        }
    }
`;
document.head.appendChild(lilZStyles);

// Auto-add floating button on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addLilZFloatingButton);
} else {
    addLilZFloatingButton();
}

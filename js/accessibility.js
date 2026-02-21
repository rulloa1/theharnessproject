/**
 * HARNESS Project - Accessibility Enhancements
 * Implements WCAG 2.1 AA compliance improvements
 * Created: January 24, 2026
 */

// ===== SKIP TO CONTENT LINK =====
function addSkipToContent() {
    // Check if skip link already exists
    if (document.querySelector('.skip-to-content')) return;

    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.setAttribute('aria-label', 'Skip to main content');

    document.body.insertBefore(skipLink, document.body.firstChild);
}

// ===== ARIA LABELS FOR INTERACTIVE ELEMENTS =====
function enhanceARIALabels() {
    // Add ARIA labels to buttons without text
    document.querySelectorAll('button:not([aria-label])').forEach(button => {
        if (!button.textContent.trim()) {
            const className = button.className;
            if (className.includes('close')) {
                button.setAttribute('aria-label', 'Close');
            } else if (className.includes('menu') || className.includes('hamburger')) {
                button.setAttribute('aria-label', 'Toggle menu');
            } else if (className.includes('search')) {
                button.setAttribute('aria-label', 'Search');
            } else {
                button.setAttribute('aria-label', 'Button');
            }
        }
    });

    // Add ARIA labels to links without descriptive text
    document.querySelectorAll('a:not([aria-label])').forEach(link => {
        const text = link.textContent.trim();
        if (!text || text === '→' || text === '»' || text.length < 3) {
            const href = link.getAttribute('href');
            if (href) {
                const label = `Link to ${href.replace(/^\//, '').replace(/\.html$/, '').replace(/-/g, ' ')}`;
                link.setAttribute('aria-label', label);
            }
        }
    });

    // Add role and aria-label to nav elements
    document.querySelectorAll('nav:not([role])').forEach(nav => {
        nav.setAttribute('role', 'navigation');
        if (!nav.getAttribute('aria-label')) {
            nav.setAttribute('aria-label', 'Main navigation');
        }
    });

    // Add role to main content area
    const mainContent = document.querySelector('main') ||
        document.querySelector('#main-content') ||
        document.querySelector('.main-content');
    if (mainContent && !mainContent.getAttribute('role')) {
        mainContent.setAttribute('role', 'main');
        mainContent.id = mainContent.id || 'main-content';
    }

    // Add ARIA labels to form inputs without labels
    document.querySelectorAll('input:not([aria-label]):not([id])').forEach(input => {
        const placeholder = input.getAttribute('placeholder');
        const type = input.getAttribute('type');
        if (placeholder) {
            input.setAttribute('aria-label', placeholder);
        } else if (type) {
            input.setAttribute('aria-label', `${type} input`);
        }
    });
}

// ===== KEYBOARD NAVIGATION ENHANCEMENTS =====
function enhanceKeyboardNavigation() {
    // Make all interactive elements keyboard accessible
    document.querySelectorAll('[onclick]:not([tabindex])').forEach(el => {
        if (!el.hasAttribute('tabindex')) {
            el.setAttribute('tabindex', '0');
        }

        // Add keyboard event listener
        el.addEventListener('keypress', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Trap focus in modals
    document.querySelectorAll('.modal, [role="dialog"]').forEach(modal => {
        const focusableElements = modal.querySelectorAll(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length > 0) {
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            modal.addEventListener('keydown', function (e) {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                }

                if (e.key === 'Escape') {
                    // Close modal if Escape is pressed
                    const closeBtn = modal.querySelector('.close, [aria-label="Close"]');
                    if (closeBtn) closeBtn.click();
                }
            });
        }
    });
}

// ===== FOCUS INDICATORS =====
function enhanceFocusIndicators() {
    // Add visible focus styles if not present
    const style = document.createElement('style');
    style.textContent = `
        /* Enhanced Focus Indicators for Accessibility */
        *:focus {
            outline: 3px solid #00BDBD;
            outline-offset: 2px;
        }
        
        *:focus:not(:focus-visible) {
            outline: none;
        }
        
        *:focus-visible {
            outline: 3px solid #00BDBD;
            outline-offset: 2px;
        }
        
        button:focus, a:focus, input:focus, select:focus, textarea:focus {
            outline: 3px solid #00BDBD;
            outline-offset: 2px;
        }
        
        /* Skip to content link */
        .skip-to-content {
            position: absolute;
            left: -9999px;
            z-index: 999999;
            padding: 1em;
            background-color: #00BDBD;
            color: white;
            text-decoration: none;
            font-weight: bold;
            border-radius: 4px;
        }
        
        .skip-to-content:focus {
            left: 50%;
            transform: translateX(-50%);
            top: 10px;
        }
    `;
    document.head.appendChild(style);
}

// ===== ARIA LIVE REGIONS =====
function addARIALiveRegions() {
    // Add live region for dynamic content announcements
    let liveRegion = document.getElementById('aria-live-region');
    if (!liveRegion) {
        liveRegion = document.createElement('div');
        liveRegion.id = 'aria-live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        document.body.appendChild(liveRegion);
    }
    
    // Ensure styles are applied
    liveRegion.style.position = 'absolute';
    liveRegion.style.left = '-10000px';
    liveRegion.style.width = '1px';
    liveRegion.style.height = '1px';
    liveRegion.style.overflow = 'hidden';
}

// Announce message to screen readers
function announceToScreenReader(message) {
    let liveRegion = document.getElementById('aria-live-region');
    // If the live region doesn't exist, create it.
    if (!liveRegion) {
        addARIALiveRegions();
        liveRegion = document.getElementById('aria-live-region');
    }
    
    if (liveRegion) {
        liveRegion.textContent = message;
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    }
}

// ===== IMAGE ALT TEXT CHECKER =====
function checkImageAltText() {
    const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
    if (imagesWithoutAlt.length > 0) {
        console.warn(`[ACCESSIBILITY] ${imagesWithoutAlt.length} images missing alt text:`, imagesWithoutAlt);

        // Add placeholder alt text
        imagesWithoutAlt.forEach(img => {
            const src = img.getAttribute('src') || '';
            const filename = src.split('/').pop().split('.')[0];
            img.setAttribute('alt', filename.replace(/-/g, ' '));
            console.log(`Added placeholder alt text to: ${src}`);
        });
    }
}

// ===== HEADING HIERARCHY CHECKER =====
function checkHeadingHierarchy() {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let previousLevel = 0;
    const issues = [];

    headings.forEach((heading, index) => {
        const currentLevel = parseInt(heading.tagName.charAt(1));

        if (currentLevel - previousLevel > 1) {
            issues.push(`Heading hierarchy issue: ${heading.tagName} after H${previousLevel} at position ${index + 1}`);
        }

        previousLevel = currentLevel;
    });

    if (issues.length > 0) {
        console.warn('[ACCESSIBILITY] Heading hierarchy issues:', issues);
    } else {
        console.log('[ACCESSIBILITY] ✅ Heading hierarchy is correct');
    }
}

// ===== INITIALIZE ALL ACCESSIBILITY ENHANCEMENTS =====
function initAccessibilityEnhancements() {
    addSkipToContent();
    enhanceARIALabels();
    enhanceKeyboardNavigation();
    enhanceFocusIndicators();
    addARIALiveRegions();
    checkImageAltText();
    checkHeadingHierarchy();

    console.log('[ACCESSIBILITY] ✅ All accessibility enhancements initialized');
}

// Auto-initialize on DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccessibilityEnhancements);
} else {
    initAccessibilityEnhancements();
}

// Export functions for manual use
window.HARNESS_Accessibility = {
    announceToScreenReader,
    checkImageAltText,
    checkHeadingHierarchy,
    reinitialize: initAccessibilityEnhancements
};

/**
 * HARNESS Project - Universal Navigation & Footer System (FIXED VERSION)
 * Ensures ALL pages have hamburger menu navigation and consistent footer
 * AUTO-DETECTS path depth and uses correct relative paths
 * Created: January 23, 2026
 * 
 * USAGE: Add this single line to the <head> of any page:
 * <script src="js/harness-global.js" defer></script>
 * 
 * OR from subdirectories:
 * <script src="../js/harness-global.js" defer></script>
 */

(function () {
    'use strict';

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initComponents);
    } else {
        initComponents();
    }

    function initComponents() {
        loadGlobalStyles();
        ensureNavigation();
        ensureFooter();
    }

    // Calculate path prefix based on current page location
    function getPathPrefix() {
        const path = window.location.pathname;
        const depth = (path.match(/\//g) || []).length - 1;

        if (depth === 0 || path.endsWith('/index.html') || path === '/') {
            return './';
        } else if (depth === 1) {
            return '../';
        } else if (depth === 2) {
            return '../../';
        } else {
            return '../'.repeat(depth);
        }
    }

    // Load external CSS for components
    function loadGlobalStyles() {
        // Check if styles are already loaded
        if (document.querySelector('link[href*="harness-components.css"]')) {
            return;
        }

        const pathPrefix = getPathPrefix();
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `${pathPrefix}css/harness-components.css`;
        document.head.appendChild(link);
    }

    // Smart logo detection based on current page context
    function getContextualLogo(pathPrefix) {
        // Fallback to available image since specific logos are missing
        return `${pathPrefix}images/harness.png`;
        
        /* Original logic preserved for when images are restored
        const path = window.location.pathname.toLowerCase();

        // App pages → harness-app-logo.png
        if (path.includes('/app.html') || path.includes('/app/')) {
            return `${pathPrefix}images/harness-app-logo.png`;
        }

        // Educator/Curriculum pages → harness-curriculum-logo.png
        if (path.includes('/educator/') || path.includes('/curriculum/') || path.includes('/fap-ebook/')) {
            return `${pathPrefix}images/harness-curriculum-logo.png`;
        }

        // Workshop pages → harness-workshops-logo.png
        if (path.includes('/workshop') || path.includes('/presentations/')) {
            return `${pathPrefix}images/harness-workshops-logo.png`;
        }

        // Blog pages → harness-blog-logo.png
        if (path.includes('/blog/')) {
            return `${pathPrefix}images/harness-blog-logo.png`;
        }

        // Default/Main site → harness-logo-nav.png
        return `${pathPrefix}images/harness-logo-nav.png`;
        */
    }

    // === NAVIGATION COMPONENT ===
    function ensureNavigation() {
        // Check if navigation already exists
        if (document.querySelector('nav') || document.querySelector('.harness-nav')) {
            console.log('[HARNESS] Navigation already exists');
            return;
        }

        const pathPrefix = getPathPrefix();
        const logoPath = getContextualLogo(pathPrefix);

        // Create navigation HTML with dynamic paths and context-aware logo
        const navHTML = `
<nav class="harness-universal-nav" id="harnessNav">
    <div class="nav-container">
        <a href="${pathPrefix}index.html" class="nav-logo">
            <img src="${logoPath}" alt="HARNESS" class="nav-logo-img">
            <span class="nav-logo-text">HARNESS</span>
        </a>

        <!-- Desktop Menu -->
        <div class="nav-links desktop-only">
            <a href="${pathPrefix}index.html">Home</a>
            <a href="${pathPrefix}app.html">The App</a>
            <a href="${pathPrefix}about.html">About</a>
            <a href="${pathPrefix}curriculum-landing.html">Educators</a>
            <a href="${pathPrefix}toolkit.html">Toolkit</a>
            <a href="${pathPrefix}pricing.html">Pricing</a>
            <button class="support-btn-nav" id="supportBtnDesktop" aria-label="Support HARNESS">❤️ Support Us</button>
        </div>

        <!-- Hamburger Button -->
        <button class="hamburger-menu-btn" id="harnessHamburger" aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </div>

    <!-- Mobile Sidebar -->
    <div class="mobile-nav-sidebar" id="harnessNavSidebar">
        <div class="mobile-nav-header">
            <img src="${logoPath}" alt="HARNESS" class="mobile-nav-logo">
            <button class="mobile-nav-close" id="harnessNavClose">&times;</button>
        </div>
        <div class="mobile-nav-links">
            <a href="${pathPrefix}index.html">🏠 Home</a>
            <a href="${pathPrefix}app.html">🛡️ The App</a>
            <a href="${pathPrefix}about.html">ℹ️ About</a>
            <a href="${pathPrefix}curriculum-landing.html">👨‍🏫 For Educators</a>
            <a href="${pathPrefix}toolkit.html">🎨 Visual Toolkit</a>
            <a href="${pathPrefix}pricing.html">💰 Pricing</a>
            <button class="support-btn-mobile" id="supportBtnMobile" aria-label="Support HARNESS">❤️ Support Us</button>
        </div>
    </div>
    <div class="mobile-nav-overlay" id="harnessNavOverlay"></div>
</nav>`;

        // Insert navigation at the beginning of body
        document.body.insertAdjacentHTML('afterbegin', navHTML);

        // Initialize navigation JavaScript
        initNavigationJS();

        console.log('[HARNESS] Navigation injected | Path:', pathPrefix, '| Logo:', logoPath);
    }

    function initNavigationJS() {
        const hamburger = document.getElementById('harnessHamburger');
        const sidebar = document.getElementById('harnessNavSidebar');
        const overlay = document.getElementById('harnessNavOverlay');
        const closeBtn = document.getElementById('harnessNavClose');

        function openNav() {
            sidebar.classList.add('active');
            overlay.classList.add('active');
            hamburger.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeNav() {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }

        hamburger.addEventListener('click', () => {
            if (sidebar.classList.contains('active')) {
                closeNav();
            } else {
                openNav();
            }
        });

        closeBtn.addEventListener('click', closeNav);
        overlay.addEventListener('click', closeNav);

        // Support button functionality
        const supportBtnDesktop = document.getElementById('supportBtnDesktop');
        const supportBtnMobile = document.getElementById('supportBtnMobile');

        function showSupportModal() {
            // Create modal if it doesn't exist
            if (!document.getElementById('harnessSupportModal')) {
                createSupportModal();
            }
            document.getElementById('harnessSupportModal').style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        if (supportBtnDesktop) {
            supportBtnDesktop.addEventListener('click', showSupportModal);
        }
        if (supportBtnMobile) {
            supportBtnMobile.addEventListener('click', () => {
                closeNav(); // Close mobile menu first
                setTimeout(showSupportModal, 300); // Then show modal
            });
        }
    }

    // Create support modal
    function createSupportModal() {
        const modalHTML = `
        <div id="harnessSupportModal" class="support-modal" style="display: none;">
            <div class="support-modal-overlay"></div>
            <div class="support-modal-content">
                <button class="support-modal-close" id="supportModalClose">&times;</button>
                <h2>❤️ Support The HARNESS Project</h2>
                <p>Your support helps us provide free, comprehensive sexual health education to communities worldwide.</p>
                
                <div class="support-options">
                    <a href="https://www.paypal.com/donate" target="_blank" rel="noopener" class="support-option">
                        <strong>💙 PayPal</strong>
                        <span>One-time or recurring donations</span>
                    </a>
                    <a href="https://www.patreon.com/harnessproject" target="_blank" rel="noopener" class="support-option">
                        <strong>🎨 Patreon</strong>
                        <span>Monthly support with perks</span>
                    </a>
                    <a href="https://ko-fi.com/harnessproject" target="_blank" rel="noopener" class="support-option">
                        <strong>☕ Ko-fi</strong>
                        <span>Buy us a coffee!</span>
                    </a>
                </div>
                
                <div class="support-impact">
                    <h3>Your Impact</h3>
                    <ul>
                        <li>🎓 Free educator resources</li>
                        <li>🌍 Translated materials</li>
                        <li>🛠️ New interactive tools</li>
                        <li>📚 Expanded content</li>
                    </ul>
                </div>
                
                <p class="support-thanks">Thank you for believing in comprehensive sexual health education! 💖</p>
            </div>
        </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Add event listeners
        document.getElementById('supportModalClose').addEventListener('click', () => {
            document.getElementById('harnessSupportModal').style.display = 'none';
            document.body.style.overflow = '';
        });

        document.querySelector('.support-modal-overlay').addEventListener('click', () => {
            document.getElementById('harnessSupportModal').style.display = 'none';
            document.body.style.overflow = '';
        });
    }

    // === FOOTER COMPONENT ===
    function ensureFooter() {
        // Check if footer already exists
        if (document.querySelector('footer') || document.querySelector('.harness-footer')) {
            console.log('[HARNESS] Footer already exists');
            return;
        }

        const pathPrefix = getPathPrefix();

        const footerHTML = `
<footer class="harness-universal-footer">
    <div class="footer-container">
        <div class="footer-column">
            <h3>The HARNESS Project</h3>
            <p>Fearless. Protected. Empowered.</p>
            <p>Comprehensive sexual health education for the modern world.</p>
        </div>
        <div class="footer-column">
            <h4>Resources</h4>
            <a href="${pathPrefix}app.html">Interactive App</a>
            <a href="${pathPrefix}curriculum-landing.html">Educator Hub</a>
            <a href="${pathPrefix}toolkit.html">Visual Toolkit</a>
        </div>
        <div class="footer-column">
            <h4>Company</h4>
            <a href="${pathPrefix}about.html">About Us</a>
            <a href="${pathPrefix}contact.html">Contact</a>
        </div>
        <div class="footer-column">
            <h4>Connect</h4>
            <a href="${pathPrefix}about.html">About</a>
            <a href="${pathPrefix}pricing.html">Pricing</a>
        </div>
    </div>
    <div class="footer-bottom">
        <p>&copy; 2026 The HARNESS Project. All rights reserved.</p>
    </div>
</footer>`;

        document.body.insertAdjacentHTML('beforeend', footerHTML);
        console.log('[HARNESS] Footer injected');
    }

})();
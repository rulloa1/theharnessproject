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

    // Smart logo detection based on current page context
    function getContextualLogo(pathPrefix) {
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

        // Add navigation styles
        addNavigationStyles();

        // Initialize navigation JavaScript
        initNavigationJS();

        console.log('[HARNESS] Navigation injected | Path:', pathPrefix, '| Logo:', logoPath);
    }

    function addNavigationStyles() {
        const style = document.createElement('style');
        style.textContent = `
/* HARNESS Universal Navigation */
.harness-universal-nav {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.nav-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
}

.nav-logo-img {
    height: 50px;
    width: auto;
}

.nav-logo-text {
    font-size: 1.5rem;
    font-weight: bold;
    background: linear-gradient(135deg, #00B0BD, #DD0E6E);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.nav-links {
    display: flex;
    gap: 25px;
    align-items: center;
}

.nav-links a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    transition: color 0.3s;
}

.nav-links a:hover {
    color: #00B0BD;
}

/* Support Button in Navigation */
.support-btn-nav, .support-btn-mobile {
    background: linear-gradient(135deg, #DD0E6E, #F6CC00);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(221, 14, 110, 0.3);
    font-size: 0.95rem;
}

.support-btn-nav:hover, .support-btn-mobile:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(221, 14, 110, 0.4);
}

.support-btn-mobile {
    width: 100%;
    margin-top: 10px;
    padding: 15px 20px;
    font-size: 1rem;
}

/* Hamburger Button */
.hamburger-menu-btn {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
}

.hamburger-menu-btn span {
    width: 25px;
    height: 3px;
    background: #333;
    border-radius: 2px;
    transition: all 0.3s;
}

.hamburger-menu-btn.active span:nth-child(1) {
    transform: rotate(45deg) translate(7px, 7px);
}

.hamburger-menu-btn.active span:nth-child(2) {
    opacity: 0;
}

.hamburger-menu-btn.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -7px);
}

/* Mobile Sidebar */
.mobile-nav-sidebar {
    position: fixed;
    top: 0;
    right: -100%;
    width: 300px;
    height: 100vh;
    background: white;
    box-shadow: -2px 0 10px rgba(0,0,0,0.2);
    transition: right 0.3s ease;
    z-index: 2000;
    overflow-y: auto;
}

.mobile-nav-sidebar.active {
    right: 0;
}

.mobile-nav-header {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
}

.mobile-nav-logo {
    height: 40px;
    width: auto;
}

.mobile-nav-close {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #333;
    padding: 0;
    line-height: 1;
}

.mobile-nav-links {
    display: flex;
    flex-direction: column;
    padding: 20px;
}

.mobile-nav-links a {
    text-decoration: none;
    color: #333;
    padding: 15px 10px;
    border-bottom: 1px solid #eee;
    font-size: 1.1rem;
    transition: background 0.2s;
}

.mobile-nav-links a:hover {
    background: #f5f5f5;
    color: #00B0BD;
}

/* Mobile Overlay */
.mobile-nav-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
    z-index: 1999;
}

.mobile-nav-overlay.active {
    opacity: 1;
    visibility: visible;
}

/* Responsive */
@media (max-width: 768px) {
    .desktop-only {
        display: none !important;
    }
    
    .hamburger-menu-btn {
        display: flex;
    }
}

@media (min-width: 769px) {
    .mobile-nav-sidebar,
    .mobile-nav-overlay {
        display: none;
    }
}
`;
        document.head.appendChild(style);
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

        // Add modal styles
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
        .support-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .support-modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
        }
        
        .support-modal-content {
            position: relative;
            background: white;
            padding: 40px;
            border-radius: 20px;
            max-width: 600px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.3s ease;
        }
        
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .support-modal-close {
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #666;
            transition: color 0.3s;
        }
        
        .support-modal-close:hover {
            color: #DD0E6E;
        }
        
        .support-modal-content h2 {
            color: #DD0E6E;
            margin-bottom: 15px;
            font-size: 1.8rem;
        }
        
        .support-modal-content > p {
            color: #666;
            margin-bottom: 25px;
            line-height: 1.6;
        }
        
        .support-options {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-bottom: 30px;
        }
        
        .support-option {
            display: flex;
            flex-direction: column;
            padding: 20px;
            border: 2px solid #eee;
            border-radius: 12px;
            text-decoration: none;
            color: #333;
            transition: all 0.3s;
        }
        
        .support-option:hover {
            border-color: #DD0E6E;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(221, 14, 110, 0.2);
        }
        
        .support-option strong {
            font-size: 1.2rem;
            margin-bottom: 5px;
            color: #DD0E6E;
        }
        
        .support-option span {
            color: #666;
            font-size: 0.9rem;
        }
        
        .support-impact {
            background: linear-gradient(135deg, rgba(0, 176, 189, 0.1), rgba(246, 204, 0, 0.1));
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 20px;
        }
        
        .support-impact h3 {
            color: #00B0BD;
            margin-bottom: 15px;
        }
        
        .support-impact ul {
            list-style: none;
            padding: 0;
        }
        
        .support-impact li {
            padding: 8px 0;
            color: #333;
        }
        
        .support-thanks {
            text-align: center;
            color: #DD0E6E;
            font-weight: 600;
            font-size: 1.1rem;
        }
        
        @media (max-width: 768px) {
            .support-modal-content {
                padding: 30px 20px;
            }
        }
        `;

        document.head.appendChild(modalStyle);

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
        addFooterStyles();
        console.log('[HARNESS] Footer injected');
    }

    function addFooterStyles() {
        const style = document.createElement('style');
        style.textContent = `
.harness-universal-footer {
    background: #2c3e50;
    color: white;
    padding: 60px 20px 20px;
    margin-top: 80px;
}

.footer-container {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
    margin-bottom: 40px;
}

.footer-column h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    background: linear-gradient(135deg, #00B0BD, #DD0E6E);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.footer-column h4 {
    color: #00B0BD;
    margin-bottom: 15px;
    font-size: 1.2rem;
}

.footer-column a {
    display: block;
    color: #ecf0f1;
    text-decoration: none;
    margin-bottom: 10px;
    transition: color 0.3s;
}

.footer-column a:hover {
    color: #F6CC00;
}

.footer-bottom {
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid rgba(255,255,255,0.1);
    font-size: 0.9rem;
    color: #95a5a6;
}

@media (max-width: 768px) {
    .harness-universal-footer {
        padding: 40px 20px 20px;
        margin-top: 40px;
        padding-bottom: 80px; /* Space for mobile nav */
    }
    
    .footer-container {
        grid-template-columns: 1fr;
        gap: 30px;
    }
}
`;
        document.head.appendChild(style);
    }

})();

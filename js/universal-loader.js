/**
 * HARNESS Project - Template Loader
 * Automatically loads standard navigation and footer on all pages
 * Created by Christopher Zacharie
 */

(function () {
    'use strict';

    // Determine the correct path prefix based on current page location
    function getPathPrefix() {
        const path = window.location.pathname;
        const depth = (path.match(/\//g) || []).length - 1;

        // Root level (index.html, about.html, etc.)
        if (depth <= 1) return '';

        // One level deep (educator/, blog/, etc.)
        if (depth === 2) return '../';

        // Two levels deep (educator/modules/, etc.)
        return '../../';
    }

    const pathPrefix = getPathPrefix();

    // Adjust image paths in HTML content
    function adjustPaths(html, prefix) {
        // Adjust relative paths for images and links
        return html
            .replace(/src="images\//g, 'src="' + prefix + 'images/')
            .replace(/href="([^"#][^":]*\.html)"/g, 'href="' + prefix + '$1"')
            .replace(/href="index\.html"/g, 'href="' + prefix + 'index.html"');
    }

    // Load Navigation
    function loadNavigation() {
        fetch(pathPrefix + 'components/standard-nav.html')
            .then(response => {
                if (!response.ok) throw new Error('Navigation not found');
                return response.text();
            })
            .then(html => {
                // Adjust paths in the HTML based on current page depth
                const adjustedHtml = adjustPaths(html, pathPrefix);

                // Insert at the beginning of body
                document.body.insertAdjacentHTML('afterbegin', adjustedHtml);

                // Initialize mobile menu functionality after nav is loaded
                initMobileMenu();

                console.log('✅ Navigation loaded');
            })
            .catch(error => {
                console.warn('⚠️ Could not load navigation:', error);
            });
    }

    // Load Footer
    function loadFooter() {
        fetch(pathPrefix + 'components/standard-footer.html')
            .then(response => {
                if (!response.ok) throw new Error('Footer not found');
                return response.text();
            })
            .then(html => {
                // Adjust paths in the HTML based on current page depth
                const adjustedHtml = adjustPaths(html, pathPrefix);

                // Insert at the end of body
                document.body.insertAdjacentHTML('beforeend', adjustedHtml);

                console.log('✅ Footer loaded');
            })
            .catch(error => {
                console.warn('⚠️ Could not load footer:', error);
            });
    }

    // Initialize mobile menu functionality
    function initMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');

        if (hamburger && mobileMenu) {
            // Remove any existing event listeners by cloning
            const newHamburger = hamburger.cloneNode(true);
            hamburger.parentNode.replaceChild(newHamburger, hamburger);

            // Add click event listener
            newHamburger.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                mobileMenu.classList.toggle('active');
                newHamburger.classList.toggle('active');
            });

            // Close menu when clicking on a link
            const menuLinks = mobileMenu.querySelectorAll('a');
            menuLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenu.classList.remove('active');
                    newHamburger.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!mobileMenu.contains(e.target) && !newHamburger.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                    newHamburger.classList.remove('active');
                }
            });
        }
    }

    // Load both when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            loadNavigation();
            loadFooter();
        });
    } else {
        loadNavigation();
        loadFooter();
    }

    // Expose initMobileMenu globally for pages that load nav differently
    window.initMobileMenu = initMobileMenu;

})();

// Global toggle function for mobile menu (legacy support)
function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.getElementById('hamburger');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
    if (hamburger) {
        hamburger.classList.toggle('active');
    }
}

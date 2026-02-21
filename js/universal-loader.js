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

    // Load Navigation
function loadNavigation() {
    fetch(pathPrefix + 'components/standard-nav.html')
        .then(response => {
            if (!response.ok) throw new Error('Navigation not found');
            return response.text();
        })
        .then(html => {
            const navContainer = document.querySelector('.nav-container');
            const adjustedHtml = html.replace(/\.\.\//g, pathPrefix);

            if (navContainer) {
                // If a legacy container exists, clear it and inject the new nav
                navContainer.innerHTML = adjustedHtml;
                console.log('✅ Legacy navigation container updated.');
            } else {
                // Otherwise, insert the new navigation at the beginning of the body
                document.body.insertAdjacentHTML('afterbegin', adjustedHtml);
                console.log('✅ New navigation container created.');
            }

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
                const adjustedHtml = html.replace(/\.\.\//g, pathPrefix);

                // Insert at the end of body
                document.body.insertAdjacentHTML('beforeend', adjustedHtml);

                console.log('✅ Footer loaded');
            })
            .catch(error => {
                console.warn('⚠️ Could not load footer:', error);
            });
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

})();

// Global toggle function for mobile menu
function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}

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
    return fetch(pathPrefix + 'components/standard-nav.html')
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

    // Global toggle function for mobile menu
    function toggleMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) {
            mobileMenu.classList.toggle('active');
        }
    }

    // Add event listeners for the new hamburger menu functionality
    function setupMobileMenu() {
        const hamburgerBtn = document.getElementById('hamburgerMenuBtn');
        const mobileNavSidebar = document.getElementById('mobileNavSidebar');
        const mobileNavOverlay = document.getElementById('mobileNavOverlay');
        const mobileNavClose = document.getElementById('mobileNavClose');
        const navMenuLinks = document.querySelector('.mobile-nav-links');

        if (hamburgerBtn && mobileNavSidebar && mobileNavOverlay && mobileNavClose && navMenuLinks) {
            hamburgerBtn.addEventListener('click', () => {
                mobileNavSidebar.classList.toggle('active');
                mobileNavOverlay.classList.toggle('active');
                hamburgerBtn.classList.toggle('active');
            });

            mobileNavClose.addEventListener('click', () => {
                mobileNavSidebar.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
                hamburgerBtn.classList.remove('active');
            });

            mobileNavOverlay.addEventListener('click', () => {
                mobileNavSidebar.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
                hamburgerBtn.classList.remove('active');
            });

            // Close mobile menu when a link is clicked
            navMenuLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileNavSidebar.classList.remove('active');
                    mobileNavOverlay.classList.remove('active');
                    hamburgerBtn.classList.remove('active');
                });
            });
        }
    }

    // Call setupMobileMenu after navigation is loaded (nav fetch must complete first)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            loadNavigation().then(setupMobileMenu);
            loadFooter();
        });
    } else {
        loadNavigation().then(setupMobileMenu);
        loadFooter();
    }

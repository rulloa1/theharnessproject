/**
 * HARNESS PROJECT - IMAGE LAZY LOADING
 * Created: January 25, 2026
 * Purpose: Automatically add lazy loading to images for better performance
 */

(function () {
    'use strict';

    /**
     * Initialize lazy loading for all images
     */
    function initLazyLoading() {
        // Find all images that don't have loading attribute
        const images = document.querySelectorAll('img:not([loading])');

        if (images.length === 0) {
            return;
        }

        let lazyImagesCount = 0;

        images.forEach((img, index) => {
            // Hero images and logos (first 2-3 images) should load eagerly
            if (index < 2) {
                img.setAttribute('loading', 'eager');
            } else {
                // All other images lazy load
                img.setAttribute('loading', 'lazy');
                lazyImagesCount++;
            }

            // Add decoding attribute for better performance
            if (!img.hasAttribute('decoding')) {
                img.setAttribute('decoding', 'async');
            }

            // Ensure alt attribute exists for accessibility
            if (!img.hasAttribute('alt') || img.getAttribute('alt') === '') {
                console.warn('Image missing alt text:', img.src);
                // Add placeholder alt text
                img.setAttribute('alt', 'HARNESS Project image');
            }
        });

        console.log(`✅ Lazy loading initialized: ${lazyImagesCount} images will lazy load, ${images.length - lazyImagesCount} will load eagerly`);
    }

    /**
     * Add lazy loading to dynamically added images
     */
    function setupDynamicImageObserver() {
        // Use MutationObserver to watch for dynamically added images
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        // Check if it's an image
                        if (node.tagName === 'IMG' && !node.hasAttribute('loading')) {
                            node.setAttribute('loading', 'lazy');
                            node.setAttribute('decoding', 'async');
                        }
                        // Check for images within the added node
                        const images = node.querySelectorAll?.('img:not([loading])');
                        if (images) {
                            images.forEach(img => {
                                img.setAttribute('loading', 'lazy');
                                img.setAttribute('decoding', 'async');
                            });
                        }
                    }
                });
            });
        });

        // Start observing
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        console.log('✅ Dynamic image observer activated');
    }

    /**
     * Add responsive images hint
     */
    function addResponsiveHints() {
        // This could be expanded to add srcset attributes dynamically
        // For now, just ensure images have width/height for better CLS
        const images = document.querySelectorAll('img');

        images.forEach(img => {
            // If image has explicit width/height in CSS, don't override
            const computedStyle = window.getComputedStyle(img);

            // Add explicit dimensions if not present to prevent layout shift
            if (!img.hasAttribute('width') && computedStyle.width && computedStyle.width !== 'auto') {
                img.setAttribute('width', parseInt(computedStyle.width));
            }
            if (!img.hasAttribute('height') && computedStyle.height && computedStyle.height !== 'auto') {
                img.setAttribute('height', parseInt(computedStyle.height));
            }
        });
    }

    /**
     * Initialize on DOM ready
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initLazyLoading();
            setupDynamicImageObserver();
            addResponsiveHints();
        });
    } else {
        // DOM already loaded
        initLazyLoading();
        setupDynamicImageObserver();
        addResponsiveHints();
    }

    // Export for testing/debugging
    window.HARNESSLazyLoading = {
        init: initLazyLoading,
        version: '1.0.0'
    };
})();

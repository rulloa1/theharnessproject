/**
 * HARNESS Project - Production Logger
 * Centralized logging with environment-based control
 *
 * Usage:
 *   import { logger } from './logger.js';
 *   logger.log('Message');
 *   logger.error('Error message');
 *   logger.warn('Warning message');
 *
 * Set HARNESS_ENV=production to disable console logs
 */

(function(global) {
    'use strict';

    // Detect environment (defaults to development)
    const isProduction = (
        typeof HARNESS_ENV !== 'undefined' && HARNESS_ENV === 'production'
    ) || (
        global.location && global.location.hostname !== 'localhost' &&
        global.location.hostname !== '127.0.0.1'
    );

    /**
     * Production-safe logger
     */
    const logger = {
        /**
         * Log general messages
         */
        log: function(...args) {
            if (!isProduction && console && console.log) {
                console.log('[HARNESS]', ...args);
            }
        },

        /**
         * Log errors (always enabled)
         */
        error: function(...args) {
            if (console && console.error) {
                console.error('[HARNESS ERROR]', ...args);
            }
        },

        /**
         * Log warnings
         */
        warn: function(...args) {
            if (!isProduction && console && console.warn) {
                console.warn('[HARNESS WARN]', ...args);
            }
        },

        /**
         * Log debug information (development only)
         */
        debug: function(...args) {
            if (!isProduction && console && console.debug) {
                console.debug('[HARNESS DEBUG]', ...args);
            }
        },

        /**
         * Log information
         */
        info: function(...args) {
            if (!isProduction && console && console.info) {
                console.info('[HARNESS INFO]', ...args);
            }
        },

        /**
         * Check if logging is enabled
         */
        isEnabled: function() {
            return !isProduction;
        }
    };

    // Export for use in other modules
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { logger, isProduction };
    }

    // Make available globally
    global.HARNESSLogger = logger;
    global.HARNESS_IS_PRODUCTION = isProduction;

})(typeof window !== 'undefined' ? window : this);

/**
 * Service Worker for HARNESS PWA
 * Handles offline caching, background sync, and push notifications
 * The HARNESS Project - Fearless. Protected. Empowered.
 */

const CACHE_VERSION = 'harness-v1.0.0';
const CACHE_NAME = `harness-cache-${CACHE_VERSION}`;
const DATA_CACHE_NAME = `harness-data-${CACHE_VERSION}`;

// Assets to cache immediately on install
const PRECACHE_ASSETS = [
    '/',
    '/app.html',
    '/index.html',
    '/offline.html',
    '/css/styles.css',
    '/css/transparent-headers.css',
    '/css/standardized-logo-sizes.css',
    '/js/app.js',
    '/js/views.js',
    '/js/data.js',
    '/js/pwa-installer.js',
    '/js/harness-global.js',
    '/images/harness-app-logo.png',
    '/images/harness-app-splash-logo.png',
    '/manifest.json'
];

// Routes that should always try network first
const NETWORK_FIRST_ROUTES = [
    '/api/',
    '/tables/'
];

// Routes that can be cached
const CACHE_FIRST_ROUTES = [
    '/css/',
    '/js/',
    '/images/',
    '/icons/',
    '/fonts/'
];

/**
 * Install Event - Precache essential assets
 */
self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[ServiceWorker] Precaching app shell');
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => {
                console.log('[ServiceWorker] Installation complete');
                return self.skipWaiting(); // Activate immediately
            })
            .catch((error) => {
                console.error('[ServiceWorker] Precaching failed:', error);
            })
    );
});

/**
 * Activate Event - Clean up old caches
 */
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME && cacheName !== DATA_CACHE_NAME) {
                            console.log('[ServiceWorker] Removing old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[ServiceWorker] Activation complete');
                return self.clients.claim(); // Take control immediately
            })
    );
});

/**
 * Fetch Event - Handle network requests
 */
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip cross-origin requests
    if (url.origin !== location.origin) {
        return;
    }
    
    // Handle API requests (network first, fallback to cache)
    if (isNetworkFirstRoute(url.pathname)) {
        event.respondWith(networkFirstStrategy(request));
        return;
    }
    
    // Handle static assets (cache first, fallback to network)
    if (isCacheFirstRoute(url.pathname)) {
        event.respondWith(cacheFirstStrategy(request));
        return;
    }
    
    // Handle HTML pages (stale-while-revalidate)
    if (request.destination === 'document') {
        event.respondWith(staleWhileRevalidateStrategy(request));
        return;
    }
    
    // Default: network first with cache fallback
    event.respondWith(networkFirstStrategy(request));
});

/**
 * Check if route should use network-first strategy
 */
function isNetworkFirstRoute(pathname) {
    return NETWORK_FIRST_ROUTES.some(route => pathname.startsWith(route));
}

/**
 * Check if route should use cache-first strategy
 */
function isCacheFirstRoute(pathname) {
    return CACHE_FIRST_ROUTES.some(route => pathname.startsWith(route));
}

/**
 * Network First Strategy
 * Try network first, fallback to cache, then offline page
 */
async function networkFirstStrategy(request) {
    try {
        // Try network
        const networkResponse = await fetch(request);
        
        // Cache successful responses
        if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(DATA_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        // Network failed, try cache
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse) {
            console.log('[ServiceWorker] Serving from cache (offline):', request.url);
            return cachedResponse;
        }
        
        // No cache available, return offline page for HTML requests
        if (request.destination === 'document') {
            return caches.match('/offline.html');
        }
        
        // For other requests, return a generic offline response
        return new Response('Offline', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });
    }
}

/**
 * Cache First Strategy
 * Try cache first, fallback to network
 */
async function cacheFirstStrategy(request) {
    // Try cache
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        // Cache miss, try network
        const networkResponse = await fetch(request);
        
        // Cache the response
        if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('[ServiceWorker] Cache and network both failed:', request.url);
        
        // Return a generic error response
        return new Response('Resource not available offline', {
            status: 503,
            statusText: 'Service Unavailable'
        });
    }
}

/**
 * Stale While Revalidate Strategy
 * Return cached version immediately, update cache in background
 */
async function staleWhileRevalidateStrategy(request) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    // Fetch fresh version in the background
    const fetchPromise = fetch(request)
        .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
                cache.put(request, networkResponse.clone());
            }
            return networkResponse;
        })
        .catch(() => {
            // Network failed, we'll use the cached version
        });
    
    // Return cached version immediately if available, otherwise wait for network
    return cachedResponse || fetchPromise || caches.match('/offline.html');
}

/**
 * Background Sync Event
 * Handle background sync for offline actions
 */
self.addEventListener('sync', (event) => {
    console.log('[ServiceWorker] Background sync:', event.tag);
    
    if (event.tag === 'sync-agreements') {
        event.waitUntil(syncAgreements());
    }
    
    if (event.tag === 'sync-favorites') {
        event.waitUntil(syncFavorites());
    }
    
    if (event.tag === 'sync-progress') {
        event.waitUntil(syncProgress());
    }
});

/**
 * Sync agreements made offline
 */
async function syncAgreements() {
    try {
        // Get pending agreements from IndexedDB or localStorage
        const pendingAgreements = await getPendingSyncData('agreements');
        
        if (pendingAgreements.length === 0) {
            return;
        }
        
        // Send to server
        const responses = await Promise.all(
            pendingAgreements.map(agreement => 
                fetch('/api/agreements', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(agreement)
                })
            )
        );
        
        // Clear synced items
        await clearSyncedData('agreements', pendingAgreements);
        
        console.log('[ServiceWorker] Synced agreements:', responses.length);
    } catch (error) {
        console.error('[ServiceWorker] Failed to sync agreements:', error);
        throw error; // Retry sync later
    }
}

/**
 * Sync favorites made offline
 */
async function syncFavorites() {
    try {
        const pendingFavorites = await getPendingSyncData('favorites');
        
        if (pendingFavorites.length === 0) {
            return;
        }
        
        const responses = await Promise.all(
            pendingFavorites.map(favorite => 
                fetch('/api/favorites', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(favorite)
                })
            )
        );
        
        await clearSyncedData('favorites', pendingFavorites);
        
        console.log('[ServiceWorker] Synced favorites:', responses.length);
    } catch (error) {
        console.error('[ServiceWorker] Failed to sync favorites:', error);
        throw error;
    }
}

/**
 * Sync user progress made offline
 */
async function syncProgress() {
    try {
        const pendingProgress = await getPendingSyncData('progress');
        
        if (pendingProgress.length === 0) {
            return;
        }
        
        const responses = await Promise.all(
            pendingProgress.map(progress => 
                fetch('/api/progress', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(progress)
                })
            )
        );
        
        await clearSyncedData('progress', pendingProgress);
        
        console.log('[ServiceWorker] Synced progress:', responses.length);
    } catch (error) {
        console.error('[ServiceWorker] Failed to sync progress:', error);
        throw error;
    }
}

/**
 * Get pending sync data (placeholder - actual implementation would use IndexedDB)
 */
async function getPendingSyncData(type) {
    // This would actually read from IndexedDB
    // For now, return empty array
    return [];
}

/**
 * Clear synced data (placeholder)
 */
async function clearSyncedData(type, data) {
    // This would actually clear from IndexedDB
    console.log(`[ServiceWorker] Clearing synced ${type} data:`, data.length);
}

/**
 * Push Notification Event
 */
self.addEventListener('push', (event) => {
    console.log('[ServiceWorker] Push notification received');
    
    let notificationData = {
        title: 'HARNESS',
        body: 'You have a new notification',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        tag: 'harness-notification',
        requireInteraction: false
    };
    
    if (event.data) {
        try {
            const data = event.data.json();
            notificationData = { ...notificationData, ...data };
        } catch (e) {
            notificationData.body = event.data.text();
        }
    }
    
    event.waitUntil(
        self.registration.showNotification(notificationData.title, {
            body: notificationData.body,
            icon: notificationData.icon,
            badge: notificationData.badge,
            tag: notificationData.tag,
            requireInteraction: notificationData.requireInteraction,
            data: notificationData.data || {},
            actions: notificationData.actions || []
        })
    );
});

/**
 * Notification Click Event
 */
self.addEventListener('notificationclick', (event) => {
    console.log('[ServiceWorker] Notification clicked');
    
    event.notification.close();
    
    // Get the URL to open from notification data
    const urlToOpen = event.notification.data?.url || '/app.html';
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientList) => {
                // Check if app is already open
                for (const client of clientList) {
                    if (client.url === urlToOpen && 'focus' in client) {
                        return client.focus();
                    }
                }
                
                // App not open, open new window
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
    );
});

/**
 * Message Event - Handle messages from app
 */
self.addEventListener('message', (event) => {
    console.log('[ServiceWorker] Message received:', event.data);
    
    if (event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data.type === 'CACHE_URLS') {
        cacheURLs(event.data.urls);
    }
    
    if (event.data.type === 'CLEAR_CACHE') {
        clearAllCaches();
    }
});

/**
 * Cache specific URLs on demand
 */
async function cacheURLs(urls) {
    try {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(urls);
        console.log('[ServiceWorker] Cached URLs:', urls.length);
    } catch (error) {
        console.error('[ServiceWorker] Failed to cache URLs:', error);
    }
}

/**
 * Clear all caches
 */
async function clearAllCaches() {
    try {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
        console.log('[ServiceWorker] All caches cleared');
    } catch (error) {
        console.error('[ServiceWorker] Failed to clear caches:', error);
    }
}

console.log('[ServiceWorker] Service Worker loaded successfully');

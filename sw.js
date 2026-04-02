// GyroCare Pro — Service Worker
// Bump CACHE_NAME whenever you deploy an update to force a cache refresh
const CACHE_NAME = 'gyrocare-pro-v1';

const PRECACHE_ASSETS = [
  './GyroCare_Pro_v17_26_2_2.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-180.png',
  './icons/icon-152.png',
  './icons/icon-120.png'
];

// ── Install: pre-cache core assets ──────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache what we can; don't fail install if optional assets are missing
      return Promise.allSettled(
        PRECACHE_ASSETS.map(url =>
          cache.add(url).catch(err => console.warn('Pre-cache miss:', url, err))
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// ── Activate: remove old caches ──────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: cache-first for same-origin, network-first for Google Fonts ───────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Let external requests (Google Fonts, etc.) pass through normally
  if (url.origin !== self.location.origin) {
    event.respondWith(fetch(event.request).catch(() => new Response('')));
    return;
  }

  // Cache-first strategy for local assets
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Cache successful GET responses
        if (event.request.method === 'GET' && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline fallback — return the main HTML shell
        return caches.match('./GyroCare_Pro_v17_26_2_2.html');
      });
    })
  );
});

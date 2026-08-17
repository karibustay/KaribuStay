const CACHE_NAME = 'karibustay-shell-v3';
const APP_SHELL = [
  '/',
  '/index.html',
  '/listings.html',
  '/property.html',
  '/bookings.html',
  '/profile.html',
  '/about.html',
  '/logo2.png',
  '/logo3.png',
  '/background4.jpeg',
  '/app.webmanifest'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys
      .filter(key => key !== CACHE_NAME)
      .map(key => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  // Account, booking, and property pages should always be fresh; their data and
  // authentication state must never be served from a stale page cache.
  if (event.request.mode === 'navigate' || url.search) {
    event.respondWith(fetch(event.request).catch(() => caches.match('/index.html')));
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request)
      .then(response => {
        if (!response || response.status !== 200 || response.type === 'opaque') return response;
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match('/index.html')))
  );
});

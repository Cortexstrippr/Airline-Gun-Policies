const cacheName = 'fly-gun-v11';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './atf-logo.png',
  './aa-logo.png',
  './alaska-logo.png',
  './ccw-logo.png',
  './delta-logo.png',
  './hawaiian-logo.png',
  './tsa-logo.png',
  './united-logo.png',
  './allegiant-logo.png',
  './frontier-logo.png',
  './jetblue-logo.png',
  './southwest-logo.png',
  './breeze-logo.png'
];

// 1. Install Event (Downloads new files & forces takeover)
self.addEventListener('install', e => {
  self.skipWaiting(); // Forces the waiting service worker to become the active one immediately
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// 2. Activate Event (Cleans up old, stale caches)
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== cacheName) {
          console.log('Deleting old cache:', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

// 3. Fetch Event (Serves from cache, falls back to network)
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});

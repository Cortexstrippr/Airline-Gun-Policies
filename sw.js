const cacheName = 'fly-gun-v5';
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
  './breeze-logo.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(cacheName).then(cache => {
    return cache.addAll(assets);
  }));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(response => {
    return response || fetch(e.request);
  }));
});

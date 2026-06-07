const CACHE = 'itp-v1';
const ASSETS = [
  '/itp-app/',
  '/itp-app/index.html',
  '/itp-app/questions.js',
  '/itp-app/questions2.js',
  '/itp-app/manifest.json',
  '/itp-app/icon-192.png',
  '/itp-app/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

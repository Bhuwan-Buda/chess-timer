// public/service-worker.js

const CACHE_NAME = "chess-timer-1.0.0";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  // Add other static assets and routes that you want to cache
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

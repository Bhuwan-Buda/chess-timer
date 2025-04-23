const CACHE_NAME = "chess-timer-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/chess-timer.ico",
  "/chess-timer-large.png",
  "/chess-timer-small.png",
  "/assets/beep-sound.mp3",
  "/assets/final-beep-sound.mp3",
  "/assets/press-sound.mp3",
  "/Components/ChessTimer.js",
  "/Components/ColorPicker.js",
  "/Components/SelectTime.js",
  "/Redux/chessTimerSlice.js",
  "/Store/index.js",
  "/Store/store.js",
];

// Install and cache necessary files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Serve cached content when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // Return cached response
      } else {
        return fetch(event.request) // Network fallback if not cached
          .then((networkResponse) => {
            // Optionally, cache the new response
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
            return networkResponse;
          });
      }
    })
  );
});

// Update the service worker and clean old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (!cacheWhitelist.includes(name)) {
            return caches.delete(name);
          }
        })
      )
    )
  );
});

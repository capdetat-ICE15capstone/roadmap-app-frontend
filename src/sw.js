import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { clientsClaim } from "workbox-core"

cleanupOutdatedCaches()
clientsClaim()

const myCache = self.__WB_MANIFEST;
precacheAndRoute(myCache);
console.warn("Service worker is now operable");

// listen for push notification
self.addEventListener("push", (event) => {
  // listen for push notification
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "android-chrome-192x192.png",
  });
});

// use cache for offline event
self.addEventListener("fetch", (event) => {
  if (!navigator.onLine) { // This is not good, if the server is down but internet online this would fail
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) return response;
      })
    );
  }
});

self.addEventListener("fetch", (event) => {
  
})

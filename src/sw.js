import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { clientsClaim, skipWaiting } from "workbox-core"
// import { isServerResponding } from "./functions/userFunction";

cleanupOutdatedCaches()
clientsClaim()
const myCache = self.__WB_MANIFEST;
precacheAndRoute(myCache);

console.warn("Service worker is now operable");

self.addEventListener("install", (event) => {
  console.log(self.skipWaiting)
  self.skipWaiting()
})

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
  event.respondWith(
    (async function () {
      const cachedResponse = await caches.match(event.request);
      return cachedResponse || fetch(event.request);
    })(),
  );
});

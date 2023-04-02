import { precacheAndRoute } from "workbox-precaching";

const myCache = self.__WB_MANIFEST;
console.log(myCache);
precacheAndRoute(myCache);
console.warn("Service worker is now operable");

self.addEventListener("push", (event) => {
  // listen for push notification
  const data = event.data.json();
  console.log(data);
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "android-chrome-192x192.png",
  });
});

import { precacheAndRoute } from "workbox-precaching";

const myCache = self.__WB_MANIFEST;
precacheAndRoute(myCache);
console.warn("Service worker is now operable");

self.addEventListener("push", () => {
    // listen for push notification
    
})

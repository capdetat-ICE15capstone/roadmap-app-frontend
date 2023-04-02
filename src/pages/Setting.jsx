import React, { useState } from "react";

const publicVAPIDKey =
  "BPdmC1qk09Z30BA96nNmddDNEr6M9fjnBaG15Ezpe_f-J7qQIEAUEbWTSFuQDxzDmDMfwB-al5xANDwYfcwt8P4";

function urlBase64ToUint8Array(base64String) {
  var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  var base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const Setting = () => {
  const [notiOn, setNotiOn] = useState(true);

  const handleNotiSubscription = () => {
    console.log("function handlenotisub")
    if (notiOn === true) return;

    navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
      const options = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVAPIDKey),
      };

      serviceWorkerRegistration.pushManager
        .subscribe(options)
        .then(
          (pushSubscription) => {
            console.log(pushSubscription.endpoint);
          },
          (error) => {
            console.log(error);
          }
        )
        .then(() => setNotiOn(true))
        .catch(() => console.log("Subscription error"))
    }).catch(() => {
        console.log("service worker not ready")
    });
  };

  const handleNotiUnsubscription = () => {
    console.log("unsub");
  };

  return (
    <button
      className="bg-red-400 w-20 h-10"
      onClick={notiOn ? handleNotiSubscription : handleNotiUnsubscription}
    >
      Sub
    </button>
  );
};

export default Setting;

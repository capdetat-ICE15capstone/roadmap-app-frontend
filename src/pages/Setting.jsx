import React, { useState } from "react";
import axios from "axios";

const publicVAPIDKey =
  "BPdmC1qk09Z30BA96nNmddDNEr6M9fjnBaG15Ezpe_f-J7qQIEAUEbWTSFuQDxzDmDMfwB-al5xANDwYfcwt8P4";

const route = "http://localhost:8888/subscribe";

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
  const [notiOn, setNotiOn] = useState(false);

  const handleNotiSubscription = () => {
    console.log("function handlenotisub");
    if (notiOn === true) return;

    try {
      // Ask for notification permission
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
        // TELL THE USER THEY DONT HAVE NOTIFICATION AVAILABLE
        throw new Error("Notification Not supported");
      } else if (Notification.permission === "granted") {
        console.log("Permission granted");
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            console.log("Permission granted");
          } else {
            console.error("Notification Permission: Denied");
            // TELL THE USER NOTIFICATION PERMISSION IS DENIED
            throw new Error("Notification Permission: Denied");
          }
        });
      } else {
        console.error("Notification Permission: Denied");
        // TELL THE USER NOTIFICATION PERMISSION IS DENIED
        throw new Error("Notification Permission: Denied");
      }

      navigator.serviceWorker.ready
        .then((serviceWorkerRegistration) => {
          const options = {
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVAPIDKey),
          };

          serviceWorkerRegistration.pushManager
            .subscribe(options)
            .then(
              (pushSubscription) => {
                console.log(pushSubscription);
                axios.post(route, pushSubscription)
                    .catch(handleNotiUnsubscription)
              },
              (error) => {
                console.error(error);
              }
            )
            .then(() => {
              setNotiOn(true);
              console.log("registration complete");
            })
            .catch((error) => {
              console.error("Subscription error");
              console.error(error);
            });
        })
        .catch((error) => {
          console.error("service worker not ready");
          console.error(error);
        });
    } catch (error) {
      console.error("setup error");
      console.error(error);
    }
  };

  const handleNotiUnsubscription = () => {
    console.log("unsub");
    navigator.serviceWorker.ready.then((reg) => {
      reg.pushManager.getSubscription().then((subscription) => {
        // Tell the server unsub
        console.log(subscription);
        subscription
          .unsubscribe()
          .then((successful) => {
            // You've successfully unsubscribed
            console.log(successful);
            setNotiOn(false);
          })
          .catch((e) => {
            // Unsubscribing failed
            console.error(e);
          });
      });
    });
  };

  return (
    <button
      className="bg-red-400 w-20 h-10"
      onClick={notiOn ? handleNotiUnsubscription : handleNotiSubscription}
    >
      Sub
    </button>
  );
};

export default Setting;

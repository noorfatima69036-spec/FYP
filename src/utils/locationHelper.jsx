// locationHelper.js
// Browser GPS location leta hai aur LocationIQ se address mein convert karta hai

const LOCATIONIQ_API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;

export function fetchCurrentAddress(onSuccess, onError, onLoading) {
  if (!navigator.geolocation) {
    onError("Your browser does not support location.");
    return;
  }

  if (onLoading) onLoading(true);

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

     

      try {
        const res = await fetch(
          `https://us1.locationiq.com/v1/reverse?key=${LOCATIONIQ_API_KEY}&lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
        );

        if (!res.ok) {
          throw new Error(`LocationIQ error: ${res.status}`);
        }

        const data = await res.json();
      

        if (data && data.address) {
          const address = data.address;

          // Area ke liye different possible LocationIQ fields
          const area =
            address.neighbourhood ||
            address.suburb ||
            address.quarter ||
            address.residential ||
            address.village ||
            "";

          // City ke liye different possible fields
          const city =
            address.city ||
            address.town ||
            address.municipality ||
            address.county ||
            "";

          let shortAddress = "";

          if (area && city) {
            shortAddress = `${area}, ${city}`;
          } else if (city) {
            shortAddress = city;
          } else if (area) {
            shortAddress = area;
          } else if (data.display_name) {
            shortAddress = data.display_name;
          }

          if (shortAddress) {
            onSuccess(shortAddress);
          } else {
            onError(
              "Could not find your address, please enter it manually"
            );
          }
        } else {
          onError(
            "Could not find your address, please enter it manually"
          );
        }
      } catch (err) {
        console.error("LocationIQ error:", err);

        onError(
          "Something went wrong fetching your address, please enter it manually"
        );
      } finally {
        if (onLoading) onLoading(false);
      }
    },

    (err) => {
      if (onLoading) onLoading(false);

      if (err.code === 1) {
        onError("Please allow location permission in your browser");
      } else {
        onError(
          "Could not fetch your location, please enter it manually"
        );
      }
    }
  );
}
// locationHelper.js
// Reusable function — browser GPS location leta hai aur address text mein convert karta hai
// Free API use ho rahi hai: OpenStreetMap Nominatim (koi key nahi chahiye)

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
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();

        if (data && data.display_name) {
          onSuccess(data.display_name);
        } else {
          onError("Could not find your address, please enter it manually");
        }
      } catch (err) {
        onError("Something went wrong fetching your address, please enter it manually");
      } finally {
        if (onLoading) onLoading(false);
      }
    },
    (err) => {
      if (onLoading) onLoading(false);
      if (err.code === 1) {
        onError("Please allow location permission in your browser");
      } else {
        onError("Could not fetch your location, please enter it manually");
      }
    }
  );
}
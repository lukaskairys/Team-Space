import { useState, useEffect } from "react";

const useCurrentLocation = (options = {}) => {
  const [location, setLocation] = useState({});
  const [geolocationError, setError] = useState("");

  const handleSuccess = (pos) => {
    const { latitude, longitude } = pos.coords;

    setLocation({
      latitude,
      longitude,
    });
  };

  const handleError = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    const { geolocation } = navigator;
    if (!geolocation) {
      setError("Geolocation is not supported.");
      return;
    }

    // Call Geolocation API
    geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, [options]);
  return { location, geolocationError };
};

export default useCurrentLocation;

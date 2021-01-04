import { useState, useEffect, useRef } from "react";

import useCurrentLocation from "utils/useCurrentLocation";
import { isObjectEmpty } from "utils/objects";
import { geolocationOptions } from "utils/geolocationOptions";

import { deconstructAPI } from "./utils/apiControl";
import { generateEndpoint } from "./utils/apiControl";

const useWeatherWidget = () => {
  const { location, geolocationError } = useCurrentLocation(geolocationOptions);
  const apiEndpoint = generateEndpoint(location);

  const [errors, setError] = useState("");
  const [items, setItems] = useState({});
  const [isLoaded, setLoading] = useState(false);
  let isMounted = useRef(false);

  useEffect(() => {
    const fetchAPI = () => {
      fetch(apiEndpoint)
        .then((response) => {
          if (!response.ok) {
            return {};
          }
          return response.json();
        })
        .then(
          (data) => {
            deconstructAPI(data, setError, setItems, setLoading, isMounted);
          },
          (error) => {
            setError(error);
          }
        );
    };

    const isValid = () => {
      if (geolocationError === "User denied Geolocation") {
        setError("Enable geolocation!");
        return false;
      } else if (isObjectEmpty(location)) {
        setError("Loading...");
        return false;
      }

      return true;
    };

    isMounted.current = true;
    let intervalID;
    if (isValid()) {
      fetchAPI();
      intervalID = setInterval(() => {
        fetchAPI();
      }, 60000);
    }

    return () => {
      clearInterval(intervalID);
      isMounted.current = false;
    };
  }, [apiEndpoint, geolocationError, location]);

  return { items, isLoaded, errors };
};

export default useWeatherWidget;

import { isObjectEmpty } from "utils/objects";

export const deconstructAPI = (
  data,
  setError,
  setItems,
  setLoading,
  isMounted
) => {
  if (isObjectEmpty(data)) {
    setError("Unable to retrieve data");
    return;
  }
  if (isMounted.current) {
    setItems({
      temp: data.main.temp.toFixed(),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      description: data.weather[0].description,
      location: data.name,
      conditionId: data.weather[0].id,
      clouds: data.clouds.all,
    });
    setLoading(true);
  }
};

export const generateEndpoint = (location) => {
  const URL = "https://api.openweathermap.org/data/2.5/weather/";
  const API_KEY = "5d862191a42940fcbf7bec6f3531884b";
  const API_URL = `${URL}?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${API_KEY}`;

  return API_URL;
};

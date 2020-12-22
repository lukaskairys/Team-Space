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

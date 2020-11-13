import { isObjectEmpty } from "../../../utils/utils";
export const deconstructAPI = (data, setError, setItems, setLoading) => {
  if (isObjectEmpty(data)) {
    setError("Unable to retrieve data");
    return;
  }
  setItems({
    temp: data.main.temp.toFixed(),
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    description: data.weather[0].description,
    location: data.name,
    conditionId: data.weather[0].id,
  });
  setLoading(true);
};

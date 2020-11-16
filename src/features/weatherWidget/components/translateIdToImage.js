const images = {
  WeatherConditions: {
    Sunny: require("assets/WeatherWidget/sunny.svg"),
    Thunderstorm: require("assets/WeatherWidget/thunderstorm.svg"),
    Cloudy: require("assets/WeatherWidget/cloudy.svg"),
    Rainy: require("assets/WeatherWidget/rainy.svg"),
    Snowing: require("assets/WeatherWidget/snowing.svg"),
    Misty: require("assets/WeatherWidget/rainy.svg"),
  },
};

export const translateIdToImage = (id) => {
  const conditions = images.WeatherConditions;
  if (id >= 200 && id < 300) return conditions.Thunderstorm;
  if (id >= 300 && id < 400) return conditions.Rainy;
  if (id >= 500 && id < 600) return conditions.Snowing;
  //need more picture mist, smoke, haze, dust, fog, sand, dust, ash, squall  = thunderstorm atm due to lack of pictures
  if (id >= 700 && id < 800) return conditions.Thunderstorm;
  if (id === 800) return conditions.Sunny;
  if (id > 800) return conditions.Cloudy;
};

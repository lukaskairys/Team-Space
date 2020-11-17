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
  let shiftLeft = false;
  if (id >= 200 && id < 300) {
    shiftLeft = true;
    return { image: conditions.Thunderstorm, shiftLeft: shiftLeft };
  }
  if (id >= 300 && id < 400)
    return { image: conditions.Rainy, shiftLeft: shiftLeft };
  if (id >= 500 && id < 600)
    return { image: conditions.Rainy, shiftLeft: shiftLeft };
  //need more picture mist, smoke, haze, dust, fog, sand, dust, ash, squall  = thunderstorm atm due to lack of pictures
  if (id >= 600 && id < 700) {
    return { image: conditions.Snowing, shiftLeft: shiftLeft };
  }
  if (id >= 700 && id < 800) {
    shiftLeft = true;
    return { image: conditions.Thunderstorm, shiftLeft: shiftLeft };
  }
  if (id === 800) return { image: conditions.Sunny, shiftLeft: shiftLeft };
  return { image: conditions.Cloudy, shiftLeft: shiftLeft };
};

import React, { useState, useEffect } from "react";
import useCurrentLocation from "./useCurrentLocation";
import "./weatherWidget.scss";

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 60,
};
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

export default function WeatherWidget() {
  const { location, geolocationError } = useCurrentLocation(geolocationOptions);
  const URL = "https://api.openweathermap.org/data/2.5/weather/";
  const API_KEY = "5d862191a42940fcbf7bec6f3531884b";
  const API_URL = `${URL}?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${API_KEY}`;
  const [errors, setError] = useState("");
  const [items, setItems] = useState({});
  const [isLoaded, setLoading] = useState(false);

  useEffect(() => {
    const fetchAPI = () => {
      fetch(API_URL)
        .then((response) => {
          if (!response.ok) {
            return {};
          }
          return response.json();
        })
        .then(
          (data) => {
            deconstructAPI(data);
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

    function deconstructAPI(data) {
      if (isObjectEmpty(data)) {
        setError("Unable to retirieve data");
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
    }

    if (isValid()) {
      fetchAPI();
      let intervalID = setInterval(() => {
        fetchAPI();
      }, 3000);
      return () => clearInterval(intervalID);
    }
  }, [API_URL, geolocationError, location]);

  const loadSpinner = () => {
    if (!isLoaded) {
      return (
        <img
          className="widget__spinner"
          src={require("assets/WeatherWidget/spinner.svg")}
          alt=""
        />
      );
    }
  };
  const isObjectEmpty = (objectData) => {
    if (
      Object.keys(objectData).length === 0 &&
      objectData.constructor === Object
    )
      return true;

    return false;
  };
  function getDateFormat(locale) {
    var date = new Date();
    return date.toLocaleDateString(locale, {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  }

  const translateIdToImage = (id) => {
    const conditions = images.WeatherConditions;
    if (id >= 200 && id < 300) return conditions.Thunderstorm;
    if (id >= 300 && id < 400) return conditions.Rainy;
    if (id >= 500 && id < 600) return conditions.Snowing;
    //need more picture mist, smoke, haze, dust, fog, sand, dust, ash, squall  = thunderstorm atm due to lack of pictures
    if (id >= 700 && id < 800) return conditions.Thunderstorm;
    if (id === 800) return conditions.Sunny;
    if (id > 800) return conditions.Cloudy;
  };
  const loadFigure = () => {
    if (isLoaded)
      return (
        <figure className="widget__figure">
          <img src={translateIdToImage(items.conditionId)} alt="" />
        </figure>
      );
  };

  const loadParagraph = () => {
    let content = "";
    let description = errors === "" ? "Loading..." : errors;
    if (isLoaded) {
      content = items.temp + String.fromCharCode(176);
      description = items.description;
    }
    return (
      <p className="widget__paragraph">
        <span className="widget__span">{content} </span>
        {description}
      </p>
    );
  };

  return (
    <article className="widget widget--disabled">
      <main className="widget__content">
        <p className="widget__header">
          {loadSpinner()}
          {getDateFormat("en-us")} | {items.location}
        </p>
        {loadParagraph()}
        <div className="widget__border"></div>
        <section className="widget__section">
          <div>
            <img
              className="widget__icon"
              src={require("assets/WeatherWidget/wind.svg")}
              alt="wind speed"
            />
            <label htmlFor="widget__icon">{items.windSpeed} m/s</label>
          </div>
          <div>
            <img
              className="widget__icon"
              src={require("assets/WeatherWidget/humidity.svg")}
              alt="humidity"
            />
            <label htmlFor="widget__icon">{items.humidity} mm</label>
          </div>
          <div></div>
        </section>
      </main>
      {loadFigure()}
    </article>
  );
}

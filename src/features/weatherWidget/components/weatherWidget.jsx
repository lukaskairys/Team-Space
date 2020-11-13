import React, { useState, useEffect } from "react";
import useCurrentLocation from "./useCurrentLocation";
import { isObjectEmpty } from "../../../utils/objects";
import { translateIdToImage } from "./translateIdToImage";
import { geolocationOptions } from "./geolocationOptions";
import { getDateFormat } from "./getDateFormat";
import { deconstructAPI } from "./deconstructAPI";
import "./weatherWidget.scss";

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
            deconstructAPI(data, setError, setItems, setLoading);
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
          className="weather-widget__spinner"
          src={require("assets/WeatherWidget/spinner.svg")}
          alt=""
        />
      );
    }
  };

  const loadFigure = () => {
    if (isLoaded)
      return (
        <figure className="weather-widget__figure">
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
      <p className="weather-widget__paragraph">
        <span className="weather-widget__span">{content} </span>
        {description}
      </p>
    );
  };

  return (
    <article className="weather-widget">
      <main className="weather-widget__content">
        <p className="weather-widget__header">
          {loadSpinner()}
          {getDateFormat("en-us")} | {items.location}
        </p>
        {loadParagraph()}
        <div className="weather-widget__border"></div>
        <section className="weather-widget__section">
          <div>
            <img
              className="weather-widget__icon"
              src={require("assets/WeatherWidget/wind.svg")}
              alt="wind speed"
            />
            <label htmlFor="weather-widget__icon">{items.windSpeed} m/s</label>
          </div>
          <div>
            <img
              className="weather-widget__icon"
              src={require("assets/WeatherWidget/humidity.svg")}
              alt="humidity"
            />
            <label htmlFor="weather-widget__icon">{items.humidity} mm</label>
          </div>
          <div></div>
        </section>
      </main>
      {loadFigure()}
    </article>
  );
}

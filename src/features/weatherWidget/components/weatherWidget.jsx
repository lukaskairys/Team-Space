import React from "react";
import PropTypes from "prop-types";

import { getDateFormat } from "./utils/getDateFormat";
import { translateIdToImage } from "./utils/translateIdToImage";
import useWeatherWidget from "./useWeatherWidget";

import "./weatherWidget.scss";

export default function WeatherWidget({ currentTime }) {
  const { items, isLoaded, errors } = useWeatherWidget();

  const loadSpinner = () => {
    if (!isLoaded) {
      return (
        <img
          className="weather-widget__spinner"
          src={require("assets/images/spinner.svg")}
          alt=""
        />
      );
    }
  };

  const loadFigure = () => {
    if (isLoaded) {
      const { image, shift } = translateIdToImage(
        items.conditionsId,
        currentTime,
        items.clouds,
        items.unixSunset,
        items.unixSunrise
      );
      let className = "weather-widget__figure";
      if (shift > 0) className += " weather-widget__figure-shift-left";
      if (shift < 0) className += " weather-widget__figure-shift-right";

      return (
        <figure className={className}>
          <img className="figure__image" src={image} alt="" />
        </figure>
      );
    }
  };

  const loadParagraph = () => {
    let content = "";
    let description = errors === "" ? "Loading..." : errors;
    if (isLoaded) {
      const temp = items.temp === "-0" ? 0 : items.temp;
      content = temp + String.fromCharCode(176);
      description = items.description;
    }
    return (
      <p className="weather-widget__forecast-primary">
        <span className="weather-widget__temperature">{content} </span>
        {description}
      </p>
    );
  };
  return (
    <article className="weather-widget">
      <section className="weather-widget__main">
        <p className="weather-widget__header">
          <span className="visually-hidden">
            Current date and your location:
          </span>
          {getDateFormat("en-us")} | {items.location}
        </p>
        {loadSpinner()}
        {loadParagraph()}
        <div className="weather-widget__border"></div>
        <section className="weather-widget__footer">
          <section className="weather-widget__forecast-secondary">
            <p>
              <img
                className="weather-widget__wind"
                src={require("assets/images/wind.svg")}
                alt="wind speed"
              />
              {items.windSpeed} m/s
            </p>
          </section>
          <section className="weather-widget__forecast-secondary">
            <p>
              <img
                className="weather-widget__humidity"
                src={require("assets/images/humidity.svg")}
                alt="humidity"
              />
              {items.humidity} mm
            </p>
          </section>
        </section>
      </section>
      {loadFigure()}
    </article>
  );
}

WeatherWidget.propTypes = {
  currentTime: PropTypes.string,
};

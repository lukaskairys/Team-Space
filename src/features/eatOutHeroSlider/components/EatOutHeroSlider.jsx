import React, { useState, useEffect } from "react";
import FetchBestRatedRestaurants from "../../eatOutSection/components/FetchBestRatedRestaurants";

import "./eatOutHeroSlider.scss";
import Button from "../../../components/button/Button";
import SliderNavigation from "./SliderNavigation";
import { roundNumber } from "utils/Math";

const EatOutHeroSlider = () => {
  const count = 5;
  const restaurants = FetchBestRatedRestaurants(count);
  const [currentIndex, setCurrentIndex] = useState(
    roundNumber(count / 2, 0) - 1
  );
  const [currentItem, setCurrentItem] = useState({});
  const [isFading, setFading] = useState(false);

  const cacheImages = async (restaurants) => {
    const promises = await restaurants.map((restaurant) => {
      return new Promise(function (resolve, reject) {
        const img = new Image();
        img.src = restaurant.image;
        img.onload = resolve();
        img.onerror = reject();
      });
    });
    await Promise.all(promises);
  };

  useEffect(() => {
    cacheImages(restaurants);
  }, [restaurants]);

  useEffect(() => {
    if (!isFading) {
      const currentSingle =
        restaurants.length > 0 ? restaurants[currentIndex] : {};
      setCurrentItem(currentSingle);
    }
  }, [restaurants, currentIndex, isFading]);

  return (
    <div className="eat-out-slider">
      <div className="eat-out-slider__container">
        <img
          className="eat-out-slider__image"
          src={currentItem.image}
          alt={currentItem.name}
        />
      </div>
      <div className="eat-out-slider__details">
        <div className="eat-out-slider__main">
          <SliderNavigation
            counter={count}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            setFading={setFading}
          />
          <p className="eat-out-slider__caption">Feel the taste of Italy</p>
          <h2 className="eat-out-slider__title">{currentItem.name}</h2>
          <p className="eat-out-slider__content">{currentItem.description}</p>
        </div>
        <Button className="eat-out-slider__learn-more" medium={true}>
          <span>Learn More</span>
        </Button>
      </div>
    </div>
  );
};

export default EatOutHeroSlider;

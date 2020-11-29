import React, { useState, useEffect, useCallback } from "react";
import { FetchBestRatedRestaurants } from "utils/Api";
import { roundNumber } from "utils/Math";
import Button from "../../../components/button/Button";
import Loader from "react-loader-spinner";

import "./eatOutHeroSlider.scss";
import SliderNavigation from "./SliderNavigation";
import { ToggleAnimation } from "./ToggleAnimation";

const EatOutHeroSlider = () => {
  const count = 5;
  const { restaurants, error } = FetchBestRatedRestaurants(count);
  const [currentIndex, setCurrentIndex] = useState(
    roundNumber(count / 2, 0) - 1
  );
  const [currentItem, setCurrentItem] = useState({});
  const [isAnimationLoading, setAnimationLoading] = useState(false);
  const [fetchState, setFetchState] = useState(error);
  const [isLoading, setLoading] = useState(true);

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

  const handleImageLoaded = () => {
    if (isAnimationLoading) {
      ToggleAnimation();
    }
    setAnimationLoading(false);
  };

  const loadStatus = useCallback(() => {
    if (restaurants.length > 0) {
      setLoading(false);
    } else if (error !== "" && error !== null && error !== fetchState) {
      setFetchState("Failed to fetch a restaurant.");
      setLoading(false);
    }
  }, [error, fetchState, restaurants.length]);

  useEffect(() => {
    cacheImages(restaurants);
  }, [restaurants]);

  useEffect(() => {
    const currentSingle =
      restaurants.length > 0 ? restaurants[currentIndex] : {};
    setCurrentItem(currentSingle);
    loadStatus();
  }, [restaurants, currentIndex, error, loadStatus]);

  if (isLoading) {
    return (
      <div className="eat-out-slider is_disabled">
        <div className="eat-out-slider__loader">
          <Loader type="TailSpin" color="#6e44ff" height={80} width={80} />
        </div>
      </div>
    );
  } else if (fetchState !== "" && fetchState !== null) {
    return (
      <div className="eat-out-slider is_disabled">
        <h2 className="eat-out-slider__error">{fetchState}</h2>
      </div>
    );
  }
  return (
    <div className="eat-out-slider">
      <div className="eat-out-slider__image-container">
        <img
          className="eat-out-slider__image"
          src={currentItem.image}
          onLoad={handleImageLoaded}
          alt={currentItem.name}
        />
      </div>
      <div className="eat-out-slider__details">
        <div className="eat-out-slider__main">
          <SliderNavigation
            counter={count}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            setAnimationLoading={setAnimationLoading}
            isAnimationLoading={isAnimationLoading}
          />
          <p className="eat-out-slider__caption">{currentItem.slogan}</p>
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

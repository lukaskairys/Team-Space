import { useState, useEffect, useCallback } from "react";

import { FetchBestRatedRestaurants } from "utils/Api";
import { roundNumber } from "utils/Math";

import { toggleAnimation } from "./utils/toggleAnimation";
import cacheImages from "./utils/cacheImages";

const useEatOutHeroSlider = () => {
  const count = 5;
  const { restaurants, error } = FetchBestRatedRestaurants(count);
  const [currentIndex, setCurrentIndex] = useState(
    roundNumber(count / 2, 0) - 1
  );
  const [currentItem, setCurrentItem] = useState({});
  const [isAnimationLoading, setAnimationLoading] = useState(false);
  const [fetchState, setFetchState] = useState(error);
  const [isLoading, setLoading] = useState(true);

  const handleImageLoaded = () => {
    if (isAnimationLoading) {
      toggleAnimation();
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

  const isDisabled = () => {
    if (isLoading || (fetchState !== "" && fetchState !== null)) return true;

    return false;
  };

  const hasError = () => {
    if (fetchState !== "" && fetchState !== null) return true;
    return false;
  };

  return {
    isDisabled,
    isLoading,
    fetchState,
    hasError,
    handleImageLoaded,
    currentItem,
    count,
    currentIndex,
    setCurrentIndex,
    setAnimationLoading,
    isAnimationLoading,
  };
};

export default useEatOutHeroSlider;

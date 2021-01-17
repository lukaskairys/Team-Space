import React from "react";
import classNames from "classnames";

import ThreeDotsLoader from "loaders/ThreeDotsLoader";

import "./eatOutHeroSlider.scss";
import EatOutHeroSliderDetails from "./EatOutHeroSliderDetails";
import EatOutHeroSliderImage from "./EatOutHeroSliderImage";
import useEatOutHeroSlider from "./useEatOutHeroSlider";

const EatOutHeroSlider = () => {
  const {
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
  } = useEatOutHeroSlider();

  return (
    <article
      className={classNames("eat-out-slider", {
        is_disabled: isDisabled(),
      })}
    >
      {isLoading && (
        <div className="eat-out-slider__loader">
          <ThreeDotsLoader />
        </div>
      )}
      {hasError() && <h2 className="eat-out-slider__error">{fetchState}</h2>}

      {!isLoading && !hasError() && (
        <>
          <EatOutHeroSliderImage
            imageLocation={currentItem.image}
            handleImageLoaded={handleImageLoaded}
          />
          <EatOutHeroSliderDetails
            count={count}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            setAnimationLoading={setAnimationLoading}
            isAnimationLoading={isAnimationLoading}
            activeRestaurant={currentItem}
          />
        </>
      )}
    </article>
  );
};

export default EatOutHeroSlider;

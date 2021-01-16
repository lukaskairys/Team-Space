import React from "react";

import Loader from "react-loader-spinner";
import classNames from "classnames";

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
          <Loader type="TailSpin" color="#6e44ff" height={80} width={80} />
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

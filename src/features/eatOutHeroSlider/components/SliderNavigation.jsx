import React from "react";
import PropTypes from "prop-types";

import PaginationButtons from "components/PaginationButtons/PaginationButtons";

import sliderTransitionHandler from "./utils/sliderTransitionHandler";
import "./sliderNavigation.scss";

const SliderNavigation = ({
  counter,
  currentIndex,
  setCurrentIndex,
  setAnimationLoading,
  isAnimationLoading,
}) => {
  const {
    slideLeft,
    slideRight,
    transitionRestaurant,
  } = sliderTransitionHandler(
    currentIndex,
    counter,
    setAnimationLoading,
    isAnimationLoading,
    setCurrentIndex
  );

  const captureEvent = (i) => {
    if (i !== currentIndex) transitionRestaurant(i);
  };

  const formEllipsis = (counter) => {
    const indents = [];

    for (let i = 0; i < counter; i++) {
      const className =
        i === currentIndex
          ? "slider-navigation__circle is_active"
          : "slider-navigation__circle";
      indents.push(
        <li key={i}>
          <button
            onClick={() => captureEvent(i)}
            className={className}
            aria-label={
              i === currentIndex
                ? `Current page: ${i + 1}`
                : `Slide to page ${i + 1}`
            }
          ></button>
        </li>
      );
    }
    return indents;
  };

  return (
    <div className="slider-navigation">
      <ul className="slider-navigation__list">{formEllipsis(counter)}</ul>
      <PaginationButtons slideLeft={slideLeft} slideRight={slideRight} />
    </div>
  );
};

SliderNavigation.propTypes = {
  setCurrentIndex: PropTypes.func,
  setAnimationLoading: PropTypes.func,
  counter: PropTypes.number,
  currentIndex: PropTypes.number,
  isAnimationLoading: PropTypes.bool,
};
export default SliderNavigation;

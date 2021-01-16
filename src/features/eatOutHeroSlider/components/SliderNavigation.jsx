import React from "react";
import PropTypes from "prop-types";

import Pagination from "components/Pagination/Pagination";

import sliderTransitionHandler from "./utils/sliderTransitionHandler";
import "./sliderNavigation.scss";

const SliderNavigation = ({
  counter,
  currentIndex,
  setCurrentIndex,
  setAnimationLoading,
  isAnimationLoading,
}) => {
  const { transitionRestaurant } = sliderTransitionHandler(
    setAnimationLoading,
    isAnimationLoading,
    setCurrentIndex
  );

  const createLabelText = (bulletIndex) => {
    if (bulletIndex === currentIndex) return `Current page: ${bulletIndex + 1}`;
    return `Slide to page ${bulletIndex + 1}`;
  };

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
            aria-label={createLabelText(i)}
          ></button>
        </li>
      );
    }
    return indents;
  };

  return (
    <div className="slider-navigation">
      <nav role="navigation" aria-label="Slider page bullet">
        <ul className="slider-navigation__list">{formEllipsis(counter)}</ul>{" "}
      </nav>
      <Pagination
        currentPage={currentIndex}
        totalPages={counter}
        paginate={transitionRestaurant}
      />
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

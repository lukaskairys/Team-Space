import React from "react";
import PropTypes from "prop-types";

import NavigationButtons from "./NavigationButtons";
import { ReactComponent as CircleIcon } from "assets/icons/circle.svg";
import "./sliderNavigation.scss";
import { ToggleAnimation } from "./ToggleAnimation";

const SliderNavigation = ({
  counter,
  currentIndex,
  setCurrentIndex,
  setAnimationLoading,
  isAnimationLoading,
}) => {
  const captureEvent = (e, i) => {
    if (i !== currentIndex) transitionRestaurant(i);
  };

  const transitionRestaurant = (i) => {
    if (!isAnimationLoading) {
      ToggleAnimation();
      setAnimationLoading(true);

      setTimeout(function () {
        setCurrentIndex(i);
        const listBullets = document.getElementsByClassName(
          "slider-navigation__circle"
        );

        for (const el of listBullets) el.classList.remove("is_active");

        listBullets[i].classList.add("is_active");
      }, 250);
    }
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
          <CircleIcon
            className={className}
            onClick={(e) => captureEvent(e, i)}
          />
        </li>
      );
    }
    return indents;
  };

  const slideLeft = () => {
    let newIndex = currentIndex;
    if (currentIndex === 0) newIndex = counter - 1;
    else newIndex = currentIndex - 1;
    transitionRestaurant(newIndex);
  };

  const slideRight = () => {
    let newIndex = currentIndex;
    if (currentIndex === counter - 1) newIndex = 0;
    else newIndex = currentIndex + 1;
    transitionRestaurant(newIndex);
  };

  return (
    <div className="slider-navigation">
      <ul className="slider-navigation__list">{formEllipsis(counter)}</ul>
      <NavigationButtons slideLeft={slideLeft} slideRight={slideRight} />
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

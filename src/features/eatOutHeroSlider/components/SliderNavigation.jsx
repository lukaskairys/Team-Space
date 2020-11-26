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
  setLoading,
  isLoading,
}) => {
  const captureEvent = (e, i) => {
    transitionRestaurant(i);
  };

  const transitionRestaurant = (i) => {
    if (!isLoading) {
      ToggleAnimation();
      setLoading(true);

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
        <CircleIcon
          key={i}
          className={className}
          onClick={(e) => captureEvent(e, i)}
        />
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
  setLoading: PropTypes.func,
  counter: PropTypes.number,
  currentIndex: PropTypes.number,
  isLoading: PropTypes.bool,
};
export default SliderNavigation;

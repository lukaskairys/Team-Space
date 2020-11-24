import React from "react";
import PropTypes from "prop-types";

import NavigationButtons from "./NavigationButtons";
import { ReactComponent as CircleIcon } from "assets/icons/circle.svg";
import "./sliderNavigation.scss";

const SliderNavigation = ({
  counter,
  currentIndex,
  setCurrentIndex,
  setFading,
}) => {
  const captureEvent = (e, i) => {
    transitionRestaurant(i);
  };

  const toggleAnimation = () => {
    const heroSlider = document.getElementsByClassName("eat-out-slider")[0];

    if (heroSlider.classList.contains("animate-out")) {
      heroSlider.classList.remove("animate-out");
      heroSlider.classList.add("animate-in");
    } else {
      heroSlider.classList.remove("animate-in");
      heroSlider.classList.add("animate-out");
    }
  };

  const transitionRestaurant = (i) => {
    toggleAnimation();
    setFading(true);

    setTimeout(function () {
      toggleAnimation();
      setFading(false);

      const listBullets = document.getElementsByClassName(
        "slider-navigation__circle"
      );

      for (const el of listBullets) el.classList.remove("is_active");

      setCurrentIndex(i);
      listBullets[i].classList.add("is_active");
    }, 260);
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
          style={{ pointerEvents: "bounding-box" }}
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
  setFading: PropTypes.func,
  counter: PropTypes.number,
  currentIndex: PropTypes.number,
};
export default SliderNavigation;

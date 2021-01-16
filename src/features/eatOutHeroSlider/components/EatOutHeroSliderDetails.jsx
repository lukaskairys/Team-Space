import React from "react";
import PropTypes from "prop-types";

import SliderNavigation from "./SliderNavigation";
import { Link } from "react-router-dom";

import "./eatOutHeroSliderDetails.scss";

const EatOutHeroSliderDetails = ({
  count,
  currentIndex,
  setCurrentIndex,
  setAnimationLoading,
  isAnimationLoading,
  activeRestaurant,
}) => {
  const { slogan, name, description, id } = activeRestaurant;
  const path = "/eat-out/";
  return (
    <section className="eat-out-slider__details">
      <section className="eat-out-slider__main">
        <SliderNavigation
          counter={count}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setAnimationLoading={setAnimationLoading}
          isAnimationLoading={isAnimationLoading}
        />
        <p className="eat-out-slider__caption">
          <span aria-label={"Slogan:"} className="visually-hidden"></span>
          {slogan}
        </p>
        <h2 className="eat-out-slider__title">
          <span className="visually-hidden">Restaurant name:</span>
          {name}
        </h2>

        <p className="eat-out-slider__content">
          <span aria-label={"Description:"} className="visually-hidden"></span>
          {description}
        </p>
      </section>
      <Link
        to={path + id}
        className={"button button--medium eat-out-slider__learn-more"}
      >
        <span>Learn More</span>
      </Link>
    </section>
  );
};

EatOutHeroSliderDetails.propTypes = {
  count: PropTypes.number,
  currentIndex: PropTypes.number,
  setCurrentIndex: PropTypes.func,
  setAnimationLoading: PropTypes.func,
  isAnimationLoading: PropTypes.bool,
  activeRestaurant: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    slogan: PropTypes.string,
    openingHours: PropTypes.array,
    address: PropTypes.string,
    website: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default EatOutHeroSliderDetails;

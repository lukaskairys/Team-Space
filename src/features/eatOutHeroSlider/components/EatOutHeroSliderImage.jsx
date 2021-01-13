import React from "react";
import PropTypes from "prop-types";

import "./eatOutHeroSliderImage.scss";

const EatOutHeroSliderImage = ({ imageLocation, handleImageLoaded }) => {
  return (
    <figure className="eat-out-slider__image-container">
      <img
        className="eat-out-slider__image"
        src={imageLocation}
        onLoad={handleImageLoaded}
        alt=""
      />
    </figure>
  );
};

EatOutHeroSliderImage.propTypes = {
  imageLocation: PropTypes.string,
  handleImageLoaded: PropTypes.func,
};

export default EatOutHeroSliderImage;

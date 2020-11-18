import React from "react";

import "./rating.scss";
import { ReactComponent as StarIcon } from "assets/icons/star.svg";

//TODO --add rating functionality (expand and so on)
const Rating = (average) => {
  return (
    <div className="rating-container">
      <div className="rating-container__items">
        <StarIcon className="rating-container__icon" />
        <span className="rating-container__average">{average}</span>
      </div>
    </div>
  );
};
export default Rating;

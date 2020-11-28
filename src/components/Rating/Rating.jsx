import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import "./rating.scss";
import { ReactComponent as StarIcon } from "assets/icons/star.svg";

//TODO --add rating functionality (expand and so on)
// if received prop isStatic - functionality not needed

const Rating = ({ average, isStatic }) => {
  return (
    <div
      className={classNames("rating-container", {
        "rating-container--is-static": isStatic,
      })}
    >
      <div className="rating-container__items">
        <StarIcon className="rating-container__icon" />
        <span className="rating-container__average">{average}</span>
      </div>
    </div>
  );
};

Rating.propTypes = {
  isStatic: PropTypes.bool,
  average: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
export default Rating;

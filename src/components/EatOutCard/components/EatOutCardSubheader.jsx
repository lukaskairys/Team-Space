import React from "react";
import PropTypes from "prop-types";

import { ReactComponent as HeartIcon } from "assets/icons/heart.svg";
import { createWorkingSchedule, isOpen } from "./RestaurantWorkingSchedule";
import "./eatOutCardSubheader.scss";

function EatOutCardSubheader({ restaurantName, openingHours }) {
  const formTitle = (title) => {
    if (title.length > 26) {
      return title.substring(0, 26) + "...";
    } else {
      return title;
    }
  };

  const formTime = (workingSchedule) => {
    const schedule = createWorkingSchedule(workingSchedule);
    return <time className="card-subheader__time">{isOpen(schedule)}</time>;
  };

  const toggleFavorite = (event) => {
    const classes = event.target.classList;
    classes.toggle("card-subheader__favorite--active");
  };

  return (
    <div className="card-subheader">
      <div className="card-subheader__section">
        <h3 className="card-subheader__title">{formTitle(restaurantName)}</h3>
        <HeartIcon
          onClick={toggleFavorite}
          className="card-subheader__favorite"
        />
      </div>
      {formTime(openingHours)}
    </div>
  );
}

EatOutCardSubheader.propTypes = {
  restaurantName: PropTypes.string,
  openingHours: PropTypes.array,
};

export default EatOutCardSubheader;

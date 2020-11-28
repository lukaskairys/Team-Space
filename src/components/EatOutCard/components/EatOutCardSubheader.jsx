import React from "react";
import PropTypes from "prop-types";

import HeartIcon from "../../HeartIcon/HeartIcon";
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

  return (
    <div className="card-subheader">
      <div className="card-subheader__section">
        <h3 className="card-subheader__title">{formTitle(restaurantName)}</h3>
        <HeartIcon />
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

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import HeartIcon from "components/HeartIcon/HeartIcon";

import { FavoriteTypes } from "utils/FavoriteTypes";
import {
  createWorkingSchedule,
  formatOpeningDate,
} from "../utils/RestaurantWorkingSchedule";

import "./eatOutCardSubheader.scss";

function EatOutCardSubheader({ id, restaurantName, openingHours }) {
  const formTime = (workingSchedule) => {
    const schedule = createWorkingSchedule(workingSchedule);
    return (
      <time className="card-subheader__time">
        <span className="visually-hidden">Working schedule:</span>
        {formatOpeningDate(schedule)}
      </time>
    );
  };

  return (
    <div className="card-subheader">
      <div className="card-subheader__section">
        <Link to={`/eat-out/${id}`}>
          <h3 className="card-subheader__title">{restaurantName}</h3>
        </Link>
        <HeartIcon
          itemType={FavoriteTypes.RESTAURANT}
          title={restaurantName}
          itemId={id}
        />
      </div>
      {formTime(openingHours)}
    </div>
  );
}

EatOutCardSubheader.propTypes = {
  restaurantName: PropTypes.string,
  openingHours: PropTypes.array,
  id: PropTypes.string,
};

export default EatOutCardSubheader;

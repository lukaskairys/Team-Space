import React from "react";
import PropTypes from "prop-types";
import { FavoriteTypes } from "../../../utils/FavoriteTypes";
import { Link } from "react-router-dom";

import HeartIcon from "../../HeartIcon/HeartIcon";
import {
  createWorkingSchedule,
  formatOpeningDate,
} from "./RestaurantWorkingSchedule";
import "./eatOutCardSubheader.scss";

function EatOutCardSubheader({ id, restaurantName, openingHours }) {
  const formTime = (workingSchedule) => {
    const schedule = createWorkingSchedule(workingSchedule);
    return (
      <time className="card-subheader__time">
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
        <HeartIcon itemType={FavoriteTypes.RESTAURANT} itemId={id} />
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

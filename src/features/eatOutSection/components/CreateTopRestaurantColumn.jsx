import React from "react";

import RatingComponent from "../../../components/Rating/Rating";
import PersonComponent from "./PersonCounter";
import { createWorkingSchedule, isOpen } from "./RestaurantWorkingSchedule";
import { ReactComponent as HeartIcon } from "assets/icons/heart.svg";

const CreateTopRestaurantColumn = (restaurant) => {
  return (
    <div key={restaurant.id} className="eat-out-card__column">
      <div className="eat-out-card__header">
        <img
          src={restaurant.image}
          className="eat-out-card__image"
          alt="restaurant food"
        />
        <div className="eat-out-card__icons">
          {PersonComponent(restaurant.checkIns)}
          <RatingComponent average={restaurant.ratingAverage} />
        </div>
        {formCategories(restaurant.categories)}
      </div>
      <div className="eat-out-card__subsection">
        <h3 className="eat-out-card__title">{formTitle(restaurant.name)}</h3>
        <HeartIcon
          onClick={toggleFavorite}
          className="eat-out-card__favorite"
        />
      </div>
      {formTime(restaurant.openingHours)}
    </div>
  );
};

const toggleFavorite = (event) => {
  const classes = event.target.classList;
  classes.toggle("eat-out-card__favorite--active");
};

const formTitle = (title) => {
  if (title.length > 26) {
    return title.substring(0, 26) + "...";
  } else {
    return title;
  }
};

const formTime = (workingSchedule) => {
  const schedule = createWorkingSchedule(workingSchedule);
  return <time className="eat-out-card__time">{isOpen(schedule)}</time>;
};

const formCategories = (categories) => {
  return (
    <ul className="eat-out-card__categories">
      {categories.map((category) => {
        return (
          <li key={category.toString()} className="eat-out-card__item">
            <span className="eat-out-card__category">{category}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default CreateTopRestaurantColumn;

import React from "react";

import RatingComponent from "../../../components/Rating/Rating";
import PersonComponent from "./PersonCounter";
import { createWorkingSchedule, isOpen } from "./RestaurantWorkingSchedule";

const CreateTopRestaurantColumn = (restaurant) => {
  return (
    <div key={restaurant.id} className="eat-out-card__column">
      <div className="eat-out-card__header">
        <img src={restaurant.image} className="eat-out-card__image" alt="" />
        <div className="eat-out-card__icons">
          {PersonComponent(restaurant.checkIns)}
          {RatingComponent(restaurant.ratingAverage)}
        </div>
        {formCategories(restaurant.categories)}
      </div>
      <div className="eat-out-card__subsection">
        <h3 className="eat-out-card__title">{formTitle(restaurant.name)}</h3>
        <svg className="eat-out-card__favorite-container" viewBox="0 0 24 22">
          <path
            onClick={favoriteClickHandler}
            className="eat-out-card__favorite--active eat-out-card__favorite"
            d="M20.84 3.60999C20.3292 3.099 19.7228 2.69364 19.0554 2.41708C18.3879 2.14052 17.6725 1.99817 16.95 1.99817C16.2275 1.99817 15.5121 2.14052 14.8446 2.41708C14.1772 2.69364 13.5708 3.099 13.06 3.60999L12 4.66999L10.94 3.60999C9.9083 2.5783 8.50903 1.9987 7.05 1.9987C5.59096 1.9987 4.19169 2.5783 3.16 3.60999C2.1283 4.64169 1.54871 6.04096 1.54871 7.49999C1.54871 8.95903 2.1283 10.3583 3.16 11.39L4.22 12.45L12 20.23L19.78 12.45L20.84 11.39C21.351 10.8792 21.7563 10.2728 22.0329 9.60535C22.3095 8.93789 22.4518 8.22248 22.4518 7.49999C22.4518 6.77751 22.3095 6.0621 22.0329 5.39464C21.7563 4.72718 21.351 4.12075 20.84 3.60999Z"
          />
        </svg>
      </div>
      {formTime(restaurant.openingHours)}
    </div>
  );
};
const favoriteClickHandler = (event) => {
  const classes = event.target.classList;
  if (classes.contains("eat-out-card__favorite--active")) {
    classes.remove("eat-out-card__favorite--active");
  } else {
    classes.add("eat-out-card__favorite--active");
  }
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

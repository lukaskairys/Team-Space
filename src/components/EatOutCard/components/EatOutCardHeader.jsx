import React from "react";
import PropTypes from "prop-types";

import RatingComponent from "components/Rating/Rating";
import PersonComponent from "./PersonCounter";
import "./eatOutCardHeader.scss";

function EatOutCardHeader({ restaurant, handleImageLoad, checkinHandler }) {
  const formCategories = (categories) => {
    return (
      <ul className="card-header__categories" aria-label="Main menu dishes">
        {categories.map((category) => {
          return (
            <li key={category.toString()} className="card-header__item">
              <span className="card-header__category">{category}</span>
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <div className="card-header">
      <img
        src={restaurant.image}
        className="card-header__image"
        alt=""
        onLoad={handleImageLoad}
      />
      <div className="card-header__icons">
        <PersonComponent
          checkinHandler={checkinHandler}
          name={restaurant.name}
        />
        <RatingComponent restaurant={restaurant} />
      </div>
      {formCategories(restaurant.categories)}
    </div>
  );
}

EatOutCardHeader.propTypes = {
  children: PropTypes.element,
  restaurant: PropTypes.shape({
    image: PropTypes.string,
    categories: PropTypes.array,
    ratingAverage: PropTypes.string,
    reviews: PropTypes.array,
    name: PropTypes.string,
  }),
  handleImageLoad: PropTypes.func,
  checkinHandler: PropTypes.shape({
    toggleCheckIn: PropTypes.func,
    checkIns: PropTypes.number,
    active: PropTypes.bool,
  }),
};

export default EatOutCardHeader;

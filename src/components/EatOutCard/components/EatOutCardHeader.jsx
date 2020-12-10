import React from "react";
import PropTypes from "prop-types";

import RatingComponent from "../../../components/Rating/Rating";
import "./eatOutCardHeader.scss";

function EatOutCardHeader({ restaurant, children, handleImageLoad }) {
  const formCategories = (categories) => {
    return (
      <ul className="card-header__categories">
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
        alt="restaurant food"
        onLoad={handleImageLoad}
      />
      <div className="card-header__icons">
        {children ? children : <span> </span>}
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
  }),
  handleImageLoad: PropTypes.func,
};

export default EatOutCardHeader;

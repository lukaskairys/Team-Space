import React, { useContext, forwardRef } from "react";
import PropTypes from "prop-types";

import { context } from "contexts/Context";
import ReservationsCard from "components/ReservationCard/ReservationCard";

import "./eatOutCategoriesSection.scss";
import filteredRestaurants from "./filteredRestaurants";

const EatOutCategoriesSection = forwardRef((props, scrollRef) => {
  const { data } = useContext(context);
  const { categories, restaurantList } = data;

  if (categories && restaurantList) {
    const renderCategories = () => {
      return categories.map((category, index) => {
        const icon = require(`assets/images/${category.toLowerCase()}.svg`);
        const count = filteredRestaurants(restaurantList, category).length;

        return (
          <React.Fragment key={index}>
            <ReservationsCard
              name={category}
              caption={"Places"}
              path={`/eat-out/categories/${category.toLowerCase()}`}
              count={count}
              small
            >
              <img
                src={icon}
                alt={category}
                className="categories-section__image"
              />
            </ReservationsCard>
          </React.Fragment>
        );
      });
    };

    return (
      <section className="categories-section" ref={scrollRef}>
        <h3 className="categories-section__title">Categories</h3>
        <div className="categories-section__content">{renderCategories()}</div>
      </section>
    );
  }
  return null;
});

EatOutCategoriesSection.displayName = "EatOutCategoriesSection";
EatOutCategoriesSection.propTypes = {
  setMounted: PropTypes.func,
};

export default EatOutCategoriesSection;

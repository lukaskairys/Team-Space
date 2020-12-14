import React, { useContext, forwardRef } from "react";

import { context } from "contexts/Context";

import ReservationsCard from "components/ReservationCard/ReservationCard";
import { useRequest } from "apis/useRequest";

import "./eatOutCategoriesSection.scss";
import filteredRestaurants from "./filteredRestaurants";

const EatOutCategoriesSection = forwardRef((props, scrollRef) => {
  const { data } = useContext(context);
  const { data: categories } = useRequest("/categories");

  if (categories && data) {
    const renderCategories = () => {
      return categories.map((category, index) => {
        const icon = require(`assets/images/${category.toLowerCase()}.svg`);
        const count = filteredRestaurants(data, category).length;

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

export default EatOutCategoriesSection;

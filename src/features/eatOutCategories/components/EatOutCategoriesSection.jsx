import React, { useContext, forwardRef } from "react";

import { Context } from "contexts/Context";

import ReservationsCardLink from "components/ReservationCardLink/ReservationCardLink";
import { useRequest } from "apis/useRequest";

import "./eatOutCategoriesSection.scss";
import filteredRestaurants from "./filteredRestaurants";
import ThreeDotsLoader from "loaders/ThreeDotsLoader";

const EatOutCategoriesSection = forwardRef((props, scrollRef) => {
  const { data } = useContext(Context);
  const { data: categories } = useRequest("/categories");

  if (categories && data) {
    const renderCategories = () => {
      return categories.map((category, index) => {
        const icon = require(`assets/images/${category.toLowerCase()}.svg`);
        const count = filteredRestaurants(data, category).length;

        return (
          <React.Fragment key={index}>
            <ReservationsCardLink
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
            </ReservationsCardLink>
          </React.Fragment>
        );
      });
    };

    return (
      <section className="categories-section" ref={scrollRef}>
        <h3 className="categories-section__title">Categories</h3>
        {categories.length > 0 ? (
          <div className="categories-section__content">
            {renderCategories()}
          </div>
        ) : (
          <div className="categories-section__loader">
            <ThreeDotsLoader />
          </div>
        )}
      </section>
    );
  }
  return null;
});

EatOutCategoriesSection.displayName = "EatOutCategoriesSection";

export default EatOutCategoriesSection;

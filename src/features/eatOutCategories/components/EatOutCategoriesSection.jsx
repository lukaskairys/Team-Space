import React, { useContext } from "react";

import "./eatOutCategoriesSection.scss";
import { context } from "../../../contexts/Context";
import ReservationsCard from "components/ReservationCard/ReservationCard";
import filteredRestaurants from "./filteredRestaurants";

function EatOutCategoriesSection() {
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
              path={`/eat-out/${category}`}
              count={count}
              small
            >
              <img src={icon} alt={category} />
            </ReservationsCard>
          </React.Fragment>
        );
      });
    };

    return (
      <section className="categories-section">
        <h3 className="categories-section__title">Categories</h3>
        <div className="categories-section__content">{renderCategories()}</div>
      </section>
    );
  }
  return <div></div>;
}

export default EatOutCategoriesSection;

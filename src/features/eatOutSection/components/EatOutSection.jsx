import React from "react";

import "./eatOutSection.scss";
import { FetchBestRatedRestaurants } from "../../../utils/Api";
import Button from "../../../components/button/Button";
import CreateTopRestaurantColumn from "./CreateTopRestaurantColumn";

const EatOutSection = () => {
  const { restaurants } = FetchBestRatedRestaurants(2);

  return (
    <section className="eat-out-card">
      <div className="eat-out-card__column">
        <div className="eat-out-card__content">
          <h3 className="eat-out-card__suggestion">
            View all your favorite lunch spots and more
          </h3>
          <Button medium={true}>
            <span>Browse List</span>
          </Button>
        </div>
      </div>
      {restaurants.map((restaurant) => {
        return CreateTopRestaurantColumn(restaurant);
      })}
    </section>
  );
};

export default EatOutSection;

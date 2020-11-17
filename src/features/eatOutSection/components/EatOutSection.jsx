import React from "react";

import "./eatOutSection.scss";
import FetchBestRatedRestaurants from "./FetchBestRatedRestaurants";
import Button from "../../../components/button/Button";
import CreateColumn from "./CreateColumn";

const EatOutSection = () => {
  const restaurants = FetchBestRatedRestaurants(40);

  return (
    <section className="eat-out-card">
      <div className="eat-out-card__column">
        <div className="eat-out-card__content">
          <h3 className="eat-out-card__suggestion">
            View all your favorite lunch spots and more
          </h3>
          <Button medium={"true"}>
            <span>Browse List</span>
          </Button>
        </div>
      </div>
      {restaurants.map((restaurant) => {
        return CreateColumn(restaurant);
      })}
    </section>
  );
};

export default EatOutSection;

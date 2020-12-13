import React from "react";
import { Link } from "react-router-dom";

import "./eatOutSection.scss";
import { FetchBestRatedRestaurants } from "../../../utils/Api";
import Button from "../../../components/button/Button";
import CreateTopRestaurantColumn from "./CreateTopRestaurantColumn";

const EatOutSection = () => {
  const count = 2;
  const { restaurants } = FetchBestRatedRestaurants(count);

  const renderRestaurants = (restaurants) => {
    return restaurants.map((restaurant) =>
      CreateTopRestaurantColumn(restaurant)
    );
  };

  return (
    <section className="eat-out-section">
      <div className="eat-out-section__column">
        <div className="eat-out-section__content">
          <h3 className="eat-out-section__suggestion">
            View all your favorite lunch spots and more
          </h3>
          <Link to={"/eat-out"}>
            <Button medium={true}>
              <span>Browse List</span>
            </Button>
          </Link>
        </div>
      </div>
      {renderRestaurants(restaurants)}
    </section>
  );
};

export default EatOutSection;

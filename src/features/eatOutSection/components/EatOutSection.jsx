import React from "react";
import { Link } from "react-router-dom";

import "./eatOutSection.scss";
import { FetchBestRatedRestaurants } from "../../../utils/Api";
import Button from "../../../components/button/Button";
import CreateTopRestaurantColumn from "./CreateTopRestaurantColumn";

const EatOutSection = () => {
  const { restaurants } = FetchBestRatedRestaurants(2);

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
      {restaurants.map((restaurant) => {
        return CreateTopRestaurantColumn(restaurant);
      })}
    </section>
  );
};

export default EatOutSection;

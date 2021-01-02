import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./eatOutSection.scss";
import { FetchBestRatedRestaurants } from "../../../utils/Api";
import Button from "../../../components/button/Button";
import CreateTopRestaurantColumn from "./CreateTopRestaurantColumn";

const EatOutSection = ({ withoutRestaurants }) => {
  const count = 2;
  const { restaurants } = FetchBestRatedRestaurants(count);

  //Generated this mockdata method  so i receive constant count of restaurants and dont get an following error - "Error: Rendered more hooks than during the previous render."
  //(I map restaurants which then calls hooks used for check in.). There might be a better solution
  const mockData = () => {
    const data = [];
    for (let i = 0; i < count; i++) {
      const restaurant = {
        name: "",
        id: i.toString(),
        slogan: "",
        createdDate: "",
        description: "",
        openingHours: [],
        website: "",
        address: "",
        phone: "",
        image: "",
        checkIns: [],
        reviews: [],
        categories: [],
        coordinates: {},
      };
      data.push(restaurant);
    }
    return data;
  };

  const renderRestaurants = (restaurants) => {
    if (restaurants.length !== count) {
      restaurants = mockData();
    }
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
      {!withoutRestaurants && renderRestaurants(restaurants)}
    </section>
  );
};

EatOutSection.propTypes = {
  withoutRestaurants: PropTypes.bool,
};

export default EatOutSection;

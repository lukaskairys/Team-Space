import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./eatOutSection.scss";
import { FetchBestRatedRestaurants } from "../../../utils/Api";
import SmallCard from "./SmallCard";

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
    return restaurants.map((restaurant) => (
      <SmallCard key={restaurant.id} restaurant={restaurant} />
    ));
  };

  return (
    <ul className="eat-out-section">
      <li className="eat-out-section__column">
        <section className="eat-out-section__content">
          <h3 className="eat-out-section__suggestion">
            View all your favorite lunch spots and more
          </h3>
          <Link to={"/eat-out"} className={"button button--medium"}>
            <span>Browse List</span>
          </Link>
        </section>
      </li>
      {!withoutRestaurants && renderRestaurants(restaurants)}
    </ul>
  );
};

EatOutSection.propTypes = {
  withoutRestaurants: PropTypes.bool,
};

export default EatOutSection;

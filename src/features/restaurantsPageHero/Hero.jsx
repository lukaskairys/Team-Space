import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import "./hero.scss";
import { useRequest } from "../../apis/useRequest";
import Category from "./Category";

function Hero({ children }) {
  const { id } = useParams();
  const { data, error } = useRequest("/restaurants");

  if (data.restaurantList) {
    const restaurant = data.restaurantList.filter((restaurant) => {
      return restaurant.id === id;
    });
    return (
      <div
        className="HERO"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.3) 100%), url(${restaurant[0].image})`,
        }}
      >
        <>{children}</>
        <div className="HERO__content">
          <div className="HERO__categories">
            <Category category={restaurant[0].categories[0]} />
            <Category category={restaurant[0].categories[1]} />
            <Category category={restaurant[0].categories[2]} />
          </div>
          <h1 className="HERO__title">{restaurant[0].name}</h1>
          <div>content</div>
        </div>
      </div>
    );
  } else if (error) {
    return <div>Error</div>;
  }
  return <div>Loading</div>;
}

Hero.propTypes = {
  children: PropTypes.object,
};

export default Hero;

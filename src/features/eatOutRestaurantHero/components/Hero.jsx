import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import "./hero.scss";
import { Context } from "../../../contexts/Context";
import Category from "./Category";
import HeroDetails from "./HeroDetails";

function Hero({ children }) {
  const { id } = useParams();
  const { data } = useContext(Context);

  if (data.restaurantList) {
    const restaurant = data.restaurantList
      .filter((restaurant) => {
        return restaurant.id === id;
      })
      .shift();

    const renderCategories = () => {
      return restaurant.categories.map((category, index) => {
        return <Category key={index} category={category} />;
      });
    };

    if (restaurant) {
      return (
        <section
          className="HERO"
          style={{
            backgroundImage: `linear-gradient(98.06deg, #F6F7F8 18.8%, rgba(255, 255, 255, 0) 103.31%), url(${restaurant.image})`,
          }}
        >
          {children}
          <div className="HERO__content">
            <div className="HERO__categories">{renderCategories()}</div>
            <h1 className="HERO__title">{restaurant.name}</h1>
            <HeroDetails restaurant={restaurant} />
          </div>
        </section>
      );
    } else return null;
  }
  return (
    <div className="HERO__loader">
      <Loader type="TailSpin" color="#6e44ff" height={70} width={70} />
    </div>
  );
}

Hero.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Hero;

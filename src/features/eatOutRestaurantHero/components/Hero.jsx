import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import "./hero.scss";
import { Context } from "contexts/Context";
import Category from "./Category";
import HeroDetails from "./HeroDetails";
import ThreeDotsLoader from "loaders/ThreeDotsLoader";

function Hero({ children }) {
  const { id } = useParams();
  const { data } = useContext(Context);

  if (data.length > 0) {
    const restaurant = data
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
          <Helmet>
            <title>{restaurant.name} · Team Space</title>
          </Helmet>
          {children}
          <div className="HERO__content">
            <nav className="HERO__categories">{renderCategories()}</nav>
            <h1 id="main-content" className="HERO__title">
              {restaurant.name}
            </h1>
            <HeroDetails restaurant={restaurant} />
          </div>
        </section>
      );
    } else return null;
  } else {
    return (
      <div className="HERO__loader">
        <ThreeDotsLoader />
      </div>
    );
  }
}

Hero.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Hero;

import React, { useState, useEffect } from "react";
import FetchBestRatedRestaurants from "../../eatOutSection/components/FetchBestRatedRestaurants";
import { isObjectEmpty } from "../../../utils/objects";
import "./eatOutHeroSlider.scss";
// import Carousel from "./Carousel";
import Button from "../../../components/button/Button";
import SliderNavigation from "./SliderNavigation";

const EatOutHeroSlider = () => {
  const restaurants = FetchBestRatedRestaurants(5);
  const [currentIndex, setCurrentIndex] = useState(2);
  const [currentItem, setCurrentItem] = useState({});
  const [isFading, setFading] = useState(false);

  useEffect(() => {
    if (!isFading) {
      const currentSingle =
        restaurants.length > 0 ? restaurants[currentIndex] : {};
      setCurrentItem(currentSingle);
    }
  }, [restaurants, currentIndex, isFading]);

  if (!isObjectEmpty(currentItem))
    return (
      <div className="eat-out-slider">
        <div className="eat-out-slider__container">
          <img
            className="eat-out-slider__image"
            src={currentItem.image}
            alt={currentItem.description}
          />
        </div>
        {/* <Carousel></Carousel> */}
        <div className="eat-out-slider__details">
          <div className="eat-out-slider__main">
            <SliderNavigation
              counter={5}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              setFading={setFading}
            />
            <p className="eat-out-slider__caption">
              Feel the taste of my pi pi pizza
            </p>
            <h2 className="eat-out-slider__title">{currentItem.name}</h2>
            <p className="eat-out-slider__content">{currentItem.description}</p>
          </div>
          <Button className="eat-out-slider__learn-more" medium={true}>
            <span>Learn More</span>
          </Button>
          {/* <button >Learn More</button> */}
        </div>
      </div>
    );
  else {
    return <div></div>;
  }
};

export default EatOutHeroSlider;

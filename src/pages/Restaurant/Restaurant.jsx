import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import EatOutInfo from "features/EatOut/components/EatOutInfo/EatOutInfo";
import ReviewsSection from "features/reviewsSection/ReviewsSection";
import RestaurantCardsSection from "components/RestaurantsCardsSection/RestaurantCardsSection";

import "./Restaurant.scss";
import Hero from "features/eatOutRestaurantHero/components/Hero";

const Restaurant = () => {
  return (
    <div className="restaurant">
      <MainLayout>
        <>
          <Hero>
            <Breadcrumbs />
          </Hero>
          <div className="restaurant__middle">
            <EatOutInfo />
            <ReviewsSection />
          </div>
          <RestaurantCardsSection title="Also you could like" mode="similar" />
        </>
      </MainLayout>
    </div>
  );
};

export default Restaurant;

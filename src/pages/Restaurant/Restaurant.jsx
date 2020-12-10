import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import EatOutInfo from "features/EatOut/components/EatOutInfo/EatOutInfo";
import ReviewsSection from "features/reviewsSection/ReviewsSection";
import Hero from "features/eatOutRestaurantHero/components/Hero";
import RestaurantContextProvider from "contexts/RestaurantContextProvider";
import RestaurantCardsSection from "components/RestaurantsCardsSection/RestaurantCardsSection";

import "./Restaurant.scss";

const Restaurant = () => {
  return (
    <div className="restaurant">
      <MainLayout>
        <>
          <RestaurantContextProvider>
            <Hero>
              <Breadcrumbs />
            </Hero>
            <div className="restaurant__middle">
              <EatOutInfo />
              <ReviewsSection />
            </div>
            <RestaurantCardsSection
              title="Also you could like"
              mode="similar"
            />
          </RestaurantContextProvider>
        </>
      </MainLayout>
    </div>
  );
};

export default Restaurant;

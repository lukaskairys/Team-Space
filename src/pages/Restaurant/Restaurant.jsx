import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import EatOutInfo from "features/EatOut/components/EatOutInfo/EatOutInfo";
import ReviewsSection from "features/reviewsSection/ReviewsSection";
import Hero from "features/eatOutRestaurantHero/components/Hero";
import ContextProvider from "contexts/ContextProvider";

import "./Restaurant.scss";

const Restaurant = () => {
  return (
    <div className="restaurant">
      <MainLayout>
        <>
          <ContextProvider endpoint="/restaurants">
            <Hero>
              <Breadcrumbs />
            </Hero>
            <div className="restaurant__middle">
              <EatOutInfo />
              <ReviewsSection />
            </div>
          </ContextProvider>
        </>
      </MainLayout>
    </div>
  );
};

export default Restaurant;

import React from "react";

import "./Restaurant.scss";
import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import EatOutInfo from "features/EatOut/components/EatOutInfo/EatOutInfo";
import ReviewsSection from "features/reviewsSection/ReviewsSection";
import Hero from "features/eatOutRestaurantHero/components/Hero";
import ContextProvider from "contexts/ContextProvider";

const Restaurant = () => {
  return (
    <div className="restaurant">
      <ContextProvider endpoint="/restaurants">
        <MainLayout>
          <>
            <Hero>
              <Breadcrumbs />
            </Hero>
            <div className="restaurant__middle">
              <EatOutInfo />
              <ReviewsSection />
            </div>
          </>
        </MainLayout>
      </ContextProvider>
    </div>
  );
};

export default Restaurant;

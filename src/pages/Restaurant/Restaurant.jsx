import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import EatOutInfo from "features/EatOut/components/EatOutInfo/EatOutInfo";
import ReviewsSection from "features/reviewsSection/ReviewsSection";

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
        </>
      </MainLayout>
    </div>
  );
};

export default Restaurant;

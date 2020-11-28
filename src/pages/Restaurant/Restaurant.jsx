import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import EatOutInfo from "features/EatOut/components/EatOutInfo/EatOutInfo";
import ReviewsSection from "features/reviewsSection/ReviewsSection";

import "./Restaurant.scss";

const Restaurant = () => {
  return (
    <div className="restaurant">
      <MainLayout>
        <>
          <Breadcrumbs />
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

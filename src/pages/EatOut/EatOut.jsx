import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import Hero from "features/eatOutRestaurantHero/components/Hero";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import EatOutInfo from "features/EatOut/components/EatOutInfo/EatOutInfo";

import "./EatOut.scss";

const EatOut = () => {
  return (
    <div className="eat-out">
      <MainLayout>
        <>
          <Hero>
            <Breadcrumbs />
          </Hero>
          <EatOutInfo />
        </>
      </MainLayout>
    </div>
  );
};

export default EatOut;

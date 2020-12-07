import React from "react";
import { useLocation } from "react-router-dom";

import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import EatOutHeroWidget from "features/eatOutHeroSlider/components/EatOutHeroWidget";
import EatOutCategoriesSection from "features/eatOutCategories/components/EatOutCategoriesSection";
import RestaurantCardsSection from "components/RestaurantsCardsSection/RestaurantCardsSection";
import ContextProvider from "contexts/ContextProvider";

import "./EatOut.scss";

const EatOut = () => {
  const location = useLocation();

  const scrollToCategories = () => {
    // TODO: make auto-scroll
  };

  if (location.isRedirected) scrollToCategories();

  return (
    <div className="eat-out">
      <MainLayout>
        <>
          <ContextProvider endpoint="/restaurants">
            <Breadcrumbs />
            <EatOutHeroWidget />
            <EatOutCategoriesSection />
            <RestaurantCardsSection title="Near you" mode="near" />
            <RestaurantCardsSection title="New Places" mode="new" />
          </ContextProvider>
        </>
      </MainLayout>
    </div>
  );
};

export default EatOut;

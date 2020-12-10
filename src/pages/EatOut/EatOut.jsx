import React, { useRef } from "react";
import { useLocation } from "react-router-dom";

import { HandleScroll } from "utils/HandleScroll.js";
import RestaurantContextProvider from "contexts/RestaurantContextProvider";
import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import EatOutHeroWidget from "features/eatOutHeroSlider/components/EatOutHeroWidget";
import EatOutCategoriesSection from "features/eatOutCategories/components/EatOutCategoriesSection";
import RestaurantCardsSection from "components/RestaurantsCardsSection/RestaurantCardsSection";

import "./EatOut.scss";

const EatOut = () => {
  const location = useLocation();
  const scrollRef = useRef(null);
  const condition = location.isRedirected;

  HandleScroll(scrollRef, condition, "#categories");

  return (
    <div className="eat-out">
      <MainLayout>
        <RestaurantContextProvider>
          <Breadcrumbs />
          <EatOutHeroWidget />
          <EatOutCategoriesSection ref={scrollRef} />
          <RestaurantCardsSection title="Discover near you" mode="near" />
          <RestaurantCardsSection title="New Places" mode="new" />
        </RestaurantContextProvider>
      </MainLayout>
    </div>
  );
};

export default EatOut;

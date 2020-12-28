import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { HandleScroll } from "utils/HandleScroll.js";
import ContextProvider from "contexts/ContextProvider";
import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import EatOutHeroWidget from "features/eatOutHeroSlider/components/EatOutHeroWidget";
import EatOutCategoriesSection from "features/eatOutCategories/components/EatOutCategoriesSection";
import RestaurantCardsSection from "components/RestaurantsCardsSection/RestaurantCardsSection";
import UserContextProvider from "contexts/UserContextProvider";

import "./EatOut.scss";

const EatOut = () => {
  const location = useLocation();
  const scrollRef = useRef(null);
  const condition = location.isRedirected;

  HandleScroll(scrollRef, condition, "#categories");

  return (
    <div className="eat-out">
      <Helmet>
        <title>Eat Out</title>
      </Helmet>
      <UserContextProvider>
        <MainLayout>
          <ContextProvider endpoint="/restaurants">
            <Breadcrumbs />
            <div className="eat-out__hero">
              <EatOutHeroWidget />
            </div>
            <div className="eat-out__categories">
              <EatOutCategoriesSection ref={scrollRef} />
            </div>

            <RestaurantCardsSection title="Discover near you" mode="near" />
            <RestaurantCardsSection title="New Places" mode="new" />
          </ContextProvider>
        </MainLayout>
      </UserContextProvider>
    </div>
  );
};

export default EatOut;

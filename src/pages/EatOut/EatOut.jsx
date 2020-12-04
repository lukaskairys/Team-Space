import React, { useRef } from "react";
import { useLocation } from "react-router-dom";

import { MakeScroll } from "utils/useScroll.jsx";
import ContextProvider from "contexts/ContextProvider";
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

  MakeScroll(scrollRef, condition);

  return (
    <div className="eat-out">
      <MainLayout>
        <>
          <ContextProvider endpoint="/restaurants">
            <Breadcrumbs />
            <EatOutHeroWidget />
            <div ref={scrollRef}></div>
            <EatOutCategoriesSection />
            <RestaurantCardsSection title="Discover near you" mode="similar" />
            <RestaurantCardsSection title="New places" mode="similar" />
          </ContextProvider>
        </>
      </MainLayout>
    </div>
  );
};

export default EatOut;

import React, { useRef } from "react";
import { Helmet } from "react-helmet-async";

import { HandleScroll } from "utils/HandleScroll.js";
import ContextProvider from "contexts/ContextProvider";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import EatOutHeroWidget from "features/eatOutHeroSlider/components/EatOutHeroWidget";
import EatOutCategoriesSection from "features/eatOutCategories/components/EatOutCategoriesSection";
import RestaurantCardsSection from "components/RestaurantsCardsSection/RestaurantCardsSection";

import "./EatOut.scss";

const EatOut = () => {
  const scrollRef = useRef(null);
  const hash = "#categories";
  HandleScroll(scrollRef, hash);

  return (
    <div className="eat-out">
      <Helmet>
        <title>Eat Out · Team Space</title>
      </Helmet>

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
    </div>
  );
};

export default EatOut;

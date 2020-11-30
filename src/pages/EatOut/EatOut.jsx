import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import EatOutHeroWidget from "features/eatOutHeroSlider/components/EatOutHeroWidget";
import EatOutCategoriesSection from "features/eatOutCategories/components/EatOutCategoriesSection";
import ContextProvider from "contexts/ContextProvider";

import "./EatOut.scss";

const EatOut = () => {
  return (
    <div className="eat-out">
      <MainLayout>
        <>
          <ContextProvider endpoint="/restaurants">
            <Breadcrumbs />
            <EatOutHeroWidget />
            <EatOutCategoriesSection />
          </ContextProvider>
        </>
      </MainLayout>
    </div>
  );
};

export default EatOut;

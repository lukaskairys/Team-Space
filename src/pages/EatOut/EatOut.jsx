import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import EatOutHeroWidget from "features/eatOutHeroSlider/components/EatOutHeroWidget";

import "./EatOut.scss";
import EatOutCategoriesSection from "features/eatOutCategories/components/EatOutCategoriesSection";

const EatOut = () => {
  return (
    <div className="eat-out">
      <MainLayout>
        <>
          <Breadcrumbs />
          <EatOutHeroWidget />
          <EatOutCategoriesSection />
        </>
      </MainLayout>
    </div>
  );
};

export default EatOut;

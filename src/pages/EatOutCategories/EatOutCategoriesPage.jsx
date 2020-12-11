import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import EatOutByCategories from "features/EatOutByCategories/EatOutByCategories";
import RestaurantContextProvider from "contexts/RestaurantContextProvider";

function EatOutCategoriesPage() {
  return (
    <MainLayout>
      <>
        <Breadcrumbs />
        <RestaurantContextProvider>
          <EatOutByCategories />
        </RestaurantContextProvider>
      </>
    </MainLayout>
  );
}

export default EatOutCategoriesPage;

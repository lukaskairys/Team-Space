import React from "react";

import ContextProvider from "contexts/ContextProvider";
import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import EatOutByCategories from "features/EatOutByCategories/EatOutByCategories";

function EatOutCategoriesPage() {
  return (
    <MainLayout>
      <ContextProvider endpoint="/restaurants">
        <Breadcrumbs />
        <EatOutByCategories />
      </ContextProvider>
    </MainLayout>
  );
}

export default EatOutCategoriesPage;

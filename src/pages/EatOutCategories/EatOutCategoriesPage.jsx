import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import EatOutByCategories from "features/EatOutByCategories/EatOutByCategories";
import ContextProvider from "contexts/ContextProvider";

function EatOutCategoriesPage() {
  return (
    <MainLayout>
      <>
        <Breadcrumbs />
        <ContextProvider endpoint="/restaurants">
          <EatOutByCategories />
        </ContextProvider>
      </>
    </MainLayout>
  );
}

export default EatOutCategoriesPage;

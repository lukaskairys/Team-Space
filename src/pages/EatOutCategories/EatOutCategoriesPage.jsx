import React from "react";

import ContextProvider from "contexts/ContextProvider";
import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import EatOutByCategories from "features/EatOutByCategories/EatOutByCategories";
import UserContextProvider from "contexts/UserContextProvider";

function EatOutCategoriesPage() {
  return (
    <UserContextProvider>
      <MainLayout>
        <ContextProvider endpoint="/restaurants">
          <Breadcrumbs />
          <EatOutByCategories />
        </ContextProvider>
      </MainLayout>
    </UserContextProvider>
  );
}

export default EatOutCategoriesPage;

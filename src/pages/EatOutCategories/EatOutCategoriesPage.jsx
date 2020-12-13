import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import EatOutByCategories from "features/EatOutByCategories/EatOutByCategories";

function EatOutCategoriesPage() {
  return (
    <MainLayout>
      <>
        <Breadcrumbs />
        <EatOutByCategories />
      </>
    </MainLayout>
  );
}

export default EatOutCategoriesPage;

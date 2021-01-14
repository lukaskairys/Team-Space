import React from "react";
import { useParams, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import ContextProvider from "contexts/ContextProvider";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import RestaurantsByCategories from "features/RestaurantsByCategories/RestaurantsByCategories";
import { isObjectEmpty } from "utils/objects";
import { useRequest } from "apis/useRequest";

function EatOutCategoriesPage() {
  const { category } = useParams();
  const { data } = useRequest("/categories");
  const catogoryToCheck = category[0].toUpperCase() + category.substring(1);
  if (!isObjectEmpty(data) && !data.includes(catogoryToCheck)) {
    return (
      <Redirect
        to={{
          pathname: "/page-not-found",
        }}
      />
    );
  }

  return (
    <ContextProvider endpoint="/restaurants">
      <Helmet>
        <title>{"Places for " + catogoryToCheck + " · Team Space"}</title>
      </Helmet>
      <Breadcrumbs />
      <RestaurantsByCategories />
    </ContextProvider>
  );
}

export default EatOutCategoriesPage;

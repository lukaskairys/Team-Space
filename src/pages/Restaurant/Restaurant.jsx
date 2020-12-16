import React, { useContext } from "react";
import { useParams, Redirect } from "react-router-dom";

import { Context } from "contexts/Context";
import { isObjectEmpty } from "utils/objects";
import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import EatOutInfo from "features/EatOut/components/EatOutInfo/EatOutInfo";
import ReviewsSection from "features/reviewsSection/ReviewsSection";
import Hero from "features/eatOutRestaurantHero/components/Hero";
import RestaurantCardsSection from "components/RestaurantsCardsSection/RestaurantCardsSection";
import UserContextProvider from "contexts/UserContextProvider";

import "./Restaurant.scss";

const Restaurant = () => {
  const { id } = useParams();
  const { data } = useContext(Context);

  const arrayOfId = [];
  data.map((restaurant) => {
    arrayOfId.push(restaurant.id);
    return arrayOfId;
  });
  if (!isObjectEmpty(data) && !arrayOfId.includes(id)) {
    return (
      <Redirect
        to={{
          pathname: "/page-not-found",
        }}
      />
    );
  }

  return (
    <div className="restaurant">
      <UserContextProvider>
        <MainLayout>
          <>
            <Hero>
              <Breadcrumbs />
            </Hero>
            <div className="restaurant__middle">
              <EatOutInfo />
              <ReviewsSection />
            </div>
            <RestaurantCardsSection
              title="Also you could like"
              mode="similar"
            />
          </>
        </MainLayout>
      </UserContextProvider>
    </div>
  );
};

export default Restaurant;

import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { Context } from "contexts/Context";
import EatOutCard from "components/EatOutCard/EatOutCard";
import "./restaurantsByCategory.scss";
import RestaurantCardsSectionLoader from "loaders/RestaurantCardsSectionLoader";

function RestaurantsByCategories() {
  const { category } = useParams();
  const { data, isLoading } = useContext(Context);

  const getRestaurants = () => {
    if (Object.keys(data).length !== 0) {
      const restaurants = data.filter((restaurant) =>
        restaurant.categories.includes(
          category.charAt(0).toUpperCase() + category.slice(1)
        )
      );
      return restaurants;
    }
  };
  const restaurants = getRestaurants();

  return (
    <article className="categories-page">
      <h1 className="categories-page__title">
        The best places for the{" "}
        <span className="categories-page__title categories-page__title--uppercase">
          {category}!
        </span>
      </h1>

      {isLoading ? (
        <RestaurantCardsSectionLoader />
      ) : (
        <section className="categories-page__section">
          {restaurants !== undefined && restaurants.length === 0 ? (
            <span>This category has no restaurants in our database.</span>
          ) : (
            ""
          )}
          {restaurants &&
            restaurants.map((restaurant) => (
              <EatOutCard restaurant={restaurant} key={restaurant.id} />
            ))}
        </section>
      )}
    </article>
  );
}

export default RestaurantsByCategories;

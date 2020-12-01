import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { context } from "contexts/Context";
import EatOutCard from "components/EatOutCard/EatOutCard";
import "./eatOutByCategory.scss";

function EatOutCategoriesPage() {
  const { category } = useParams();
  const { data, error, isLoading } = useContext(context);

  const getRestaurants = () => {
    if (Object.keys(data).length !== 0) {
      const restaurants = data.restaurantList.filter((restaurant) =>
        restaurant.categories.includes(
          category.charAt(0).toUpperCase() + category.slice(1)
        )
      );
      return restaurants;
    }
  };
  const restaurants = getRestaurants();

  return (
    <main className="categories-page">
      <h1 className="categories-page__title">
        The best places for the{" "}
        <span className="categories-page__title categories-page__title--uppercase">
          {category}!
        </span>
      </h1>
      <section className="categories-page__section">
        {isLoading && <span></span>}
        {error && <span>Sorry, failed to fetch data.</span>}
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
    </main>
  );
}

export default EatOutCategoriesPage;

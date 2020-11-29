const countCategories = (restaurants, category) => {
  let filteredRestaurants = [];

  restaurants.forEach((restaurant) => {
    restaurant.categories.forEach((cat) => {
      if (cat === category) filteredRestaurants.push(restaurant);
    });
  });
  return filteredRestaurants;
};

export default countCategories;

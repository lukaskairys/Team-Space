/**
 * Returns an array of restaurants that include the category.
 * @param {Array} restaurants - an array of restaurants to filter.
 * @param {string} category - the category by which you want to filter.
 */
const filteredRestaurants = (restaurants, category) => {
  let filteredRestaurants = [];

  restaurants.forEach((restaurant) => {
    restaurant.categories.forEach((ctg) => {
      if (ctg === category) filteredRestaurants.push(restaurant);
    });
  });
  return filteredRestaurants;
};

export default filteredRestaurants;

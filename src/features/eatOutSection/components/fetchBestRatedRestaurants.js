import { useEffect, useState, useCallback } from "react";
import { roundNumber } from "../../../utils/Math";

const FetchBestRatedRestaurants = (cnt) => {
  const API_URL = "http://localhost:3008/restaurants";
  const [restaurants, setRestaurants] = useState([]);
  const fetchAPI = () => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          return [];
        }
        return response.json();
      })
      .then((data) => {
        var filteredData = filter(data);
        setRestaurants(filteredData);
      });
  };

  const filter = useCallback(
    (restaurants) => {
      var allCount = restaurants.restaurantList.length;
      var size = cnt > allCount ? allCount : cnt;
      var BestRatedRestaurants = [];
      restaurants = restaurants.restaurantList;
      //map all specific restaurant ratings into one array
      var Ratings = restaurants.map((x) => [...x.reviews].map((x) => x.rating));
      //sum all the rating values for every restaurant and count average, if restaurant doesnt have review, return 0
      var RatingAverages = Ratings.map((x) =>
        x.length > 0 ? x.reduce((a, b, i) => a + b, 0) / x.length : 0
      );
      //finds index of the highest rated restaurant (avg)
      for (var i = 0; i < size; i++) {
        var bestIndex = RatingAverages.reduce(
          (iMax, x, i, arr) => (x > RatingAverages[iMax] ? i : iMax),
          0
        );
        //set average rating for restaurant
        restaurants[bestIndex].ratingAverage = roundNumber(
          RatingAverages[bestIndex]
        );
        //add to the best rated list
        BestRatedRestaurants.push(restaurants[bestIndex]);
        //unset that element in the list
        RatingAverages[bestIndex] = [-1];
      }
      return BestRatedRestaurants;
    },
    [cnt]
  );

  useEffect(fetchAPI, [filter]);
  return restaurants;
};
export default FetchBestRatedRestaurants;

import { useEffect, useState, useCallback } from "react";
import { useRequest } from "../apis/useRequest";
import { roundNumber } from "./Math";
import { isObjectEmpty } from "./objects";

const FetchNearYou = (data) => {
  return [];
};

const FetchNewPlaces = (data) => {
  return [];
};

const FetchSimilar = (data, currentId) => {
  const currentRestaurant = data.find((single) => {
    return single.id === currentId;
  });

  data = data.filter((single) => {
    return (
      single.id !== currentId &&
      single.categories.some(
        (r) => currentRestaurant.categories.indexOf(r) >= 0
      )
    );
  });
  return data;
};

export const filterByMode = (mode, data, currentId = null) => {
  if (mode === "new") return FetchNewPlaces(data);
  else if (mode === "near") return FetchNearYou(data);
  else if (mode === "similar") return FetchSimilar(data, currentId);
  return [];
};

export const FetchBestRatedRestaurants = (count) => {
  const [restaurants, setRestaurants] = useState([]);
  const { data, error } = useRequest("/restaurants");
  const filter = useCallback(
    (restaurants) => {
      if (isObjectEmpty(restaurants)) return [];
      const allCount = restaurants.restaurantList.length;
      const size = count > allCount ? allCount : count;
      const BestRatedRestaurants = [];
      restaurants = restaurants.restaurantList;
      //map all specific restaurant ratings into one array
      const Ratings = restaurants.map((x) =>
        [...x.reviews].map((x) => x.rating)
      );
      //sum all the rating values for every restaurant and count average, if restaurant doesnt have review, return 0
      const RatingAverages = Ratings.map((x) =>
        x.length > 0 ? x.reduce((a, b, i) => a + b, 0) / x.length : 0
      );
      //finds index of the highest rated restaurant (avg)
      for (let i = 0; i < size; i++) {
        const bestIndex = RatingAverages.reduce(
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
    [count]
  );

  useEffect(() => {
    setRestaurants(filter(data));
  }, [filter, data]);

  return { restaurants, error };
};

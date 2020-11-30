import { useEffect, useState, useCallback } from "react";
import { useRequest } from "../apis/useRequest";
import { roundNumber } from "./Math";
import { isObjectEmpty } from "./objects";

export const FetchBestRatedRestaurants = (count) => {
  const [restaurants, setRestaurants] = useState([]);
  const { data } = useRequest("/restaurants");

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

  return restaurants;
};

export const FetchStories = () => {
  const [stories, setStories] = useState([]);
  const { data } = useRequest("/stories");

  const filter = useCallback((data) => {
    if (isObjectEmpty(data)) return [];

    return data;
  }, []);

  useEffect(() => {
    setStories(filter(data));
  }, [filter, data]);

  return stories;
};

export const FetchUserData = () => {
  const [userData, setUserData] = useState([]);
  const { data } = useRequest("/userData");

  const filter = useCallback((data, i) => {
    if (isObjectEmpty(data)) return [];

    return data;
  }, []);

  useEffect(() => {
    setUserData(filter(data));
  }, [filter, data]);

  return userData;
};

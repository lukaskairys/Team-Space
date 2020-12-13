import { useEffect, useState, useCallback } from "react";
import { useRequest } from "../apis/useRequest";
import { roundNumber } from "./Math";
import { isObjectEmpty } from "./objects";

export const FetchBestRatedRestaurants = (count) => {
  //Generated this mockdata method i receive constant count of restaurants and dont get an following error - "Error: Rendered more hooks than during the previous render."
  //(I map restaurants which then calls hooks used for check in.). There might be a better solution
  const mockData = () => {
    const data = [];
    for (let i = 0; i < count; i++) {
      const restaurant = {
        name: "",
        id: i.toString(),
        slogan: "",
        createdDate: "",
        description: "",
        openingHours: [],
        website: "",
        address: "",
        phone: "",
        image: "",
        checkIns: [],
        reviews: [],
        categories: [],
        coordinates: {},
      };
      data.push(restaurant);
    }
    return data;
  };

  const [restaurants, setRestaurants] = useState(mockData());
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
    const filteredData = filter(data);
    if (filteredData.length > 0) setRestaurants(filter(data));
  }, [filter, data]);

  return { restaurants, error };
};

import React, { useContext } from "react";

import { UserContext } from "contexts/UserContext";
import { useRequest } from "apis/useRequest";

import EatOutCard from "components/EatOutCard/EatOutCard";
import EatOutSection from "features/eatOutSection/components/EatOutSection";

import "./reservedRestaurant.scss";

const ReservedRestaurant = () => {
  const { data: user } = useContext(UserContext);
  const { data: restaurants } = useRequest("/restaurants");

  const checkedIn = user?.checkIn?.id;

  const checkedInRestaurant =
    restaurants.length !== 0
      ? restaurants.filter((item) => item.id === checkedIn)[0]
      : [];

  return (
    <article className="reserved-restaurant">
      {checkedInRestaurant && checkedInRestaurant.length !== 0 && (
        <>
          <h3 className="reserved-restaurant__title">Checked in:</h3>
          <EatOutCard restaurant={checkedInRestaurant} />
        </>
      )}

      {!checkedInRestaurant && (
        <div className="reserved-restaurant__empty">
          <p className="empty-reservations-message">
            At the moment you are not checked-in with any restaurant.
          </p>
          <EatOutSection withoutRestaurants={true} />
        </div>
      )}
    </article>
  );
};

export default ReservedRestaurant;

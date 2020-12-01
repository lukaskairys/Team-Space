import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useRequest } from "../../apis/useRequest";
import { isObjectEmpty } from "../../utils/objects";
import EatOutCardHeader from "./components/EatOutCardHeader";
import EatOutCardSubheader from "./components/EatOutCardSubheader";
import EatOutCardContent from "./components/EatOutCardContent";
import EatOutCardFooter from "./components/EatOutCardFooter";

import "./eatOutCard.scss";

function EatOutCard({ id }) {
  const [restaurant, setRestaurant] = useState({});
  const { data, isLoading, error } = useRequest("/restaurants");

  useEffect(() => {
    try {
      const restaurant = data.restaurantList.filter((r) => r.id === id);
      setRestaurant(restaurant[0]);
    } catch (err) {
      if (err) {
        setRestaurant({});
      }
    }
  }, [data.restaurantList, id]);

  return (
    <>
      {isLoading && <span></span>}
      {error && <span>Error</span>}
      {!isObjectEmpty(restaurant) && (
        <div className="eat-out-card">
          <div>
            <EatOutCardHeader restaurant={restaurant} />
            <EatOutCardSubheader
              restaurantName={restaurant.name}
              openingHours={restaurant.openingHours}
            />
            <EatOutCardContent
              address={restaurant.address}
              website={restaurant.website}
              description={restaurant.description}
            />
          </div>

          <EatOutCardFooter restaurantID={id} />
        </div>
      )}
    </>
  );
}

EatOutCard.propTypes = {
  id: PropTypes.string,
};

export default EatOutCard;

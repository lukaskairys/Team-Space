import React from "react";
import { useRequest } from "../../apis/useRequest";
import EatOutCardHeader from "./components/EatOutCardHeader";
import EatOutCardSubheader from "./components/EatOutCardSubheader";

import "./eatOutCard.scss";

function EatOutCard() {
  const { data } = useRequest("/restaurants");

  // TODO - get ID from section?
  const id = "120wsdlpx4";

  if (data.restaurantList) {
    const restaurant = data.restaurantList
      .filter((restaurant) => restaurant.id === id)
      .shift();

    return (
      <div className="eat-out-card">
        <EatOutCardHeader restaurant={restaurant} />
        <EatOutCardSubheader
          restaurantName={restaurant.name}
          openingHours={restaurant.openingHours}
        />
        {/* <EatOutCardContent
          address={restaurant.address}
          website={restaurant.website}
          description={restaurant.description}
        /> */}
        {/* <EatOutCardFooter /> */}
      </div>
    );
  }

  return "";
}

export default EatOutCard;

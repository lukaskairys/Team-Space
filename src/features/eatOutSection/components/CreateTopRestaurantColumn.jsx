import React from "react";

import PersonComponent from "./PersonCounter";
import EatOutCardHeader from "components/EatOutCard/components/EatOutCardHeader";
import EatOutCardSubheader from "components/EatOutCard/components/EatOutCardSubheader";

const CreateTopRestaurantColumn = (restaurant) => {
  return (
    <div key={restaurant.id} className="eat-out-section__column">
      <EatOutCardHeader restaurant={restaurant}>
        {PersonComponent(restaurant.checkIns)}
      </EatOutCardHeader>
      <EatOutCardSubheader
        id={restaurant.id}
        restaurantName={restaurant.name}
        openingHours={restaurant.openingHours}
      />
    </div>
  );
};

export default CreateTopRestaurantColumn;

import React from "react";

import EatOutCardHeader from "components/EatOutCard/components/EatOutCardHeader";
import EatOutCardSubheader from "components/EatOutCard/components/EatOutCardSubheader";
import useCheckinHandler from "components/EatOutCard/components/useCheckinHandler";

const CreateTopRestaurantColumn = (restaurant) => {
  const { toggleCheckIn, checkIns, active } = useCheckinHandler(restaurant);
  return (
    <div key={restaurant.id} className="eat-out-section__column">
      <EatOutCardHeader
        restaurant={restaurant}
        checkinHandler={{ toggleCheckIn, checkIns, active }}
      />
      <EatOutCardSubheader
        id={restaurant.id}
        restaurantName={restaurant.name}
        openingHours={restaurant.openingHours}
      />
    </div>
  );
};

export default CreateTopRestaurantColumn;

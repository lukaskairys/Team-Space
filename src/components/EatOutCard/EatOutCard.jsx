import React from "react";
import PropTypes from "prop-types";

import EatOutCardHeader from "./components/EatOutCardHeader";
import EatOutCardSubheader from "./components/EatOutCardSubheader";
import EatOutCardContent from "./components/EatOutCardContent";
import EatOutCardFooter from "./components/EatOutCardFooter";

import "./eatOutCard.scss";

function EatOutCard({ restaurant }) {
  return (
    <>
      <div className="eat-out-card">
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
        <EatOutCardFooter restaurantID={restaurant.id} />
      </div>
    </>
  );
}

//   return "";
// }

EatOutCard.propTypes = {
  restaurant: PropTypes.object,
};

export default EatOutCard;

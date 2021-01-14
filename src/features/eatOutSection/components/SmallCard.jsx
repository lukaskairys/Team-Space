import React from "react";
import PropTypes from "prop-types";

import EatOutCardHeader from "components/EatOutCard/components/EatOutCardHeader";
import EatOutCardSubheader from "components/EatOutCard/components/EatOutCardSubheader";
import useCheckinHandler from "utils/useCheckinHandler";

const SmallCard = ({ restaurant }) => {
  const { toggleCheckIn, checkIns, active } = useCheckinHandler(restaurant);
  const { id, name, openingHours } = restaurant;
  return (
    <li className="eat-out-section__column">
      <p className="visually-hidden">Next card:</p>
      <EatOutCardHeader
        restaurant={restaurant}
        checkinHandler={{ toggleCheckIn, checkIns, active }}
      />
      <EatOutCardSubheader
        id={id}
        restaurantName={name}
        openingHours={openingHours}
      />
    </li>
  );
};

SmallCard.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    openingHours: PropTypes.array,
    address: PropTypes.string,
    website: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default SmallCard;

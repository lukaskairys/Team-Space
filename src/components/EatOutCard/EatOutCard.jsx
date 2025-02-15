import React from "react";
import PropTypes from "prop-types";

import EatOutCardHeader from "./components/EatOutCardHeader";
import EatOutCardSubheader from "./components/EatOutCardSubheader";
import EatOutCardContent from "./components/EatOutCardContent";
import EatOutCardFooter from "./components/EatOutCardFooter";
import useCheckinHandler from "utils/useCheckinHandler";

import "./eatOutCard.scss";

function EatOutCard({ restaurant, handleImageLoad }) {
  const { id, name, openingHours, address, website, description } = restaurant;
  const { toggleCheckIn, checkIns, active } = useCheckinHandler(restaurant);

  return (
    <>
      <div className="eat-out-card">
        <div>
          <EatOutCardHeader
            restaurant={restaurant}
            handleImageLoad={handleImageLoad}
            checkinHandler={{ toggleCheckIn, checkIns, active }}
          />
          <EatOutCardSubheader
            id={id}
            restaurantName={name}
            openingHours={openingHours}
          />
          <EatOutCardContent
            address={address}
            website={website}
            description={description}
          />
        </div>
        <EatOutCardFooter
          handleCheckIns={toggleCheckIn}
          isCheckinActive={active}
          restaurantID={id}
          name={name}
        />
      </div>
    </>
  );
}

EatOutCard.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    openingHours: PropTypes.array,
    address: PropTypes.string,
    website: PropTypes.string,
    description: PropTypes.string,
  }),
  handleImageLoad: PropTypes.func,
};

export default EatOutCard;

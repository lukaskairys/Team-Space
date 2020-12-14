import React from "react";
import PropTypes from "prop-types";

import EatOutCardHeader from "./components/EatOutCardHeader";
import EatOutCardSubheader from "./components/EatOutCardSubheader";
import EatOutCardContent from "./components/EatOutCardContent";
import EatOutCardFooter from "./components/EatOutCardFooter";

import "./eatOutCard.scss";

function EatOutCard({ restaurant, handleImageLoad }) {
  const { name, openingHours, address, website, id, description } = restaurant;
  return (
    <>
      <div className="eat-out-card">
        <div>
          <EatOutCardHeader
            restaurant={restaurant}
            handleImageLoad={handleImageLoad}
          />
          <EatOutCardSubheader
            id={restaurant.id}
            restaurantName={name}
            openingHours={openingHours}
          />
          <EatOutCardContent
            address={address}
            website={website}
            description={description}
          />
        </div>
        <EatOutCardFooter restaurantID={id} />
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

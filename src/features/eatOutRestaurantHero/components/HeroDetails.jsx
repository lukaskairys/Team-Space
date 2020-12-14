import React from "react";
import PropTypes from "prop-types";

import "./heroDetails.scss";
import HeartIcon from "components/HeartIcon/HeartIcon";
import Button from "components/button/Button";
import Rating from "components/Rating/Rating";
import { FavoriteTypes } from "../../../utils/FavoriteTypes";

export default function HeroDetails({ restaurant }) {
  return (
    <div className="hero-details">
      <div className="hero-details__rating-box">
        <Rating restaurant={restaurant} isStatic={false} />
        <HeartIcon itemType={FavoriteTypes.RESTAURANT} itemId={restaurant.id} />
      </div>
      <span className="hero-details__check-ins">{`${restaurant.checkIns} People already checked-in!`}</span>
      <div className="hero-details__cta-box">
        <span className="hero-details__invite-text">Invite</span>
        <Button medium={true}>CHECK-IN</Button>
      </div>
    </div>
  );
}

HeroDetails.propTypes = {
  restaurant: PropTypes.shape({
    checkIns: PropTypes.number,
    id: PropTypes.string,
  }),
};

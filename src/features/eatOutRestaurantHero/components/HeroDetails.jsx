import React from "react";
import PropTypes from "prop-types";
import useCheckinHandler from "components/EatOutCard/components/useCheckinHandler";

import "./heroDetails.scss";
import HeartIcon from "components/HeartIcon/HeartIcon";
import Button from "components/button/Button";
import Rating from "components/Rating/Rating";

export default function HeroDetails({ restaurant }) {
  const { toggleCheckIn, active } = useCheckinHandler(restaurant);

  return (
    <div className="hero-details">
      <div className="hero-details__rating-box">
        <Rating restaurant={restaurant} isStatic={false} />
        <HeartIcon requestData={restaurant} />
      </div>
      <span className="hero-details__check-ins">{`${restaurant.checkIns} People already checked-in!`}</span>
      <div className="hero-details__cta-box">
        <span className="hero-details__invite-text">Invite</span>
        <Button handleClick={toggleCheckIn} medium={true}>
          {active ? <span>check-out</span> : <span>check-in</span>}
        </Button>
      </div>
    </div>
  );
}

HeroDetails.propTypes = {
  restaurant: PropTypes.shape({
    checkIns: PropTypes.number,
  }),
};

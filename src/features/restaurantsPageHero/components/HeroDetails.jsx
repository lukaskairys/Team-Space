import React from "react";
import PropTypes from "prop-types";

import "./heroDetails.scss";
import HeartIcon from "components/HeartIcon/HeartIcon";
import Button from "components/button/Button";

export default function HeroDetails({ checkIns }) {
  return (
    <div className="hero-details">
      <div className="hero-details__rating-box">
        {/* Rating component to be inserted */}
        <span>Rating</span>
        <HeartIcon />
      </div>
      <span className="hero-details__check-ins">{`${checkIns} People already checked-in`}</span>
      <div className="hero-details__cta-box">
        <span className="hero-details__invite-text">Invite</span>
        <Button medium={true}>CHECK-IN</Button>
      </div>
    </div>
  );
}

HeroDetails.propTypes = {
  checkIns: PropTypes.number,
};

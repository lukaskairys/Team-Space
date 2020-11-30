import React from "react";
import PropTypes from "prop-types";

import { ReactComponent as Globe } from "assets/icons/globe.svg";
import { ReactComponent as MapPin } from "assets/icons/map-pin.svg";

import "./eatOutCardContent.scss";

function EatOutCardContent({ address, website, description }) {
  return (
    <div className="card-content">
      <div className="card-content__contact-info">
        <p className="card-content__contact-item">
          <Globe className="card-content__icon" />
          <span className="card-content__info">
            {website.replace(/www.|http:\/\/|https:\/\//gi, "")}
          </span>
        </p>
        <p className="card-content__contact-item">
          <MapPin className="card-content__icon" />
          <span className="card-content__info">{address}</span>
        </p>
      </div>
      <div className="card-content__description">
        <p>{description}</p>
      </div>
    </div>
  );
}

EatOutCardContent.propTypes = {
  address: PropTypes.string,
  website: PropTypes.string,
  description: PropTypes.string,
};

export default EatOutCardContent;

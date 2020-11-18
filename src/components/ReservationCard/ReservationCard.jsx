import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";

import "./reservationCard.scss";
/**
 * Use size "big" for a big card (39.6rem)
 * & Use size "small" for a small card (25rem).
 */
function ReservationsCard({ name, path, reserved, size, children }) {
  const cardClassNames = classNames({
    "reservations-card": true,
    "reservations-card--big": size === "big" ? true : false,
    "reservations-card--small": size === "small" ? true : false,
  });
  const cardImageClassnames = classNames({
    "reservations-card__image": true,
    "reservations-card__image--big": size === "big" ? true : false,
    "reservations-card__image--small": size === "big" ? false : true,
  });
  return (
    <Link to={path} className={cardClassNames}>
      <div>
        <h2 className="reservations-card__title">{name}</h2>
        <span className="reservations-card__caption">{`${reserved} Reserved`}</span>
      </div>
      <div className={cardImageClassnames}>{children}</div>
    </Link>
  );
}

ReservationsCard.propTypes = {
  name: PropTypes.string,
  path: PropTypes.string,
  size: PropTypes.string,
  reserved: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.object,
};

export default ReservationsCard;

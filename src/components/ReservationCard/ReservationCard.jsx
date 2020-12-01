import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";

import "./reservationCard.scss";
/**
 * Use size big for a big card (39.3rem)
 * & Use size small for a small card (25rem).
 */
function ReservationsCard({
  name,
  caption,
  path,
  count,
  small,
  big,
  children,
}) {
  const cardClassNames = classNames({
    "reservations-card": true,
    "reservations-card--big": big,
    "reservations-card--small": small,
  });
  const cardImageClassnames = classNames({
    "reservations-card__image-box": true,
    "reservations-card__image-box--small": small,
  });
  return (
    <Link to={path} className={cardClassNames}>
      <div>
        <h2 className="reservations-card__title">{name}</h2>
        <span className="reservations-card__caption">{`${count} ${caption}`}</span>
      </div>
      <div className={cardImageClassnames}>{children}</div>
    </Link>
  );
}

ReservationsCard.propTypes = {
  name: PropTypes.string,
  caption: PropTypes.string,
  path: PropTypes.string,
  count: PropTypes.number,
  small: PropTypes.bool,
  big: PropTypes.bool,
  size: PropTypes.string,
  children: PropTypes.object,
};

export default ReservationsCard;

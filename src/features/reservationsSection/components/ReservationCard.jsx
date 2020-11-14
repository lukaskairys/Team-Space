import "./reservationsCard.scss";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function ReservationsCard({ name, path, reserved, children }) {
  return (
    <Link to={path} className="reservations-card">
      <div>
        <h2 className="reservations-card__title">{name}</h2>
        <span className="reservations-card__caption">{`${reserved} Reserved`}</span>
      </div>
      <div className="reservations-card__image">{children}</div>
    </Link>
  );
}

ReservationsCard.propTypes = {
  name: PropTypes.string,
  path: PropTypes.string,
  children: PropTypes.object,
  reserved: PropTypes.number,
};

export default ReservationsCard;

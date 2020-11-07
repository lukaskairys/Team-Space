import "./reservationsCard.scss";
import React from "react";
import PropTypes from "prop-types";

function ReservationsCard({ name, Image, reserved }) {
  return (
    <div className="reservations-card">
      <div>
        <h2 className="reservations-card__title">{name}</h2>
        <span className="reservations-card__caption">{`${reserved} Reserved`}</span>
      </div>
      <div>
        <Image className="reservations-card__image" />
      </div>
    </div>
  );
}

ReservationsCard.propTypes = {
  name: PropTypes.string,
  Image: PropTypes.object,
  reserved: PropTypes.number,
};

export default ReservationsCard;

import "./reservationsCard.scss";
import React from "react";
import { ReactComponent as Phone } from "assets/phone-1.svg";

function ReservationsCard() {
  return (
    <div className="reservations-card">
      <div>
        <h2>Devices</h2>
        <span>2 Reserved</span>
      </div>
      <div>
        <Phone className="reservations-card__image" />
      </div>
    </div>
  );
}

export default ReservationsCard;

import "./reservationsSection.scss";
import React from "react";
import ReservationCard from "./ReservationCard";
import { ReactComponent as Phone } from "assets/images/phone-1.svg";
import { ReactComponent as Door } from "assets/images/door-1.svg";
import { ReactComponent as Book } from "assets/images/book-1.svg";

function ReservationsSection() {
  const reservations = {
    phones: 2,
    books: 3,
    rooms: 4,
  };
  return (
    <div className="RESERVATIONS">
      <h2 className="RESERVATIONS__title">Reservations</h2>
      <div className="RESERVATIONS__cards">
        <ReservationCard name={"Devices"} reserved={reservations.phones}>
          <Phone />
        </ReservationCard>
        <ReservationCard name={"Books"} reserved={reservations.books}>
          <Book />
        </ReservationCard>
        <ReservationCard name={"Meeting rooms"} reserved={reservations.rooms}>
          <Door />
        </ReservationCard>
      </div>
    </div>
  );
}

export default ReservationsSection;

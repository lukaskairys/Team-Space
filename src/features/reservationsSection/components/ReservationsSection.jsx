import "./reservationsSection.scss";
import React from "react";
import ReservationCard from "./ReservationCard";

function ReservationsSection() {
  return (
    <div className="reservations">
      <ReservationCard />
      <ReservationCard />
      <ReservationCard />
    </div>
  );
}

export default ReservationsSection;

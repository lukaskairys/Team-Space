import React from "react";

import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import ReservationSection from "features/reservationsSection/components/ReservationsSection";

import "./Reservations.scss";

const Reservations = () => {
  return (
    <div className="reservationsPage">
      <>
        <Breadcrumbs />
        <ReservationSection className="reservationsPage__widget" />
      </>
    </div>
  );
};

export default Reservations;

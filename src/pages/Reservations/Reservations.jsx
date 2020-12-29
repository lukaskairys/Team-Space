import React from "react";
import { Helmet } from "react-helmet-async";

import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import ReservationSection from "features/reservationsSection/components/ReservationsSection";

import "./Reservations.scss";

const Reservations = () => {
  return (
    <div className="reservationsPage">
      <Helmet>
        <title>Reservations</title>
      </Helmet>
      <Breadcrumbs />
      <ReservationSection className="reservationsPage__widget" />
    </div>
  );
};

export default Reservations;

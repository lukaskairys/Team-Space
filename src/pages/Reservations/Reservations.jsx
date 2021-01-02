import React, { useState } from "react";

import { Helmet } from "react-helmet-async";

import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import ReservationSection from "features/reservationsSection/components/ReservationsSection";
import ReservedItemsSection from "features/ReservedItems/ReservedItemsSection";
import ReservedRestaurant from "features/ReservedItems/ReservedRestaurant";

import "./Reservations.scss";

const Reservations = () => {
  const [emptyReservations, setEmptyReservations] = useState(true);

  return (
    <div className="reservations-page">
      <Helmet>
        <title>Reservations · Team Space</title>
      </Helmet>
      <Breadcrumbs />
      <h1 className="reservations-page__title">Your reservations</h1>

      <div className="reservations-page__all-reservations">
        <ReservedItemsSection
          setEmptyReservations={setEmptyReservations}
          emptyReservations={emptyReservations}
        />
        <ReservedRestaurant />
      </div>

      {!emptyReservations && (
        <div className="reservations-page__new-reservations">
          <ReservationSection
            title={"Need something else? Make a new reservation"}
          />
        </div>
      )}
    </div>
  );
};

export default Reservations;

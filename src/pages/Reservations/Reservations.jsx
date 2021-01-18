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
    <div className="reservations-page fade-in">
      <Helmet>
        <title>Reservations · Team Space</title>
      </Helmet>
      <Breadcrumbs />
      <h1 id="main-content" className="reservations-page__title">
        Your reservations
      </h1>

      <article className="reservations-page__all-reservations">
        <ReservedItemsSection
          setEmptyReservations={setEmptyReservations}
          emptyReservations={emptyReservations}
        />
        <ReservedRestaurant />
      </article>

      {!emptyReservations && (
        <section className="reservations-page__new-reservations">
          <ReservationSection
            title={"Need something else? Make a new reservation"}
          />
        </section>
      )}
    </div>
  );
};

export default Reservations;

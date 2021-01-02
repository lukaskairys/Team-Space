import React from "react";

import ReservationSection from "features/reservationsSection/components/ReservationsSection";

import "./emptyReservations.scss";

const EmptyReservations = () => {
  return (
    <section className="empty-reservations">
      <ReservationSection
        isNarrow={true}
        customMessageRenderer={() => (
          <p className="empty-reservations-message">
            <span>At the moment you have no reserved items. </span>
            <span>If you need something, make a reservation here</span>
          </p>
        )}
      />
    </section>
  );
};

export default EmptyReservations;

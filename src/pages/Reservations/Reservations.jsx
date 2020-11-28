import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import ReservationSection from "features/reservationsSection/components/ReservationsSection";
import "./Reservations.scss";

const Reservations = () => {
  return (
    <div className="reservationsPage">
      <MainLayout>
        <>
          <Breadcrumbs />
          <ReservationSection className="reservationsPage__widget" />
        </>
      </MainLayout>
    </div>
  );
};

export default Reservations;

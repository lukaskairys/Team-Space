import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import ReservationSection from "features/reservationsSection/components/ReservationsSection";
import ContextProvider from "contexts/ContextProvider";

import "./Reservations.scss";

const Reservations = () => {
  return (
    <div className="reservationsPage">
      <ContextProvider endpoint="/userData">
        <MainLayout>
          <>
            <Breadcrumbs />
            <ReservationSection className="reservationsPage__widget" />
          </>
        </MainLayout>
      </ContextProvider>
    </div>
  );
};

export default Reservations;

import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import ReservationSection from "features/reservationsSection/components/ReservationsSection";
import UserContextProvider from "contexts/UserContextProvider";

import "./Reservations.scss";

const Reservations = () => {
  return (
    <div className="reservationsPage">
      <UserContextProvider>
        <MainLayout>
          <>
            <Breadcrumbs />
            <ReservationSection className="reservationsPage__widget" />
          </>
        </MainLayout>
      </UserContextProvider>
    </div>
  );
};

export default Reservations;

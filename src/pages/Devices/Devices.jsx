import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";

import "./Devices.scss";
import ReservationsList from "features/reservationsPageList/components/ReservationsList";
import ContextProvider from "contexts/ContextProvider";

const Devices = () => {
  return (
    <div className="devices">
      <MainLayout>
        <>
          <Breadcrumbs />
          <ContextProvider endpoint="/devices">
            <ReservationsList />
          </ContextProvider>
        </>
      </MainLayout>
    </div>
  );
};

export default Devices;

import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";

import "./Devices.scss";
import ReservationsList from "features/reservationsPageList/components/ReservationsList";
import ContextProvider from "contexts/ContextProvider";

const Devices = () => {
  const placeholders = {
    searchTerm: "Apple",
  };

  const tags = {
    deviceType: ["Desktop"],
    os: [],
    brand: [],
  };

  return (
    <div className="devices">
      <MainLayout>
        <>
          <Breadcrumbs />
          <ContextProvider endpoint="/devices">
            <ReservationsList
              searchTerm={placeholders.searchTerm}
              tags={tags}
            />
          </ContextProvider>
        </>
      </MainLayout>
    </div>
  );
};

export default Devices;

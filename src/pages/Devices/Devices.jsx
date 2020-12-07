import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import ReservationsList from "features/reservationsPageList/components/ReservationsList";
import ContextProvider from "contexts/ContextProvider";

import "./devices.scss";

const Devices = () => {
  // Placeholders to be replaced by state changing items
  const placeholders = {
    searchTerm: "apple",
    date: "",
    tags: {
      deviceType: [],
      os: [],
      brand: [],
    },
  };

  return (
    <div className="devices">
      <MainLayout>
        <>
          <Breadcrumbs />
          <ContextProvider endpoint="/devices">
            <ReservationsList
              searchTerm={placeholders.searchTerm}
              date={placeholders.date}
              tags={placeholders.tags}
            />
          </ContextProvider>
        </>
      </MainLayout>
    </div>
  );
};

export default Devices;

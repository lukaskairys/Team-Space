import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import ReservationsList from "features/reservationsPageList/components/ReservationsList";
import ContextProvider from "contexts/ContextProvider";
import SideFilters from "features/sideFilters/SideFilters";

import { useReservationPages } from "components/ReservationPages/useReservationPages";
import "./Devices.scss";

const Devices = () => {
  // Placeholders to be replaced by state changing items
  const placeholders = {
    searchTerm: "",
    date: "03/02/2021",
    availabilityOn: true,
  };
  const {
    filtersToRender,
    refs,
    handleChange,
    clearAll,
    tags,
    handleSingleTag,
  } = useReservationPages("/devices");

  return (
    <>
      <MainLayout>
        <>
          <Breadcrumbs />
          <div className="devices">
            <div className="devices__side-filters">
              {filtersToRender !== undefined &&
                filtersToRender.map((item, i) => (
                  <SideFilters
                    key={item[0]}
                    title={item[0]}
                    filterItems={item[1]}
                    filterTags={tags}
                    clearAll={clearAll}
                    tags={tags}
                    handleChange={handleChange}
                    ref={refs && refs[i]}
                    value={item}
                  />
                ))}
            </div>
            <ContextProvider endpoint="/devices">
              <ReservationsList
                searchTerm={placeholders.searchTerm}
                date={placeholders.date}
                tags={tags}
                handleSingleTag={handleSingleTag}
                available={placeholders.availabilityOn}
              />
            </ContextProvider>
          </div>
        </>
      </MainLayout>
    </>
  );
};

export default Devices;

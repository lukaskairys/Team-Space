import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import ReservationsList from "features/reservationsPageList/components/ReservationsList";
import SideFilters from "features/sideFilters/SideFilters";

import { useReservationPages } from "components/ReservationPages/useReservationPages";
import "./Devices.scss";

const Devices = () => {
  // Placeholders to be replaced by state changing items
  const placeholders = {
    searchTerm: "", // User search term
    date: "22/01/2021", // Date that comes from the calendar in the search component (must be DD/MM/YYYY to work)
    availabilityOn: false, // If true displays only available items, if false displays all items
  };

  const {
    filtersToRender,
    refs,
    handleChange,
    clearAll,
    tags,
    handleSingleTag,
    listName,
    listData,
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
            <ReservationsList
              searchTerm={placeholders.searchTerm}
              date={placeholders.date}
              tags={tags}
              handleSingleTag={handleSingleTag}
              availabilityOn={placeholders.availabilityOn}
              listName={listName}
              listData={listData}
            />
          </div>
        </>
      </MainLayout>
    </>
  );
};

export default Devices;

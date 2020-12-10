import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import SideFilters from "features/sideFilters/SideFilters";

import { useReservationPages } from "components/ReservationPages/useReservationPages";
import "./Devices.scss";

import Search from "features/search/Search";

const Devices = () => {
  const {
    filtersToRender,
    refs,
    handleChange,
    clearAll,
    tags,
  } = useReservationPages("/devices");

  return (
    <div className="devices">
      <MainLayout>
        <>
          <Breadcrumbs />
          <Search />
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
        </>
      </MainLayout>
    </div>
  );
};

export default Devices;

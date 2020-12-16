import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import ReservationsList from "features/reservationsPageList/components/ReservationsList";
import SideFilters from "features/sideFilters/SideFilters";
import Search from "features/search/Search";

import { useReservationPages } from "components/ReservationPages/useReservationPages";
import { useSearch } from "features/search/useSearch";

import "./devices.scss";

const Devices = () => {
  const { searchData, searchBtnClick, availableFilter } = useSearch();

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
          <Search
            searchBtnClick={searchBtnClick}
            availableFilter={availableFilter}
          />
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
              searchTerm={searchData.searchTerm}
              date={searchData.date}
              tags={tags}
              handleSingleTag={handleSingleTag}
              availabilityOn={searchData.availabilityOn}
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

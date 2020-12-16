import React from "react";
import PropTypes from "prop-types";

import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import ReservationsList from "features/reservationsPageList/components/ReservationsList";
import SideFilters from "features/sideFilters/SideFilters";
import Search from "features/search/Search";

import { useReservationPages } from "./useReservationPages";
import { useSearch } from "features/search/useSearch";

import "./reservationPage.scss";

const ReservationPage = ({ page }) => {
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
  } = useReservationPages(`/${page}`);

  return (
    <>
      <MainLayout>
        <>
          <Breadcrumbs />
          <Search
            searchBtnClick={searchBtnClick}
            availableFilter={availableFilter}
          />
          <div className="reservation-page">
            <div className="reservation-page__side-filters">
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

ReservationPage.propTypes = {
  page: PropTypes.string,
};

export default ReservationPage;

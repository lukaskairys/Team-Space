import React from "react";
import PropTypes from "prop-types";

import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import ReservationsList from "features/reservationsPageList/components/ReservationsList";
import SideFilters from "features/sideFilters/SideFilters";
import Search from "features/search/Search";

import { useReservationPages } from "./useReservationPages";
import { useSearch } from "features/search/useSearch";

import "./reservationPage.scss";

const ReservationPage = ({ page, inputSliderRenderer }) => {
  const { searchData, searchBtnClick, activeFilter } = useSearch();

  const {
    filtersToRender,
    refs,
    handleChange,
    clearAll,
    tags,
    handleSingleTag,
    listName,
    listData,
    counter,
    setCounter,
  } = useReservationPages(`/${page}`);
  return (
    <>
      <Breadcrumbs />
      <section className="reservation-page fade-in">
        <h1 className="reservation-page__title">{`${page.slice(
          0,
          -1
        )} Reservations`}</h1>
        <Search searchBtnClick={searchBtnClick} activeFilter={activeFilter} />
        <div className="reservation-page__content">
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
                  filterRef={refs && refs[i]}
                  value={item}
                  counter={counter}
                  isCombined={Array.isArray(listData[0][item[0]])}
                />
              ))}
            {inputSliderRenderer
              ? inputSliderRenderer(setCounter, listData)
              : ""}
          </div>
          <ReservationsList
            searchTerm={searchData.searchTerm}
            date={searchData.date}
            tags={tags}
            handleSingleTag={handleSingleTag}
            availabilityOn={searchData.availabilityOn}
            favoritesOn={searchData.favoritesOn}
            listName={listName}
            listData={listData}
            counter={counter}
            endpoint={page}
          />
        </div>
      </section>
    </>
  );
};

ReservationPage.propTypes = {
  page: PropTypes.string,
  inputSliderRenderer: PropTypes.func,
};

export default ReservationPage;

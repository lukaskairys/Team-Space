import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import SideFilters from "features/sideFilters/SideFilters";
import ReservationsList from "features/reservationsPageList/components/ReservationsList";

import { useReservationPages } from "components/ReservationPages/useReservationPages";
import "./books.scss";

const Books = () => {
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
    listName,
    listData,
  } = useReservationPages("/books");

  return (
    <MainLayout>
      <>
        <Breadcrumbs />
        <div className="books">
          <div className="books__side-filters">
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
  );
};

export default Books;

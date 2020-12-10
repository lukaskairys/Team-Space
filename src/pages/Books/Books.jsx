import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import SideFilters from "features/sideFilters/SideFilters";

import { useReservationPages } from "components/ReservationPages/useReservationPages";
import "./Books.scss";

const Books = () => {
  const {
    filtersToRender,
    refs,
    handleChange,
    clearAll,
    tags,
  } = useReservationPages("/books");

  return (
    <div className="books">
      <MainLayout>
        <>
          <Breadcrumbs />
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
        </>
      </MainLayout>
    </div>
  );
};

export default Books;

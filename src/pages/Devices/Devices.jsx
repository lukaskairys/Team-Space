import React, { useState, useEffect, createRef } from "react";

import { isObjectEmpty } from "utils/objects";
import { useSideFilter } from "features/sideFilters/useSideFilter";
import { useRequest } from "apis/useRequest";
import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import ReservationsList from "features/reservationsPageList/components/ReservationsList";
import ContextProvider from "contexts/ContextProvider";
import SideFilters from "features/sideFilters/SideFilters";

import "./Devices.scss";

const Devices = () => {
  // Placeholders to be replaced by state changing items
  const placeholders = {
    searchTerm: "",
    date: "",
  };

  const [refs, setRefs] = useState(undefined);
  const [dataCount, setDataCount] = useState(0);
  const { data } = useRequest("/devices");
  const { handleChange, clearAll, tags, handleSingleTag } = useSideFilter();
  const filterData = data.filterCategories;

  useEffect(() => {
    if (filterData && !isObjectEmpty(filterData)) {
      setDataCount(Object.keys(filterData).length);
      let refs = {};
      for (let i = 0; i <= dataCount; i++) {
        refs[i] = createRef();
      }
      setRefs(refs);
    }
  }, [filterData, dataCount]);

  const getFiltersToRender = () => {
    if (filterData) {
      return Object.entries(filterData);
    }
  };
  const filtersToRender = getFiltersToRender();

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
              />
            </ContextProvider>
          </div>
        </>
      </MainLayout>
    </>
  );
};

export default Devices;

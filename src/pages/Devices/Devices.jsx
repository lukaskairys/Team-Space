import React, { useState, useEffect, createRef } from "react";

import { isObjectEmpty } from "utils/objects";
import { useSideFilter } from "features/sideFilters/useSideFilter";
import { useRequest } from "apis/useRequest";
import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import ReservationsList from "features/reservationsPageList/components/ReservationsList";
import ContextProvider from "contexts/ContextProvider";
import SideFilters from "features/sideFilters/SideFilters";

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
  const [refs, setRefs] = useState(undefined);
  const [dataCount, setDataCount] = useState(0);
  const { data } = useRequest("/devices");
  const { handleChange, clearAll, tags } = useSideFilter();

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

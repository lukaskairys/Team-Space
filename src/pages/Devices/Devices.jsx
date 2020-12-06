import React, { useRef, createRef } from "react";

import { useSideFilter } from "features/sideFilters/useSideFilter";
import { useRequest } from "apis/useRequest";
import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";

import "./Devices.scss";
import SideFilters from "features/sideFilters/SideFilters";

const Devices = () => {
  const { data } = useRequest("/devices");
  const { handleChange, clearAll, tags } = useSideFilter();

  const filterData = data.filterCategories;

  let refs = useRef([createRef(), createRef(), createRef()]);

  // rendering to screen
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
                  ref={refs.current[i]}
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

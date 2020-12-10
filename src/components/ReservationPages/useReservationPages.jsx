import { useState, useEffect, createRef } from "react";

import { getObjectEntries } from "utils/objects";
import { useSideFilter } from "features/sideFilters/useSideFilter";
import { useRequest } from "apis/useRequest";

export const useReservationPages = (endpoint) => {
  const [refs, setRefs] = useState(undefined);
  const [dataCount, setDataCount] = useState(0);
  const { data } = useRequest(endpoint);

  const filterCategories = data.filterCategories;
  const filtersToRender = getObjectEntries(filterCategories);

  const getInitialState = () => {
    let initialState;
    if (endpoint === "/devices") {
      initialState = { deviceType: [], os: [], brand: [] };
    } else if (endpoint === "/books") {
      initialState = { genres: [] };
    }
    return initialState;
  };

  const { handleChange, clearAll, tags } = useSideFilter(
    filtersToRender,
    getInitialState()
  );

  useEffect(() => {
    if (filterCategories) {
      setDataCount(Object.keys(filterCategories).length);
      let refs = {};
      for (let i = 0; i <= dataCount; i++) {
        refs[i] = createRef();
      }
      setRefs(refs);
    }
  }, [filterCategories, dataCount]);

  return { filtersToRender, refs, handleChange, clearAll, tags };
};

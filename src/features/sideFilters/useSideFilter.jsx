import { useState } from "react";

export const useSideFilter = () => {
  const initialState = { deviceType: [], os: [], brand: [] };
  const [tags, setTags] = useState(initialState);

  const update = (filterType, newValue) => {
    filterType === "deviceType" && setTags({ ...tags, deviceType: newValue });
    filterType === "os" && setTags({ ...tags, os: newValue });
    filterType === "brand" && setTags({ ...tags, brand: newValue });
  };

  const clearAll = (filterRef) => {
    const filterToClear = filterRef.getAttribute("data-filtertype");
    update(filterToClear, []);
  };

  const handleChange = (event) => {
    const filterType = event.target.getAttribute("data-filtertype");
    let newArray = [...tags[filterType], event.target.name];
    if (tags[filterType].includes(event.target.name)) {
      newArray = newArray.filter((item) => item !== event.target.name);
    }
    update(filterType, newArray);
  };
  return { handleChange, clearAll, tags };
};

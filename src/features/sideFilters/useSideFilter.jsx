import { useState } from "react";

export const useSideFilter = (filterCategories, initialState) => {
  const [tags, setTags] = useState(initialState);

  const update = (filterClicked, newValue) => {
    filterCategories.forEach((filterCategory) => {
      filterClicked === filterCategory[0] &&
        setTags({ ...tags, [filterCategory[0]]: newValue });
    });
  };
  const clearAll = (filterRef) => {
    const filterToClear = filterRef.getAttribute("data-filtertype");
    update(filterToClear, []);
  };

  const handleChange = (event) => {
    const filterClicked = event.target.getAttribute("data-filtertype");
    let newArray = [...tags[filterClicked], event.target.name];
    if (tags[filterClicked].includes(event.target.name)) {
      newArray = newArray.filter((item) => item !== event.target.name);
    }
    update(filterClicked, newArray);
  };

  const handleSingleTag = (event) => {
    const tag = event.currentTarget.getAttribute("data-tag-name");
    let newArray;
    for (const prop in tags) {
      if (tags[prop].includes(tag)) {
        newArray = tags[prop].filter((item) => {
          return item !== tag;
        });
        setTags({ ...tags, [prop]: newArray });
      }
    }
  };
  return { handleChange, clearAll, tags, handleSingleTag };
};

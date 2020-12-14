import { useState } from "react";

export const useSearch = () => {
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    date: "",
    availabilityOn: false, // If true displays only available items, if false displays all items
  });

  const searchBtnClick = (searchText, searchDate) => {
    if (searchText !== searchData.searchTerm && searchText !== undefined) {
      setSearchData({ ...searchData, searchTerm: searchText });
    }
    if (searchDate !== searchData.date && searchDate !== undefined) {
      setSearchData({ ...searchData, date: searchDate });
    }
  };

  const availableFilter = (available) => {
    setSearchData({ ...searchData, availabilityOn: available });
  };

  return { searchData, searchBtnClick, availableFilter };
};

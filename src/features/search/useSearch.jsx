import { useState } from "react";

import { formatDateToGB } from "features/reservationsPageList/utils/dateFormatters";

export const useSearch = () => {
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    date: formatDateToGB(new Date()),
    availabilityOn: false, // If true displays only available items, if false displays all items
    favorites: false,
  });

  const searchBtnClick = (param) => {
    if (param === undefined) return;
    if (
      param.searchText !== searchData.searchTerm &&
      param.searchText !== undefined
    ) {
      setSearchData({ ...searchData, searchTerm: param.searchText });
    }
    if (
      param.searchDate !== searchData.date &&
      param.searchDate !== undefined
    ) {
      setSearchData({ ...searchData, date: param.searchDate });
    }
  };

  const availableFilter = (available) => {
    setSearchData({ ...searchData, availabilityOn: available });
  };

  const favoritesFilter = (favorite) => {
    setSearchData({ ...searchData, favorites: favorite });
  };

  return { searchData, searchBtnClick, availableFilter, favoritesFilter };
};

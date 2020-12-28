import React from "react";
import PropTypes from "prop-types";

import SearchFilters from "./SearchFilters";
import SearchInputs from "./SearchInputs";

import "./search.scss";

function Search({ searchBtnClick, activeFilter }) {
  return (
    <div className="search-bar">
      <h2 className="search-bar__title">Search</h2>
      <SearchFilters activeFilter={activeFilter} />
      <SearchInputs searchBtnClick={searchBtnClick} />
    </div>
  );
}
Search.propTypes = {
  searchBtnClick: PropTypes.func,
  activeFilter: PropTypes.func,
};
export default Search;

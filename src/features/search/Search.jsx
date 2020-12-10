import React from "react";

import SearchFilters from "./SearchFilters";
import SearchInputs from "./SearchInputs";

import "./search.scss";

function Search() {
  return (
    <div className="search-bar">
      <h2 className="search-bar__title">Search</h2>
      <SearchFilters />
      <SearchInputs />
    </div>
  );
}

export default Search;

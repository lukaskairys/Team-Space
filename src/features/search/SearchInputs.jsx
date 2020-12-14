import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "components/button/Button";
import { formatDateToGB } from "features/reservationsPageList/utils/dateFormatters";
import { ReactComponent as SearchIcon } from "assets/icons/magnifying-glass.svg";

import "./searchInputs.scss";

function SearchInputs({ searchBtnClick }) {
  const [term, setTerm] = useState();
  const [date, setDate] = useState();

  const handleSearchInputChange = (event) => {
    setTerm(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(formatDateToGB(event.target.value));
  };

  const search = (e) => {
    searchBtnClick(term, date);
  };

  return (
    <div className="search-bar__inputs">
      <div className="search-bar__inputs-text">
        <input
          type="search"
          className="form__input search-bar__inputs-text-input"
          onChange={handleSearchInputChange}
        ></input>
      </div>
      <div className="search-bar__inputs-date">
        <label
          htmlFor="reservationDate"
          className="search-bar__inputs-date-input-label"
        >
          RESERVATION DATE
        </label>
        <input
          type="date"
          name="reservationDate"
          className="form__input search-bar__inputs-date-input"
          onChange={handleDateChange}
        ></input>
      </div>
      <div className="search-bar__inputs-button">
        <Button withIcon handleClick={search}>
          <SearchIcon className="search-bar__inputs-search-button-icon" />
          Search
        </Button>
      </div>
    </div>
  );
}
SearchInputs.propTypes = {
  searchBtnClick: PropTypes.func,
};
export default SearchInputs;

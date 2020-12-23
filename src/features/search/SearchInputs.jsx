import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "components/button/Button";
import { formatDateToGB } from "features/reservationsPageList/utils/dateFormatters";
import { ReactComponent as SearchIcon } from "assets/icons/magnifying-glass.svg";
import { ReactComponent as CircleX } from "assets/icons/x-circle.svg";

import "./searchInputs.scss";

function SearchInputs({ searchBtnClick }) {
  const todaysDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const [term, setTerm] = useState();
  const [date, setDate] = useState(todaysDate);

  const handleSearchInputChange = (event) => {
    setTerm(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const search = (e) => {
    searchBtnClick({ searchText: term, searchDate: formatDateToGB(date) });
  };

  const searchWithEnter = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const handleXclick = (e) => {
    setTerm("");
    searchBtnClick({ searchText: "" });
  };

  return (
    <div className="search-bar__inputs">
      <div className="search-bar__inputs-text">
        <input
          type="text"
          className="form__input search-bar__inputs-text-input"
          onChange={handleSearchInputChange}
          onKeyPress={searchWithEnter}
          value={term || ""}
        ></input>
        {term !== "" && term !== undefined && (
          <Button excludeMainClass={true} clearInput handleClick={handleXclick}>
            <CircleX className="search-bar__inputs-circle-x-icon" />
          </Button>
        )}
      </div>
      <div className="search-bar__inputs-date">
        <label
          htmlFor="reservationDate"
          className="search-bar__inputs-date-input-label"
        >
          Reservation date
        </label>
        <input
          type="date"
          name="reservationDate"
          className="form__input search-bar__inputs-date-input"
          onChange={handleDateChange}
          min={todaysDate()}
          value={date}
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

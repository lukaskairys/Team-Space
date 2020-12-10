import React from "react";

import Button from "components/button/Button";
import { ReactComponent as SearchIcon } from "assets/icons/magnifying-glass.svg";

import "./searchInputs.scss";

function SearchInputs() {
  return (
    <div className="search-bar__inputs">
      <div className="search-bar__inputs-text">
        <input
          type="search"
          className="form__input search-bar__inputs-text-input"
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
        ></input>
      </div>
      <div className="search-bar__inputs-button">
        <Button>
          <SearchIcon className="search-bar__inputs-search-button-icon" />
          Search
        </Button>
      </div>
    </div>
  );
}

export default SearchInputs;

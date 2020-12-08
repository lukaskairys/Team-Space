import React from "react";

import Button from "components/button/Button";

import { ReactComponent as HeartIcon } from "assets/icons/heart.svg";
import { ReactComponent as CheckIcon } from "assets/icons/check.svg";
import { ReactComponent as SearchIcon } from "assets/icons/magnifying-glass.svg";

import "./search.scss";

function Search() {
  return (
    <div className="search-bar">
      <h2 className="search-bar__title">Search</h2>
      <div className="search-bar__filter">
        <Button
          blankWithBorder={true}
          medium={true}
          className="search-bar__filter-button"
        >
          All
        </Button>
        <Button
          blankWithBorder={true}
          medium={true}
          className="search-bar__filter-button"
        >
          <HeartIcon className="search-bar__heart-icon" />
          Favorites
        </Button>
        <Button
          blankWithBorder={true}
          medium={true}
          className="search-bar__filter-button"
        >
          <CheckIcon className="search-bar__check-icon" /> Available
        </Button>
      </div>
      <label htmlFor="reservationDate" className="reservation-date-label">
        RESERVATION DATE
      </label>
      <div className="search-bar__inputs">
        <div>
          <input
            type="text"
            className="form__input search-bar__text-input"
          ></input>
        </div>
        <div className="search-bar__inputs-date">
          <input
            type="date"
            name="reservationDate"
            className="form__input search-bar__date-input"
          ></input>
        </div>
        <Button>
          <SearchIcon className="search-bar__search-icon" /> Search
        </Button>
      </div>
    </div>
  );
}

export default Search;

import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "components/button/Button";
import { ReactComponent as HeartIcon } from "assets/icons/heart.svg";
import { ReactComponent as CheckIcon } from "assets/icons/check.svg";

import "./search.scss";

function SearchFilters({ availableFilter }) {
  const [available, setAvailable] = useState(false);

  const showAvailable = (e) => {
    let setFilter = !available;
    setAvailable(setFilter);
    availableFilter(setFilter);
  };

  const showAll = (e) => {
    setAvailable(false);
    availableFilter(false);
  };

  return (
    <div className="search-bar__filter">
      <Button
        filterButton
        excludeMainClass={true}
        medium
        handleClick={showAll}
        activeFilter={available ? false : true}
      >
        All
      </Button>
      <Button filterButton excludeMainClass={true} medium>
        <HeartIcon className="search-bar__heart-icon" />
        Favorites
      </Button>
      <Button
        filterButton
        excludeMainClass={true}
        activeFilter={available ? true : false}
        medium
        handleClick={showAvailable}
      >
        <CheckIcon className="search-bar__check-icon" /> Available
      </Button>
    </div>
  );
}

SearchFilters.propTypes = {
  availableFilter: PropTypes.func,
};

export default SearchFilters;

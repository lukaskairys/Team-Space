import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "components/button/Button";
import { ReactComponent as HeartIcon } from "assets/icons/heart.svg";
import { ReactComponent as CheckIcon } from "assets/icons/check.svg";

import "./search.scss";

function SearchFilters({ activeFilter }) {
  const [available, setAvailable] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const showAvailable = (e) => {
    let setFilter = !available;
    setFavorite(false);
    setAvailable(setFilter);
    activeFilter(setFilter, false);
  };

  const showAll = (e) => {
    setAvailable(false);
    activeFilter(false);
    setFavorite(false);
  };

  const showFavorites = (e) => {
    let setFilter = !favorite;
    setFavorite(setFilter);
    activeFilter(false, setFilter);

    setAvailable(false);
  };

  return (
    <div className="search-bar__filter">
      <Button
        filterButton
        excludeMainClass={true}
        medium
        handleClick={showAll}
        activeFilter={available || favorite ? false : true}
      >
        All
      </Button>
      <Button
        filterButton
        excludeMainClass={true}
        medium
        handleClick={showFavorites}
        activeFilter={favorite ? true : false}
      >
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
  activeFilter: PropTypes.func,
};

export default SearchFilters;

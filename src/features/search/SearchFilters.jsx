import React from "react";

import Button from "components/button/Button";
import { ReactComponent as HeartIcon } from "assets/icons/heart.svg";
import { ReactComponent as CheckIcon } from "assets/icons/check.svg";

import "./search.scss";

function SearchFilters() {
  return (
    <div className="search-bar__filter">
      <Button blankWithBorder={true} medium={true}>
        All
      </Button>
      <Button blankWithBorder={true} medium={true}>
        <HeartIcon className="search-bar__heart-icon" />
        Favorites
      </Button>
      <Button blankWithBorder={true} medium={true}>
        <CheckIcon className="search-bar__check-icon" /> Available
      </Button>
    </div>
  );
}

export default SearchFilters;

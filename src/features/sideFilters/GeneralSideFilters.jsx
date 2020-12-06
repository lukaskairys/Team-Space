import React from "react";
import PropTypes from "prop-types";

import Button from "components/button/Button";
import { ReactComponent as Line } from "assets/images/Rectangle.svg";
import { ReactComponent as Clear } from "assets/icons/x.svg";
import { useSideFilter } from "./useSideFilter";
import Checkbox from "./Checkbox";
import "./generalSideFilters.scss";

function GeneralSideFilters({ filterItems, title }) {
  const { handleChange, checkedItems, clearAll } = useSideFilter();

  const checkboxes = filterItems.map((item) => ({
    name: item.replace(/\s+/g, "-").toLowerCase(),
    label: item,
  }));

  return (
    <div className="side-filter">
      <div className="side-filter__top">
        <span>{title}</span>
        <Button blankWithBorder={true} medium={true} handleClick={clearAll}>
          <span>Clear all</span>
          <Clear className="side-filter__clearX" />
        </Button>
      </div>
      <Line className="side-filter__line" />
      <ul className="side-filter__list">
        {checkboxes.map((item) => (
          <Checkbox
            key={item.name}
            name={item.name}
            checked={checkedItems[item.name]}
            onChange={handleChange}
            label={item.label}
          />
        ))}
      </ul>
    </div>
  );
}

GeneralSideFilters.propTypes = {
  filterItems: PropTypes.array,
  title: PropTypes.string,
};
export default GeneralSideFilters;

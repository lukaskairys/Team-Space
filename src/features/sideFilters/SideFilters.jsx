import React, { forwardRef } from "react";
import PropTypes from "prop-types";

import Button from "components/button/Button";
import Checkbox from "./Checkbox";

import { ReactComponent as Clear } from "assets/icons/x.svg";
import "./sideFilters.scss";

const SideFilters = forwardRef(
  ({ filterItems, title, clearAll, tags, handleChange }, filterRef) => {
    const checkboxes = filterItems.map((item) => ({
      name: item.replace(/\s+/g, "-").toLowerCase(),
      label: item,
    }));

    return (
      <div className="side-filter" ref={filterRef} data-filtertype={title}>
        <div className="side-filter__top">
          <span>{title}</span>
          <Button
            blankWithBorder={true}
            medium={true}
            handleClick={() => clearAll(filterRef.current)}
          >
            <span>Clear all</span>
            <Clear className="side-filter__clearX" />
          </Button>
        </div>
        <fieldset className="side-filter__list">
          <legend aria-label={title}></legend>
          {checkboxes.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              checked={tags[title].includes(item.name)}
              onChange={handleChange}
              label={item.label}
              dataFilterType={title}
            />
          ))}
        </fieldset>
      </div>
    );
  }
);

SideFilters.displayName = "SideFilters";
SideFilters.propTypes = {
  filterItems: PropTypes.array,
  title: PropTypes.string,
  clearAll: PropTypes.func,
  tags: PropTypes.shape({
    deviceType: PropTypes.array,
    os: PropTypes.array,
    brand: PropTypes.array,
  }),
  handleChange: PropTypes.func,
};
export default SideFilters;

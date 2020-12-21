import React from "react";
import PropTypes from "prop-types";

import Checkbox from "./Checkbox";

import "./sideFilters.scss";

const Checkboxes = ({ filterItems, title, clearAll, tags, handleChange }) => {
  const checkboxes = filterItems.map((item) => ({
    name: item,
    label: item,
  }));

  return (
    <div className="side-filter__list-wrapper">
      <fieldset className="side-filter__list">
        <legend
          aria-label={title
            .replace(/([A-Z])/g, " $1")
            .trim()
            .toLowerCase()}
        ></legend>
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
};

Checkboxes.displayName = "Checkboxes";
Checkboxes.propTypes = {
  filterItems: PropTypes.array,
  title: PropTypes.string,
  clearAll: PropTypes.func,
  tags: PropTypes.shape({
    deviceType: PropTypes.array,
    os: PropTypes.array,
    brand: PropTypes.array,
    genres: PropTypes.array,
  }),
  handleChange: PropTypes.func,
};
export default Checkboxes;

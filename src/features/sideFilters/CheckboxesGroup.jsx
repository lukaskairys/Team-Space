import React from "react";
import PropTypes from "prop-types";

import Checkbox from "./Checkbox";

import "./checkboxesGroup.scss";

const Checkboxes = (props) => {
  const { filterItems, title, tags, handleChange, isCombined } = props;
  const checkboxes = filterItems.map((item) => ({
    name: item,
    label: item,
  }));

  return (
    <fieldset className="checkboxes-group">
      <legend className="visually-hidden">
        choose
        {title
          .replace(/([A-Z])/g, " $1")
          .trim()
          .toLowerCase()}
        . {isCombined && "Combined selection filter."}
      </legend>
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
  );
};

Checkboxes.propTypes = {
  filterItems: PropTypes.array,
  title: PropTypes.string,
  tags: PropTypes.shape({
    deviceType: PropTypes.array,
    os: PropTypes.array,
    brand: PropTypes.array,
    genres: PropTypes.array,
  }),
  handleChange: PropTypes.func,
  isCombined: PropTypes.bool,
};
export default Checkboxes;

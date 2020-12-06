import React from "react";
import PropTypes from "prop-types";

import "./checkbox.scss";

const Checkbox = ({ name, checked, onChange, label, dataFilterType }) => {
  return (
    <div className="checkbox">
      <input
        className="checkbox__input"
        type={"checkbox"}
        name={name}
        value={name}
        checked={checked}
        onChange={onChange}
        id={name}
        data-filtertype={dataFilterType}
      />
      <label htmlFor={name} className="checkbox__label">
        <span className="checkbox__label-text">{label}</span>
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string,
  dataFilterType: PropTypes.string,
};

export default Checkbox;

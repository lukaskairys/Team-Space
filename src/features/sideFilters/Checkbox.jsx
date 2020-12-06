import React from "react";
import PropTypes from "prop-types";

import "./checkbox.scss";

const Checkbox = ({ name, checked = false, onChange, label }) => {
  return (
    <li className="checkbox-item">
      <input
        type={"checkbox"}
        name={name}
        value={name}
        checked={checked}
        onChange={onChange}
        id={name}
      />
      <label htmlFor={name}>
        <span>{label}</span>
      </label>
    </li>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string,
};

export default Checkbox;

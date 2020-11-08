import React, { useState } from "react";
import PropTypes from "prop-types";
import "./formInput.scss";

function FormInput(props) {
  const { name, type, placeholder, onChange, className, value, label } = props;

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={className}
      />
    </>
  );
}

FormInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  className: PropTypes.string,
};

export default FormInput;

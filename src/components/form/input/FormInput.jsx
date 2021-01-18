import React, { useRef } from "react";
import PropTypes from "prop-types";

import { ReactComponent as IconX } from "assets/images/x.svg";

import "./formInput.scss";

function FormInput(props) {
  const {
    name,
    label,
    type,
    placeholder,
    id = name,
    onChange,
    className,
    value,
    onBlur,
    isError,
    maxDate,
    describedby,
    ariaRequired,
    onKeyPress,
  } = props;

  const inputRef = useRef(null);

  return (
    <>
      <label htmlFor={name}>
        {label} {ariaRequired && <span aria-hidden>*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={className}
        onBlur={onBlur}
        ref={inputRef}
        max={maxDate}
        aria-describedby={describedby}
        autoComplete="off"
        onKeyPress={onKeyPress}
        aria-required={ariaRequired ? "true" : "false"}
        aria-invalid={isError ? "true" : "false"}
      />
      {isError && <IconX className="form-input__x-icon" />}
    </>
  );
}

FormInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
  className: PropTypes.string,
  onBlur: PropTypes.func,
  isError: PropTypes.bool,
  maxDate: PropTypes.string,
  describedby: PropTypes.string,
  ariaRequired: PropTypes.bool,
  onKeyPress: PropTypes.func,
};

export default FormInput;

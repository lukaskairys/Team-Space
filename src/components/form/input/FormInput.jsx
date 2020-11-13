import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as IconX } from "../../../assets/images/x.svg";
import "./formInput.scss";

function FormInput(props) {
  const {
    name,
    type,
    placeholder,
    onChange,
    className,
    value,
    label,
    onFocus,
    isError,
  } = props;

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
        onFocus={onFocus}
      />
      {isError ? <IconX className="form__icon-x" /> : ""}
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
  onFocus: PropTypes.func,
  handleClick: PropTypes.func,
  isError: PropTypes.bool,
};

export default FormInput;

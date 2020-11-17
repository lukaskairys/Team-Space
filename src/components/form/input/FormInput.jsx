import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as IconX } from "../../../assets/images/x.svg";
import "./formInput.scss";
import Button from "../../button/Button";

function FormInput(props) {
  let {
    name,
    label,
    type,
    placeholder = label,
    id = name,
    onChange,
    className,
    value,
    onFocus,
    isError,
    handleXclick,
  } = props;

  const inputRef = React.useRef(null);

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={className}
        onFocus={onFocus}
        ref={inputRef}
      />
      {isError && (
        <Button
          type={"button"}
          del={"true"}
          handleClick={() => handleXclick(inputRef)}
        >
          <IconX />
        </Button>
      )}
    </>
  );
}

FormInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  className: PropTypes.string,
  onFocus: PropTypes.func,
  handleXclick: PropTypes.func,
  isError: PropTypes.bool,
};

export default FormInput;

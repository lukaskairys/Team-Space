import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./button.scss";

function Button({
  type = "button",
  handleClick,
  children,
  large,
  medium,
  del,
  dropdown,
}) {
  const btnClass = classNames({
    button: true,
    "button--large": large,
    "button--medium": medium,
    "button__icon-x": del,
    "dropdown-btn": dropdown,
  });
  return (
    <button type={type} onClick={handleClick} className={btnClass}>
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  handleClick: PropTypes.func,
  children: PropTypes.object,
  large: PropTypes.bool,
  del: PropTypes.bool,
  medium: PropTypes.bool,
  dropdown: PropTypes.bool,
};

export default Button;

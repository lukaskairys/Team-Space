import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./button.scss";

function Button({ type = "button", handleClick, children, large, medium }) {
  const btnClass = classNames({
    button: true,
    "button--large": large === "true",
    "button--medium": medium === "true",
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
  large: PropTypes.string,
  medium: PropTypes.string,
};

export default Button;

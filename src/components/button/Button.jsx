import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./button.scss";

function Button({ type = "button", handleClick, children, large, del }) {
  const btnClass = classNames({
    button: true,
    "button--large": large === "true",
    "button__icon-x": del === "true",
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
  del: PropTypes.string,
};

export default Button;

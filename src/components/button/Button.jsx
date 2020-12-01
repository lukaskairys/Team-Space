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
  iconX,
  blank,
}) {
  const btnClass = classNames({
    button: true,
    "button--large": large,
    "button--medium": medium,
    "button--icon-x": iconX,
    "button--blank": blank,
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
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  large: PropTypes.bool,
  iconX: PropTypes.bool,
  medium: PropTypes.bool,
  blank: PropTypes.bool,
};

export default Button;

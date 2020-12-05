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
  pagination,
  isStatic,
  isActive,
}) {
  const btnClass = classNames({
    button: true,
    "button--large": large,
    "button--medium": medium,
    "button--icon-x": iconX,
    "button--blank": blank,
    "button--pagination": pagination,
    "is-static": isStatic,
    "is-active": isActive,
  });
  return (
    <button
      type={type}
      onClick={handleClick}
      className={btnClass}
      tabIndex={isStatic && "-1"}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  handleClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  large: PropTypes.bool,
  iconX: PropTypes.bool,
  medium: PropTypes.bool,
  blank: PropTypes.bool,
  pagination: PropTypes.bool,
  isStatic: PropTypes.bool,
  isActive: PropTypes.bool,
};

export default Button;

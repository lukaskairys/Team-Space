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
  empty,
  isStatic,
  isActive,
  disabled,
  blankWithBorder,
  dataTagName,
  filterButton,
  activeFilter,
}) {
  const btnClass = classNames({
    button: true,
    "button--large": large,
    "button--medium": medium,
    "button--icon-x": iconX,
    "button--blank": blank,
    "button--pagination": pagination,
    "button--empty": empty,
    "is-static": isStatic,
    "is-active": isActive,
    "button--blank-with-border": blankWithBorder,
    "button--filter-button": filterButton,
    "button--filter-button-active": activeFilter,
  });
  return (
    <button
      type={type}
      onClick={handleClick}
      className={btnClass}
      tabIndex={isStatic && "-1"}
      disabled={disabled}
      data-tag-name={dataTagName}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  handleClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.array,
  ]),
  large: PropTypes.bool,
  iconX: PropTypes.bool,
  medium: PropTypes.bool,
  blank: PropTypes.bool,
  pagination: PropTypes.bool,
  empty: PropTypes.bool,
  isStatic: PropTypes.bool,
  isActive: PropTypes.bool,
  disabled: PropTypes.bool,
  blankWithBorder: PropTypes.bool,
  dataTagName: PropTypes.string,
  filterButton: PropTypes.bool,
  activeFilter: PropTypes.bool,
};

export default Button;

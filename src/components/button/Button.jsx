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
  isMarked,
  disabled,
  blankWithBorder,
  blankNoBorder,
  dataTagName,
  filterButton,
  activeFilter,
  withIcon,
  excludeMainClass,
  clearInput,
  buttonRef,
}) {
  const btnClass = classNames({
    button: !excludeMainClass,
    "button--large": large,
    "button--medium": medium,
    "button--icon-x": iconX,
    "button--blank": blank,
    "button--pagination": pagination,
    "button--empty": empty,
    "is-static": isStatic,
    "is-active": isActive,
    "is-active-setting": isMarked,
    "button--blank-with-border": blankWithBorder,
    "button--blank-no-border": blankNoBorder,
    "button--filter-button": filterButton,
    "button--filter-button-active": activeFilter,
    "button--with-icon": withIcon,
    "button--clear-input": clearInput,
  });
  return (
    <button
      type={type}
      onClick={handleClick}
      className={btnClass}
      tabIndex={isStatic && "-1"}
      disabled={disabled}
      data-tag-name={dataTagName}
      ref={buttonRef}
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
  isMarked: PropTypes.bool,
  disabled: PropTypes.bool,
  blankWithBorder: PropTypes.bool,
  blankNoBorder: PropTypes.bool,
  dataTagName: PropTypes.string,
  filterButton: PropTypes.bool,
  activeFilter: PropTypes.bool,
  withIcon: PropTypes.bool,
  excludeMainClass: PropTypes.bool,
  clearInput: PropTypes.bool,
  buttonRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

export default Button;

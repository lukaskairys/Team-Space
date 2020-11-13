import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./button.scss";

function Button(props) {
  const btnClass = classNames({
    button: true,
    "button--large": props.large,
  });
  return (
    <button onClick={props.handleClick} className={btnClass}>
      {props.children}
    </button>
  );
}

Button.propTypes = {
  handleClick: PropTypes.func,
  children: PropTypes.element,
  large: PropTypes.bool,
};

export default Button;

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./button.scss";

function Button({ handleClick, text, ...props }) {
  const btnClass = classNames({
    button: true,
    "button--large": props.large,
  });
  return (
    <button {...props} onClick={handleClick} className={btnClass}>
      {text}
    </button>
  );
}

Button.propTypes = {
  handleClick: PropTypes.func,
  text: PropTypes.string,
  additionalClassNames: PropTypes.string,
  large: PropTypes.bool,
};

export default Button;

import React from "react";
import PropTypes from "prop-types";
import "./button.scss";

function Button({ handleClick, additionalClassNames, text, ...props }) {
  return (
    <button
      {...props}
      onClick={handleClick}
      className={`button ${additionalClassNames}`}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  handleClick: PropTypes.func,
  text: PropTypes.string,
  additionalClassNames: PropTypes.string,
};

export default Button;

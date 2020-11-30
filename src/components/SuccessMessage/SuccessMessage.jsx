import React, { useRef } from "react";
import PropTypes from "prop-types";

import { ReactComponent as Check } from "assets/icons/check.svg";
import { ReactComponent as IconX } from "assets/images/x.svg";
import Button from "components/button/Button";

import "./successMessage.scss";

function SuccessMessage({ message }) {
  const ref = useRef();
  const closeMessage = () => {
    ref.current.style.display = "none";
  };
  return (
    <p className="success-message" ref={ref}>
      <Check className="success-message__icon" />
      {message}
      <Button iconX={true} type={"button"} handleClick={closeMessage}>
        <IconX />
      </Button>
    </p>
  );
}

SuccessMessage.propTypes = {
  message: PropTypes.string,
};

export default SuccessMessage;

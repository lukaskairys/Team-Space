import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Button from "components/button/Button";
import { ReactComponent as Check } from "assets/icons/check.svg";
import { ReactComponent as IconX } from "assets/images/x.svg";
import { ReactComponent as CircleX } from "assets/icons/x-circle.svg";

import "./message.scss";

function Message({ type, message, setShowMessage }) {
  const messageClass = classNames({
    message: true,
    "message--success": type === "success",
    "message--error": type === "error",
  });

  const buttonRef = useRef(null);

  useEffect(() => {
    buttonRef?.current && buttonRef.current.focus();
  }, [message]);

  const closeMessage = () => {
    setShowMessage(false);
  };

  return (
    <p className={messageClass} role={type === "error" ? "alert" : ""}>
      {type === "success" && <Check className="message__icon" />}
      {type === "error" && <CircleX className="message__icon" />}
      {message}
      <Button
        iconX={true}
        type={"button"}
        handleClick={closeMessage}
        ariaLabelText={"close error"}
        buttonRef={buttonRef}
      >
        <IconX />
      </Button>
    </p>
  );
}

Message.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
  setShowMessage: PropTypes.func,
};

export default Message;

import React, { useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Button from "components/button/Button";
import { ReactComponent as Check } from "assets/icons/check.svg";
import { ReactComponent as IconX } from "assets/images/x.svg";
import { ReactComponent as CircleX } from "assets/icons/x-circle.svg";

import "./message.scss";

function Message({ type, message }) {
  const messageClass = classNames({
    message: true,
    "message--success": type === "success",
    "message--error": type === "error",
  });

  const ref = useRef();
  const closeMessage = () => {
    ref.current.style.display = "none";
  };

  return (
    <p className={messageClass} ref={ref}>
      {type === "success" && <Check className="message__icon" />}
      {type === "error" && <CircleX className="message__icon" />}
      {message}
      <Button iconX={true} type={"button"} handleClick={closeMessage}>
        <IconX />
      </Button>
    </p>
  );
}

Message.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
};

export default Message;

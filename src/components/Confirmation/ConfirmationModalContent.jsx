import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "components/button/Button";
import FormInput from "components/form/input/FormInput";

import "./confirmationModalContent.scss";

const ConfirmationModalContent = ({
  confirm,
  cancel,
  title,
  content,
  withPassword,
  cancelText,
  confirmText,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const confirmWithEnter = (e) => {
    if (e.key === "Enter") {
      confirm(inputValue, setError);
    }
  };

  return (
    <div className="confirmation">
      <h4 className="confirmation__question">{title}</h4>
      <p className="confirmation__text">{content}</p>
      {withPassword && (
        <>
          <FormInput
            name="password"
            label={"Please confirm with password"}
            type={"password"}
            placeholder={"******"}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={confirmWithEnter}
            value={inputValue}
            className={`form-input ${error !== "" && "form-input--error"}`}
            isError={error !== "" ? true : false}
          />
          <p className="form-content__error-msg" aria-live="assertive">
            {error}
          </p>
        </>
      )}

      <div className="confirmation__buttons">
        <Button medium handleClick={(e) => confirm(inputValue, setError)}>
          {confirmText ? confirmText : "confirm"}
        </Button>
        <Button medium blank handleClick={cancel}>
          {cancelText ? cancelText : "cancel"}
        </Button>
      </div>
    </div>
  );
};

ConfirmationModalContent.propTypes = {
  confirm: PropTypes.func,
  cancel: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.string,
  withPassword: PropTypes.bool,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
};

export default ConfirmationModalContent;

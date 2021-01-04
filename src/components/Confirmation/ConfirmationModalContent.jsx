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
}) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

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
            value={inputValue}
            className={`form-input ${error !== "" && "form-input--error"}`}
            isError={error !== "" ? true : false}
            handleXclick={() => setInputValue("")}
            onFocus={() => setError("")}
          />
          <p className="form-content__error-msg">{error}</p>
        </>
      )}

      <div className="confirmation__buttons">
        <Button medium handleClick={(e) => confirm(inputValue, setError)}>
          confirm
        </Button>
        <Button medium blank handleClick={cancel}>
          cancel
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
};

export default ConfirmationModalContent;

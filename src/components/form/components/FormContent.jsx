import React from "react";
import PropTypes from "prop-types";
import FormInput from "../input/FormInput";
import {
  registerForm,
  loginForm,
  accountForm,
  passwordsForm,
  emailForm,
} from "../utils/formFields";

import "./formContent.scss";

function FormContent(props) {
  const {
    action,
    values,
    errors,
    handleChange,
    handleFocus,
    handleXclick,
  } = props;

  const formStructure = getFormStructure();
  function getFormStructure() {
    let formStructure;
    switch (action) {
      case "register":
        formStructure = registerForm;
        break;
      case "login":
        formStructure = loginForm;
        break;
      case "account":
        formStructure = accountForm;
        break;
      case "passwords":
        formStructure = passwordsForm;
        break;
      case "email":
        formStructure = emailForm;
        break;
      default:
        return;
    }
    return formStructure;
  }

  return (
    <div className="form-content">
      {formStructure.map((field, i) => (
        <div
          className={`form-content__item ${
            field.inputLong && "form-content__item--long"
          }`}
          key={i}
        >
          <FormInput
            label={field.text}
            type={field.type}
            value={values[field.name] || ""}
            name={field.name}
            placeholder={field.placeholder}
            onChange={handleChange}
            onFocus={handleFocus}
            className={`form-input ${
              errors[field.name] && "form-input--error"
            }`}
            isError={errors[field.name] ? true : false}
            handleXclick={handleXclick}
          />
          <p className="form-content__error-msg">{errors[field.name]}</p>
        </div>
      ))}
    </div>
  );
}

FormContent.propTypes = {
  action: PropTypes.string,
  values: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleFocus: PropTypes.func,
  handleXclick: PropTypes.func,
};

export default FormContent;

import React from "react";
import PropTypes from "prop-types";
import FormInput from "./input/FormInput";
import { registerForm } from "../../features/registration/components/registrationFields";
import { loginForm } from "../../features/login/loginFields";

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
    if (action === "register") return registerForm;
    else if (action === "login") return loginForm;
  }

  return (
    <>
      {formStructure.map((field) => (
        <div
          className={`form__item ${field.inputLong && "form__item--long"}`}
          key={field.name}
        >
          <FormInput
            label={field.text}
            type={field.type}
            value={values[field.name] || ""}
            name={field.name}
            placeholder={field.placeholder}
            onChange={handleChange}
            onFocus={handleFocus}
            className={`form__input ${
              errors[field.name] && "form__input--error"
            }`}
            isError={errors[field.name] ? true : false}
            handleXclick={handleXclick}
          />
          <p className="form__error-msg">{errors[field.name]}</p>
        </div>
      ))}
    </>
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

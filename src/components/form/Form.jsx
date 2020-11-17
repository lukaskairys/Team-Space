import React from "react";
import PropTypes from "prop-types";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";
import useForm from "./useForm";
import { validateRegistration, noValidation } from "./validationRules";

function Form({ title, subtitle, action }) {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleFocus,
    handleXclick,
  } = useForm(
    getCallback(),
    action === "register" ? validateRegistration : noValidation
  );

  function getCallback() {
    if (action === "register") return register;
    else if (action === "login") return login;
  }

  function register() {
    // logic what happens when submit - probably send data into db.json
  }

  function login() {
    // logic what happens when submit - probably send data into db.json
  }

  return (
    <div className="form">
      <div className="form__header">
        <h2 className="form__title">{title}</h2>
        <p className="form__subtitle">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form__content">
          <FormContent
            values={values}
            errors={errors}
            handleChange={handleChange}
            handleFocus={handleFocus}
            action={action}
            handleXclick={handleXclick}
          />
        </div>
        <div className="form__footer">
          <FormFooter action={action} />
        </div>
      </form>
    </div>
  );
}

Form.propTypes = {
  action: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  buttonLabel: PropTypes.string,
};

export default Form;

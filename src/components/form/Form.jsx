import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

import useForm from "./useForm";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";
import SuccessMessage from "components/SuccessMessage/SuccessMessage";

import { validateRegistration, validateLogin } from "./validationRules";

function Form({ title, subtitle, action }) {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleFocus,
    handleXclick,
  } = useForm(getCallback(), getValidation());

  let history = useHistory();

  function getCallback() {
    if (action === "register") return register;
    else if (action === "login") return login;
  }

  function getValidation() {
    if (action === "register") return validateRegistration;
    else if (action === "login") return validateLogin;
  }

  function register() {
    history.push("/login", {
      message: "Your registration was successful.",
    });
    // logic what happens when submit - probably send data into db.json
  }

  function login() {
    history.push("/");
    // logic what happens when submit - probably send data into db.json
  }
  const location = useLocation();

  return (
    <>
      <div className="form">
        {location.state ? (
          <SuccessMessage message={location.state.message} />
        ) : (
          ""
        )}
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
    </>
  );
}

Form.propTypes = {
  action: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  buttonLabel: PropTypes.string,
};

export default Form;

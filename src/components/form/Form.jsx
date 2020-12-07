import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import useForm from "./useForm";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";
import Message from "components/Message/Message";

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

  // eslint-disable-next-line
  const [showErrorMessage, setShowErrorMessage] = useState(false);

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
    // TODO: logic what happens when submit (form here is already validated) - send data to db.json, auto-login
    // if failed to post data in json - setShowError(true)
    history.push("/", {
      message: "Your registration was successful.",
    });
  }

  function login() {
    // TODO: logic what happens when submit - check email & password on db.json
    // if failed to check data in json - setShowError(true)
    history.push("/");
  }

  return (
    <>
      <div className="form">
        {showErrorMessage && (
          <Message message={"Something went wrong"} type={"error"} />
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

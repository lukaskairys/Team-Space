import React from "react";
import PropTypes from "prop-types";

import useForm from "./useForm";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";
import Message from "components/Message/Message";
import Loader from "react-loader-spinner";
import { validateRegistration, validateLogin } from "./validationRules";
import { useAuthentication } from "authentication/useAuthentication.jsx";

function Form({ title, subtitle, action }) {
  const {
    login,
    register,
    showErrorMessage,
    messageText,
    isPosting,
  } = useAuthentication();

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleFocus,
    handleXclick,
  } = useForm(getCallback(), getValidation());

  const dataToPost = {
    userName: `${values.firstName} ${values.lastName}`,
    email: values.email,
    userImage: "https://i.ibb.co/6WtwM35/Untitled.jpg",
    birthdayDate: "",
    location: "",
    reservations: {
      books: [],
      devices: [],
    },
    notifications: [],
    liked: {
      restaurants: [],
      books: [],
      devices: [],
      stories: [],
    },
    checkIn: {},
  };

  function getCallback() {
    if (action === "register")
      return () => register(values.password, dataToPost);
    else if (action === "login")
      return () => login(values.email, values.password);
  }

  function getValidation() {
    if (action === "register") return validateRegistration;
    else if (action === "login") return validateLogin;
  }

  return (
    <>
      <div className="form">
        {showErrorMessage && <Message message={messageText} type={"error"} />}
        <div className="form__header">
          <h2 className="form__title">{title}</h2>
          <p className="form__subtitle">{subtitle}</p>
        </div>

        <form onSubmit={handleSubmit}>
          {isPosting ? (
            <div className="form__loader">
              <Loader type="TailSpin" color="#6e44ff" height={80} width={80} />
            </div>
          ) : (
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
          )}

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

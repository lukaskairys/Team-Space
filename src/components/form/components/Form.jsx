import React from "react";
import PropTypes from "prop-types";

import useForm from "../utils/useForm.js";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";
import Message from "components/Message/Message";
import Loader from "react-loader-spinner";
import {
  validateRegistration,
  validateLogin,
  validateSettings,
  validatePasswords,
} from "../utils/validationRules";
import { useAuthentication } from "authentication/useAuthentication";

function Form({ title, subtitle, action }) {
  const {
    login,
    register,
    changeAccountDetails,
    changePassword,
    showMessage,
    setShowMessage,
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
    userImage:
      "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png",
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

  const dataToChange = {
    userName: values.username,
    email: values.email,
    location: values.location,
    birthdayDate: values.birthday,
  };

  const passwords = {
    old: values.oldPassword,
    new: values.newPassword,
    repeat: values.repeatPassword,
  };

  function getCallback() {
    if (action === "register")
      return () => register(values.password, dataToPost);
    else if (action === "login")
      return () => login(values.email, values.password);
    else if (action === "account")
      return () => changeAccountDetails(dataToChange);
    else if (action === "passwords") return () => changePassword(passwords);
  }

  function getValidation() {
    if (action === "register") return validateRegistration;
    else if (action === "login") return validateLogin;
    else if (action === "account") return validateSettings;
    else if (action === "passwords") return validatePasswords;
  }

  return (
    <>
      <div className="form">
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
          {showMessage && (
            <Message
              message={messageText}
              type={"error"}
              setShowMessage={setShowMessage}
            />
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

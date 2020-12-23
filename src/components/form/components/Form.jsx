import React, { useState } from "react";
import PropTypes from "prop-types";

import useForm from "../utils/useForm.js";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";
import Message from "components/Message/Message";
import Loader from "react-loader-spinner";
import {
  validateRegistration,
  validateLogin,
  noValidation,
  validatePasswords,
  validateEmail,
} from "../utils/validationRules";
import { useAuthentication } from "authentication/useAuthentication";
import { useProfileSettings } from "features/ProfileSettings/useProfileSettings";

function Form({ title, subtitle, action, user, showModal }) {
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState("Something went wrong");

  const { login, register, isPosting } = useAuthentication(
    setShowMessage,
    setMessageText
  );

  const {
    changeAccountDetails,
    changePassword,
    changeEmail,
  } = useProfileSettings(user, setShowMessage, setMessageText);

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
    else if (action === "passwords")
      return () => changePassword(passwords, user);
    else if (action === "email")
      return () => changeEmail(values.email, values.oldPassword, user);
  }

  function getValidation() {
    if (action === "register") return validateRegistration;
    else if (action === "login") return validateLogin;
    else if (action === "account") return noValidation;
    else if (action === "passwords") return validatePasswords;
    else if (action === "email") return validateEmail;
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
            <FormFooter
              action={action}
              showModal={showModal}
              email={dataToChange.email}
            />
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
  user: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  showModal: PropTypes.func,
};

export default Form;

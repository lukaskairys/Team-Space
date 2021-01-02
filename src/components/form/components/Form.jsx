import React, { useState } from "react";
import PropTypes from "prop-types";

import useForm from "../utils/useForm";
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

const Form = (props) => {
  const {
    title,
    subtitle,
    action,
    user,
    setUser,
    showModal,
    settingsHeaderRenderer,
    max,
  } = props;
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
  } = useProfileSettings(user, setUser);

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
    userImage: "https://i.imgur.com/2DEZq70.jpg",
    birthdayDate: "",
    location: "",
    reservations: {
      books: [],
      devices: [],
      rooms: [],
    },
    notifications: [],
    liked: {
      restaurants: [],
      books: [],
      devices: [],
      rooms: [],
      stories: [],
      rooms: [],
    },
    checkIn: {},
  };

  const dataToChange = {
    userName: values.userName,
    location: values.location,
    birthdayDate: values.birthday,
  };

  const passwords = {
    old: values.oldPassword,
    new: values.newPassword,
    repeat: values.repeatPassword,
  };

  function getCallback() {
    let callback;
    switch (action) {
      case "register":
        callback = () => register(values.password, dataToPost);
        break;
      case "login":
        callback = () => login(values.email, values.password);
        break;
      case "account":
        callback = () => changeAccountDetails(dataToChange, setUser);
        break;
      case "passwords":
        callback = () => changePassword(passwords, user, setUser);
        break;
      case "email":
        callback = () =>
          changeEmail(values.email, values.oldPassword, user, setUser);
        break;
      default:
        return;
    }
    return callback;
  }

  function getValidation() {
    let validation;
    switch (action) {
      case "register":
        validation = validateRegistration;
        break;
      case "login":
        validation = validateLogin;
        break;
      case "account":
        validation = noValidation;
        break;
      case "passwords":
        validation = validatePasswords;
        break;
      case "email":
        validation = validateEmail;
        break;
      default:
        return;
    }
    return validation;
  }

  return (
    <section className="form">
      {settingsHeaderRenderer ? (
        settingsHeaderRenderer()
      ) : (
        <div className="form__header">
          <h2 className="form__title">{title}</h2>
          <p className="form__subtitle">{subtitle}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {isPosting ? (
          <div className="form__loader">
            <Loader type="TailSpin" color="#6e44ff" height={80} width={80} />
          </div>
        ) : (
          <FormContent
            values={values}
            errors={errors}
            handleChange={handleChange}
            handleFocus={handleFocus}
            action={action}
            handleXclick={handleXclick}
            max={max}
          />
        )}
        {showMessage && (
          <Message
            message={messageText}
            type={"error"}
            setShowMessage={setShowMessage}
          />
        )}

        <FormFooter
          action={action}
          showModal={showModal}
          email={dataToChange.email}
        />
      </form>
    </section>
  );
};

Form.propTypes = {
  action: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  buttonLabel: PropTypes.string,
  user: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  showModal: PropTypes.func,
  settingsHeaderRenderer: PropTypes.func,
  max: PropTypes.string,
  setUser: PropTypes.func,
};

export default Form;

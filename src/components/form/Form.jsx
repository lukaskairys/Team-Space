import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import useForm from "./useForm";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";
import Message from "components/Message/Message";

import { post } from "apis/postData";
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

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  let history = useHistory();

  const dataToPost = {
    userName: `${values.firstName} ${values.lastName}`,
    email: values.email,
    password: values.password,
    userImage: "https://i.ibb.co/6WtwM35/Untitled.jpg",
    birthdayDate: "1990-05-18",
    location: "Vilnius, Lithuania",
    reservations: {
      books: [
        {
          title: "Don't Make Me Think",
          id: "1jd85opw82",
        },
      ],
      devices: [
        {
          name: "iPhone X",
          id: "193ywpe740",
        },
      ],
    },
    notifications: [
      {
        userName: "Sara Lars",
        actionType: "Like",
        postId: "10972har27",
      },
    ],
  };

  function getCallback() {
    if (action === "register") return register;
    else if (action === "login") return login;
  }

  function getValidation() {
    if (action === "register") return validateRegistration;
    else if (action === "login") return validateLogin;
  }

  async function register() {
    try {
      await post("/users/", dataToPost);
      history.push("/", {
        message: "Your registration was successful.",
      });
    } catch (error) {
      setShowErrorMessage(true);
    }
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

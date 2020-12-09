import React, { useContext } from "react";
import PropTypes from "prop-types";

import useForm from "./useForm";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";
import Message from "components/Message/Message";

import { AuthContext } from "contexts/AuthContext";
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

  // const [showErrorMessage, setShowErrorMessage] = useState(false);
  // const [messageText, setMessageText] = useState("Something went wrong");

  const { login, register, messageText, showErrorMessage } = useContext(
    AuthContext
  );

  const dataToPost = {
    userName: `${values.firstName} ${values.lastName}`,
    email: values.email,
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
    liked: {
      restaurants: [
        {
          id: "x8bd7ozuj6",
        },
        {
          id: "h3hlqj5bcb",
        },
        {
          id: "porhch2lam",
        },
        {
          id: "9kdf9qawui",
        },
        {
          id: "sejw2ugddc",
        },
        {
          id: "120wsdlpx4",
        },
      ],
      books: [],
      devices: [],
      stories: [
        {
          id: "10197o9h40",
        },
      ],
    },
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

  // TODO: show some errors like validation

  return (
    <>
      <div className="form">
        {showErrorMessage && <Message message={messageText} type={"error"} />}
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

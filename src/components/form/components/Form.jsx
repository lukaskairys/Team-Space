import React, { useState } from "react";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";

import useForm from "../utils/useForm";
import FormContent from "./FormContent";
import FormControls from "./FormControls";
import Message from "components/Message/Message";
import ErrorsList from "./ErrorsList";

import { getValidation, getId } from "../utils/formsSwitchers";
import { getDataToUpdate } from "../utils/getDataToUpdate";
import { useAuthentication } from "authentication/useAuthentication";
import { useProfileSettings } from "features/ProfileSettings/useProfileSettings";
import { isObjectEmpty } from "utils/objects";

const Form = (props) => {
  const {
    title,
    subtitle,
    action,
    user,
    setUser,
    settingsNavigationRenderer,
    maxDate,
    confirmDeleteAccount,
    isFromSettings,
  } = props;
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState("Something went wrong");

  const { login, register, isPosting } = useAuthentication(
    setShowMessage,
    setMessageText
  );

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
    handleSettingsSubmit,
    handleBlur,
    submitClicked,
  } = useForm(getCallback(), getValidation(action), setShowMessage);

  const {
    changeAccountDetails,
    changePassword,
    changeEmail,
  } = useProfileSettings(user, setShowMessage, setValues, setErrors);

  const { dataToPost, dataToChange, passwords } = getDataToUpdate(values);

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
      case "password":
        callback = () => changePassword(passwords, user, setUser);
        break;
      case "email":
        callback = () =>
          changeEmail(values.email, values.currentPassword, user, setUser);
        break;
      default:
        return;
    }
    return callback;
  }

  return (
    <section className="form">
      {settingsNavigationRenderer ? (
        settingsNavigationRenderer(setValues, setErrors)
      ) : (
        <div className="form__header">
          <h2 className="form__title">{title}</h2>
          <p className="form__subtitle">{subtitle}</p>
        </div>
      )}

      <form
        onSubmit={!isFromSettings ? handleSubmit : handleSettingsSubmit}
        aria-labelledby={getId(action)}
      >
        <fieldset className="form__fieldset">
          <legend className="visually-hidden" id={getId(action)}>
            {settingsNavigationRenderer
              ? `change ${action} ${action === "account" ? "details" : ""}`
              : title}
          </legend>

          {isPosting ? (
            <div className="form__loader">
              <Loader type="TailSpin" color="#6e44ff" height={80} width={80} />
            </div>
          ) : (
            <>
              {!isObjectEmpty(errors) && (
                <ErrorsList errors={errors} submitClicked={submitClicked} />
              )}
              <FormContent
                values={values}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                action={action}
                maxDate={maxDate}
                setValues={setValues}
              />
            </>
          )}
          {showMessage && (
            <Message
              message={messageText}
              type={"error"}
              setShowMessage={setShowMessage}
            />
          )}
          <FormControls
            action={action}
            confirmDeleteAccount={confirmDeleteAccount}
          />
        </fieldset>
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
  settingsNavigationRenderer: PropTypes.func,
  maxDate: PropTypes.string,
  setUser: PropTypes.func,
  confirmDeleteAccount: PropTypes.func,
  isFromSettings: PropTypes.bool,
};

export default Form;

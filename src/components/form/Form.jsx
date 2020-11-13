import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../button/Button";
import FormInput from "./input/FormInput";
import useForm from "./useForm";
import validate from "../../features/registration/components/registrationValidationRules";
import "./form.scss";

function Form(props) {
  const { isRegister, isLogin, heading, underHeading, buttonLabel } = props;

  const callback = () => {
    if (isRegister) return register;
    if (isLogin) return login;
  };

  const { values, errors, handleChange, handleSubmit, handleFocus } = useForm(
    callback,
    validate
  );

  function register() {
    // logic what happens when submit - probably send data into db.json
  }

  function login() {
    // logic what happens when submit - probably redirect user to his homepage
  }

  return (
    <form className="form registration-form" onSubmit={handleSubmit}>
      <div className="form__header">
        <h2 className="form__heading">{heading}</h2>
        <p className="form__under-heading">{underHeading}</p>
      </div>
      <div className="form__row">
        <div className="form__item">
          <FormInput
            label={"First Name"}
            type={"text"}
            value={values.firstName || ""}
            name={"firstName"}
            placeholder={"First Name"}
            onChange={handleChange}
            onFocus={handleFocus}
            id={"firstName"}
            className={`form__input ${
              errors.firstName && "form__input--error"
            }`}
            isError={errors.firstName ? true : false}
          />
          <p className="form__error-msg">{errors.firstName}</p>
        </div>
        <div className="form__item">
          <FormInput
            label={"Last Name"}
            type={"text"}
            value={values.lastName || ""}
            name={"lastName"}
            placeholder={"Last Name"}
            onChange={handleChange}
            onFocus={handleFocus}
            id={"lastName"}
            className={`form__input ${errors.lastName && "form__input--error"}`}
            isError={errors.lastName ? true : false}
          />
          <p className="form__error-msg">{errors.lastName}</p>
        </div>
      </div>
      <div className="form__row">
        <div className="form__item form__item--long">
          <FormInput
            label={"Email"}
            type={"email"}
            value={values.email || ""}
            name={"email"}
            placeholder={"Email"}
            onChange={handleChange}
            onFocus={handleFocus}
            id={"email"}
            className={`form__input ${errors.email && "form__input--error"}`}
            isError={errors.email ? true : false}
          />
          <p className="form__error-msg">{errors.email}</p>
        </div>
      </div>
      <div className="form__row">
        <div className="form__item">
          <FormInput
            label={"Password"}
            type={"password"}
            value={values.password || ""}
            name={"password"}
            placeholder={"Password"}
            onChange={handleChange}
            onFocus={handleFocus}
            id={"password"}
            className={`form__input ${errors.password && "form__input--error"}`}
            isError={errors.password ? true : false}
          />
          <p className="form__error-msg">{errors.password}</p>
        </div>
        <div className="form__item">
          <FormInput
            label={"Repeat Password"}
            type={"password"}
            value={values.repeatPassword || ""}
            name={"repeatPassword"}
            placeholder={"Repeat Password"}
            onChange={handleChange}
            onFocus={handleFocus}
            id={"repeatPassword"}
            className={`form__input ${
              errors.repeatPassword && "form__input--error"
            }`}
            isError={errors.repeatPassword ? true : false}
          />
          <p className="form__error-msg">{errors.repeatPassword}</p>
        </div>
      </div>

      <div className="form__footer">
        <Button type={"submit"} large={true}>
          <span>{buttonLabel}</span>
        </Button>

        {props.isRegister && (
          <p>
            Already have account?
            <Link to="/login" className="form__signin-link">
              Sign in
            </Link>
          </p>
        )}
      </div>
    </form>
  );
}

Form.propTypes = {
  isRegister: PropTypes.bool,
  isLogin: PropTypes.bool,
  heading: PropTypes.string,
  underHeading: PropTypes.string,
  buttonLabel: PropTypes.string,
};

export default Form;

import React from "react";
import Button from "../../../components/button/Button";
import FormInput from "../../../components/input/FormInput";
import { ReactComponent as Logo } from "../../../assets/logo165.svg";
import useForm from "../../../utils/form/useForm";
import validate from "../../../utils/form/registrationValidationRules";
import "./form.scss";

function Registration() {
  const { values, errors, handleChange, handleSubmit, handleFocus } = useForm(
    register,
    validate
  );

  function register() {
    // add some logic, maybe send data to db?
  }

  return (
    <div className="page-container">
      <div className="form-container">
        <Logo className="logo" />
        <form className="form registration-form" onSubmit={handleSubmit}>
          <div className="form__header">
            <h2 className="form__heading">Register</h2>
            <p className="form__under-heading">Let’s get you on board.</p>
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
                className={`form__input ${
                  errors.lastName && "form__input--error"
                }`}
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
                className={`form__input ${
                  errors.email && "form__input--error"
                }`}
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
                className={`form__input ${
                  errors.password && "form__input--error"
                }`}
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
              <span>Register</span>
            </Button>
            <p>
              Already have account?
              <a href="/login" className="form__signin-link">
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;

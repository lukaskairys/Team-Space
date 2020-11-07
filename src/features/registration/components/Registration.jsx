import React, { useState } from "react";
import Button from "../../../components/button/Button";
import FormInput from "../../../components/input/FormInput";
import "./form.scss";

function Registration() {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    document.querySelector(".form__input").value = "";
    console.log(state);
  }

  return (
    <div className="page-container">
      <div className="form-container">
        <img
          className="form-container__logo"
          src={require("../../../assets/logo.png")}
          alt=""
        />
        <form className="form registration-form" onSubmit={handleSubmit}>
          <div className="form__header">
            <h2>Register</h2>
            <p>Let’s get you on board.</p>
          </div>
          <div className="form__row">
            <div className="form__item">
              <FormInput
                label={"First Name"}
                type={"text"}
                value={state.firstName}
                name={"firstName"}
                placeholder={"First Name"}
                onChange={handleChange}
                id={"firstName"}
                className={"form__input"}
              />
            </div>
            <div className="form__item">
              <FormInput
                label={"Last Name"}
                type={"text"}
                value={state.lastName}
                name={"lastName"}
                placeholder={"Last Name"}
                onChange={handleChange}
                id={"lastName"}
                className={"form__input"}
              />
            </div>
          </div>
          <div className="form__row">
            <div className="form__item form__item--long">
              <FormInput
                label={"Email"}
                type={"email"}
                value={state.email}
                name={"email"}
                placeholder={"Email"}
                onChange={handleChange}
                id={"email"}
                className={"form__input"}
              />
            </div>
          </div>
          <div className="form__row">
            <div className="form__item">
              <FormInput
                label={"Password"}
                type={"password"}
                value={state.password}
                name={"password"}
                placeholder={"Password"}
                onChange={handleChange}
                id={"password"}
                className={"form__input"}
              />
            </div>
            <div className="form__item">
              <FormInput
                label={"Repeat Password"}
                type={"password"}
                value={state.repeatPassword}
                name={"repeatPassword"}
                placeholder={"Repeat Password"}
                onChange={handleChange}
                id={"repeatPassword"}
                className={"form__input"}
              />
            </div>
          </div>

          <div className="form__footer">
            <Button
              type={"submit"}
              text={"Register"}
              additionalClassNames={"button__default button__default--large"}
            />
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

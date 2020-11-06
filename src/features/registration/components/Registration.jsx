import React, { useState } from "react";
import Button from "../../../components/button/Button";
import "./registration.scss";

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
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="registration-form__header">
            <h2>Register</h2>
            <p>Let’s get you on board.</p>
          </div>
          <div className="registration-form__row">
            <div className="registration-form__item">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                value={state.firstName}
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                id="firstName"
              />
            </div>
            <div className="registration-form__item">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                value={state.lastName}
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                id="lastName"
              />
            </div>
          </div>
          <div className="registration-form__row">
            <div className="registration-form__item registration-form__item--long">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={state.email}
                name="email"
                placeholder="First Name"
                onChange={handleChange}
                id="email"
              />
            </div>
          </div>
          <div className="registration-form__row">
            <div className="registration-form__item">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                value={state.password}
                name="password"
                placeholder="First Name"
                onChange={handleChange}
                id="password"
              />
            </div>
            <div className="registration-form__item">
              <label htmlFor="repeatPassword">Repeat Password</label>
              <input
                type="text"
                value={state.repeatPassword}
                name="repeatPassword"
                placeholder="Last Name"
                onChange={handleChange}
                id="repeatPassword"
              />
            </div>
          </div>
          <div className="registration-form__footer">
            <Button
              type={"submit"}
              text={"Register"}
              additionalClassNames={"button__default button__default--large"}
            />
            <p>
              Already have account?
              <a href="/login" className="registration-form__signin-link">
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

import React, { useState } from "react";
import "./registration.scss";

function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  return (
    <div className="page-container">
      <div className="form-container">
        <img
          className="form-container__logo"
          src={require("../../../assets/logo.png")}
          alt=""
        />
        <form className="registration-form">
          <div className="registration-form__header">
            <h2>Register</h2>
            <p>Let’s get you on board.</p>
          </div>
          <div className="registration-form__row">
            <div className="registration-form__item">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                value={firstName}
                name="firstName"
                placeholder="First Name"
                // onChange={handleChange}
                id="firstName"
              />
            </div>
            <div className="registration-form__item">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                value={lastName}
                name="lastName"
                placeholder="Last Name"
                // onChange={handleChange}
                id="lastName"
              />
            </div>
          </div>
          <div className="registration-form__row">
            <div className="registration-form__item registration-form__item--long">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={email}
                name="email"
                placeholder="First Name"
                // onChange={handleChange}
                id="email"
              />
            </div>
          </div>
          <div className="registration-form__row">
            <div className="registration-form__item">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                value={password}
                name="password"
                placeholder="First Name"
                // onChange={handleChange}
                id="password"
              />
            </div>
            <div className="registration-form__item">
              <label htmlFor="repeatPassword">Repeat Password</label>
              <input
                type="text"
                value={repeatPassword}
                name="repeatPassword"
                placeholder="Last Name"
                // onChange={handleChange}
                id="repeatPassword"
              />
            </div>
          </div>
          <div className="registration-form__footer">
            <button type="submit">Register</button>
            <p>
              Already have account?
              <a href="#" className="registration-form__signin-link">
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

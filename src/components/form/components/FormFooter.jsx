import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Button from "components/button/Button";

import "./formFooter.scss";

function FormFooter({ action, showModal }) {
  const getFormFooterData = () => {
    let data = {
      label: "",
      textBeforeLink: "",
      linkText: "",
      linkPath: "",
    };
    switch (action) {
      case "register":
        data.label = "Register";
        data.textBeforeLink = "Already have account?";
        data.linkText = "Sign in";
        data.linkPath = "/login";
        break;
      case "login":
        data.label = "Login";
        data.textBeforeLink = "Don't have an account?";
        data.linkText = "Sign up";
        data.linkPath = "/registration";
        break;
      case "account":
      case "passwords":
      case "email":
        data.label = "Change";
        break;
      default:
        return data;
    }
    return data;
  };

  const { label, textBeforeLink, linkText, linkPath } = getFormFooterData();

  return (
    <div className="form-footer">
      <Button type={"submit"} large={true}>
        <span>{label}</span>
      </Button>
      <p>
        {textBeforeLink}
        {action === "account" ? (
          <Button handleClick={showModal} blankNoBorder>
            Delete my account
          </Button>
        ) : (
          <Link to={linkPath} className="form-footer__link">
            {linkText}
          </Link>
        )}
      </p>
    </div>
  );
}

FormFooter.propTypes = {
  action: PropTypes.string,
  showModal: PropTypes.func,
};

export default FormFooter;

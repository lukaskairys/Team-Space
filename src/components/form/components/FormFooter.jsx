import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Button from "components/button/Button";

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
        data.label = "Change";
        break;
      default:
        return data;
    }
    return data;
  };

  const { label, textBeforeLink, linkText, linkPath } = getFormFooterData();

  return (
    <>
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
          <Link to={linkPath} className="form__link">
            {linkText}
          </Link>
        )}
      </p>
    </>
  );
}

FormFooter.propTypes = {
  action: PropTypes.string,
  showModal: PropTypes.func,
};

export default FormFooter;

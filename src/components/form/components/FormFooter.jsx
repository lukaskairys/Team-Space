import React from "react";
import Button from "components/button/Button";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";

function FormFooter({ action }) {
  const history = useHistory();

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
        data.textBeforeLink = "Don't want to change anything?";
        data.linkText = "Go back";
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
        <Link
          to={linkPath}
          onClick={() => history.goBack()}
          className="form__link"
        >
          {linkText}
        </Link>
      </p>
    </>
  );
}

FormFooter.propTypes = {
  action: PropTypes.string,
};

export default FormFooter;

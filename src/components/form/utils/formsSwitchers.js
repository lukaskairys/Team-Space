import {
  validateRegistration,
  validateLogin,
  noValidation,
  validatePasswords,
  validateEmail,
} from "./validationRules";
import {
  registerForm,
  loginForm,
  accountForm,
  passwordsForm,
  emailForm,
} from "../utils/formFields";

export function getValidation(action) {
  let validation;
  switch (action) {
    case "register":
      validation = validateRegistration;
      break;
    case "login":
      validation = validateLogin;
      break;
    case "account":
      validation = noValidation;
      break;
    case "password":
      validation = validatePasswords;
      break;
    case "email":
      validation = validateEmail;
      break;
    default:
      return;
  }
  return validation;
}

export const getId = (action) => {
  let id = "";
  switch (action) {
    case "register":
      id = "registration";
      break;
    case "login":
      id = "login";
      break;
    case "account":
      id = "change-details";
      break;
    case "password":
      id = "change-password";
      break;
    case "email":
      id = "change-email";
      break;
    default:
      return;
  }
  return id;
};

export const getFormStructure = (action) => {
  let formStructure;
  switch (action) {
    case "register":
      formStructure = registerForm;
      break;
    case "login":
      formStructure = loginForm;
      break;
    case "account":
      formStructure = accountForm;
      break;
    case "password":
      formStructure = passwordsForm;
      break;
    case "email":
      formStructure = emailForm;
      break;
    default:
      return;
  }
  return formStructure;
};

export const getFormControlsData = (action) => {
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
    case "password":
    case "email":
      data.label = "Change";
      break;
    default:
      return data;
  }
  return data;
};

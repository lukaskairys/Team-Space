import React, { useState } from "react";
import PropTypes from "prop-types";
import bcrypt from "bcryptjs";
import { useHistory } from "react-router-dom";

import { post } from "apis/postData";
import { useRequest } from "apis/useRequest";
import { AuthContext } from "./AuthContext";

const AuthContextProvider = ({ children, endpoint }) => {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [messageText, setMessageText] = useState("Something went wrong");
  const [currentUserId, setCurrentUserId] = useState("");
  const { Provider } = AuthContext;
  const { data, error, isLoading } = useRequest(endpoint);
  const history = useHistory();

  function login(email, password) {
    const currentUser = data.filter((user) => user.email === email);
    if (currentUser.length === 1) {
      bcrypt
        .compare(password, currentUser[0].password)
        .then((result) => {
          if (result) {
            setCurrentUserId(currentUser[0].id);
            localStorage.setItem("user", JSON.stringify(currentUser[0]));
            history.push("/", {
              message: "Your are successfully logged in. Welcome back!",
            });
          } else {
            setShowErrorMessage(true);
            setMessageText("Wrong password.");
          }
        })
        .catch((error) => {
          setShowErrorMessage(true);
        });
    } else {
      setShowErrorMessage(true);
      setMessageText("User with such email address does not exist.");
    }
  }

  const hash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  };

  async function register(password, dataToPost) {
    try {
      const hashedPassword = hash(password);
      dataToPost.password = hashedPassword;
      await post("/users/", dataToPost);

      history.push("/", {
        message:
          "Your registration was successful. For a better experience of using Team Space, please fill in extra information in your account settings.",
      });
      // TODO: make auto-login
    } catch (error) {
      setShowErrorMessage(true);
    }
  }

  const logout = () => {
    localStorage.removeItem("user");
  };

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  const store = {
    data,
    error,
    isLoading,
    login,
    logout,
    register,
    getCurrentUser,
    currentUserId,
    messageText,
    showErrorMessage,
  };
  return <Provider value={store}>{children}</Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  endpoint: PropTypes.string,
  stateCall: PropTypes.func,
  state: PropTypes.object,
};

export default AuthContextProvider;

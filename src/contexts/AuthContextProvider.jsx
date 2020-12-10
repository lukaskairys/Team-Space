import React, { useState } from "react";
import PropTypes from "prop-types";

import { useAuthentication } from "authentication/useAuthentication.jsx";
import { useRequest } from "apis/useRequest";
import { AuthContext } from "./AuthContext";

const AuthContextProvider = ({ children }) => {
  const [currentUserId, setCurrentUserId] = useState("");
  const { data, error, isLoading } = useRequest("/users");
  const {
    login,
    logout,
    register,
    showErrorMessage,
    messageText,
  } = useAuthentication(setCurrentUserId, data);

  const { Provider } = AuthContext;
  const store = {
    data,
    error,
    isLoading,
    login,
    logout,
    register,
    currentUserId,
    showErrorMessage,
    messageText,
  };
  return <Provider value={store}>{children}</Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default AuthContextProvider;

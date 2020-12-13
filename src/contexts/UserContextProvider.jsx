import React, { useState } from "react";
import PropTypes from "prop-types";

import { useRequest } from "apis/useRequest";
import { useAuthentication } from "authentication/useAuthentication.jsx";
import { UserContext } from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [likeState, setLikeState] = useState("initial");

  const { userId } = useAuthentication();
  const { data, error, isLoading } = useRequest(
    `/users/${userId ? userId : ""}`
  );
  const { Provider } = UserContext;

  const store = {
    data,
    error,
    isLoading,
    likeState,
    setLikeState,
  };

  return <Provider value={store}>{children}</Provider>;
};

UserContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default UserContextProvider;

import React, { useState, useContext } from "react";
import PropTypes from "prop-types";

import { useRequest } from "apis/useRequest";
import { UserContext } from "./UserContext";
import { AuthContext } from "contexts/AuthContext";

const UserContextProvider = ({ children }) => {
  const [likeState, setLikeState] = useState("initial");
  const { currentUserId } = useContext(AuthContext);
  const { data, error, isLoading } = useRequest(`/users/${currentUserId}`);
  const { Provider } = UserContext;

  const store = {
    data,
    setLikeState,
    likeState,
    error,
    isLoading,
  };

  return <Provider value={store}>{children}</Provider>;
};

UserContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  endpoint: PropTypes.string,
  stateCall: PropTypes.func,
  state: PropTypes.object,
};

export default UserContextProvider;

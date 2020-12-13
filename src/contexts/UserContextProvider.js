import React, { useState } from "react";
import PropTypes from "prop-types";

import { useRequest } from "apis/useRequest";

import { UserContext } from "./UserContext";

const UserContextProvider = ({ children, endpoint }) => {
  const { Provider } = UserContext;
  const [likeState, setLikeState] = useState("initial");
  const [currentCheckIn, setCurrentCheckIn] = useState("initial");
  const { data, error, isLoading } = useRequest(endpoint);
  const { data: users } = useRequest("/users");
  const store = {
    data,
    users,
    setLikeState,
    setCurrentCheckIn,
    currentCheckIn,
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

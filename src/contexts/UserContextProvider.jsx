import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import { useRequest } from "apis/useRequest";
import { UserContext } from "./UserContext";
import { AuthContext } from "contexts/AuthContext";

const UserContextProvider = ({ children }) => {
  const [likeState, setLikeState] = useState("initial");
  const [id, setId] = useState();
  const { currentUserId } = useContext(AuthContext);
  const { data, error, isLoading } = useRequest(`/users/${id}`);
  const { Provider } = UserContext;

  useEffect(() => {
    setId(currentUserId);
  }, [currentUserId]);

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

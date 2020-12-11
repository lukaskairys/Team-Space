import React, { useState } from "react";
import PropTypes from "prop-types";

import { useRequest } from "apis/useRequest";
import { useAuthentication } from "authentication/useAuthentication.jsx";
import { UserContext } from "./UserContext";
// import { AuthContext } from "contexts/AuthContext";

const UserContextProvider = ({ children }) => {
  const [likeState, setLikeState] = useState("initial");
  const [id, setId] = useState();
  // const { currentUserId } = useContext(AuthContext);
  const { data, error, isLoading } = useRequest(`/users/${id}`);
  const { Provider } = UserContext;

  const {
    login,
    logout,
    register,
    showErrorMessage,
    messageText,
  } = useAuthentication(setId, data);

  // useEffect(() => {
  //   setId(currentUserId);
  // }, [currentUserId]);

  const store = {
    data,
    error,
    isLoading,
    likeState,
    setLikeState,
    login,
    logout,
    register,
    showErrorMessage,
    messageText,
  };

  return <Provider value={store}>{children}</Provider>;
};

UserContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default UserContextProvider;

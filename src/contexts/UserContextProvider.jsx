import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import { useRequest } from "apis/useRequest";
import { useAuthentication } from "authentication/useAuthentication";
import { UserContext } from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [repeatRequest, setRepeatRequest] = useState("");
  const [likeState, setLikeState] = useState("initial");
  const [currentCheckIn, setCurrentCheckIn] = useState("initial");
  const { userId } = useAuthentication();
  const { data, error, isLoading } = useRequest(
    `/users/${userId}`,
    repeatRequest
  );
  const { data: lastClearDate } = useRequest("lastClearDate");
  const { data: users } = useRequest("/users");

  const isClearingNow = useRef(false);
  const { Provider } = UserContext;
  const store = {
    data,
    lastClearDate,
    isClearingNow,
    setLikeState,
    setCurrentCheckIn,
    setRepeatRequest,
    currentCheckIn,
    likeState,
    users,
    error,
    isLoading,
  };

  return <Provider value={store}>{children}</Provider>;
};

UserContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default UserContextProvider;

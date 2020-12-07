import React from "react";
import PropTypes from "prop-types";

import { useRequest } from "apis/useRequest";

import { UserContext } from "./UserContext";

const UserContextProvider = ({ children, endpoint }) => {
  const { data, error, isLoading } = useRequest(endpoint);
  const { Provider } = UserContext;
  const store = { data, error, isLoading };
  return <Provider value={store}>{children}</Provider>;
};

UserContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  endpoint: PropTypes.string,
};

export default UserContextProvider;

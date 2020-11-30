import React from "react";
import PropTypes from "prop-types";

import { context } from "./Context";
import { useRequest } from "../apis/useRequest";

const ContextProvider = ({ children, endpoint }) => {
  const { data, error, isLoading } = useRequest(endpoint);
  const { Provider } = context;
  const store = { data, error, isLoading };

  return <Provider value={store}>{children}</Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.array,
  endpoint: PropTypes.string,
};

export default ContextProvider;

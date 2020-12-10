import React from "react";
import PropTypes from "prop-types";

import { useRequest } from "apis/useRequest";
import { RestaurantContext } from "./RestaurantContext";

const ContextProvider = ({ children }) => {
  const { data, error, isLoading } = useRequest("/restaurants");
  const { Provider } = RestaurantContext;
  const store = { data, error, isLoading };

  return <Provider value={store}>{children}</Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default ContextProvider;

import React, { useContext } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { isObjectEmpty } from "utils/objects";
import { UserContext } from "contexts/UserContext";

function PrivateRoute({ children, ...rest }) {
  const { data } = useContext(UserContext);
  const currentUser = data;
  const currentFromLocalStorage = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={() =>
        !isObjectEmpty(currentUser) || currentFromLocalStorage ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              from: location.pathname,
            }}
          />
        )
      }
    />
  );
}
PrivateRoute.propTypes = {
  children: PropTypes.array,
};

export default PrivateRoute;

import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function PrivateRoute({ children, ...rest }) {
  const currentFromLocalStorage = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={() =>
        currentFromLocalStorage ? (
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
  children: PropTypes.object,
};

export default PrivateRoute;

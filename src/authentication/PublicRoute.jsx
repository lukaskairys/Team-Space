import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";
import { warnToast } from "components/Toasts/ToastHandler";

const PublicRoute = ({ children, ...rest }) => {
  const loggedIn = JSON.parse(localStorage.getItem("user"));
  return (
    <Route
      {...rest}
      render={() => {
        if (loggedIn) {
          warnToast(
            "You are already logged in. If you want to login as another user or register a new one, please log out first."
          );
          return (
            <Redirect
              to={{
                pathname: "/Team-Space",
              }}
            />
          );
        }

        return children;
      }}
    />
  );
};

PublicRoute.propTypes = {
  children: PropTypes.object,
};

export default PublicRoute;

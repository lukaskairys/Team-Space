import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect, useLocation } from "react-router-dom";
import { warnToast } from "components/Toasts/ToastHandler";

function PrivateRoute({ children, ...rest }) {
  const loggedIn = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={() => {
        if (!loggedIn) {
          warnToast("You need to login first!");
          return (
            <Redirect
              to={{
                pathname: "/login",
                from: location.pathname,
              }}
            />
          );
        }

        return children;
      }}
    />
  );

  // return (
  //   <Route
  //     {...rest}
  //     render={() =>
  //       loggedIn ? (
  //         children
  //       ) : (
  //         <Redirect
  //           to={{
  //             pathname: "/login",
  //             from: location.pathname,
  //             message: "You need to login first!",
  //           }}
  //         />
  //       )
  //     }
  //   />
  // );
}
PrivateRoute.propTypes = {
  children: PropTypes.object,
};

export default PrivateRoute;

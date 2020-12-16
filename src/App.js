import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import ContextProvider from "contexts/ContextProvider";
import RegistrationPage from "features/registration/pages/RegistrationPage";
import LoginPage from "features/login/pages/LoginPage";
import Books from "pages/Books/Books";
import Dashboard from "pages/Dashboard/Dashboard";
import Reservations from "pages/Reservations/Reservations";
import Devices from "pages/Devices/Devices";
import Restaurant from "pages/Restaurant/Restaurant";
import EatOut from "pages/EatOut/EatOut";
import EatOutCategoriesPage from "pages/EatOutCategories/EatOutCategoriesPage";
import PrivateRoute from "./authentication/PrivateRoute.jsx";
import Toast from "../src/components/Toasts/Toast";
import Page404 from "pages/Page404/Page404";

function App() {
  return (
    <Router>
      <Toast />

      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/registration">
          <RegistrationPage />
        </Route>

        <PrivateRoute exact path="/">
          <Dashboard />
        </PrivateRoute>

        <PrivateRoute exact path="/reservations">
          <Reservations />
        </PrivateRoute>

        <PrivateRoute exact path="/reservations/devices">
          <Devices />
        </PrivateRoute>

        <PrivateRoute exact path="/reservations/books">
          <Books />
        </PrivateRoute>

        <PrivateRoute exact path="/eat-out/categories">
          <Redirect
            to={{
              pathname: "/eat-out",
              isRedirected: true,
            }}
          />
        </PrivateRoute>

        <PrivateRoute exact path="/eat-out/">
          <EatOut />
        </PrivateRoute>

        <PrivateRoute exact path="/eat-out/:id">
          <ContextProvider endpoint="/restaurants">
            <Restaurant />
          </ContextProvider>
        </PrivateRoute>

        <PrivateRoute exact path="/eat-out/categories/:category">
          <EatOutCategoriesPage />
        </PrivateRoute>

        <Route component={Page404} />
      </Switch>
    </Router>
  );
}

export default App;

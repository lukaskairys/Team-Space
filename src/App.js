import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import RegistrationPage from "features/registration/pages/RegistrationPage";
import LoginPage from "features/login/pages/LoginPage";
import Books from "pages/Books/Books";
import Dashboard from "pages/Dashboard/Dashboard";
import Reservations from "pages/Reservations/Reservations";
import Devices from "pages/Devices/Devices";
import Restaurant from "pages/Restaurant/Restaurant";
import EatOut from "pages/EatOut/EatOut";
import EatOutCategoriesPage from "pages/EatOutCategories/EatOutCategoriesPage";
import ContextProvider from "contexts/ContextProvider";
import UserContextProvider from "contexts/UserContextProvider";
import PrivateRoute from "./authentication/PrivateRoute.jsx";
import Toast from "../src/components/Toasts/Toast";
import Page404 from "pages/Page404/Page404";

function App() {
  return (
    <Router>
      <Toast />
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/registration">
          <RegistrationPage />
        </Route>

        <UserContextProvider>
          <PrivateRoute path="/">
            <Route exact path="/">
              <Dashboard />
            </Route>

            <Route exact path="/reservations">
              <Reservations />
            </Route>

            <Route exact path="/reservations/devices">
              <Devices />
            </Route>

            <Route exact path="/reservations/books">
              <Books />
            </Route>

            <Route exact path="/eat-out/categories">
              <Redirect
                to={{
                  pathname: "/eat-out",
                  isRedirected: true,
                }}
              />
            </Route>

            <Route exact path="/eat-out/">
              <EatOut />
            </Route>

            <Route exact path="/eat-out/:id">
              <Restaurant />
            </Route>

            <ContextProvider endpoint="/restaurants">
              <Route exact path="/eat-out/categories/:category">
                <EatOutCategoriesPage />
              </Route>
            </ContextProvider>
            <Route component={Page404} />
          </PrivateRoute>
        </UserContextProvider>
      </Switch>
    </Router>
  );
}

export default App;

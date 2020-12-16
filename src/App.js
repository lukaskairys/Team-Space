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
import UserContextProvider from "contexts/UserContextProvider";
import PrivateRoute from "./authentication/PrivateRoute.jsx";
import Toast from "../src/components/Toasts/Toast";
import Page404 from "pages/Page404/Page404";

function App() {
  return (
    <Router>
      <Toast />
      <UserContextProvider>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/registration">
            <RegistrationPage />
          </Route>

          <Route exact path="/">
            <PrivateRoute path="/">
              <Dashboard />
            </PrivateRoute>
          </Route>

          <Route exact path="/reservations">
            <PrivateRoute path="/">
              <Reservations />
            </PrivateRoute>
          </Route>

          <Route exact path="/reservations/devices">
            <PrivateRoute path="/">
              <Devices />
            </PrivateRoute>
          </Route>

          <Route exact path="/reservations/books">
            <PrivateRoute path="/">
              <Books />
            </PrivateRoute>
          </Route>

          <Route exact path="/eat-out/categories">
            <PrivateRoute path="/">
              <Redirect
                to={{
                  pathname: "/eat-out",
                  isRedirected: true,
                }}
              />
            </PrivateRoute>
          </Route>

          <Route exact path="/eat-out/">
            <PrivateRoute path="/">
              <EatOut />
            </PrivateRoute>
          </Route>

          <Route exact path="/eat-out/:id">
            <ContextProvider endpoint="/restaurants">
              <Restaurant />
            </ContextProvider>
          </Route>

          <Route exact path="/eat-out/categories/:category">
            <EatOutCategoriesPage />
          </Route>

          <Route component={Page404} />
        </Switch>
      </UserContextProvider>
    </Router>
  );
}

export default App;

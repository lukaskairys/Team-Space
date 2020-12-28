import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import ContextProvider from "contexts/ContextProvider";
import RegistrationPage from "pages/Registration/RegistrationPage";
import LoginPage from "pages/Login/LoginPage";
import Books from "pages/Books/Books";
import Rooms from "pages/Rooms/Rooms";
import Dashboard from "pages/Dashboard/Dashboard";
import Reservations from "pages/Reservations/Reservations";
import Devices from "pages/Devices/Devices";
import Restaurant from "pages/Restaurant/Restaurant";
import EatOut from "pages/EatOut/EatOut";
import EatOutCategoriesPage from "pages/EatOutCategories/EatOutCategoriesPage";
import PrivateRoute from "./authentication/PrivateRoute.jsx";
import PublicRoute from "./authentication/PublicRoute.jsx";
import Toast from "../src/components/Toasts/Toast";
import Page404 from "pages/Page404/Page404";

import UserContextProvider from "contexts/UserContextProvider";

function App() {
  return (
    <Router>
      <Toast />

      <Switch>
        <PublicRoute exact path="/login">
          <LoginPage />
        </PublicRoute>
        <PublicRoute exact path="/registration">
          <RegistrationPage />
        </PublicRoute>

        <PrivateRoute exact path="/">
          <Dashboard />
        </PrivateRoute>

        <PrivateRoute exact path="/reservations">
          <UserContextProvider>
            <Reservations />
          </UserContextProvider>
        </PrivateRoute>

        <PrivateRoute exact path="/reservations/devices">
          <Devices />
        </PrivateRoute>

        <PrivateRoute exact path="/reservations/books">
          <Books />
        </PrivateRoute>

        <PrivateRoute exact path="/reservations/rooms">
          <Rooms />
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

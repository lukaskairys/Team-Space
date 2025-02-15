import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { useRequest } from "apis/useRequest";
import ContextProvider from "contexts/ContextProvider";
import RegistrationPage from "pages/Registration/RegistrationPage";
import LoginPage from "pages/Login/LoginPage";
import ProfileSettings from "pages/Settings/ProfileSettings";
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
import Page503 from "pages/Page503/Page503";
import MainLayout from "components/MainLayout/MainLayout";
import ScrollToTop from "components/ScrollToTop/ScrollToTop";

function App() {
  const { error } = useRequest(`/`);
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Toast />

        <Switch>
          {error && <Page503 />}

          <PublicRoute exact path="/login">
            <LoginPage />
          </PublicRoute>

          <PublicRoute exact path="/registration">
            <RegistrationPage />
          </PublicRoute>

          <PrivateRoute exact path="/Team-Space">
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </PrivateRoute>

          <PrivateRoute exact path="/settings">
            <MainLayout>
              <ProfileSettings />
            </MainLayout>
          </PrivateRoute>

          <PrivateRoute exact path="/reservations">
            <MainLayout>
              <Reservations />
            </MainLayout>
          </PrivateRoute>

          <PrivateRoute exact path="/reservations/devices">
            <MainLayout>
              <Devices />
            </MainLayout>
          </PrivateRoute>

          <PrivateRoute exact path="/reservations/books">
            <MainLayout>
              <Books />
            </MainLayout>
          </PrivateRoute>

          <PrivateRoute exact path="/reservations/rooms">
            <MainLayout>
              <Rooms />
            </MainLayout>
          </PrivateRoute>

          <PrivateRoute exact path="/eat-out/categories">
            <Redirect
              to={{
                pathname: "/eat-out",
                hash: "categories",
              }}
            />
          </PrivateRoute>

          <PrivateRoute exact path="/eat-out/">
            <MainLayout>
              <EatOut />
            </MainLayout>
          </PrivateRoute>

          <PrivateRoute exact path="/eat-out/:id">
            <MainLayout>
              <ContextProvider endpoint="/restaurants">
                <Restaurant />
              </ContextProvider>
            </MainLayout>
          </PrivateRoute>

          <PrivateRoute exact path="/eat-out/categories/:category">
            <MainLayout>
              <EatOutCategoriesPage />
            </MainLayout>
          </PrivateRoute>

          <Route component={Page404} />
        </Switch>
      </Router>
    </HelmetProvider>
  );
}

export default App;

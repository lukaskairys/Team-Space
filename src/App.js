import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RegistrationPage from "../src/features/registration/pages/RegistrationPage";
import LoginPage from "../src/features/login/pages/LoginPage";
import MainLayout from "components/MainLayout/MainLayout";
import Dashboard from "pages/Dashboard/Dashboard";
import Reservations from "pages/Reservations/Reservations";
import Devices from "pages/Devices/Devices";
import Hero from "./features/restaurantsPageHero/components/Hero";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import ContextProvider from "./contexts/ContextProvider";

function App() {
  return (
    <Router>
      <>
        {/* A <Switch> looks through its <Route>s and
            renders the first one that matches the path. */}
        {/* If you want to render something everywhere (in each page), render it outside the <Switch>, but inside the <Router> */}
        <Switch>
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
            <MainLayout />
          </Route>

          <Route exact path="/eat-out/:id">
            <ContextProvider endpoint="/restaurants">
              <MainLayout>
                <Hero>
                  <Breadcrumbs />
                </Hero>
              </MainLayout>
            </ContextProvider>
          </Route>

          <Route path="/registration">
            <RegistrationPage />
          </Route>

          <Route path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;

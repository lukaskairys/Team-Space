import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RegistrationPage from "../src/features/registration/pages/RegistrationPage";
import LoginPage from "../src/features/login/pages/LoginPage";
import HelloWidget from "features/helloWidget/components/HelloWidget";
import WeatherWidget from "./features/weatherWidget/components/weatherWidget";
import ReservationSection from "features/reservationsSection/components/ReservationsSection";
import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";

function App() {
  return (
    <Router>
      <>
        {/* A <Switch> looks through its <Route>s and
            renders the first one that matches the path. */}
        {/* If you want to render something everywhere (in each page), render it outside the <Switch>, but inside the <Router> */}
        <Switch>
          <Route exact path="/">
            <MainLayout>
              <>
                <HelloWidget />
                <ReservationSection />
                <WeatherWidget />
              </>
            </MainLayout>
          </Route>
          <Route exact path="/reservations">
            <MainLayout>
              <>
                <Breadcrumbs />
                <ReservationSection />
              </>
            </MainLayout>
          </Route>
          <Route exact path="/reservations/devices">
            <MainLayout>
              <Breadcrumbs />
            </MainLayout>
          </Route>

          <Route exact path="/reservations/books">
            <MainLayout />
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

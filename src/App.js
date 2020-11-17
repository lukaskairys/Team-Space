import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RegistrationPage from "../src/features/registration/pages/RegistrationPage";
import HelloWidget from "features/helloWidget/components/HelloWidget";
import WeatherWidget from "./features/weatherWidget/components/weatherWidget";
import ReservationSection from "features/reservationsSection/components/ReservationsSection";
import MainLayout from "components/MainLayout/MainLayout";
import EatOutSection from "features/eatOutSection/components/EatOutSection";

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
                <EatOutSection />
              </>
            </MainLayout>
          </Route>
          <Route exact path="/reservations"></Route>
          <Route exact path="/reservations/devices"></Route>
          <Route exact path="/reservations/books"></Route>
          <Route path="/registration">
            <RegistrationPage />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RegistrationPage from "../src/features/registration/pages/RegistrationPage";
import HelloWidget from "features/helloWidget/components/HelloWidget";
import ReservationSection from "features/reservationsSection/components/ReservationsSection";

function App() {
  return (
    <Router>
      <>
        {/* A <Switch> looks through its <Route>s and
            renders the first one that matches the path. */}
        {/* If you want to render something everywhere (in each page), render it outside the <Switch>, but inside the <Router> */}
        <Switch>
          <Route exact path="/">
            <HelloWidget />
            <ReservationSection />
          </Route>
          <Route path="/registration">
            <RegistrationPage />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;

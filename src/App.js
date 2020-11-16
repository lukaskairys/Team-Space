import React from "react";
import Registration from "../src/features/registration/components/Registration";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HelloWidget from "features/helloWidget/components/HelloWidget";
import EatOutSection from "features/eatOutSection/components/EatOutSection";
import ReservationSection from "features/reservationsSection/components/ReservationsSection";
import MainLayout from "components/MainLayout/MainLayout";

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
                <EatOutSection />
              </>
            </MainLayout>
          </Route>
          <Route path="/registration">
            <Registration />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;

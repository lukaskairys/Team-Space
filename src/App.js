import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Registration from "../src/features/registration/components/Registration";
import HelloWidget from "features/helloWidget/components/HelloWidget";
import BirthdayCard from "../src/components/BirthdayCard/BirthdayCard";
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

            <BirthdayCard
              title="firstname lastname"
              imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80"
              date="Sep 13th"
              body="Send a wish!"
            />

            <ReservationSection />
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

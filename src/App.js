import React from "react";
import Registration from "../src/features/registration/components/Registration";
import HelloWidget from "features/helloWidget/components/HelloWidget";
import EatOutSection from "features/eatOutSection/components/eatOutSection";
import ReservationSection from "features/reservationsSection/components/ReservationsSection";

function App() {
  return (
    <EatOutSection />
    // <Router>
    //   <>
    //     {/* A <Switch> looks through its <Route>s and
    //         renders the first one that matches the path. */}
    //     {/* If you want to render something everywhere (in each page), render it outside the <Switch>, but inside the <Router> */}
    //     <Switch>
    //       <Route exact path="/">
    //         <HelloWidget />
    //         <ReservationSection />
    //       </Route>
    //       <Route path="/registration">
    //         <Registration />
    //       </Route>
    //     </Switch>
    //   </>
    // </Router>
  );
}

export default App;

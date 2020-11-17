import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Registration from "../src/features/registration/components/Registration";
import HelloWidget from "features/helloWidget/components/HelloWidget";
import ReservationSection from "features/reservationsSection/components/ReservationsSection";
import MainLayout from "components/MainLayout/MainLayout";
import NewsFeedLayout from "components/NewsFeedLayout/NewsFeedLayout";
import NewsFeedSmall from "components/NewsFeedLayout/NewsFeedSmall";
import NewsFeedBig from "components/NewsFeedLayout/NewsFeedBig";

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
              <HelloWidget />
              <ReservationSection />
              <NewsFeedLayout>
                <NewsFeedSmall />
                <NewsFeedSmall />
                <NewsFeedSmall />
                <NewsFeedBig type={"post"} />
                <NewsFeedBig type={"post1"} />
                <NewsFeedBig type={"post"} />
                <NewsFeedBig type={"post"} />
                <NewsFeedBig type={"post1"} />
                <NewsFeedBig type={"post"} />
                {/* <div style={{ gridRow: "5 / 7" }}>
                  <NewsFeedBig />
                </div>
                <div style={{ gridRow: "4 / 6" }}>
                  <NewsFeedBig />
                </div>
                <div style={{ gridRow: "5 / 7" }}>
                  <NewsFeedBig />
                </div>
                <div style={{ gridRow: "8 / 10" }}>
                  <NewsFeedBig />
                </div>
                <div style={{ gridRow: "7 / 9" }}>
                  <NewsFeedBig />
                </div> */}
              </NewsFeedLayout>
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

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Registration from "../src/features/registration/components/Registration";
import HelloWidget from "features/helloWidget/components/HelloWidget";
import ReservationSection from "features/reservationsSection/components/ReservationsSection";
import MainLayout from "components/MainLayout/MainLayout";
import NewsFeedLayout from "components/NewsFeedLayout/NewsFeedLayout";
import BirthdayExample from "components/NewsFeedLayout/BirthdayExample";
import PostExample from "components/NewsFeedLayout/PostExample";

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
                <BirthdayExample />
                <BirthdayExample />
                <BirthdayExample />
                <PostExample type={"post1"} />
                <PostExample type={"post2"} />
                <PostExample type={"post3"} />
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

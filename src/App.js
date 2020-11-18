import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RegistrationPage from "../src/features/registration/pages/RegistrationPage";
import LoginPage from "../src/features/login/pages/LoginPage";
import HelloWidget from "features/helloWidget/components/HelloWidget";
import BirthdayCard from "./features/BirthdayCard/BirthdayCard";
import FeedCard from "./features/FeedCard/FeedCard";
import WeatherWidget from "./features/weatherWidget/components/weatherWidget";
import ReservationSection from "features/reservationsSection/components/ReservationsSection";
import MainLayout from "components/MainLayout/MainLayout";
import FeedCardVideo from "./features/FeedCardVideo/FeedCardVideo";
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
                <BirthdayCard
                  title="firstname lastname"
                  imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80"
                  date="Sep 13th"
                  body="Send a wish!"
                />
                <FeedCard
                  authorUsername="firstname lastname"
                  authorImg="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80"
                  city="VLN"
                  time="20h"
                  imageUrl="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                  commenterUsername="firstname lastname2"
                  commentText="A new comment on this post."
                  userPhoto="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                />
                <FeedCardVideo
                  authorUsername="firstname lastname"
                  authorImg="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80"
                  city="VLN"
                  time="20h"
                  imageUrl="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                  commenterUsername="firstname lastname2"
                  commentText="A new comment on this post."
                  userPhoto="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                />
                <EatOutSection />
              </>
            </MainLayout>
          </Route>
          <Route exact path="/reservations">
            <MainLayout>
              <ReservationSection />
            </MainLayout>
          </Route>
          <Route exact path="/reservations/devices"></Route>
          <Route exact path="/reservations/books"></Route>
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

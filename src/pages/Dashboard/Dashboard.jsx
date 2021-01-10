import React from "react";
import { Helmet } from "react-helmet-async";

import ContextProvider from "contexts/ContextProvider";
import HelloWidget from "features/helloWidget/components/HelloWidget";
import WeatherWidget from "features/weatherWidget/components/weatherWidget";
import ReservationsSection from "features/reservationsSection/components/ReservationsSection";
import EatOutSection from "features/eatOutSection/components/EatOutSection";
import AllFeedCards from "features/FeedCard/components/AllFeedCards";
import useCurrentTime from "utils/useCurrentTime";

import "./Dashboard.scss";

const Dashboard = () => {
  const currentTime = useCurrentTime();
  return (
    <div className="dashboard">
      <Helmet>
        <title>Dashboard · Team Space</title>
      </Helmet>

      <div className="dashboard__widgets">
        <HelloWidget currentTime={currentTime} />
        <WeatherWidget currentTime={currentTime} />
      </div>

      <ReservationsSection title={"Reservations"} />

      <div className="dashboard__eat-out-section">
        <ContextProvider endpoint="/restaurants">
          <EatOutSection />
        </ContextProvider>
      </div>

      <AllFeedCards></AllFeedCards>
    </div>
  );
};

export default Dashboard;

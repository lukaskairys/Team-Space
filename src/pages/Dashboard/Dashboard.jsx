import React from "react";

import MainLayout from "components/MainLayout/MainLayout";

import HelloWidget from "features/helloWidget/components/HelloWidget";
import WeatherWidget from "features/weatherWidget/components/weatherWidget";
import ReservationsSection from "features/reservationsSection/components/ReservationsSection";
import EatOutSection from "features/eatOutSection/components/EatOutSection";
import AllFeedCards from "features/FeedCard/components/AllFeedCards";
import ContextProvider from "contexts/ContextProvider";

import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <MainLayout>
        <>
          <ContextProvider endpoint="/userData">
            <div className="dashboard__widgets">
              <HelloWidget />
              <WeatherWidget />
            </div>

            <div className="dashboard__reservations-section">
              <ReservationsSection />
            </div>
          </ContextProvider>

          <div className="dashboard__eat-out-section">
            <ContextProvider endpoint="/restaurants">
              <EatOutSection />
            </ContextProvider>
          </div>
          <ContextProvider endpoint="/userData">
            <AllFeedCards />
          </ContextProvider>
        </>
      </MainLayout>
    </div>
  );
};

export default Dashboard;

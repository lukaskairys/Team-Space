import React from "react";

import ContextProvider from "contexts/ContextProvider";
import MainLayout from "components/MainLayout/MainLayout";
import HelloWidget from "features/helloWidget/components/HelloWidget";
import WeatherWidget from "features/weatherWidget/components/weatherWidget";
import ReservationsSection from "features/reservationsSection/components/ReservationsSection";
import EatOutSection from "features/eatOutSection/components/EatOutSection";
import AllFeedCards from "features/FeedCard/components/AllFeedCards";

import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <MainLayout>
        <>
          <div className="dashboard__widgets">
            <HelloWidget />
            <WeatherWidget />
          </div>

          <div className="dashboard__reservations-section">
            <ReservationsSection />
          </div>

          <div className="dashboard__eat-out-section">
            <ContextProvider endpoint="/restaurants">
              <EatOutSection />
            </ContextProvider>
          </div>

          <AllFeedCards></AllFeedCards>
        </>
      </MainLayout>
    </div>
  );
};

export default Dashboard;

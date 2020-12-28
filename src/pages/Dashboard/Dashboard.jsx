import React from "react";

import ContextProvider from "contexts/ContextProvider";
import UserContextProvider from "contexts/UserContextProvider";
import MainLayout from "components/MainLayout/MainLayout";
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
      <UserContextProvider>
        <MainLayout>
          <>
            <div className="dashboard__widgets">
              <HelloWidget currentTime={currentTime} />
              <WeatherWidget currentTime={currentTime} />
            </div>

            <div className="dashboard__reservations-section">
              <ReservationsSection title={"Reservations"} />
            </div>

            <div className="dashboard__eat-out-section">
              <ContextProvider endpoint="/restaurants">
                <EatOutSection />
              </ContextProvider>
            </div>

            <AllFeedCards></AllFeedCards>
          </>
        </MainLayout>
      </UserContextProvider>
    </div>
  );
};

export default Dashboard;

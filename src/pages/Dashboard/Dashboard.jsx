import React from "react";

import RestaurantContextProvider from "contexts/RestaurantContextProvider";
import UserContextProvider from "contexts/UserContextProvider";
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
          <UserContextProvider>
            <div className="dashboard__widgets">
              <HelloWidget />
              <WeatherWidget />
            </div>

            <div className="dashboard__reservations-section">
              <ReservationsSection />
            </div>
          </UserContextProvider>

          <div className="dashboard__eat-out-section">
            <RestaurantContextProvider endpoint="/restaurants">
              <EatOutSection />
            </RestaurantContextProvider>
          </div>
          <UserContextProvider>
            <AllFeedCards></AllFeedCards>
          </UserContextProvider>
        </>
      </MainLayout>
    </div>
  );
};

export default Dashboard;

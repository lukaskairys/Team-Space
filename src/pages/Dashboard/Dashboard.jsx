import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import HelloWidget from "features/helloWidget/components/HelloWidget";
import WeatherWidget from "features/weatherWidget/components/weatherWidget";
import ReservationsSection from "features/reservationsSection/components/ReservationsSection";
import EatOutSection from "features/eatOutSection/components/EatOutSection";
import TemporaryLayout from "features/temporaryLayout/components/TemporaryLayout";

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
            <EatOutSection />
          </div>
          <TemporaryLayout />
        </>
      </MainLayout>
    </div>
  );
};

export default Dashboard;

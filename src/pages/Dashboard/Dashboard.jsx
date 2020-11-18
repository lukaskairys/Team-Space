import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import HelloWidget from "features/helloWidget/components/HelloWidget";
import WeatherWidget from "features/weatherWidget/components/weatherWidget";
import ReservationSection from "features/reservationsSection/components/ReservationsSection";
import EatOutSection from "features/eatOutSection/components/EatOutSection";

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
          <div className="dashboard__reservations">
            <ReservationSection />
          </div>

          <EatOutSection />
        </>
      </MainLayout>
    </div>
  );
};

export default Dashboard;

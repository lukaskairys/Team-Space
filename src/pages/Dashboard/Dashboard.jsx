import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import NewsFeedLayout from "components/NewsFeedLayout/NewsFeedLayout";
import HelloWidget from "features/helloWidget/components/HelloWidget";
import WeatherWidget from "features/weatherWidget/components/weatherWidget";
import ReservationsSection from "features/reservationsSection/components/ReservationsSection";
import EatOutSection from "features/eatOutSection/components/EatOutSection";
import FeedCardVideo from "features/FeedCardVideo/FeedCardVideo";
import FeedCard from "features/FeedCard/FeedCard";
import BirthdayCard from "features/BirthdayCard/BirthdayCard";

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
          <NewsFeedLayout>
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
              type={"post1"}
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
              type={"post2"}
            />
          </NewsFeedLayout>
        </>
      </MainLayout>
    </div>
  );
};

export default Dashboard;

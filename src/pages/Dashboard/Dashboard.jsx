import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import NewsFeedLayout from "components/NewsFeedLayout/NewsFeedLayout";
import HelloWidget from "features/helloWidget/components/HelloWidget";
import WeatherWidget from "features/weatherWidget/components/weatherWidget";
import ReservationsSection from "features/reservationsSection/components/ReservationsSection";
import EatOutSection from "features/eatOutSection/components/EatOutSection";
import FeedCard from "features/FeedCard/components/FeedCard";
import FeedCardVideo from "features/FeedCardVideo/components/FeedCardVideo";
import BirthdayCard from "features/BirthdayCard/components/BirthdayCard";
import FetchStories from "../../features/temporaryLayout/FetchStories";
import FetchUserData from "../../features/temporaryLayout/FetchUserData";

import "./Dashboard.scss";

const Dashboard = () => {
  const stories = FetchStories();
  const userData = FetchUserData();

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
            {stories.map((story) => {
              return story.type === "birthday" ? (
                <BirthdayCard key={story.id} story={story} />
              ) : story.type === "post" ? (
                <FeedCard
                  key={story.id}
                  story={story}
                  userPhoto={userData.userImage}
                  userName={userData.userName}
                  type={1}
                />
              ) : story.type === "video" ? (
                <FeedCardVideo
                  key={story.id}
                  story={story}
                  userPhoto={userData.userImage}
                  userName={userData.userName}
                  type={1}
                />
              ) : (
                ""
              );
            })}
          </NewsFeedLayout>
        </>
      </MainLayout>
    </div>
  );
};

export default Dashboard;

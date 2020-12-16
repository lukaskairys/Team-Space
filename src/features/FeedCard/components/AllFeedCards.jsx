import React, { useState, useEffect, useContext } from "react";

import FeedCardVideo from "features/FeedCardVideo/components/FeedCardVideo";
import BirthdayCard from "features/BirthdayCard/components/BirthdayCard";
import FeedCard from "features/FeedCard/components/FeedCard";
import NewsFeedLayout from "components/NewsFeedLayout/NewsFeedLayout";

import { UserContext } from "contexts/UserContext";
import { isObjectEmpty } from "utils/objects";
import { FetchSortedStories } from "./getSortedStories";

import "./feedCard.scss";

function AllFeedCards() {
  const stories = FetchSortedStories();
  const [userData, setUserData] = useState({});
  const { data } = useContext(UserContext);

  useEffect(() => {
    if (!isObjectEmpty(data)) {
      setUserData(data);
    }
  }, [data, stories]);

  return (
    <NewsFeedLayout>
      {stories.map((story) => {
        return story.type === "birthday" ? (
          <BirthdayCard
            key={story.id}
            story={story}
            userPhoto={userData.userImage}
            userName={userData.userName}
          />
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
        ) : null;
      })}
    </NewsFeedLayout>
  );
}

export default AllFeedCards;

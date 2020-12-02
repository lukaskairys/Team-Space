import React, { useState, useEffect, useContext } from "react";

import FeedCardVideo from "features/FeedCardVideo/components/FeedCardVideo";
import BirthdayCard from "features/BirthdayCard/components/BirthdayCard";
import FeedCard from "features/FeedCard/components/FeedCard";
import NewsFeedLayout from "components/NewsFeedLayout/NewsFeedLayout";
import { context } from "contexts/Context";
import { isObjectEmpty } from "utils/objects";
import { sortStories } from "../../../components/NewsFeedLayout/sortStories";
import { FetchStories } from "../../../utils/Api";

import "./feedCard.scss";

function AllFeedCards() {
  const stories = sortStories(FetchStories());
  const [userData, setUserData] = useState({});
  const { data, error } = useContext(context);

  useEffect(() => {
    if (!isObjectEmpty(data)) {
      setUserData(data);
    }
  }, [data, error]);

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
        ) : (
          ""
        );
      })}
    </NewsFeedLayout>
  );
}

export default AllFeedCards;

import React, { useEffect, useState } from "react";
import FeedCardVideo from "features/FeedCardVideo/components/FeedCardVideo";
import FeedCard from "features/FeedCard/components/FeedCard";
import BirthdayCard from "features/BirthdayCard/components/BirthdayCard";

function TemporaryLayout() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3008/stories")
      .then((res) => res.json())
      .then(
        (allStories) => {
          setStories(allStories);
        },
        (error) => {
          //handle error
        }
      );
  }, []);

  return (
    <div>
      {stories.map((story, i) => {
        return story.type === "birthday" ? (
          <BirthdayCard
            key={story.id}
            title={story.userName}
            imageUrl={story.userImage}
            date="Sep 13th"
            body="Send a wish!"
            wishes={story.wishes}
            comments={story.comments.length}
          />
        ) : story.type === "post" ? (
          <FeedCard
            key={story.id}
            authorUsername={story.userName}
            authorImg={story.userImage}
            city={story.postLocation}
            time="20h"
            imageUrl={story.postImage}
            comments={story.comments}
            likes={story.likes}
            commentCount={story.comments.length}
            userPhoto="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
          />
        ) : story.type === "video" ? (
          <FeedCardVideo
            key={story.id}
            authorUsername={story.userName}
            authorImg={story.userImage}
            city={story.postLocation}
            time="20h"
            videoUrl={story.postVideo}
            videoThumbnail={story.postCover}
            commenterUsername="firstname lastname2"
            commentText="A new comment on this post."
            likes={story.likes}
            comments={story.comments.length}
            userPhoto="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
          />
        ) : (
          ""
        );
      })}
    </div>
  );
}

export default TemporaryLayout;

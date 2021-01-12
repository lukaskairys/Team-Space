import React from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";

import FeedCardComments from "../../FeedCard/components/FeedCardComments";
import "../../FeedCard/components/feedCard.scss";
import { timeDifference } from "../../FeedCard/components/getTimeDifference";
import { ReactComponent as PlayButton } from "../../../assets/images/play-button.svg";

function FeedCardVideo({ story, userPhoto, userName }) {
  return (
    <div role="region" aria-label="Video feed card" className="feed-card">
      <div className="feed-card__info">
        <img
          className="feed-card__info-img"
          src={story.userImage}
          alt="Post author"
        />
        <p>{story.userName}</p>
        <p>
          {story.postLocation}{" "}
          <span className="feed-card__time">
            {timeDifference(new Date(), new Date(story.postDate))}
          </span>
        </p>
      </div>
      <div className="feed-card__content">
        <ReactPlayer
          url={story.postVideo}
          light={story.postCover}
          width="100%"
          height="100%"
          playing
          controls
          playIcon={<PlayButton />}
          aria-label="Video post"
        />
      </div>
      <div className="feed-card-divider"></div>
      <FeedCardComments
        comments={story.comments}
        username={userName}
        userPhoto={userPhoto}
        likes={story.likes}
        id={story.id}
      />
    </div>
  );
}

FeedCardVideo.propTypes = {
  story: PropTypes.shape({
    id: PropTypes.string,
    userImage: PropTypes.string,
    userName: PropTypes.string,
    postDate: PropTypes.string,
    comments: PropTypes.array,
    likes: PropTypes.number,
    type: PropTypes.string,
    postLocation: PropTypes.string,
    postVideo: PropTypes.string,
    postCover: PropTypes.string,
  }),
  userPhoto: PropTypes.string,
  userName: PropTypes.string,
};

export default FeedCardVideo;

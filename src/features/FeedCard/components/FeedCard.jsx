import React from "react";
import PropTypes from "prop-types";
import "./feedCard.scss";
import { timeDifference } from "./getTimeDifference";
import FeedCardComments from "./FeedCardComments";

function FeedCard({ story, userPhoto, userName, type }) {
  return (
    <div className="feed-card" type={story.type}>
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
        <img
          className="feed-card__content-img"
          src={story.postImage}
          alt="Post"
        />
      </div>
      <div className="feed-card-divider"></div>
      <FeedCardComments
        comments={story.comments}
        username={userName}
        userPhoto={userPhoto}
        likes={story.likes}
      />
    </div>
  );
}

FeedCard.propTypes = {
  story: PropTypes.object,
  userPhoto: PropTypes.string,
  userName: PropTypes.string,
  type: PropTypes.number,
};

export default FeedCard;

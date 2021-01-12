import React from "react";
import PropTypes from "prop-types";

import "./feedCard.scss";
import { timeDifference } from "./getTimeDifference";
import FeedCardComments from "./FeedCardComments";

function FeedCard({ story, userPhoto, userName, type }) {
  return (
    <div
      role="region"
      aria-label="Feed card"
      className="feed-card"
      type={story.type}
    >
      <div className="feed-card__info">
        <img
          className="feed-card__info-img"
          src={story.userImage}
          alt="Post author"
        />
        <p>{story.userName}</p>
        <p>
          <span className="visually-hidden">Post location: </span>{" "}
          {story.postLocation}{" "}
          <time className="feed-card__time">
            <span className="visually-hidden">Post made </span>{" "}
            {timeDifference(new Date(), new Date(story.postDate))}
            <span className="visually-hidden">ago</span>
          </time>
        </p>
      </div>
      <div className="feed-card__content">
        <img
          className="feed-card__content-img"
          src={story.postImage}
          alt="Post"
        />
      </div>
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

FeedCard.propTypes = {
  story: PropTypes.shape({
    id: PropTypes.string,
    userImage: PropTypes.string,
    userName: PropTypes.string,
    postDate: PropTypes.string,
    comments: PropTypes.array,
    likes: PropTypes.number,
    type: PropTypes.string,
    postLocation: PropTypes.string,
    postImage: PropTypes.string,
  }),
  userPhoto: PropTypes.string,
  userName: PropTypes.string,
  type: PropTypes.number,
};

export default FeedCard;

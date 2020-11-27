import React from "react";
import PropTypes from "prop-types";
import "./feedCard.scss";
import FeedCardComments from "./FeedCardComments";
import { ReactComponent as HeartIcon } from "../../../assets/icons/heart-icon.svg";
import { ReactComponent as CommentIcon } from "../../../assets/icons/comment-icon.svg";
import PostComment from "./PostComment";

function FeedCard({ story, userPhoto, userName }) {
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
          {story.postLocation} <span className="feed-card__time">20h</span>
        </p>
      </div>
      <div className="feed-card__content">
        <img
          className="feed-card__content-img"
          src={story.postImage}
          alt="Post"
        />
      </div>
      <div className="interactions-container">
        <HeartIcon className="heart-icon" />
        <p>{story.likes}</p>
        <CommentIcon className="comment-icon" />
        <p>{story.comments.length}</p>
      </div>
      <div className="feed-card-divider"></div>
      <div className="feed-card__comments-container">
        <FeedCardComments comments={story.comments} />
      </div>
      <div className="feed-card-divider"></div>
      <div className="new-comment-container">
        <img className="new-comment-image" src={userPhoto} alt="User" />
        <PostComment id={story.id} username={userName} />
      </div>
    </div>
  );
}

FeedCard.propTypes = {
  story: PropTypes.object,
  userPhoto: PropTypes.string,
  userName: PropTypes.string,
};

export default FeedCard;

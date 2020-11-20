import React from "react";
import PropTypes from "prop-types";
import "./feedCard.scss";
import FeedCardComments from "./FeedCardComments";
import { ReactComponent as HeartIcon } from "../../../assets/icons/heart-icon.svg";
import { ReactComponent as CommentIcon } from "../../../assets/icons/comment-icon.svg";
import FormInput from "../../../components/form/input/FormInput";

function FeedCard({
  authorUsername,
  authorImg,
  city,
  time,
  imageUrl,
  userPhoto,
  newComment,
  comments,
  commentCount,
  likes,
}) {
  return (
    <div className="feed-card">
      <div className="feed-card__info">
        <img
          className="feed-card__info-img"
          src={authorImg}
          alt="Post author"
        />
        <p>{authorUsername}</p>
        <p>
          {city} <span className="feed-card__time">{time}</span>
        </p>
      </div>
      <div className="feed-card__content">
        <img className="feed-card__content-img" src={imageUrl} alt="Post" />
      </div>
      <div className="interactions-container">
        <HeartIcon className="heart-icon" />
        <p>{likes}</p>
        <CommentIcon className="comment-icon" />
        <p>{commentCount}</p>
      </div>
      <div className="feed-card-divider"></div>
      <FeedCardComments comments={comments} />
      <div className="feed-card-divider"></div>
      <div className="new-comment-container">
        <img className="new-comment-image" src={userPhoto} alt="User" />
        <FormInput className="comment-input" placeholder="Leave a comment..." />
        <button className="post-button">POST</button>
      </div>
    </div>
  );
}

FeedCard.propTypes = {
  authorUsername: PropTypes.string,
  authorImg: PropTypes.string,
  city: PropTypes.string,
  time: PropTypes.string,
  imageUrl: PropTypes.string,
  commenterUsername: PropTypes.string,
  commentText: PropTypes.string,
  newComment: PropTypes.string,
  userPhoto: PropTypes.string,
  likes: PropTypes.number,
  commentCount: PropTypes.number,
  comments: PropTypes.array,
};

export default FeedCard;

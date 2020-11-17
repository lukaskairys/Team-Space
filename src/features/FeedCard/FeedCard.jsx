import React from "react";
import PropTypes from "prop-types";
import "./feedCard.scss";
import { ReactComponent as HeartIcon } from "../../assets/icons/heart-icon.svg";
import { ReactComponent as CommentIcon } from "../../assets/icons/comment-icon.svg";
import FormInput from "../../components/form/input/FormInput";

function FeedCard({
  authorUsername,
  authorImg,
  city,
  time,
  imageUrl,
  commenterUsername,
  commentText,
  userPhoto,
  newComment,
}) {
  return (
    <div className="feed-card">
      <div className="feed-card__info">
        <img src={authorImg} alt="" />
        <p>{authorUsername}</p>
        <p>
          {city} <span className="feed-card__time">{time}</span>
        </p>
      </div>
      <div className="feed-card__content">
        <img src={imageUrl} alt="" />
      </div>
      <div className="interactions-container">
        <HeartIcon className="heart-icon" />
        <CommentIcon className="comment-icon" />
      </div>
      <div className="card-divider"></div>
      <div className="comments-container">
        <div className="comment">
          <p className="commenter-username">{commenterUsername}</p>
          <p className="comment-text">{commentText}</p>
        </div>
        <div className="comment">
          <p className="commenter-username">{commenterUsername}</p>
          <p className="comment-text">
            {commentText}
            {commentText}
            {commentText}
          </p>
        </div>
      </div>
      <div className="card-divider"></div>
      <div className="new-comment-container">
        <img src={userPhoto} alt="" />
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
};

export default FeedCard;

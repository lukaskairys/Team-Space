import React from "react";
import PropTypes from "prop-types";
import "../FeedCard/feedCard.scss";
import { ReactComponent as HeartIcon } from "../../assets/icons/heart-icon.svg";
import { ReactComponent as CommentIcon } from "../../assets/icons/comment-icon.svg";
import { ReactComponent as PlayButton } from "../../assets/images/play-button.svg";
import FormInput from "../../components/form/input/FormInput";
import ReactPlayer from "react-player";

function FeedCardVideo({
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
        <ReactPlayer
          url="https://storage.coverr.co/videos/flYliO01fn8Zw5RH1O9hXlbKbCs02A01hKp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjA1MTA2MzIyfQ.eHacEaqpHvG_dNz6lOVkNSG4cydWgrqYs9WDdhK82ks"
          light="https://storage.coverr.co/t/Q4G3nDsk01ZRFR9o7HjBzTFkcgXE90101NA"
          width="100%"
          height="100%"
          playing="true"
          playIcon={<PlayButton />}
        />
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

FeedCardVideo.propTypes = {
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

export default FeedCardVideo;

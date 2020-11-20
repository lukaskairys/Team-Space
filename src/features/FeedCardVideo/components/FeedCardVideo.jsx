import React from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import "../../FeedCard/components/feedCard.scss";
import { ReactComponent as HeartIcon } from "../../../assets/icons/heart-icon.svg";
import { ReactComponent as CommentIcon } from "../../../assets/icons/comment-icon.svg";
import { ReactComponent as PlayButton } from "../../../assets/images/play-button.svg";
import FormInput from "../../../components/form/input/FormInput";

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
  comments,
  likes,
  videoUrl,
  videoThumbnail,
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
        <ReactPlayer
          url={videoUrl}
          light={videoThumbnail}
          width="100%"
          height="100%"
          playing="true"
          playIcon={<PlayButton />}
        />
      </div>
      <div className="interactions-container">
        <HeartIcon className="heart-icon" />
        <p>{likes}</p>
        <CommentIcon className="comment-icon" />
        <p>{comments}</p>
      </div>
      <div className="feed-card-divider"></div>
      <div className="feed-card__comments">
        <div className="comment">
          <p className="commenter-username">{commenterUsername}</p>
          <p className="comment-text">{commentText}</p>
        </div>
      </div>
      <div className="feed-card-divider"></div>
      <div className="new-comment-container">
        <img className="new-comment-image" src={userPhoto} alt="User" />
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
  likes: PropTypes.number,
  comments: PropTypes.number,
  videoUrl: PropTypes.string,
  videoThumbnail: PropTypes.string,
};

export default FeedCardVideo;

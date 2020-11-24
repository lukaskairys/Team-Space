import React from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import FeedCardComments from "../../FeedCard/components/FeedCardComments";
import "../../FeedCard/components/feedCard.scss";
import { ReactComponent as HeartIcon } from "../../../assets/icons/heart-icon.svg";
import { ReactComponent as CommentIcon } from "../../../assets/icons/comment-icon.svg";
import { ReactComponent as PlayButton } from "../../../assets/images/play-button.svg";
import FormInput from "../../../components/form/input/FormInput";

function FeedCardVideo({ story }) {
  return (
    <div className="feed-card">
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
        <ReactPlayer
          url={story.postVideo}
          light={story.postCover}
          width="100%"
          height="100%"
          playing
          controls
          playIcon={<PlayButton />}
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
        <img
          className="new-comment-image"
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
          alt="User"
        />
        <FormInput
          className="comment-input"
          name={story.id}
          placeholder="Leave a comment..."
        />
        <button className="post-button">POST</button>
      </div>
    </div>
  );
}

FeedCardVideo.propTypes = {
  story: PropTypes.object,
};

export default FeedCardVideo;

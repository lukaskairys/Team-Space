import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import "./feedCard.scss";
import FeedCardInteractions from "./FeedCardInteractions";
import { ReactComponent as CommentIcon } from "../../../assets/icons/comment-icon.svg";
import FeedCardCommentsRenderer from "./FeedCardCommentsRenderer";
import Button from "../../../components/button/Button";
import { patch } from "../../../apis/services";

function FeedCardComments({
  comments,
  username,
  userPhoto,
  likes,
  id,
  storyOwner,
}) {
  const [inputValues, setInputValues] = useState({
    commentInput: "",
  });
  const [allComments, setAllComments] = useState(comments);

  const textInput = useRef(null);

  function handleCommentIconClick() {
    textInput.current.focus();
  }

  const handleCommentChange = (event) => {
    const { value } = event.target;
    setInputValues({ ...inputValues, commentInput: value });
  };

  const handlePostClick = (event) => {
    let date = new Date();
    let newComment = {
      userName: username,
      comment: inputValues.commentInput,
      date: date,
    };
    if (newComment.comment.length >= 1) {
      const newComments = [...allComments, newComment];
      setAllComments(newComments);
      patch("stories", { comments: newComments }, id);
      setInputValues({ commentInput: "" });
    }
  };

  return (
    <div style={{ padding: "0 1.6rem" }}>
      <div className="interactions-container">
        <FeedCardInteractions likes={likes} id={id} storyOwner={storyOwner} />
        <CommentIcon
          className="card-comment-icon"
          tabIndex="0"
          aria-label="Comment on a post"
          onClick={handleCommentIconClick}
        />
        <p>{allComments.length}</p>
      </div>
      <div className="feed-card-divider"></div>
      <FeedCardCommentsRenderer comments={allComments} />
      <div className="feed-card-divider"></div>
      <div className="new-comment-container">
        {userPhoto && (
          <img
            className="new-comment-image"
            src={
              userPhoto.startsWith("https://")
                ? userPhoto
                : `data:image/jpeg;base64,${userPhoto}`
            }
            alt="User"
          />
        )}
        <input
          ref={textInput}
          name="commentInput"
          type="text"
          placeholder="Leave a comment..."
          onChange={handleCommentChange}
          value={inputValues.commentInput}
          className="comment-input"
          username={username}
          date={new Date()}
          autoComplete="off"
        />
        <Button
          medium={true}
          blank={true}
          className="post-button"
          handleClick={handlePostClick}
        >
          POST
        </Button>
      </div>
    </div>
  );
}

FeedCardComments.propTypes = {
  comments: PropTypes.array,
  username: PropTypes.string,
  userPhoto: PropTypes.string,
  likes: PropTypes.number,
  id: PropTypes.string,
  storyOwner: PropTypes.string,
};

export default FeedCardComments;

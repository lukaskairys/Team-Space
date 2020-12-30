import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import "../../FeedCard/components/feedCard.scss";
import BirthdayInteractions from "./BirthdayInteractions";
import { ReactComponent as CommentIcon } from "../../../assets/icons/comment-icon.svg";
import BirthdayCommentsRenderer from "./BirthdayCommentsRenderer";
import Button from "../../../components/button/Button";
import { patch } from "../../../apis/services";

function BirthdayComments({
  comments,
  username,
  userPhoto,
  wishes,
  onCommentClick,
  id,
}) {
  const [inputValues, setInputValues] = useState({
    commentInput: "",
  });

  const [allComments, setAllComments] = useState(comments);

  const textInput = useRef(null);
  const commentDisplay = React.createRef();

  function handleCommentIconClick() {
    commentDisplay.current.classList.toggle("d-none");
    commentDisplay.current.classList.toggle("fade-in");
    textInput.current.focus();
    if (onCommentClick !== undefined) {
      onCommentClick();
    }
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
    onCommentClick();
    commentDisplay.current.classList.add("d-none");
  };

  return (
    <div className="birthday-comments-container">
      <div className="interactions-container">
        <BirthdayInteractions wishes={wishes} />
        <CommentIcon
          className="card-comment-icon"
          onClick={handleCommentIconClick}
        />
        <p>{allComments.length}</p>
      </div>
      <div
        id="birthday-comment-display"
        ref={commentDisplay}
        className="d-none"
      >
        <div className="feed-card-divider"></div>
        <BirthdayCommentsRenderer comments={allComments} />
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
    </div>
  );
}

BirthdayComments.propTypes = {
  comments: PropTypes.array,
  username: PropTypes.string,
  userPhoto: PropTypes.string,
  wishes: PropTypes.number,
  onCommentClick: PropTypes.func,
  id: PropTypes.string,
};

export default BirthdayComments;

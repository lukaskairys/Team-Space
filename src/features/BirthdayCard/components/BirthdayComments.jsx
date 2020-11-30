import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import "../../FeedCard/components/feedCard.scss";
import BirthdayInteractions from "./BirthdayInteractions";
import { ReactComponent as CommentIcon } from "../../../assets/icons/comment-icon.svg";

function BirthdayComments({
  comments,
  username,
  userPhoto,
  wishes,
  onCommentClick,
}) {
  const [inputValues, setInputValues] = useState({
    commentInput: "",
  });

  const [allComments, setAllComments] = useState(comments);

  const textInput = useRef(null);
  const commentDisplay = React.createRef();

  function handleCommentIconClick() {
    commentDisplay.current.classList.toggle("d-none");
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
      setAllComments((allComments) => [...allComments, newComment]);
      setInputValues({ commentInput: "" });
    }
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
        <div className="feed-card__comments-container">
          {allComments
            .sort(function (firstComment, secondComment) {
              return new Date(firstComment.date) - new Date(secondComment.date);
            })
            .map((comment, i) => {
              return (
                <>
                  {" "}
                  <div className="feed-card__comment" key={i}>
                    <p className="feed-card__commenter-username">
                      {comment.userName}
                    </p>
                    <p className="feed-card__comment-text">{comment.comment}</p>
                  </div>
                </>
              );
            })}
        </div>
        <div className="feed-card-divider"></div>
        <div className="new-comment-container">
          <img className="new-comment-image" src={userPhoto} alt="User" />
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
          <button className="post-button" onClick={handlePostClick}>
            POST
          </button>
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
};

export default BirthdayComments;

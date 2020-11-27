import React, { useState } from "react";
import PropTypes from "prop-types";
import "./feedCard.scss";
import FeedCardInteractions from "./FeedCardInteractions";
import { ReactComponent as CommentIcon } from "../../../assets/icons/comment-icon.svg";

function FeedCardComments({ comments, username, userPhoto, likes }) {
  const [inputValues, setInputValues] = useState({
    commentInput: "",
  });

  const [allComments, setAllComments] = useState(comments);

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
    setAllComments((allComments) => [...allComments, newComment]);
  };

  return (
    <div>
      <div className="interactions-container">
        <FeedCardInteractions likes={likes} />
        <CommentIcon className="card-comment-icon" />
        <p>{allComments.length}</p>
      </div>
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
          name="commentInput"
          type="text"
          placeholder="Leave a comment..."
          onChange={handleCommentChange}
          comment={inputValues.commentInput}
          className="comment-input"
          username={username}
          date={new Date()}
        />
        <button className="post-button" onClick={handlePostClick}>
          POST
        </button>
      </div>
    </div>
  );
}

FeedCardComments.propTypes = {
  comments: PropTypes.array,
  username: PropTypes.string,
  userPhoto: PropTypes.string,
  likes: PropTypes.number,
};

export default FeedCardComments;

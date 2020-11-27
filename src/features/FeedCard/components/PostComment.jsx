import React, { useState } from "react";
import PropTypes from "prop-types";
import "./feedCard.scss";

function PostComment(props) {
  let { id, username, date } = props;

  const [inputValues, setInputValues] = useState({
    commentInput: "",
  });

  const handleCommentChange = (event) => {
    const { value } = event.target;
    setInputValues({ ...inputValues, commentInput: value });
  };

  return (
    <>
      <input
        id={id}
        name="commentInput"
        type="text"
        placeholder="Leave a comment..."
        onChange={handleCommentChange}
        comment={inputValues.commentInput}
        className="comment-input"
        username={username}
        date={date}
      />
      <button className="post-button" /*handleClick={() => handlePostClick}*/>
        POST
      </button>
    </>
  );
}

PostComment.propTypes = {
  id: PropTypes.string,
  username: PropTypes.string,
  date: PropTypes.string,
};

export default PostComment;

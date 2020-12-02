import React from "react";
import PropTypes from "prop-types";

import "../../FeedCard/components/feedCard.scss";

function BirthdayCommentsRenderer({ comments }) {
  return (
    <div className="feed-card__comments-container">
      {comments
        .sort(function (firstComment, secondComment) {
          return new Date(firstComment.date) - new Date(secondComment.date);
        })
        .map((comment, i) => {
          return (
            <div className="feed-card__comment" key={i}>
              <p className="feed-card__commenter-username">
                {comment.userName}
              </p>
              <p className="feed-card__comment-text">{comment.comment}</p>
            </div>
          );
        })}
    </div>
  );
}

BirthdayCommentsRenderer.propTypes = {
  comments: PropTypes.array,
};

export default BirthdayCommentsRenderer;

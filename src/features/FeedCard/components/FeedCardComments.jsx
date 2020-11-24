import React from "react";
import PropTypes from "prop-types";
import "./feedCard.scss";

function FeedCardComments({ comments }) {
  return (
    <div>
      {comments
        .sort(function (firstCommant, secondComment) {
          return new Date(firstCommant.date) - new Date(secondComment.date);
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

FeedCardComments.propTypes = {
  comments: PropTypes.array,
};

export default FeedCardComments;

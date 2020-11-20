import React from "react";
import PropTypes from "prop-types";
import "./feedCard.scss";

function FeedCardComments({ comments }) {
  return (
    <div>
      {comments.map((comment, i) => {
        return (
          <div className="feed-card__comments" key={i}>
            <div className="comment">
              <p className="commenter-username">{comment.userName}</p>
              <p className="comment-text">{comment.comment}</p>
            </div>
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

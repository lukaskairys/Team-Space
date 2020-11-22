import React from "react";
import PropTypes from "prop-types";

import RatingComponent from "../../components/Rating/Rating";
import "./reviewCard.scss";

function ReviewCard({ review, inModal }) {
  return (
    <div
      className={
        !inModal ? "review-card" : "review-card review-card--in-modal "
      }
    >
      <h4 className="review-card__title">{review.userName}</h4>
      <p className="review-card__content">{review.comment}</p>
      {RatingComponent(review.rating)}
    </div>
  );
}

ReviewCard.propTypes = {
  review: PropTypes.object,
  inModal: PropTypes.bool,
};

export default ReviewCard;

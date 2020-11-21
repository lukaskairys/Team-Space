import React from "react";
import PropTypes from "prop-types";

import RatingComponent from "../../components/Rating/Rating";
import "./reviewCard.scss";

function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <h4 className="review-card__title">{review.userName}</h4>
      <p className="review-card__content">{review.comment}</p>
      {RatingComponent(review.rating)}
    </div>
  );
}

ReviewCard.propTypes = {
  review: PropTypes.object,
};

export default ReviewCard;

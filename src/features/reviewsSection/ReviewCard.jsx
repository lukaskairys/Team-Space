import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import RatingComponent from "../../components/Rating/Rating";
import "./reviewCard.scss";

function ReviewCard({ review, inModal }) {
  return (
    <div
      className={classNames("review-card", {
        "review-card--truncate": !inModal,
        "review-card--in-modal": inModal,
      })}
    >
      <h4 className="review-card__title">{review.userName}</h4>
      <p
        className={classNames("review-card__content", {
          "review-card__content--truncate": !inModal,
        })}
      >
        {review.comment}
      </p>
      <RatingComponent ratingValue={review.rating} isStatic={true} />
    </div>
  );
}

ReviewCard.propTypes = {
  review: PropTypes.shape({
    userName: PropTypes.string,
    id: PropTypes.string,
    comment: PropTypes.string,
    rating: PropTypes.number,
  }),
  inModal: PropTypes.bool,
};

export default ReviewCard;

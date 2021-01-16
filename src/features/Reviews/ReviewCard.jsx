import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import RatingComponent from "components/Rating/Rating";
import "./reviewCard.scss";

function ReviewCard({ review, inModal }) {
  return (
    <article
      className={classNames("review-card", {
        "review-card--truncate": !inModal,
        "review-card--in-modal": inModal,
      })}
    >
      <h3
        className={classNames("review-card__title", {
          "review-card__title--truncate": !inModal,
        })}
      >
        {review.userName}
      </h3>
      <p
        className={classNames("review-card__content", {
          "review-card__content--truncate": !inModal,
        })}
      >
        {review.comment}
      </p>
      <RatingComponent ratingValue={review.rating} isStatic={true} />
    </article>
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

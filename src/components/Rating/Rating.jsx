import React, { useState, useEffect, useCallback } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import { roundNumber, countAverage } from "utils/Math";
import { patch } from "apis/services";
import { ReactComponent as StarIcon } from "assets/icons/star.svg";

import "./rating.scss";

const currentUser = "John";

const Rating = ({ restaurant, isStatic, ratingValue }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const getRatingAverage = (restaurant) => {
    const ratingsArray = restaurant.reviews.map((x) => x.rating);
    const ratingAverages = countAverage(ratingsArray);
    return roundNumber(ratingAverages);
  };

  const handleNewRating = useCallback(() => {
    if (!isStatic) {
      const newComment = {
        userName: currentUser,
        id: Math.random().toString(36).substr(2, 10),
        comment: "",
        rating: rating,
      };

      const newCommentArray = restaurant.reviews;

      if (!newCommentArray.some((review) => review.userName === currentUser)) {
        newCommentArray.push(newComment);
        const dataToUpdate = { reviews: [...newCommentArray] };
        patch("restaurants", dataToUpdate, restaurant.id);
      } else {
        const dataToUpdate = newCommentArray.map((review) => {
          if (review.userName === currentUser) {
            review.rating = rating;
          }
          return review;
        });
        patch("restaurants", dataToUpdate, restaurant.id);
      }
    }
  }, [isStatic, rating, restaurant]);

  useEffect(() => {
    if (rating) handleNewRating();
  }, [rating, handleNewRating]);

  useEffect(() => {
    if (
      restaurant &&
      restaurant.reviews.some((review) => review.userName === currentUser)
    ) {
      const rating = restaurant.reviews.filter(
        (review) => review.userName === currentUser
      )[0].rating;
      setRating(rating);
    }
  }, [restaurant]);

  if (restaurant || ratingValue) {
    let displayedRating;
    if (restaurant) {
      displayedRating = getRatingAverage(restaurant);
    } else {
      displayedRating = roundNumber(ratingValue);
    }

    return (
      <div
        className={classNames("rating-container", {
          "rating-container--is-static": isStatic,
        })}
      >
        <div className="rating-container__items">
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;

            return (
              <label key={i} className="rating-container__label">
                <input
                  className="rating-container__input"
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => {
                    setRating(ratingValue);
                  }}
                />
                <StarIcon
                  className={classNames(
                    "rating-container__icon",
                    {
                      "is-filled": ratingValue <= (hover || rating),
                    },
                    {
                      "is-expandable": ratingValue > 1,
                    }
                  )}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
          <span className="rating-container__average">{displayedRating}</span>
        </div>
      </div>
    );
  }
  return <div></div>;
};

Rating.propTypes = {
  isStatic: PropTypes.bool,
  ratingValue: PropTypes.number,
  restaurant: PropTypes.shape({
    reviews: PropTypes.array,
    id: PropTypes.string,
  }),
};
export default Rating;

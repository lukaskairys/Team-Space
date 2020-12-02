import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import { roundNumber, countAverage } from "utils/Math";
import { ReactComponent as StarIcon } from "assets/icons/star.svg";

import "./rating.scss";

const Rating = ({ restaurant, isStatic, ratingValue }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const getRatingAverage = (restaurant) => {
    const ratingsArray = restaurant.reviews.map((x) => x.rating);
    const ratingAverages = countAverage(ratingsArray);
    return roundNumber(ratingAverages);
  };

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
                  onClick={() => setRating(ratingValue)}
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
  }),
};
export default Rating;
